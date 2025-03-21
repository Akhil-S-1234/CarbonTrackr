# CarbonTrackr

## Overview
**CarbonTrackr** is a minimal proof-of-concept web application that helps users track and offset their carbon footprint using AI-generated recommendations. The application calculates travel-related carbon emissions and provides actionable insights to reduce environmental impact.

## Features
### 1. Carbon Footprint Calculator
- Users input basic travel details to estimate their carbon footprint.
- AI-based calculations for carbon emission estimation.
- Simple numerical display of results.

### 2. AI Integration (Gemini AI)
- AI-generated recommendations for reducing carbon footprint.
- Suggestions displayed dynamically based on user inputs.
- Data persistence using **Zustand** (local storage).

### 3. Backend Services
- RESTful API with **Node.js & Express**.
- AI service integration for recommendation generation.
- Handles data storage and retrieval efficiently.

## Tech Stack
### Frontend:
- **React (Vite)** for fast, lightweight development.
- **ShadCN** for minimal UI components.
- **Zustand** for state management.
- **TypeScript** for type safety and maintainability.

### Backend:
- **Node.js & Express** for REST API.
- **Gemini AI** for intelligent recommendations.

### Deployment:
- **Frontend:** Hosted on Vercel
- **Backend:** Hosted on a free-tier cloud service

## Setup Instructions
### Prerequisites:
Ensure you have the following installed:
- Node.js & npm
- Git
- Vite CLI

### Clone the Repository
```sh
git clone https://github.com/Akhil-S-1234/CarbonTrackr
cd CarbonTrackr
```

### Install Dependencies
#### Frontend
```sh
cd frontend
npm install
npm run dev
```

#### Backend
```sh
cd backend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend directory with the following:
```
AI_API_KEY=your_gemini_api_key
```

## Live Demo
[Deployed Application](https://carbon-trackr-topaz.vercel.app/)

## Contributing
Feel free to fork and contribute! Open issues and PRs are welcome.

## License
MIT License

