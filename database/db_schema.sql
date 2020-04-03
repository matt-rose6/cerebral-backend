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
	dates DATE,
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