DROP TABLE IF EXISTS journal;
DROP TABLE IF EXISTS cesdrSurvey;
DROP TABLE IF EXISTS phq9Survey;
DROP TABLE IF EXISTS user;

CREATE TABLE User (
	uid SERIAL PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	pass VARCHAR(255) NOT NULL,
	outreach BOOLEAN NOT NULL,
    therapistEmail VARCHAR(255),
    isTherapist BOOLEAN
    -- ^^ not enough lol
);

CREATE TABLE Journal (
    journalId SERIAL PRIMARY KEY,
	uid SERIAL,
	dates TIMESTAMP,
	entry VARCHAR(1000),
    journalPrompt VARCHAR(255),
    motivation VARCHAR(255),
	FOREIGN KEY (uid) REFERENCES user(uid)
	-- PRIMARY KEY(uid, dates)
);

CREATE TABLE JournalPrompt (
    promptId SERIAL PRIMARY KEY
    uid SERIAL,
    prompt VARCHAR(255) NOT NULL,
    dates TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES user(uid)
    -- tag ?
);

CREATE TABLE Sentiment (
    sentimentId SERIAL PRIMARY KEY,
    uid SERIAL,
    journalId SERIAL,
    dates TIMESTAMP,
    score FLOAT,
    magnitude FLOAT,
    FOREIGN KEY(uid) REFERENCES user(uid),
    FOREIGN KEY(journalId) REFERENCES journal(journalId)
    -- PRIMARY KEY(uid, journalId)
);

CREATE TABLE ThoughtRecordSurvey (
    uid SERIAL,
    dates TIMESTAMP,
    trigger VARCHAR(255) NOT NULL,
    feelings VARCHAR(255) NOT NULL,
    intensity INT NOT NULL,
    unhelpfulThoughts VARCHAR(255),
    support VARCHAR(255),
    opposition VARCHAR(255),
    realisticThoughts VARCHAR(255),
    outcome VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES user(uid),
    PRIMARY KEY(uid, dates)
);

CREATE TABLE CesdrSurvey (
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
	selfHarm INT NOT NULL,
	tired INT NOT NULL,
	shame INT NOT NULL,
	weightloss INT NOT NULL,
	sleepless INT NOT NULL,
	perspective INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES user(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE Phq8Survey (
	uid SERIAL,
	dates TIMESTAMP,
	interest INT NOT NULL,
	hopeless INT NOT NULL,
	sleep INT NOT NULL,
	energy INT NOT NULL,
	appetite INT NOT NULL,
	failure INT NOT NULL,
	concentration INT NOT NULL,
	slowOrFidgety INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES user(uid),
	PRIMARY KEY(uid, dates)
);