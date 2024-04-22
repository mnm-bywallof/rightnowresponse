import { useState } from "react";
import {Button, Card} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

//onst ProfileScreen : React.FC = ()=> {

const ResponseCard = (response )=> {
    return (<Card><Popup></Popup></Card>)
}

function Popup(){

    const [showPopup, setShowPopup] = useState(false)

    const closePopup = () => setShowPopup(false)
    const openPopup = () => setShowPopup(true)

    return (
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Button onClick={openPopup}>Open</Button>
        <Modal show={showPopup} onHide={closePopup}>
            {/* <Modal.Header closeButton> */}
                {/* <Modal.Title>Modal heading</Modal.Title> */}
            {/* </Modal.Header> */}
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={closePopup}>
                Delete
            </Button>
            <Button variant="primary" onClick={closePopup}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
  

export default ResponseCard