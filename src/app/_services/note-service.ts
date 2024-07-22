import { Pool, QueryResult } from 'pg'
import { Note } from '../_interfaces/note'

export const noteService = {
  getDemoNotes,
  getDemoNote,
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

function getDemoNotes(amount: number = 20): Note[] {
  let notes = []
  for (let i = 0; i < amount; i++) {
    notes.push(getDemoNote())
  }
  return notes
}

function getDemoNote() {
  const titles = ['Meeting', 'Shopping', 'Project', 'Workout Plan', 'Recipe']
  const types = ['text', 'todo', 'img', 'video', 'canvas']
  const colors = [
    'salmon',
    'lightseagreen',
    'lightskyblue',
    'lightyellow',
    'white',
    'lightslategray',
    'lightblue',
    'lightgreen',
    'lightgray',
  ]

  const title = titles[Math.floor(Math.random() * titles.length)]
  const txt = makeSentence(getRandomIntInclusive(1, 10))
  const type = types[Math.floor(Math.random() * types.length)]
  const createdAt = formatDate(new Date())
  const color = colors[Math.floor(Math.random() * colors.length)]

  return {
    _id: makeId(),
    isHovered: false,
    title,
    txt,
    type,
    createdAt,
    color,
  }
}

function formatDate(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}/${month}`
}

function makeSentence(amount: number): string {
  const subjects = ['The cat', 'A dog', 'My friend', 'An artist', 'The teacher']
  const verbs = ['jumps', 'runs', 'paints', 'writes', 'reads']
  const objects = ['a book', 'a picture', 'a letter', 'an email', 'a song']
  const adverbs = ['quickly', 'slowly', 'happily', 'sadly', 'eagerly']

  const sentences = []
  for (let i = 0; i < amount; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)]
    const verb = verbs[Math.floor(Math.random() * verbs.length)]
    const object = objects[Math.floor(Math.random() * objects.length)]
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)]
    sentences.push(`${subject} ${verb} ${object} ${adverb}.`)
  }
  return sentences.join(' ')
}
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}

export function makeId() {
  const randNum = getRandomIntInclusive(10000, 100000000)
  return `N-#${randNum}`
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
