# Aagaz Backend API

This is the backend API for the Aagaz Career Guidance Platform, providing quiz functionality, career recommendations, and college information.

## Features

- **Quiz System**: Dynamic career assessment quizzes for different education levels (10th, 12th, Undergraduate)
- **Career Matching**: AI-powered career recommendation algorithm based on quiz responses
- **College Database**: Comprehensive database of colleges in Jammu & Kashmir and across India
- **Personalized Recommendations**: Tailored career suggestions based on user profile and interests
- **RESTful API**: Clean, well-documented API endpoints

## API Endpoints

### Quiz
- `GET /api/quiz/:grade` - Get quiz questions for specific grade (10thq, 12thq, ugq)
- `POST /api/quiz/submit` - Submit quiz answers and get career recommendations

### Careers
- `GET /api/careers/clusters` - Get all career clusters
- `GET /api/careers/search` - Search careers with filters
- `GET /api/careers/cluster/:clusterName` - Get careers by cluster
- `GET /api/careers/:careerCode` - Get specific career details

### Colleges
- `GET /api/colleges` - Get all colleges
- `GET /api/colleges/search` - Search colleges with filters
- `GET /api/colleges/type/:type` - Get colleges by type (JK, National)
- `GET /api/colleges/:collegeName` - Get specific college details

### Recommendations
- `POST /api/recommendations/personalized` - Get personalized career recommendations
- `GET /api/recommendations/trending` - Get trending careers

### User
- `POST /api/user/quiz-results` - Save user quiz results
- `GET /api/user/:userId/quiz-history` - Get user quiz history
- `POST /api/user/preferences` - Save user preferences
- `GET /api/user/:userId/preferences` - Get user preferences
- `GET /api/user/:userId/dashboard` - Get user dashboard data

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp config.env .env
# Edit .env with your configuration
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Data Structure

The backend uses JSON files for data storage:
- `data/10thq.json` - 10th grade quiz questions
- `data/12thq.json` - 12th grade quiz questions  
- `data/ugq.json` - Undergraduate quiz questions
- `data/taxonomy.json` - Career taxonomy with occupations, skills, and colleges

## Career Matching Algorithm

The system uses a sophisticated matching algorithm that considers:
- User interests and values
- Skills and competencies
- Education level compatibility
- Location preferences (J&K focus)
- Career goals and aspirations

Scores are calculated based on:
- Cluster matches (3x weight)
- Value alignment (2x weight)
- Skill compatibility (1.5x weight)
- Exam requirements (2x weight)

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **JSON** - Data storage format

## Development

The backend is designed to work with the React frontend. Make sure to:
1. Start the backend server on port 5000
2. Configure CORS to allow requests from the frontend (default: http://localhost:5173)
3. Ensure all data files are present in the `data/` directory

## API Response Format

All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```
