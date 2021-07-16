CREATE TABLE "questions" ("id" SERIAL PRIMARY KEY, "description" varchar NOT NULL, "option_a" varchar NOT NULL, "option_b" varchar NOT NULL, "option_c" varchar NOT NULL, "option_d" varchar NOT NULL, "correct_option" CHAR (1) NOT NULL, "difficulty" int NOT NULL, "subject" int NOT NULL, "author" varchar NOT NULL );
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Com quantos paus se faz uma canoa?', 'Com nenhum.', 'Com 1.', 'Depende.', 'Não é feita com pau.', 'c', '1', '1', 'Femeuc');
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Pergunta teste 1?', 'Alternativa teste 1.', 'Alternativa teste 1.', 'Alternativa teste 1.', 'Alternativa teste 1.', 'a', '2', '2', 'Femeuc');
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Pergunta teste 2?', 'Alternativa teste 2.', 'Alternativa teste 2.', 'Alternativa teste 2.', 'Alternativa teste 2.', 'd', '1', '3', 'Femeuc');
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Pergunta teste 3?', 'Alternativa teste 3.', 'Alternativa teste 3.', 'Alternativa teste 3.', 'Alternativa teste 3.', 'a', '3', '3', 'Femeuc');
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('Pergunta teste 4?', 'Alternativa teste 4.', 'Alternativa teste 4.', 'Alternativa teste 4.', 'Alternativa teste 4.', 'b', '3', '1', 'Femeuc');
INSERT INTO "questions" ("description", "option_a", "option_b", "option_c", "option_d", "correct_option",  "difficulty", "subject", "author") VALUES ('qual as cores do semâforo?', 'verde, amarelo, azul.', 'preto e branco', 'verde e vermelho', 'amarelo, verde e vermelho', 'd', '1', '1', 'Cibitto');

CREATE TABLE "difficulties" ("id" SERIAL PRIMARY KEY, "name" varchar NOT NULL);
INSERT INTO "difficulties" ("name") VALUES ('easy'), ('normal'), ('hard');

CREATE TABLE "question_subjects" ("id" SERIAL PRIMARY KEY, "subject" varchar NOT NULL, "is_general_subject" boolean NOT NULL, "channel" varchar DEFAULT NULL, "subject_simplified" VARCHAR DEFAULT NUll);
INSERT INTO "question_subjects" ("subject", "subject_simplified", "is_general_subject", "channel") VALUES ('Gramática', 'gramatica', 'true', DEFAULT);
INSERT INTO "question_subjects" ("subject", "subject_simplified", "is_general_subject", "channel") VALUES ('Brawl Stars', 'brawl stars', 'false', 'wcalixtoo');
INSERT INTO "question_subjects" ("subject", "subject_simplified", "is_general_subject", "channel") VALUES ('Counter Strike', 'counter strike', 'false', 'johnpittertv');

ALTER TABLE "questions" ADD FOREIGN KEY ("difficulty") REFERENCES "difficulties" ("id");
ALTER TABLE "questions" ADD FOREIGN KEY ("subject") REFERENCES "question_subjects" ("id");


/* INNER JOIN */
SELECT questions.id AS question_id, description, option_a, option_b, option_c, option_d, difficulties.name AS difficulty, question_subjects.subject AS subject, author FROM questions INNER JOIN difficulties ON difficulty = difficulties.id INNER JOIN question_subjects ON questions.subject = question_subjects.id;


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