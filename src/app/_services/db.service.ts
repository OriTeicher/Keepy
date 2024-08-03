import { Pool } from 'pg'

const pool = new Pool({
  ssl: true,
  connectionString:
    'postgresql://note_db_dx96_user:0u7voGulrA6ubWaH6VEXlOvd3XT31DUI@dpg-cqf0loogph6c73b314i0-a.frankfurt-postgres.render.com/note_db_dx96',
})

export default pool

export const dbService = {
  loadNotes,
  testPoolConnection,
}

async function loadNotes() {
  try {
    const result = await pool.query('SELECT * FROM notes')
    console.log('result FROM DB.SERVICE', result)
    return result.rows
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load notes')
  }
}

async function testPoolConnection() {
  try {
    const client = await pool.connect()
    console.log('Connected to the database successfully!')
    client.release()
  } catch (error) {
    console.error('Error connecting to the database:', error)
  } finally {
    pool.end()
  }
}
