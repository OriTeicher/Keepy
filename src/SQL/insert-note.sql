INSERT INTO notes (_id, title, txt, type, "createdAt", color)
SELECT _id, title, txt, type, "createdAt", color
FROM json_populate_recordset(NULL::notes, '[
  {
    "_id": "note-101",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightcoral"
  },
  {
    "_id": "note-102",
    "title": "QA Tasks",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightseagreen"
  },
  {
    "_id": "note-103",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "pink"
  },
  {
    "_id": "note-104",
    "title": "Recipe",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  }
]');
