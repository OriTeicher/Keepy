INSERT INTO notes (_id, title, txt, type, "createdAt", color)
SELECT _id, title, txt, type, "createdAt", color
FROM json_populate_recordset(NULL::notes, '[
  {
    "_id": "note-101",
    "title": "Meeting",
    "txt": "Lorem ipsum dolor sit",
    "type": "text",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightyellow"
  },
  {
    "_id": "note-102",
    "title": "Shopping",
    "txt": "amet consectetur adipiscing",
    "type": "todo",
    "createdAt": "2024-07-22 12:34:56",
    "color": "lightskyblue"
  }
]');
INSERT INTO notes (_id, title, txt, type, createdAt, color)
VALUES (
    '_id:character varying',
    'title:character varying',
    'txt:text',
    'type:character varying',
    'createdAt:timestamp without time zone',
    'color:character varying'
  );
