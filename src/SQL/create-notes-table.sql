CREATE TABLE notes (
    _id VARCHAR(255) PRIMARY KEY,
    "isHovered" BOOLEAN,
    title VARCHAR(255),
    txt TEXT,
    type VARCHAR(50),
    "createdAt" TIMESTAMP,
    color VARCHAR(50)
);
