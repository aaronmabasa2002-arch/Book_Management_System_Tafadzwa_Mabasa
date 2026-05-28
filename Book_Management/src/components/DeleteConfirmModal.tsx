type DeleteConfirmModalProps = {
  bookTitle: string
  isDeleting?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmModal = ({
  bookTitle,
  isDeleting = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-modal-title">Delete book?</h2>
        <p>
          You are about to permanently remove <strong>{bookTitle}</strong> from
          your catalogue. This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : 'Delete book'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
