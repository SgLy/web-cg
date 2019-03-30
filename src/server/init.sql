DROP DATABASE IF EXISTS web_cg;
CREATE DATABASE web_cg
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;
USE web_cg;
CREATE USER IF NOT EXISTS 'web_cg'@'%' IDENTIFIED BY '??WebCG123123??';
GRANT ALL PRIVILEGES ON web_cg.* TO 'web_cg'@'%';

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(16) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(256) NOT NULL,
    student_id VARCHAR(16) NOT NULL,
    nickname VARCHAR(256) NOT NULL,
    realname VARCHAR(256) NOT NULL,
    gender INT NOT NULL DEFAULT 0,
    UNIQUE INDEX (phone),
    UNIQUE INDEX (email)
);

CREATE TABLE course (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,
  teacher VARCHAR(32) NOT NULL
);

CREATE TABLE course_reg (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  UNIQUE INDEX (user_id, course_id)
);

CREATE TABLE course_ta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  UNIQUE INDEX (user_id, course_id)
);

CREATE TABLE assignment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  name VARCHAR(256) NOT NULL,
  deadline TIMESTAMP NOT NULL
);

CREATE TABLE submission (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  work_id INT NOT NULL,
  assignment_id INT NOT NULL,
  submit_time TIMESTAMP NOT NULL,
  UNIQUE INDEX (user_id, work_id, assignment_id)
);

CREATE TABLE work (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(256) NOT NULL,
  public BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE code (
  id INT PRIMARY KEY AUTO_INCREMENT,
  work_id INT NOT NULL,
  filename VARCHAR(256) NOT NULL,
  content TEXT,
  type VARCHAR(16) NOT NULL,
  UNIQUE INDEX (work_id, filename)
);
