import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { useAuth } from "../../providers/AuthProvider";
import logo from ".././../assets/loginheader.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) return navigate("/");
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [profession, setProfession] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isError, setIsError] = useState({
    usernameInput: false,
    passwordInput: false,
    userExist: false,
  });
  const [isFocus, setIsFocus] = useState({
    username: false,
    password: false,
    reEnterPassword: false,
    email: false,
    phoneNumber: false,
  });
  // const history = useHistory(); replaced by useNavigate
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const reEnterPasswordRef = useRef();
  const phoneNumberRef = useRef();
  const professionRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name) {
      usernameRef.current.focus();
      usernameRef.current.style.border = "1px solid red";
    } else if (!password) {
      passwordRef.current.focus();
      usernameRef.current.style.border = "1px solid red";
    } else if (!reEnterPassword) {
      reEnterPasswordRef.current.focus();
      reEnterPasswordRef.current.style.border = "1px solid red";
    } else if (password !== reEnterPassword) {
      passwordRef.current.focus();
      passwordRef.current.style.border = "1px solid red";
      reEnterPasswordRef.current.style.border = "1px solid red";
    } else if (!email || !/\S+@\S+\.\S+/.test(email)) {
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
    } else if (!phoneNumber || phoneNumber?.length < 10) {
      phoneNumberRef.current.focus();
      phoneNumberRef.current.style.border = "1px solid red";
    } else if (!profession) {
      professionRef.current.focus();
      professionRef.current.style.border = "1px solid red";
      professionRef.current.style.outline = "1px solid red";
    } else {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users?.find((user) => {
        if (user.email === email) {
          return user;
        }
      });
      if (!user) {
        const newUser = {
          name: name,
          password: password,
          email: email,
          phone: phoneNumber,
          profession: profession,
        };
        if (users) {
          const newUsers = JSON.stringify([...users, newUser]);
          localStorage.setItem("users", newUsers);
        } else {
          const newUsers = JSON.stringify([newUser]);
          localStorage.setItem("users", newUsers);
        }
        sessionStorage.setItem("user", JSON.stringify(newUser));
        setIsLogin("true");
        navigate("/");
      } else {
        setIsError((prev) => {
          return {
            ...prev,
            userExist: true,
          };
        });
      }
      // if (user && user.name === name && user.password === password) {
      //   setIsLogin(true);
      //   // history.push('/movies');
      // } else {
      //   alert("Invalid Credentials");
      // }
    }
  };

  return (
    <div className="signup-outer-container">
      <div className="signup-inner-container">
        <div className="signup-header">
          <div className="signup-logo-image-wrapper">
            <img src={logo} alt="signup-logo-image" />
          </div>
          <div className="signup-title">
            <div className="signup-hr"></div>
            <div>
              <h2>Signup</h2>
            </div>
            <div className="signup-hr"></div>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="wrapper">
            <label
              className={`signup-username-label ${
                isFocus.username && "active-input"
              }`}
              for="username"
            >
              Name:
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
              className={`signup-password-label ${
                isFocus.password && "active-input"
              }`}
              for="password"
            >
              Password:
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
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
            <p
              className="singup-show-hide"
              onClick={() => {
                setIsShowPassword((prev) => !prev);
              }}
            >
              {isShowPassword ? "Hide" : "Show"}
            </p>
          </div>
          <div className="wrapper">
            <label
              className={`signup-re-enter-password-label ${
                isFocus.reEnterPassword && "active-input"
              }`}
              for="reEnterPassword"
            >
              Re-enter password:
            </label>
            <input
              type="password"
              id="reEnterPassword"
              ref={reEnterPasswordRef}
              onChange={(e) => {
                if (!e.target.value) {
                  reEnterPasswordRef.current.style.border = "1px solid red";
                } else {
                  reEnterPasswordRef.current.style.border = "1px solid #cacaca";
                }
                setReEnterPassword(e.target.value);
              }}
              onFocus={() => {
                setIsFocus((prev) => {
                  return {
                    ...prev,
                    reEnterPassword: true,
                  };
                });
              }}
              onBlur={() => {
                if (!reEnterPassword) {
                  setIsFocus((prev) => {
                    return {
                      ...prev,
                      reEnterPassword: false,
                    };
                  });
                }
              }}
            />
          </div>
          <div className="wrapper">
            <label
              className={`signup-email-label ${
                isFocus.email && "active-input"
              }`}
              for="email"
            >
              E-mail:
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              onChange={(e) => {
                if (!e.target.value) {
                  emailRef.current.style.border = "1px solid red";
                } else {
                  emailRef.current.style.border = "1px solid #cacaca";
                }
                setEmail(e.target.value);
              }}
              onFocus={() => {
                setIsFocus((prev) => {
                  return {
                    ...prev,
                    email: true,
                  };
                });
              }}
              onBlur={() => {
                if (!email) {
                  setIsFocus((prev) => {
                    return {
                      ...prev,
                      email: false,
                    };
                  });
                }
              }}
            />
          </div>
          <div className="wrapper">
            <label
              className={`signup-phone-label ${
                isFocus.phoneNumber && "active-input"
              }`}
              for="phone"
            >
              Phone:
            </label>
            <input
              type="number"
              id="phone"
              value={phoneNumber}
              ref={phoneNumberRef}
              onChange={(e) => {
                if (!e.target.value) {
                  phoneNumberRef.current.style.border = "1px solid red";
                } else {
                  phoneNumberRef.current.style.border = "1px solid #cacaca";
                }
                if (e.target.value?.length <= 10) {
                  setPhoneNumber(e.target.value);
                }
              }}
              onFocus={() => {
                setIsFocus((prev) => {
                  return {
                    ...prev,
                    phoneNumber: true,
                  };
                });
              }}
              onBlur={() => {
                if (!phoneNumber) {
                  setIsFocus((prev) => {
                    return {
                      ...prev,
                      phoneNumber: false,
                    };
                  });
                }
              }}
            />
          </div>
          <div className="wrapper signup-profession-container-style">
            <label className="signup-profession-label" for="prefession">
              Profession:{" "}
            </label>{" "}
            <select
              className="signup-profession-select"
              id="prefession"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              ref={professionRef}
            >
              <option value="">Select Profession</option>
              <option value="student">Students</option>
              <option value="engineer">Engineer</option>
              <option value="doctor">Doctor</option>
              <option value="others">others</option>
            </select>
          </div>
          <p style={{ color: "red", margin: "0", padding: "0" }}>
            {isError.userExist && "User already exist"}
          </p>
          <button className="signup-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
