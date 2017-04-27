INSERT INTO pattern(name, patlet, is_published) VALUES('Test pattern 1', 'Test paltet 1', False) RETURNING id

INSERT INTO variation(name, pattern_id) VALUES('Initial variation', 6) RETURNING id

UPDATE pattern SET primary_variation_id = 6 WHERE id = 6

SELECT p.id as pattern_pk_id, v.id as variation_pk_id, p.name as pattern_name, v.name as variation_name, * FROM pattern as p join variation as v ON p.primary_variation_id = v.id

select * from pattern

insert into state(name, description, variation_id) values('Introduction', 'After one of those meetings in which new functionality is being agreed upon, you find yourself carrying out the analysis of the prerequisites to extend the existing architecture. The architecture has to accommodate the new functionality. 
To meet the requirements, you decide to study several versions of the frameworks used in implementation. At the same time, your mind starts shaping a vision of the architecture. 
You document your findings and the vision in the architecture document double checking its consistency. Having finished, you introduce the new architecture to developers.', 4) returning id

update variation set start_state_id = 1

select * from state where id = 2

insert into transition(state_from_id, name, description) values(1, 'Continue', 'Continue')
insert into transition(state_from_id, name, description) values(1, 'Continue 2', 'Continue 2')

select * from state as s left outer join transition as t on s.id = t.state_from_id where s.id = 1 group by s.id, t.id

select * from transition where state_from_id = 1

update state set description = 'You and developers start to implement according to the architecture document.  However, you notice some problems. You are unable to keep the implementation aligned with the architecture.' where id = 2

delete from transition where id = 2

update pattern set name = 'Architect also implements', patlet='If an architect is on an ivory tower, they are out of touch; yet someone needs to take the big and long view and reconcile it with practice. Therefore: the architect is materially involved in day-to-day implementation.' where id = 4

update pattern set name = 'Developing in pairs', patlet='If you want to improve the effectiveness of individual developers, Then: have people develop in pairs.', is_published = false where id = 5

update pattern set rating = 3 where id = 6


insert into state(name, description, variation_id) values('State 9', $$Developers do their best to solve the problems, but it may be counterproductive if developers create a solution that overrides the architecture document without reflecting this in the architecture document. Being indolent to technical details will cause you to hardly be able solve similar situations in future. Consequently, you are losing the insight into the implementation restrictions. $$, 4) returning id

insert into transition(state_from_id, state_to_id, name, description) values(7, 9, 'T11 Override the architecture document and leave the implementation to the developer', 'propose a solution overriding the architecture document and leave the implementation to the developer.')

select * from transition












