# Aagaz - Career Guidance Platform (Frontend)

A modern React application for career guidance and educational recommendations, built with Vite and integrated with Clerk authentication.

## Features

- **Authentication**: Secure user authentication with Clerk
- **Beautiful UI**: Modern split-screen authentication pages with professional design
- **Career Guidance**: Comprehensive career exploration and recommendations
- **College Search**: Extensive college database with filtering options
- **Interactive Quizzes**: Career aptitude and personality assessments
- **Personalized Dashboard**: User-specific recommendations and progress tracking
- **Responsive Design**: Mobile-first approach with beautiful animations

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Clerk** - Authentication and user management
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom styling with modern CSS features

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aagaz/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file and add your Clerk keys
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Authentication Setup

This project uses Clerk for authentication. To set up:

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key to the `.env` file
4. Configure your sign-in/sign-up preferences in the Clerk dashboard

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Sidebar)
│   └── sections/       # Page components
├── styles/             # Global styles
└── App.jsx            # Main application component
```

## Key Components

### Authentication Pages
- **SignIn**: Beautiful split-screen sign-in page
- **SignUp**: Professional sign-up interface
- **ProtectedRoute**: HOC for route protection

### Layout Components
- **MainLayout**: Main application layout with navbar and sidebar
- **Navbar**: Navigation with user authentication status
- **Landing**: Marketing landing page

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Implemented

### Authentication Flow
- Sign up with email/password
- Sign in with email/password
- User profile management
- Sign out functionality
- Route protection
- Redirect after authentication

### UI/UX
- Loading states during authentication
- Responsive design
- Consistent styling with app theme
- User avatar in navigation
- Dynamic navigation based on auth status
- Beautiful split-screen authentication pages

### Security Features
- Environment variable protection for API keys
- Client-side route protection
- Automatic token management
- Secure sign-out with redirect

## API Integration

The frontend is designed to work with the Aagaz backend API for:
- User profile management
- Career recommendations
- College data
- Quiz functionality
- Dashboard analytics

## Deployment

The application can be deployed to various platforms:
- Vercel (recommended for Vite apps)
- Netlify
- GitHub Pages
- Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
