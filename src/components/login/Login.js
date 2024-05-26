import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useAuth } from "../../providers/AuthProvider";
import logo from ".././../assets/loginheader.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useAuth();
  useEffect(() => {
    if (isLogin) return navigate("/");
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    usernameInput: false,
    passwordInput: false,
    userValidate: false,
    userExist: false,
  });
  const [isFocus, setIsFocus] = useState({
    username: false,
    password: false,
  });
  // const history = useHistory(); replaced by useNavigate
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name) {
      usernameRef.current.focus();
      usernameRef.current.style.border = "1px solid red";
    } else if (!password) {
      passwordRef.current.focus();
      usernameRef.current.style.border = "1px solid red";
    } else {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users?.find((user) => {
        if (user.email === name) {
          return user;
        }
      });
      if (!user) {
        setIsError((prev) => {
          return {
            ...prev,
            userExist: true,
          };
        });
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLogin("true");
        navigate("/");
      }
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-inner-container">
        <div className="login-header">
          <div className="login-logo-image-wrapper">
            <img src={logo} alt="login-logo-image" />
          </div>
          <div className="login-title">
            <div className="login-hr"></div>
            <div>
              <h2>Login</h2>
            </div>
            <div className="login-hr"></div>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="wrapper">
            <label
              className={`login-username-label ${
                isFocus.username && "active-input"
              }`}
              for="username"
            >
              Username/email:
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              onChange={(e) => {
                if (!e.target.value) {
                  usernameRef.current.style.border = "1px solid red";
                } else {
                  usernameRef.current.style.border = "1px solid #cacaca";
                }
                setName(e.target.value);
              }}
              onFocus={() => {
                setIsFocus((prev) => {
                  return {
                    ...prev,
                    username: true,
                  };
                });
              }}
              onBlur={() => {
                if (!name) {
                  setIsFocus((prev) => {
                    return {
                      ...prev,
                      username: false,
                    };
                  });
                }
              }}
            />
          </div>
          <div className="wrapper">
            <label
              className={`login-password-label ${
                isFocus.password && "active-input"
              }`}
              for="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              onChange={(e) => {
                if (!e.target.value) {
                  passwordRef.current.style.border = "1px solid red";
                } else {
                  passwordRef.current.style.border = "1px solid #cacaca";
                }
                setPassword(e.target.value);
              }}
              onFocus={() => {
                setIsFocus((prev) => {
                  return {
                    ...prev,
                    password: true,
                  };
                });
              }}
              onBlur={() => {
                if (!password) {
                  setIsFocus((prev) => {
                    return {
                      ...prev,
                      password: false,
                    };
                  });
                }
              }}
            />
          </div>
          <p style={{ color: "red", margin: "0", padding: "0" }}>
            {isError.userExist && "User id or email is invalid"}
          </p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
