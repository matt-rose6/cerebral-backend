DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS cesdrSurvey;
DROP TABLE IF EXISTS phq9Survey;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	pass VARCHAR(255) NOT NULL,
	outreach BOOLEAN NOT NULL,
    therapist_email VARCHAR(255)
);

CREATE TABLE entries (
    entry_id SERIAL PRIMARY KEY,
	uid SERIAL,
	dates TIMESTAMP,
	entry VARCHAR(1000),
	FOREIGN KEY (uid) REFERENCES users(uid),
	-- PRIMARY KEY(uid, dates)
);

CREATE TABLE sentiment (
    sentiment_id SERIAL PRIMARY KEY,
    uid SERIAL,
    entry_id SERIAL,
    dates TIMESTAMP,
    score FLOAT,
    magnitude FLOAT,
    FOREIGN KEY(uid) REFERENCES users(uid)
    FOREIGN KEY(entry_id) REFERENCES entries(entry_id)
    -- PRIMARY KEY(uid, entry_id)
);

CREATE TABLE thoughtRecordSurvey (
    uid SERIAL,
    dates TIMESTAMP,
    trigger VARCHAR(255) NOT NULL,
    feelings VARCHAR(255) NOT NULL,
    intensity INT NOT NULL,
    unhelpful_thoughts VARCHAR(255),
    support VARCHAR(255),
    opposition VARCHAR(255),
    realistic_thoughts VARCHAR(255),
    outcome VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES users(uid),
    PRIMARY KEY(uid, dates)
);

CREATE TABLE cesdrSurvey (
	uid SERIAL,
	dates TIMESTAMP,
	appetite INT NOT NULL,
	blues INT NOT NULL,
	focus INT NOT NULL,
	depression INT NOT NULL,
	restless INT NOT NULL,
    sad INT NOT NULL,
	motivation INT NOT NULL,
	happiness INT NOT NULL,
	moral INT NOT NULL,
	interest INT NOT NULL,
	sleep INT NOT NULL,
	slow INT NOT NULL,
	fidgety INT NOT NULL,
	suicidal INT NOT NULL,
	self_harm INT NOT NULL,
	tired INT NOT NULL,
	shame INT NOT NULL,
	weight_loss INT NOT NULL,
	sleepless INT NOT NULL,
	perspective INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE phq8Survey (
	uid SERIAL,
	dates TIMESTAMP,
	interest INT NOT NULL,
	hopeless INT NOT NULL,
	sleep INT NOT NULL,
	energy INT NOT NULL,
	appetite INT NOT NULL,
	failure INT NOT NULL,
	concentration INT NOT NULL,
	slow_or_fidgety INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);