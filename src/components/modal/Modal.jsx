import "./Modal.css";
export default function Modal({ children }) {
    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    )
}