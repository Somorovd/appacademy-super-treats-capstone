export default function SignupFormPassword({ form }) {
  const { password, setPassword, passwordStatus, setPasswordStatus } =
    form.password;
  const { nextStep, isLast } = form.steps;
  const { validateMaxLength } = form;

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

    if (passwordStatus.fail.length === 0) nextStep();
  };

  return (
    <section className="signup-form__section">
      <h2>Create your account password</h2>
      <p>
        Your password must be at least 8 characters long and contain at least
        one letter and one digit
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
          {passwordStatus.fail.map((msg, i) => (
            <p key={i}>
              <i className="fa-solid fa-circle-xmark red-icon"></i>
              {msg}
            </p>
          ))}
          {passwordStatus.pass.map((msg, i) => (
            <p key={i}>
              <i className="fa-solid fa-circle-check green-icon"></i>
              {msg}
            </p>
          ))}
        </>
      )}
      <p></p>
      <button onClick={submitPassword}>{isLast ? "Submit" : "Next"}</button>
    </section>
  );
}
