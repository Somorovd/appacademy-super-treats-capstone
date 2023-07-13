import { useModal } from "../../../context/Modal";

import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ deleteName, onDelete }) {
  const { closeModal } = useModal();

  return (
    <div className="confirm-delete">
      <h2>Are you sure you want to delete {deleteName}?</h2>
      <p>This is action cannot be undone</p>
      <div className="confirm-delete__actions">
        <button onClick={closeModal}>Cancel</button>
        <button
          className="bt-black"
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
