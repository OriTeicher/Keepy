DELETE FROM notes
WHERE _id = 'sdfsdfsdfsf-note-id'
RETURNING *;

-- remove last 5 notes
DELETE FROM notes
WHERE _id IN (
  SELECT _id
  FROM notes
  ORDER BY _id DESC
  LIMIT 20
)
RETURNING *;
