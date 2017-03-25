DROP TABLE IF EXISTS pattern CASCADE;
DROP TABLE IF EXISTS variation CASCADE;
DROP TABLE IF EXISTS state CASCADE;
DROP TABLE IF EXISTS transition CASCADE;
DROP TABLE IF EXISTS system_user CASCADE;
DROP TABLE IF EXISTS pattern_creator CASCADE;
DROP TABLE IF EXISTS pattern_progress CASCADE;
DROP TABLE IF EXISTS contribution CASCADE;

CREATE TABLE variation(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	name varchar(200) NOT NULL,
	note text,
	created_time timestamp
);

CREATE TABLE pattern(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	primary_variation_id int references variation(id),
	name varchar(200) UNIQUE NOT NULL,
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
	variation_id int references variation(id) ON DELETE CASCADE,
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
	id serial UNIQUE PRIMARY KEY NOT NULL,
	user_id int references system_user(id),
	contribution real
);

CREATE TABLE contribution(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	variation_id int references variation(id),
	creator_id int references pattern_creator(id),
	is_creator boolean NOT NULL
);

CREATE TABLE pattern_progress(
	id serial UNIQUE PRIMARY KEY NOT NULL,
	state_id int references state(id),
	user_id int references system_user(id),
	is_completed boolean,
	score real
);

ALTER TABLE variation 
	ADD COLUMN pattern_id int references pattern(id) ON DELETE CASCADE,
	ADD COLUMN start_state_id int references state(id),
	ADD COLUMN created_by_id int references pattern_creator(id);
