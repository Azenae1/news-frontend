import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({
  handleCloseModal,
  onLogin,
  switchToRegister,
  isLoading,
  isOpen,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
    resetForm();
  };

  const extraActions = (
    <div className="modal__form_switch-wrapper">
      <span className="modal__form_switch-text">or&nbsp;</span>
      <button
        className="modal__form_switch-button"
        onClick={switchToRegister}
        type="button"
      >
        <span className="modal__form_switch-button_text">Sign up</span>
      </button>
    </div>
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
              placeholder="Email"
              className="modal__input modal__password"
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
              placeholder="Password"
              className="modal__input"
              onChange={handleChange}
            />
            <span className="modal__input-error">{errors.password}</span>
          </label>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
