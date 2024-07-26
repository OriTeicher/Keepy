import { Note } from '../_interfaces/Note'
import { getRandomIntInclusive, makeId, makeSentence } from './util.service'

export const noteService = {
  getDemoNotes,
  getDemoNote,
}

export const NOTE_COLORS = [
  'pink',
  'white',
  'lightseagreen',
  'lightcoral',
  'lightyellow',
  'lightskyblue',
]

export const NOTES_GRADIENTS = [
  'linear-gradient(to bottom,slategray 0%, white 100%)',
  'linear-gradient(to bottom, #85FFBD 0%, #FFFB7D 100%)',
  'linear-gradient(to bottom, #00DBDE 0%, #FFF 100%)',
  'linear-gradient(to bottom, #fff 0%, lightskyblue 100%)',
  'linear-gradient(to bottom, lightseagreen 0%, lightskyblue 100%)',
  'linear-gradient(to bottom, #FFF 0%, #FC00FF 100%)',
]

function getDemoNotes(amount: number = 20): Note[] {
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
    _id: makeId(),
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
    createdAt: formatDate(new Date()),
    color: '#FFF',
  }
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
