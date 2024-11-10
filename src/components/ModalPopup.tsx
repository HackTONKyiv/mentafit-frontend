import "./ModalPopup.css";


interface ModalPopupProps {
  onClose: () => void
  text: string
  onOk: () => void
  onCancel: () => void
}


export function ModalPopup({ onClose = () => {}, text = "Some text", onOk = () => {}, onCancel = () => {} } : ModalPopupProps) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{text}</p>
        <div className="buttons">
          <button onClick={onOk}>Ok</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}