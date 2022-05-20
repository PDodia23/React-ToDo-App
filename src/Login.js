import React from "react";

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login welcome-UI">
      <div id="welcome-heading">
        <p id="welcome-to">welcome to</p>
        <div className="logo">
          <p className="brand-name">kiai.</p>
          <div className="line"></div>
        </div>
        <p id="tag-line">
          tasks simplified<span id="dot">.</span>
        </p>
      </div>
      <img src="/img/karate.png" alt="karate icon" id="karate-img" />

      <div className="loginContainer signUpForm">
        <input
          type="text"
          autoComplete="on"
          placeholder="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className="errorMsg">{emailError.slice(10)}</p>
        <input
          autoComplete="on"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <p className="errorMsg">{passwordError.slice(10)}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin} className="new signinBtn">
                Sign In
              </button>
              <p id="haveAccount" className="change">
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup} className="getStartedBtn">
                Get Started
              </button>
              <p id="haveAccount" className="buttons-new">
                <span
                  onClick={() => setHasAccount(!hasAccount)}
                  className="signInBtn"
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
