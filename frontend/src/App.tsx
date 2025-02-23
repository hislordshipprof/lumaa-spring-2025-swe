import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { TaskHome } from "./pages/TaskHome";
import { UserContextProvider } from "./components/context/UserContext";
import { TasksProvider } from "./components/context/TaskContext";
import { RoutesProtect } from "./utils/RoutesProtect";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<RoutesProtect />}>
            <Route
              path="/task-home"
              element={
                <TasksProvider>
                  <TaskHome />
                </TasksProvider>
              }
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
