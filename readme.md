# Easy Pay

Easy Pay is a digital wallet that enables individuals to make online transactions without using cash. It records information on users' cash inflow and outflow.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies](#technologies)
- [Packages Used](#packages-used)
- [Installation](#installation)

## Project Description
The front end of Easy Pay is designed to provide an intuitive user experience for both users and admin. Users can manage their accounts, perform transactions, and interact through quizzes, while admins can verify KYC and manage users.

## Features

### General
- User Registration and Login
- Profile Management

### User-Specific
- Load Balance from Mock Bank Account
- Transfer Balance
- Transaction History
- Quiz Game for User Interaction
- Apply for KYC

### Admin-Specific
- Verify KYC
- Delete Users

## Technologies
- HTML
- CSS (Tailwind)
- TypeScript

## Packages Used
- socket.io
- html2canvas
- jspdf
- yup

## Installation

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/ajay9803/EasyPay-Frontend
    ```
2. Navigate to the project directory:
    ```bash
    cd EasyPay-Frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start development server:
    ```bash
    npm run dev
    ```
