
-- PostgreSQL Database Schema for AI-NEXUS IDE

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'developer', 'project_manager'))
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES users(id),
    priority VARCHAR(10) CHECK (priority IN ('High', 'Medium', 'Low')),
    status VARCHAR(20) DEFAULT 'To Do',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE risks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    level VARCHAR(10) CHECK (level IN ('High', 'Medium', 'Low')),
    owner INTEGER REFERENCES users(id),
    mitigation_plan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
