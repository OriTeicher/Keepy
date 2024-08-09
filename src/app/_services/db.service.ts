import { Pool } from 'pg'
import { Note } from '../_interfaces/note'
import { makeId } from './util.service'

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
  addNote,
  updateNote,
  removeNoteById,
}

async function loadNotes(): Promise<Note[]> {
  try {
    const res = await pool.query('SELECT * FROM notes')
    return res.rows
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load notes')
  }
}
async function removeNoteById(noteId: string): Promise<void> {
  try {
    console.log('noteId FROM DB SERVICE', noteId)
    const query = `DELETE FROM notes WHERE _id = $1 RETURNING *;`
    await pool.query(query, [noteId])
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load notes')
  }
}

async function loadNoteById(noteId: string): Promise<Note> {
  try {
    const query = 'SELECT * FROM notes WHERE _id = $1'
    const res = await pool.query(query, [noteId])
    return res.rows[0]
  } catch (err) {
    console.error(err)
    throw new Error('Failed to load note')
  }
}

async function addNote(noteToAdd: Note) {
  const { title, txt, color, type } = noteToAdd
  try {
    const query = `
      INSERT INTO notes (_id ,title, txt, color, "createdAt", type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `
    const res = await pool.query(query, [
      makeId(),
      title,
      txt,
      color,
      new Date(Date.now()).toISOString(),
      type,
    ])
    console.log('res ADDED NOTE AFTER DB', res)
  } catch (err) {
    console.error(err)
    throw new Error('Failed to add note')
  }
}
async function updateNote(noteToUpdate: Note) {
  const { _id, title, txt, color } = noteToUpdate

  try {
    const query = `
      UPDATE notes
      SET title = $1, txt = $2, color = $3, "createdAt" = $4
      WHERE _id = $5
      RETURNING *;
    `

    const res = await pool.query(query, [title, txt, color, Date.now(), _id])
    console.log('🚀 ~ updateNote ~ const:', res.rows[0])
  } catch (err) {
    console.error(err)
    throw new Error('Failed to update note')
  }
}

async function testPoolConnection(): Promise<void> {
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
