import React, { Component, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useRemoteContext } from './RemoteContext.tsx'
import { Breakdown } from '../../functions/src/init.ts'

interface NewBreakDownFormType {
    breakdown?: Breakdown
}

const NewBreakdown : React.FC<NewBreakDownFormType> = ({breakdown})=> {

    const {createResponse,updateBreakdown} = useRemoteContext()

    const [show, setShow] = useState(false)
    const [companyName, setCompanyName] = useState("")
    const [driverName, setDriverName] = useState("")
    const [registrationNumber, setRegistrationNumber] = useState("")
    const [date, setDate] = useState(new Date())

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleCreation = () => {

        if(breakdown){
            updateBreakdown({
                companyName: (companyName == "") ? breakdown.companyName : companyName,
                driverName: (driverName == "") ? breakdown.driverName : driverName,
                registrationNumber: (registrationNumber == "") ? breakdown.registrationNumber : registrationNumber,
                reference: breakdown.reference,
                breakdownDate: breakdown.breakdownDate
            }, breakdown.reference!!)
            setShow(false)
        }else{
            createResponse({
                companyName: companyName,
                registrationNumber: registrationNumber,
                driverName: driverName,
                breakdownDate: date.toString(),
                reference: ""
            })
            setShow(false)
        }
    }

    var formHeader = breakdown ? "Update Breakdown" : "New Breakdown alert"
    var buttonText = breakdown ? "Update" : "New Breakdown"
    var closeButtonText = breakdown ? "Update" : "Create"

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {
                    buttonText
                }
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Company Name:</label>
                    <Form.Control type="text" placeholder={breakdown ? `${breakdown.companyName}`: `Company name`} 
                        onChange={(e)=> setCompanyName(e.target.value)}/>
                    <br />
                    <label>Registration Number:</label>
                    <Form.Control type="text" placeholder={breakdown ? `${breakdown.registrationNumber}`: `Registration`}
                        onChange={(e)=> setRegistrationNumber(e.target.value)}/>
                    <br />
                    <label>Driver:</label>
                    <Form.Control type="text" placeholder={breakdown ? `${breakdown.driverName}`: `Driver name`}
                        onChange={(e)=> setDriverName(e.target.value)}/>
                    <br />

                    {
                        breakdown && (<label>The date ({breakdown.breakdownDate.toString()}) and Reference are uneditable.</label>)
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreation}>
                        {closeButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewBreakdown