CREATE TABLE accounts (
id SERIAL PRIMARY KEY,
name VARCHAR(30) NOT NULl,
email VARCHAR(100) NOT NULL unique,
password Text,
age VARCHAR(3),
aadhaar VARCHAR(12) unique NOT NULL,
fathername VARCHAR(30),
mobilenumber VARCHAR(10),
address VARCHAR(100),
gender VARCHAR(10),
voterid INTEGER
);

CREATE TABLE NEWS(
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
description VARCHAR(1000) NOT NULL,
)