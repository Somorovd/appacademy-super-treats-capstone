import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";

const countries = ["US", "CA", "MX"];

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) history.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(credential, password));
    if (res.errors)
      setErrors({ credential: "Invalid login", password: "Invalid login" });
    else history.push("/");
  };

  const updateCredential = (e) => {
    const credential = e.target.value;
    const is_phone =
      credential.length > 1 &&
      credential.trim().search(/^(\d\s*\d|\(\s*\d)/) === 0;

    setIsPhone(is_phone);

    const credential_error =
      (is_phone && credential.length > 20) || credential.length > 255
        ? "Max length reached"
        : "";

    setErrors((errors) => ({ ...errors, credential: credential_error }));

    if (credential_error) return;
    else setCredential(credential);
  };

  const updatePassword = (e) => {
    const password = e.target.value;

    const password_error = password.length > 20 ? "Max length reached" : "";

    setErrors((errors) => ({ ...errors, password: password_error }));

    if (password_error) return;
    else setPassword(password);
  };

  return (
    <div className="login-page fh">
      <div className="login-content flex flex-11 fh">
        <form
          className="login-form flex-c"
          onSubmit={handleSubmit}
        >
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
          <p className="auth-error">{errors.credential}</p>
          <input
            type="password"
            value={password}
            onChange={updatePassword}
            placeholder="Password"
            required
          />
          <p className="auth-error">{errors.password}</p>
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
