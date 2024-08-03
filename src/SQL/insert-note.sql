INSERT INTO notes (_id, title, txt, type, "createdAt", color)
SELECT _id, title, txt, type, "createdAt", color
FROM json_populate_recordset(NULL::notes, '[
  {
    "_id": "note-108869",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  },
  {
    "_id": "note-10678",
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightskyblue"
  }
  {
    "_id": "note-13089",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  },
  {
    "_id": "note-540678",
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightskyblue"
  }
]')
