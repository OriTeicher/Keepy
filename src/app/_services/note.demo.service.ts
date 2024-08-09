import { Note } from '../_interfaces/NoteInterface.ts'
import { getRandomIntInclusive, makeId, makeSentence } from './util.service'

export const noteService = {
  getDemoNotes,
  getDemoNote,
}

let gNextId = 0

export const NOTE_COLORS = [
  'white',
  'pink',
  'lightcoral',
  'lightskyblue',
  'lightsteelblue',
  'lightseagreen',
]

export const NOTES_GRADIENTS = [
  'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
  'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
  'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
  'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)',
  'linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)',
  'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
]

function getDemoNotes(amount: number = 10): Note[] {
  let notes = []
  for (let i = 0; i < amount; i++) {
    notes.push(getDemoNote())
  }
  return notes
}

function getDemoNote() {
  const randColorIdx = getRandomIntInclusive(0, 5)
  const titles = ['Meeting', 'Shopping', 'Project', 'Workout Plan', 'Recipe']
  const types = ['text', 'todo', 'img', 'video', 'canvas']
  const title = titles[Math.floor(Math.random() * titles.length)]
  const txt = makeSentence(getRandomIntInclusive(1, 10))
  const type = types[Math.floor(Math.random() * types.length)]
  const createdAt = formatDate(new Date())
  const color =
    randColorIdx % 2 === 0
      ? NOTE_COLORS[randColorIdx]
      : NOTES_GRADIENTS[randColorIdx]
  return {
    _id: `note-00${gNextId++}`,
    title,
    txt,
    type,
    createdAt,
    color,
  }
}

export function getEmptyNote(
  title: string = 'Title...',
  txt: string = 'Description...',
  type: string = 'txt'
) {
  return {
    _id: '',
    title,
    txt,
    type,
    createdAt: formatDate(new Date(Date.now())),
    color: _getRandomColor(),
  }
}

function _getRandomColor() {
  const num = getRandomIntInclusive(0, 5)
  return num % 2 === 0 ? NOTE_COLORS[num] : NOTES_GRADIENTS[num]
}

function formatDate(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}/${month}`
}

// for NODE.JS enviroment
// server
// const connectionPool = new Pool({
//   connectionString,
// })
// let notes: QueryResult | Note[] = await connectionPool.query(queryStr, [2])
// console.log('notes.rows', notes.rows)
// if (notes) return notes.rows
// const queryStr = 'SELECT * FROM notes LIMIT $2'
