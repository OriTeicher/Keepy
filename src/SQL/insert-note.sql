INSERT INTO notes (_id, title, txt, type, "createdAt", color)
SELECT _id, title, txt, type, "createdAt", color
FROM json_populate_recordset(NULL::notes, '[
  {
    "_id": "note-tyjtyjtj",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightcoral"
  },
  {
    "_id": "note-dfghdfgh",
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightseagreen"
  },
  {
    "_id": "note-rtyrty",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "pink"
  },
  {
    "_id": "note-m7567567u",
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  }
]');
