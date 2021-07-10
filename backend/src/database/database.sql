CREATE TYPE difficulty AS ENUM ('easy', 'normal', 'hard');


CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "description" varchar NOT NULL,
  "option_a" varchar NOT NULL,
  "option_b" int,
  "option_c",
  "option_d",
);


/*
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar NOT NULL.
  "password" varchar NOT NULL.
  "story_checkpoint" int
);

CREATE TABLE "page" (
  "id" SERIAL PRIMARY KEY,
  "story" text NOT NULL,
  "button1" int,
  "button2" int
);

CREATE TABLE "button" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "linked_page" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("story_checkpoint") REFERENCES "page" ("id");

ALTER TABLE "page" ADD FOREIGN KEY ("button1") REFERENCES "button" ("id");

ALTER TABLE "page" ADD FOREIGN KEY ("button2") REFERENCES "button" ("id");

ALTER TABLE "button" ADD FOREIGN KEY ("linked_page") REFERENCES "page" ("id");

CREATE TABLE genre ("id" SERIAL PRIMARY KEY, "name" TEXT);
INSERT INTO genre("name") VALUES ('action'), ('adventure'), ('comedy'), ('drama'), ('fantasy'), ('horror'), ('isekai'), ('mistery'), ('romance'), ('science_fiction'), ('other');

CREATE TABLE "story" (
  "id" SERIAL PRIMARY KEY,
  "genre" INTEGER REFERENCES "genre" ("id") NOT NULL,
  "title" varchar NOT NULL,
  "description" text NOT NULL,
  "beginning_page" int
);

ALTER TABLE "story" ADD FOREIGN KEY ("beginning_page") REFERENCES "page" ("id");

ALTER TABLE users DROP CONSTRAINT users_story_checkpoint_fkey;
ALTER TABLE users ADD CONSTRAINT parent_id_fk FOREIGN KEY ("story_checkpoint") REFERENCES "page" ("id") ON DELETE SET NULL;

ALTER TABLE page DROP CONSTRAINT page_button1_fkey;
ALTER TABLE page ADD CONSTRAINT page_button1_fkey FOREIGN KEY ("button1") REFERENCES "button" ("id") ON DELETE CASCADE;

ALTER TABLE page DROP CONSTRAINT page_button2_fkey;
ALTER TABLE page ADD CONSTRAINT page_button2_fkey FOREIGN KEY ("button2") REFERENCES "button" ("id") ON DELETE CASCADE;

ALTER TABLE button DROP CONSTRAINT button_linked_page_fkey;
ALTER TABLE button ADD CONSTRAINT button_linked_page_fkey FOREIGN KEY ("linked_page") REFERENCES "page" ("id") ON DELETE CASCADE;
*/