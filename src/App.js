import { Routes, Route } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies/Movies";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import CompanayInfo from "./components/companyInfo/CompanyInfo";
import { AuthProvider } from "./providers/AuthProvider";
import Nav from "./components/nav/Nav";
import AuthNavigator from "./navigator/AuthNavigator";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <AuthNavigator>
                <Movies />
              </AuthNavigator>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/company-info" element={<CompanayInfo />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
