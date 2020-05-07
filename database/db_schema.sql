DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS cesdrSurvey;
DROP TABLE IF EXISTS phq9Survey;
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

CREATE TABLE cesdrSurvey (
	uid SERIAL,
	dates TIMESTAMP,
	q1 INT,
	q2 INT,
	q3 INT,
	q4 INT,
	q5 INT,
	q6 INT,
	q7 INT,
	q8 INT,
	q9 INT,
	q10 INT,
	q11 INT,
	q12 INT,
	q13 INT,
	q14 INT,
	q15 INT,
	q16 INT,
	q17 INT,
	q18 INT,
	q19 INT,
	q20 INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE phq9Survey (
	uid SERIAL,
	dates TIMESTAMP,
	q1 INT,
	q2 INT,
	q3 INT,
	q4 INT,
	q5 INT,
	q6 INT,
	q7 INT,
	q8 INT,
	q9 INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);