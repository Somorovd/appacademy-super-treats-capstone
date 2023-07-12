import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

export default function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     setErrors(data);
    //   }
    // } else {
    //   setErrors([
    //     "Confirm Password field must be the same as the Password field",
    //   ]);
    // }
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
          </section>

          <section className="signup-form__section">
            <h2>What is your phone number?</h2>
            <input
              type="text"
              placeholder="Enter your phone number"
              pattern=""
              value={phone}
              onChange={(e) =>
                validateMaxLength("phone", e.target.value, 20, setPhone)
              }
              required
            />
            <p className="auth-error">{errors.phone}</p>
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
            <p className="auth-error">{errors.password}</p>
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
