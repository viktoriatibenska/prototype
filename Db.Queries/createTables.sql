DROP TABLE IF EXISTS pattern;
DROP TABLE IF EXISTS variation;
DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS transition;
DROP TABLE IF EXISTS pattern_user;
DROP TABLE IF EXISTS pattern_creator;
DROP TABLE IF EXISTS pattern_student;

CREATE TABLE variation(
	id serial UNIQUE PRIMARY KEY NOT NULL
);

CREATE TABLE pattern(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	name varchar(200) UNIQUE NOT NULL,
	primary_variation_id int references variation(id),
	context text,
	forces text,
	solution text,
	discussion text,
	patlet text,
	rating real,
	is_published boolean
);

CREATE TABLE state(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	variation_id int references variation(id),
	name varchar(200),
	description text,
	position_x real,
	position_y real
);

CREATE TABLE transition(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	state_from_id int references state(id),
	state_to_id int references state(id),
	name varchar(200),
	description text
);

CREATE TABLE system_user(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	email varchar(200) UNIQUE NOT NULL,
	first_name varchar(100) NOT NULL,
	surname varchar(100) NOT NULL,
	nickname varchar(100)
);

CREATE TABLE pattern_creator(
	id serial UNIQUE PRIMARY KEY NOT NULL
);

CREATE TABLE pattern_student(
	id serial UNIQUE PRIMARY KEY NOT NULL
);