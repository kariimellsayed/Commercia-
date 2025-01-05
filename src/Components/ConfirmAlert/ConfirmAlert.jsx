import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./ConfirmAlert.scss";

const useConfirmAlert = () => {
  const showConfirmAlert = (title, message, onConfirm) => {
    confirmAlert({
      title: title || "Confirm Action",
      message: message || "Are you sure you want to proceed?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onConfirm(),
        },
        {
          label: "No",
          onClick: () => console.log("Action canceled"),
        },
      ],
      overlayClassName: "custom-overlay",
      customUI: ({ onClose }) => (
        <div className="custom-ui">
          <h1>{title || "Are you sure?"}</h1>
          <p>{message || "Do you really want to proceed?"}</p>
          <button
            className="confirm-button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </button>
          <button className="cancel-button" onClick={onClose}>
            No
          </button>
        </div>
      ),
    });
  };

  return { showConfirmAlert };
};

export default useConfirmAlert;
