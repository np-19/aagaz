# Agaaz - Career Guidance Platform

A comprehensive career guidance platform designed specifically for students in Jammu & Kashmir, featuring AI-powered career assessments, personalized recommendations, and college information.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication**: Secure user authentication with Clerk
- **Interactive Quiz**: Dynamic career assessment for different education levels
- **Career Explorer**: Comprehensive database of career paths and opportunities
- **College Database**: Detailed information about colleges in J&K and across India
- **Personalized Recommendations**: AI-powered career suggestions based on user profile
- **Dashboard**: User-friendly dashboard with progress tracking

### Backend (Node.js + Express)
- **RESTful API**: Clean, well-documented API endpoints
- **Quiz System**: Dynamic quiz generation for 10th, 12th, and undergraduate levels
- **Career Matching Algorithm**: Sophisticated algorithm for career recommendations
- **College Database**: Comprehensive college information system
- **User Management**: Quiz history and preference tracking

## 🏗️ Project Structure

```
agaaz/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── layout/      # Layout components (Navbar, Sidebar)
│   │   │   ├── sections/    # Main page components
│   │   │   └── ui/          # Reusable UI components
│   │   ├── utils/           # Utility functions and API calls
│   │   └── styles/          # Global styles
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   └── server.js        # Main server file
│   ├── data/                # JSON data files
│   └── package.json
└── data/                    # Shared data files
    ├── 10thq.json          # 10th grade quiz questions
    ├── 12thq.json          # 12th grade quiz questions
    ├── ugq.json            # Undergraduate quiz questions
    └── taxonomy.json       # Career taxonomy database
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd agaaz
```

### 2. Start the Backend
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Quiz Endpoints
- `GET /api/quiz/:grade` - Get quiz questions
- `POST /api/quiz/submit` - Submit quiz answers

### Career Endpoints
- `GET /api/careers/clusters` - Get career clusters
- `GET /api/careers/search` - Search careers
- `GET /api/careers/:careerCode` - Get career details

### College Endpoints
- `GET /api/colleges` - Get all colleges
- `GET /api/colleges/search` - Search colleges
- `GET /api/colleges/:collegeName` - Get college details

### Recommendation Endpoints
- `POST /api/recommendations/personalized` - Get personalized recommendations
- `GET /api/recommendations/trending` - Get trending careers

## 🎯 Key Features Explained

### 1. Dynamic Quiz System
- **Multi-level Assessment**: Different quizzes for 10th, 12th, and undergraduate students
- **Smart Questioning**: Questions adapt based on previous answers
- **Comprehensive Coverage**: Covers interests, skills, values, and career goals

### 2. Career Matching Algorithm
- **Multi-factor Analysis**: Considers interests, skills, values, and education level
- **J&K Focus**: Prioritizes local opportunities and colleges
- **Scoring System**: Weighted scoring for accurate recommendations

### 3. College Database
- **J&K Colleges**: Comprehensive list of colleges in Jammu & Kashmir
- **National Colleges**: Top colleges across India
- **Program Information**: Detailed program and admission requirements

### 4. Personalized Recommendations
- **AI-Powered**: Uses advanced algorithms for career matching
- **Insights**: Provides detailed insights and suggestions
- **Progress Tracking**: Tracks user progress and preferences

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📊 Data Structure

### Quiz Data
- **10th Grade**: Basic career exploration questions
- **12th Grade**: Stream-specific career guidance
- **Undergraduate**: Specialization and advanced career planning

### Career Taxonomy
- **Clusters**: Major career categories (Engineering, Healthcare, etc.)
- **Groups**: Subcategories within each cluster
- **Occupations**: Specific job roles with detailed information
- **Skills**: Required skills and competencies
- **Education Paths**: Academic requirements and progression
- **Colleges**: Associated educational institutions

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Dark/Light Theme**: User preference support
- **Smooth Animations**: Engaging user experience
- **Accessibility**: WCAG compliant design
- **Modern Typography**: Clean, readable fonts
- **Interactive Elements**: Hover effects and transitions

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

## 📈 Future Enhancements

- [ ] User accounts and profile management
- [ ] Advanced analytics and reporting
- [ ] Integration with job portals
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI recommendations
- [ ] Social features and community
- [ ] Integration with educational institutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data sources and career information
- Open source libraries and frameworks
- Community contributors and testers

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Agaaz** - Empowering students to make informed career decisions and build successful futures! 🚀
