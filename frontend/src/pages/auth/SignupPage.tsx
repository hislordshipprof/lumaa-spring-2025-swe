import { SignupForm } from "../../components/auth/SignupForm";
import styles from "./LoginPage.module.css"; // We can reuse the same styles

export const SignupPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Create Account</h1>
        <SignupForm />
      </div>
    </div>
  );
}; 