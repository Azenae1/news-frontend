import "./ModalWithForm.css";
import { useEffect, useRef } from "react";

const ModalWithForm = ({
  children,
  title,
  buttonText,
  onClose,
  name,
  onSubmit,
  isValid,
  extraActions,
}) => {
  const formModalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (formModalRef.current && !formModalRef.current.contains(evt.target)) {
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
    <div className="modal">
      <div
        className={`modal__form-container modal__type_${name}`}
        ref={formModalRef}
      >
        <button
          type="button"
          onClick={onClose}
          className="modal__form_close-button"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          <h3 className="modal__form-title">{title}</h3>

          {children}
          <button
            type="submit"
            className="modal__form_submit-button"
            disabled={!isValid}
          >
            {buttonText}
          </button>
          {extraActions && (
            <div className="modal__extra-actions">{extraActions}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
