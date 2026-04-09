DROP TABLE IF EXISTS exam_blocks;

CREATE TABLE exam_blocks (
    id SERIAL PRIMARY KEY,
    term VARCHAR(50) NOT NULL,
    meeting_days VARCHAR(50) NOT NULL,
    meeting_time VARCHAR(20) NOT NULL,
    exam_date VARCHAR(100) NOT NULL,
    exam_time VARCHAR(100) NOT NULL
);
