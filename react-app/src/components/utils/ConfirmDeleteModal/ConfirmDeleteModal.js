import { useModal } from "../../../context/Modal";

import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ deleteName, onDelete }) {
  const { closeModal, setModalClass } = useModal();
  setModalClass("flex flex-11");

  return (
    <div className="confirm-delete flex-c">
      <h2>
        Are you sure you want to delete{" "}
        <span className="delete-name">{deleteName}</span>?
      </h2>
      <p>This is action cannot be undone</p>
      <div className="confirm-delete__actions flex-c">
        <button
          className="bt-pd"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="bt-black bt-pd"
          onClick={() => {
            onDelete();
            closeModal();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
