import "./ModalPopup.css";
import TickDark from '../assets/TickDark.png';
import CrossGreen from '../assets/CrossGreen.png';


interface ModalPopupProps {
  text: string
  onOk: () => void
  onCancel: () => void
}


export function ModalPopup({
                              text = "Some text", onOk = () => {
  }, onCancel = () => {
  }
                           }: ModalPopupProps) {
  return (
    <div id="overlay" className="overlay">
      <div className="modal">
        <div className="modal-content">
          {/*<span className="close" onClick={onClose}>&times;</span>*/}
          <p>{text}</p>
          <div className="buttons">
            <button onClick={onOk}><img src={TickDark} alt={"Confirm button"}/></button>
            <button onClick={onCancel}><img src={CrossGreen} alt={"Cancel button"}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}