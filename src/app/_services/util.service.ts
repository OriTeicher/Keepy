export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function makeId() {
  const randNum = getRandomIntInclusive(10000, 100000000)
  return `n-${randNum}`
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function makeSentence(amount: number): string {
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
