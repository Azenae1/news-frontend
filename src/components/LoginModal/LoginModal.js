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

  return (
    <ModalWithForm
      title="Sign In"
      buttonText={isLoading ? "Loading..." : "Sign In"}
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onInputChange={validateForm}
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
            className="modal__input"
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
      <div className="login">
        <button
          className="modal__form_switch-button"
          onClick={switchToRegister}
          type="button"
        >
          or <span className="modal__form_switch-button_text"> Sign up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
