import { useNavigate } from "react-router";
import Styles from "../App.module.css"

export const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className={Styles.navbar}>
      <div className={Styles.navContent}>
        <div className={Styles.navLeft}>
          <div className={Styles.logoContainer}>
            <span className={Styles.logoEmoji}>📝</span>
            <h1 className={Styles.navLogo}>TaskFlow</h1>
          </div>
          <div className={Styles.navLinks}>
            <a href="#dashboard" className={Styles.navLink}>Dashboard</a>
            <a href="#tasks" className={Styles.navLink}>My Tasks</a>
          </div>
        </div>
        
        <div className={Styles.navRight}>
          <div className={Styles.userProfile}>
            <div className={Styles.avatarCircle}>
              {username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className={Styles.userGreeting}>
              Welcome back, <strong>{username || 'User'}</strong>
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className={Styles.logoutButton}
          >
            <span className={Styles.buttonText}>Logout</span>
            <span className={Styles.buttonIcon}>→</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
