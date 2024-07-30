import { Pool } from 'pg'

const pool = new Pool({
  user: 'note_db_dx96_user',
  host: 'dpg-cqf0loogph6c73b314i0-a',
  database: 'note_db_dx96',
  password: '0u7voGulrA6ubWaH6VEXlOvd3XT31DUI',
  port: 5432,
})

export default pool
