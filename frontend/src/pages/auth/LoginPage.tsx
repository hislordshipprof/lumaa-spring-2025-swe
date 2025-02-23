import { LoginForm } from "../../components/auth/LoginForm";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}; 