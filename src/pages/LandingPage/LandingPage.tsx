import { Link } from "react-router-dom";
import "./LandingPage.scss";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-logo">BrainCoins</div>
        <Link to="/login" className="nav-login-button">
          Login
        </Link>
      </nav>

      <main className="landing-main">
        <div className="hero-section">
          <h1>Welcome to BrainCoins</h1>
          <p className="hero-text">
            The ultimate platform for tracking and managing your educational
            cryptocurrency. Earn coins through learning, exchange with peers,
            and climb the leaderboard!
          </p>
          <Link to="/login" className="hero-button">
            Get Started
          </Link>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <h3>Multiple Currencies</h3>
            <p>
              Track various educational coins including MarkBucks, UmerCoins,
              and more!
            </p>
          </div>

          <div className="feature-card">
            <h3>Real-time Rankings</h3>
            <p>
              See where you stand among your peers with our live leaderboard.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure Wallet</h3>
            <p>
              Keep track of your earnings with our secure digital wallet system.
            </p>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2024 BrainCoins. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
