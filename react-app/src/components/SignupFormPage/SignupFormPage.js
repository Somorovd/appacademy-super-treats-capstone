import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp, validateEmail, validatePhone } from "../../store/session";
import "./SignupForm.css";

export default function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({ fail: [] });
  const [errors, setErrors] = useState({});

  if (sessionUser) history.push("/");

  const submitEmail = async (e) => {
    e.preventDefault();
    const res = await dispatch(validateEmail(email));
    if (res.errors) setErrors(res.errors);
  };

  const submitPhone = async (e) => {
    e.preventDefault();
    const res = await dispatch(validatePhone(phone));
    if (res.errors) setErrors(res.errors);
  };

  const submitPassword = (e) => {
    e.preventDefault();
    const passwordStatus = { pass: [], fail: [] };

    passwordStatus[password.length >= 8 ? "pass" : "fail"].push(
      "Password is at least 8 characters"
    );
    passwordStatus[password.match(/[a-zA-Z]/) ? "pass" : "fail"].push(
      "Password contains a letter"
    );
    passwordStatus[password.match(/\d/) ? "pass" : "fail"].push(
      "Password contains a number"
    );

    setPasswordStatus(passwordStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      phone,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    const res = await dispatch(signUp(user));
    if (res.errors) setErrors(res.errors);
    else history.push("/");
  };

  const validateMaxLength = (field, val, len, setter) => {
    const error = val.length > len ? "Max length reached" : "";
    setErrors((errors) => ({ ...errors, [`${field}`]: error }));

    if (error) return;
    else setter(val);
  };

  return (
    <div className="signup-page fh">
      <h1>Sign Up</h1>
      <div className="signup-content flex flex-11 fh">
        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <section className="signup-form__section">
            <h2>What is your email address?</h2>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                validateMaxLength("email", e.target.value, 255, setEmail)
              }
              required
            />
            <p className="auth-error">{errors.email}</p>
            <button onClick={submitEmail}>Next</button>
          </section>

          <section className="signup-form__section">
            <h2>What is your phone number?</h2>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                validateMaxLength("phone", e.target.value, 20, setPhone)
              }
              required
            />
            <p className="auth-error">{errors.phone}</p>
            <button onClick={submitPhone}>Next</button>
          </section>

          <section className="signup-form__section">
            <h2>Create your account password</h2>
            <p>
              Your password must be at least 8 characters long and contain at
              least one letter and one digit
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                validateMaxLength("password", e.target.value, 20, setPassword)
              }
              minLength={8}
              required
            />
            {passwordStatus.fail.length !== 0 && (
              <>
                {passwordStatus.fail.map((msg) => (
                  <p>
                    <i className="fa-solid fa-circle-xmark red-icon"></i>
                    {msg}
                  </p>
                ))}
                {passwordStatus.pass.map((msg) => (
                  <p>
                    <i className="fa-solid fa-circle-check green-icon"></i>
                    {msg}
                  </p>
                ))}
              </>
            )}
            <p className="auth-error">{errors.password}</p>
            <button onClick={submitPassword}>Next</button>
          </section>

          <section className="signup-form__section">
            <h2>What is your name?</h2>
            <p>Let us know how to properly address you</p>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) =>
                validateMaxLength(
                  "firstName",
                  e.target.value,
                  255,
                  setFirstName
                )
              }
              required
            />
            <p className="auth-error">{errors.firstName}</p>

            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) =>
                validateMaxLength("lastName", e.target.value, 255, setLastName)
              }
              required
            />
            <p className="auth-error">{errors.lastName}</p>
          </section>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
