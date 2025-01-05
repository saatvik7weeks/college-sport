CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- States table
CREATE TABLE IF NOT EXISTS states (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    state_id INT,
    FOREIGN KEY (state_id) REFERENCES states(id)
);

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    score INT CHECK (score >= 1 AND score <= 1000),
    city_id INT,
    state_id INT,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (state_id) REFERENCES states(id)
);

-- College Placement table
CREATE TABLE IF NOT EXISTS college_placement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    college_id INT,
    year INT NOT NULL,
    highest_placement DECIMAL(12,2),
    average_placement DECIMAL(12,2),
    median_placement DECIMAL(12,2),
    placement_rate DECIMAL(5,2),
    FOREIGN KEY (college_id) REFERENCES colleges(id)
);

-- College Wise Course table
CREATE TABLE IF NOT EXISTS college_wise_course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    college_id INT,
    course_name VARCHAR(255) NOT NULL,
    course_duration INT NOT NULL,
    course_fee DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(id)
); 