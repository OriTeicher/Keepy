INSERT INTO notes (_id, "isHovered", title, txt, type, "createdAt", color)
SELECT _id, "isHovered", title, txt, type, "createdAt", color
FROM json_populate_recordset(NULL::notes, '[
  {
    "_id": "note-101",
    "isHovered": false,
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  },
  {
    "_id": "note-102",
    "isHovered": false,
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightskyblue"
  }
]');
