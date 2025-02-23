import { useState } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../../utils/api";
import styles from "./Auth.module.css";

interface ValidationErrors {
  username?: string;
  password?: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await authApi.login({
        username: formData.username,
        password: formData.password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/task-home");
      } else {
        setApiError("Invalid response from server");
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {apiError && <div className={styles.error}>{apiError}</div>}
      
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? styles.inputError : ""}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : undefined}
        />
        {errors.username && (
          <span className={styles.errorMessage} id="username-error">
            {errors.username}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? styles.inputError : ""}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <span className={styles.errorMessage} id="password-error">
            {errors.password}
          </span>
        )}
        <div className={styles.passwordOptions}>
          <label className={styles.rememberMe}>
            <input type="checkbox" /> Remember Password
          </label>
          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </div>
      </div>

      <button 
        type="submit" 
        className={styles.loginButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "LOGGING IN..." : "LOGIN"}
      </button>

      <p className={styles.signupText}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
}; 