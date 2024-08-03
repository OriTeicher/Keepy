import { APP_BASE_HREF } from '@angular/common'
import { CommonEngine } from '@angular/ssr'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import bootstrap from './src/main.server'
import { dbService } from './src/app/_services/db.service'
import { Pool } from 'pg'

export function app(): express.Express {
  const server = express()
  const serverDistFolder = dirname(fileURLToPath(import.meta.url))
  const browserDistFolder = resolve(serverDistFolder, '../browser')
  const indexHtml = join(serverDistFolder, 'index.server.html')
  const pool = new Pool({
    user: 'note_db_dx96_user',
    host: 'dpg-cqf0loogph6c73b314i0-a',
    database: 'note_db_dx96',
    password: '0u7voGulrA6ubWaH6VEXlOvd3XT31DUI',
    port: 5432,
  })
  const commonEngine = new CommonEngine()

  server.get('/api/note', async (req, res) => {
    try {
      console.log('test')
      await dbService.testPoolConnection()
      res.json({ msg: 'Works' })
      // const result = await pool.query('SELECT * FROM notes')
      // res.json(result.rows)
      // res.status(200).json(result)
    } catch (err) {
      console.error('Error fetching notes:', err)
      res.status(500).json({ error: 'Failed to load notes' })
    }
  })
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' })
  })

  server.set('view engine', 'html')
  server.set('views', browserDistFolder)

  server.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`)
    next()
  })

  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  )

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err))
  })

  return server
}

function run(): void {
  const port = process.env['PORT'] || 5173

  const server = app()
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

run()
