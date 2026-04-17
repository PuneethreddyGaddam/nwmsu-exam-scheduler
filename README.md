# NWMSU Exam Scheduler

This project is a comprehensive exam scheduler designed for Northwest Missouri State University (NWMSU), benefitting thousands of Bearcats. It utilizes a PostgreSQL database to store all exam-related information, a Node.js (Express) application to create a RESTful API for the backend, and a ReactJS frontend for intuitive user interaction.

## [Visit The Site](https://examscheduler-five.vercel.app/)
Feel free to check out the live project here!

![NWMSU Exam Scheduler Banner](./public/image.png)

## Features
- **PostgreSQL Database**: Stores detailed information about exams, including semesters, meeting days, class times, exam dates, and seat locations.
- **Node.js (Express) Backend**: Provides a robust RESTful API to manage exam data efficiently. The backend is hosted on Render.
- **ReactJS Frontend (Vite)**: A user-friendly interface for searching, adding, and exporting exam schedules. The frontend is hosted on Vercel.

## Prerequisites
Before running this project locally, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- PostgreSQL database
- IDE (VS Code, IntelliJ IDEA, etc.)

## Installation

### Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Configure the `.env` file with your PostgreSQL database credentials (`DATABASE_URL`).
4. Run `npm run seed` to initialize and seed the database with current exam schedules.
5. Run `npm run dev` to start the backend with automatic restarts.

### Frontend Setup
1. Stay in (or return to) the root directory.
2. Run `npm install` to install the necessary dependencies.
3. Update the API URL in your environment configuration to point to your backend.
4. Run `npm run dev` to start the React application.

## Usage
- Access the frontend application via `http://localhost:5173` (default Vite port).
- Use the Search page to find your classes based on your current schedule.
- Add exams to your list and use the Calendar page to export them to your personal calendar.

## Contributing
Contributions are welcome! If you'd like to enhance this project or report issues, please submit a pull request or open an issue.
