

CREATE TABLE pattern(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE variation(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE state(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE transition(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE pattern_user(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE pattern_creator(
	id serial UNIQUE PRIMARY KEY
);

CREATE TABLE pattern_student(
	id serial UNIQUE PRIMARY KEY
);