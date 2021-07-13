/* CREATE TYPE difficulty AS ENUM ('easy', 'normal', 'hard');*/


CREATE TABLE "questions" ("id" SERIAL PRIMARY KEY, "description" varchar NOT NULL, "option_a" varchar NOT NULL, "option_b" varchar NOT NULL, "option_c" varchar NOT NULL, "option_d" varchar NOT NULL, "difficulty" int NOT NULL, "subject" int NOT NULL, "author" varchar NOT NULL );

CREATE TABLE "difficulties" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar NOT NULL
);
INSERT INTO "difficulties" ("name") VALUES ('easy'), ('normal'), ('hard');

CREATE TABLE "question_subjects" ("id" SERIAL PRIMARY KEY, "subject" varchar NOT NULL, "channel" varchar DEFAULT NULL, "is_general_subject" boolean NOT NULL);
INSERT INTO "question_subjects" ("subject", "channel", "is_general_subject") VALUES ('Gramática', DEFAULT, 'true');

ALTER TABLE "questions" ADD FOREIGN KEY ("difficulty") REFERENCES "difficulties" ("id");
ALTER TABLE "questions" ADD FOREIGN KEY ("subject") REFERENCES "question_subjects" ("id");

/* INSERT */
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "difficulty", "subject", "author") VALUES ('Com quantos paus se faz uma canoa?', 'Com nenhum.', 'Com 1.', 'Depende.', 'Não é feita com pau.', '1', '1', 'Femeuc');

/* INNER JOIN */
SELECT questions.id AS question_id, description, option_a, option_b, option_c, option_d, 
difficulties.name AS difficulty, question_subjects.subject AS subject, author
FROM questions 
INNER JOIN difficulties ON difficulty = difficulties.id
INNER JOIN question_subjects ON questions.subject = question_subjects.id;


/*
ALTER TABLE users DROP CONSTRAINT users_story_checkpoint_fkey;
ALTER TABLE users ADD CONSTRAINT parent_id_fk FOREIGN KEY ("story_checkpoint") REFERENCES "page" ("id") ON DELETE SET NULL;

ALTER TABLE page DROP CONSTRAINT page_button1_fkey;
ALTER TABLE page ADD CONSTRAINT page_button1_fkey FOREIGN KEY ("button1") REFERENCES "button" ("id") ON DELETE CASCADE;

ALTER TABLE page DROP CONSTRAINT page_button2_fkey;
ALTER TABLE page ADD CONSTRAINT page_button2_fkey FOREIGN KEY ("button2") REFERENCES "button" ("id") ON DELETE CASCADE;

ALTER TABLE button DROP CONSTRAINT button_linked_page_fkey;
ALTER TABLE button ADD CONSTRAINT button_linked_page_fkey FOREIGN KEY ("linked_page") REFERENCES "page" ("id") ON DELETE CASCADE;
*/