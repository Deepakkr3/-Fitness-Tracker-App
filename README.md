# 🏋️‍♂️ Fitness Tracker App

This is a microservices-based **Fitness Tracker Application** designed to help users monitor their fitness goals, receive AI-generated recommendations, and manage their activities efficiently. The system is built using a polyglot architecture with **Java Spring Boot** and **Node.js (Express with TypeScript)** and includes integration with **Gemini AI**, **RabbitMQ**, and **Keycloak** for advanced functionality.

---

## 🚀 Features

- Microservice-based architecture
- AI-powered recommendations using Gemini API
- OAuth2 authentication and centralized security with Keycloak
- Service discovery with Eureka Server
- Centralized configuration management with Spring Cloud Config
- Email notifications using Nodemailer
- MongoDB and MySQL data storage
- RabbitMQ for asynchronous communication
- Feign Client for inter-service communication

---

## 🧱 Microservices Overview

### 1. 🧭 Eureka Server
- **Purpose**: Service discovery and registration
- **Tech Stack**: Java, Spring Cloud Eureka

### 2. 🤖 AI Microservice
- **Purpose**: Provides AI-generated fitness recommendations based on user concerns
- **Tech Stack**: Node.js, Express, TypeScript
- **Integration**: Gemini API

### 3. 🏃 Activity Microservice
- **Purpose**: Stores AI recommendations and user activity logs
- **Tech Stack**: Java, Spring Boot, MongoDB

### 4. 🚪 API Gateway
- **Purpose**: Centralized entry point for all microservices
- **Responsibilities**:
  - Handles routing and security
  - Integrates OAuth2 with Keycloak for authentication and authorization
- **Tech Stack**: Java, Spring Boot, Spring Cloud Gateway

### 5. ⚙️ Config Service
- **Purpose**: Centralized configuration for all Spring Boot applications
- **Tech Stack**: Java, Spring Boot, Spring Cloud Config Server

### 6. 📧 Email Service
- **Purpose**: Sends email notifications to users
- **Tech Stack**: Node.js, Express, TypeScript, Nodemailer

---

## 🔄 Communication Between Services

- **RabbitMQ (Pub/Sub)**: Used for asynchronous event-driven communication between services (e.g., sending email after an activity is recorded).
- **Feign Client (Sync Communication)**: Used for reactive HTTP-based service-to-service communication (mainly between Spring Boot services).

---

## 🛢️ Databases Used

| Service             | Database | Type     |
|---------------------|----------|----------|
| Activity Service     | MongoDB  | NoSQL    |
| AI & Auth Services   | MySQL    | Relational |

---

## 🔐 Security

- **Authentication & Authorization**: Implemented using **Keycloak** with OAuth2.
- **Gateway-Level Security**: All endpoints are secured via API Gateway using Spring Security.

---

## 📦 Tech Stack

| Category              | Technologies                               |
|-----------------------|--------------------------------------------|
| Languages             | Java, TypeScript, JavaScript               |
| Frameworks            | Spring Boot, Express.js                    |
| Service Discovery     | Eureka Server                              |
| API Gateway           | Spring Cloud Gateway                       |
| Messaging Queue       | RabbitMQ                                   |
| Security              | OAuth2, Keycloak, Spring Security          |
| Configuration         | Spring Cloud Config                        |
| Databases             | MongoDB, MySQL                             |
| Communication         | Feign Client, RabbitMQ                     |
| Email                 | Nodemailer                                 |
| AI Integration        | Gemini API                                 |

---

## 📂 Project Structure

