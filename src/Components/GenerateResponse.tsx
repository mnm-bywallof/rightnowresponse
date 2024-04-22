import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Response : React.FC = () =>{
    const [showPopup, setShowPopup] = useState(false)

    const closePopup = () => setShowPopup(false)
    const openPopup = () => setShowPopup(true)

    return (
      <div></div>
    );
}