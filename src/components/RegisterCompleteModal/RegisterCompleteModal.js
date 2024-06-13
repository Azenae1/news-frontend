import { useEffect, useRef } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./RegisterCompleteModal.css";

function RegisterCompleteModal({
  isOpen,
  name,
  onClose,
  switchToLogin,
  onClick,
}) {
  const regModalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (regModalRef.current && !regModalRef.current.contains(evt.target)) {
        onClose();
      }
    };

    const handleKeyDown = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <div
      className="modal"
      //   className={
      //     isOpen ? `modal modal_type_${name}` : `modal_type_${name} modal_hidden`
      //   }
      onClick={onClick}
    >
      <div className="modal__container modal__register-container">
        <button
          onClick={onClose}
          type="button"
          className="modal__form_close-button"
        ></button>
        <h3 className="modal__register-text">
          Registration successfully completed!
        </h3>
        <button
          type="button"
          className="modal__login-button modal__form_switch-button_text"
          onClick={switchToLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterCompleteModal;
