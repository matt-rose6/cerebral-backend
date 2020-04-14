DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS emotions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	pass VARCHAR(255) NOT NULL,
	outreach BOOLEAN NOT NULL
);

CREATE TABLE entries (
	uid SERIAL,
	dates TIMESTAMP,
	entry VARCHAR(1000),
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE emotions (
	uid SERIAL,
	dates DATE,
	rating INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");