import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleCloseModal,
  onLogin,
  switchToRegister,
  isLoading,
  isOpen,
}) => {
  const validateForm = () => {
    return email.trim() !== "" && password.trim().length >= 6;
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const extraActions = (
    <button
      className="modal__form_switch-button"
      onClick={switchToRegister}
      type="button"
    >
      or <span className="modal__form_switch-button_text">Sign up</span>
    </button>
  );

  return (
    <div className="modal__login-container">
      <ModalWithForm
        title="Sign In"
        name="login"
        buttonText={isLoading ? "Loading..." : "Sign In"}
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onInputChange={validateForm}
        extraActions={extraActions}
      >
        <div className="modal__form-field">
          <label>
            <h4 className="modal__text">Email</h4>
            <input
              type="email"
              name="email"
              value={email}
              minLength="1"
              maxLength="30"
              required
              placeholder="Email"
              className="modal__input modal__password"
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div className="modal__form-field">
          <label>
            <h4 className="modal__text">Password</h4>
            <input
              type="password"
              name="password"
              value={password}
              minLength="6"
              required
              placeholder="Password"
              className="modal__input"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
