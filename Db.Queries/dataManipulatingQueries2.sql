ALTER TABLE state
	ADD COLUMN height real,
	ADD COLUMN width real;

select * from pattern
select * from state where variation_id = 5

UPDATE state SET
	position_x = 750,
	position_y = 250,
	width = 160,
	height = 100
WHERE id = 9;
select * from state where variation_id = 4 order by id asc;

update state set (name) = ('State 2') where id = 2

select * from variation where id = 4

select * from transition

SELECT t.*, s.variation_id FROM transition AS t JOIN state AS s ON s.id = t.state_from_id WHERE s.variation_id = 5

insert into state(name, description, variation_id) values('State 2', 'End', 5) returning id;
insert into transition(name, description, state_from_id) values('Continue', 'Continue', 13);
delete from state where id = 14

update state set name='State 1 up1', description='Begin', position_x=200, position_y=200, width=160, height=100 where id=13;
update variation set start_state_id=13 where id=5

alter table transition
drop constraint transition_state_from_id_fkey,
add constraint transition_state_from_id_fkey
   foreign key (state_from_id)
   references state(id)
   on delete cascade;

alter table transition
drop constraint transition_state_to_id_fkey,
add constraint transition_state_to_id_fkey
   foreign key (state_to_id)
   references state(id)
   on delete cascade;