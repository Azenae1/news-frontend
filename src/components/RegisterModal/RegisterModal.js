import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({
  handleCloseModal,
  onRegister,
  switchToLogin,
  isLoading,
  isOpen,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      password: values.password,
      email: values.email,
    });
    resetForm();
  };

  const extraActions = (
    <div className="modal__form_switch-wrapper">
      <span className="modal__form_switch-text">or&nbsp;</span>
      <button
        className="modal__form_switch-button"
        onClick={switchToLogin}
        type="button"
      >
        <span className="modal__form_switch-button_text">Sign in</span>
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={isLoading ? "Saving..." : "Sign up"}
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      extraActions={extraActions}
    >
      <div className="modal__form-field">
        <label>
          <h4 className="modal__text">Email</h4>

          <input
            type="email"
            name="email"
            value={values.email || ""}
            minLength="1"
            maxLength="30"
            required
            placeholder="Enter email"
            className="modal__input"
            onChange={handleChange}
          />
          <span className="modal__input-error">{errors.email}</span>
        </label>
      </div>
      <div className="modal__form-field">
        <label>
          <h4 className="modal__text">Password</h4>
          <input
            type="password"
            name="password"
            value={values.password || ""}
            minLength="6"
            required
            placeholder="Enter password"
            className="modal__input"
            onChange={handleChange}
          />
          <span className="modal__input-error">{errors.password}</span>
        </label>
      </div>
      <div className="modal__form-field">
        <label>
          <h4 className="modal__text">Username</h4>
          <input
            type="text"
            name="name"
            value={values.name || ""}
            minLength="2"
            maxLength="30"
            required
            placeholder="Enter your username"
            className="modal__input"
            onChange={handleChange}
          />
          <span className="modal__input-error">{errors.name}</span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
