import { SignIn } from '@clerk/clerk-react';
import './AuthPages.css';

export default function SignInPage() {
  return (
    <div className="auth-container">
      {/* Left Side - Authentication Form */}
      <div className="auth-left">
        <div className="auth-content">
          <div className="auth-logo">
            <img 
              src="/logo.png" 
              alt="Aagaz Logo" 
              className="logo-image"
            />
          </div>
          
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back to Aagaz</h1>
            <p className="auth-subtitle">
              Continue your career journey with personalized guidance and insights.
            </p>
          </div>

          <div className="clerk-container">
            <SignIn 
              routing="path" 
              path="/sign-in" 
              signUpUrl="/sign-up"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "auth-social-button",
                  formButtonPrimary: "auth-primary-button",
                  footerActionLink: "auth-link"
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Side - Visual Content */}
      <div className="auth-right">
        <div className="visual-content">
          <div className="profile-grid">
            <div className="profile-card profile-1">
              <div className="profile-avatar">👨🏾‍💼</div>
            </div>
            <div className="profile-card profile-2">
              <div className="profile-avatar">👩🏻‍💻</div>
            </div>
            <div className="profile-card profile-3">
              <div className="profile-avatar">👨🏻‍🎓</div>
            </div>
            <div className="profile-card profile-4">
              <div className="profile-avatar">👩🏽‍🔬</div>
            </div>
            <div className="profile-card profile-5">
              <div className="profile-avatar">👨🏻‍⚕️</div>
            </div>
            <div className="profile-card profile-6">
              <div className="profile-avatar">👩🏾‍🏫</div>
            </div>
            <div className="profile-card profile-7">
              <div className="profile-avatar">👨🏽‍💼</div>
            </div>
            <div className="profile-card profile-8">
              <div className="profile-avatar">👩🏻‍🎨</div>
            </div>
          </div>
          
          <div className="visual-text">
            <h2 className="visual-title">Gain Real Experience.</h2>
            <h2 className="visual-title">Build Essential Skills.</h2>
            <h2 className="visual-title">Drive Your Career Forward.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
