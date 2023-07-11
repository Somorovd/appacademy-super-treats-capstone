import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const countries = ["US", "CA", "MX"];

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateCredential = (e) => {
    const credential = e.target.value;
    setCredential(credential);
    setIsPhone(
      credential.length > 1 &&
        credential.trim().search(/^(\d\s*\d|\(\s*\d)/) === 0
    );
  };

  return (
    <div className="login-page fh">
      <div className="login-content flex flex-11 fh">
        <form
          className="login-form flex-c"
          onSubmit={handleSubmit}
        >
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="flex">
            {isPhone && (
              <select>
                {countries.map((c, i) => (
                  <option
                    value={c}
                    key={`${i}_${c}`}
                  >
                    {c}
                  </option>
                ))}
              </select>
            )}
            <input
              value={credential}
              onChange={updateCredential}
              placeholder="Enter phone number or email"
              required
            />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bt-black"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
