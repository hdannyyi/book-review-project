create database bookreviewapp;

create table books (
    id serial primary key,
    name varchar(200),
    author varchar(200),
    genre varchar(200)
);

create table users (
    id serial primary key,
    first_name varchar(200),
    last_name varchar(200),
    email varchar(200),
    password varchar(500)
);

create table reviews (
    id serial primary key,
    score integer,
    content varchar(500),
    book_id integer references books(id),
    user_id integer references users(id)
);