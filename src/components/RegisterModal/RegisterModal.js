import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleCloseModal,
  onRegister,
  switchToLogin,
  isLoading,
  isOpen,
}) => {
  const validateForm = () => {
    return (
      email.trim() !== "" &&
      password.trim().length >= 6 &&
      name.trim().length >= 2
    );
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
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
    onRegister({ name, password, email });
  };

  const extraActions = (
    <button
      className="modal__form_switch-button"
      onClick={switchToLogin}
      type="button"
    >
      or <span className="modal__form_switch-button_text">Sign in</span>
    </button>
  );

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={isLoading ? "Saving..." : "Sign up"}
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
            placeholder="Enter email"
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
            placeholder="Enter password"
            className="modal__input"
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div className="modal__form-field">
        <label>
          <h4 className="modal__text">Username</h4>
          <input
            type="text"
            name="name"
            value={name}
            minLength="2"
            maxLength="30"
            required
            placeholder="Enter your username"
            className="modal__input"
            onChange={handleNameChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
