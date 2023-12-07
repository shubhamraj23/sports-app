-- create tables
create table if not exists mydb.sports
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    status boolean not null default true,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp
);

create table if not exists mydb.tours
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    sportId int not null,
    status boolean not null default true,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id)
);

create table if not exists mydb.matches
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    tourId int not null,
    status boolean not null default true,
    format varchar(50) not null,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (tourId) references tours(id)
);

-- Create indexes to improve query speed
CREATE INDEX tourName_index ON tours (name);
CREATE INDEX tourid_index_tours ON tours (id);
CREATE INDEX tourid_index_matches ON matches (tourId);

-- seed data
insert ignore into mydb.sports (id, name) values (1, 'Cricket');
insert ignore into mydb.sports (id, name) values (2, 'Football');

insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (1, 'Indian Premier League, 2023', 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (2, 'India Super League, 2023', 2, '2023-04-21 00:00:00', '2023-06-20 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (3, 'India Tour of West Indies, 2023', 1, '2023-06-10 00:00:00', '2023-06-29 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (4, 'English Premier League, 2022', 2, '2022-04-09 00:00:00', '2022-05-30 00:00:00');

insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('GT vs RCB', 1, 'T20', '2023-04-09 18:00:00', '2023-04-09 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('CSK vs MI', 1, 'T20', '2023-04-10 18:00:00', '2021-04-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('LSG vs KXIP', 1, 'T20', '2023-04-11 18:00:00', '2023-04-11 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('RR vs SRH', 1, 'T20', '2023-04-12 18:00:00', '2023-04-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('BLR vs BEN', 2, 'soccer', '2023-04-29 18:00:00', '2023-04-29 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('ATK vs MCFC', 2, 'soccer', '2023-04-21 18:00:00', '2023-04-21 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 2, 'soccer', '2023-04-22 18:00:00', '2023-04-22 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-10 10:00:00', '2023-06-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-12 10:00:00', '2023-06-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-14 10:00:00', '2023-06-14 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 4, 'soccer', '2022-04-09 18:00:00', '2022-04-09 23:00:00');


-- News Model
create table if not exists mydb.news
(
    id int auto_increment not null primary key,
    title varchar(50) not null,
    description varchar(200) not null,
    sportId int not null,
    tourId int not null,
    matchId int not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id),
    foreign key (tourId) references tours(id),
    foreign key (matchId) references matches(id)
);

-- Data for news model.
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 1', 'Description 1', 1, 1, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 2', 'Description 2', 1, 1, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 3', 'Description 3', 2, 2, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 4', 'Description 4', 2, 2, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 5', 'Description 5', 2, 2, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 6', 'Description 6', 1, 3, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 7', 'Description 7', 2, 4, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 8', 'Description 8', 2, 4, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 9', 'Description 9', 2, 4, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 10', 'Description 10', 1, 3, NULL);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 11', 'Description 11', NULL, 1, 1);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 12', 'Description 12', NULL, 1, 2);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 13', 'Description 13', NULL, 1, 3);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 14', 'Description 14', NULL, 1, 4);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 15', 'Description 15', NULL, 2, 5);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 16', 'Description 16', NULL, 2, 6);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 17', 'Description 17', NULL, 2, 7);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 18', 'Description 18', NULL, 3, 8);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 19', 'Description 19', NULL, 3, 9);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 20', 'Description 20', NULL, 3, 10);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('News 21', 'Description 21', NULL, 4, 11);