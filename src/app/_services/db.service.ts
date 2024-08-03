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
  loadNoteById,
}

async function loadNotes() {
  try {
    const res = await pool.query('SELECT * FROM notes')
    return res.rows
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load notes')
  }
}

async function loadNoteById(noteId: string) {
  try {
    const query = 'SELECT * FROM notes WHERE _id = $1'
    const res = await pool.query(query, [noteId])
    return res.rows[0]
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load note')
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
