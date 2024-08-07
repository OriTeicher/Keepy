import { APP_BASE_HREF } from '@angular/common'
import { CommonEngine } from '@angular/ssr'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import bootstrap from './src/main.server'
import { dbService } from './src/app/_services/db.service'
import { Pool } from 'pg'
import cors from 'cors'

export function app(): express.Express {
  const server = express()
  const serverDistFolder = dirname(fileURLToPath(import.meta.url))
  const browserDistFolder = resolve(serverDistFolder, '../browser')
  const indexHtml = join(serverDistFolder, 'index.server.html')
  const commonEngine = new CommonEngine()

  const corsOptions = {
    origin: [
      'http://localhost:5173',
      'https://keepynotes.netlify.app/notes',
      'https://keepynotes.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

  // Use CORS middleware
  server.use(cors(corsOptions))
  // ? ** NOTES ROUTES ** ?
  server.get('/api/notes', async (req, res) => {
    try {
      const notes = await dbService.loadNotes()
      res.json({ notes })
    } catch (err) {
      console.error('Error fetching notes:', err)
      res.status(500).json({ error: 'Failed to load notes' })
    }
  })

  server.get('/api/notes/:noteId', async (req, res) => {
    try {
      const noteId = req.params.noteId
      console.log('noteId', noteId)
      const note = await dbService.loadNoteById(noteId)
      note
        ? res.json({ note })
        : res.status(404).json({ error: 'Note not found' })
    } catch (err) {
      console.error('Error fetching note:', err)
      res.status(500).json({ error: 'Failed to load note' })
    }
  })

  // ? ** TEST ROUTES ** ?
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
