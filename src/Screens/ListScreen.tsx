import { useState } from "react";
import {initializeApp} from 'firebase/app'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import React from "react";
import { useRemoteContext } from "../Components/RemoteContext.tsx";
import NewBreakdown from "../Components/NewBreakdown.tsx";

const app = initializeApp({
    apiKey: "AIzaSyDDMeG4U_XxlGWHZ_n4u8EE83n_u8DOhhc",
    authDomain: "rnrapp-408e7.firebaseapp.com",
    projectId: "rnrapp-408e7",
    storageBucket: "rnrapp-408e7.appspot.com",
    messagingSenderId: "766583632107",
    appId: "1:766583632107:web:49d9498d4f9e96db450eae",
    measurementId: "G-5QGZF895M4"
})

const ListScreen : React.FC = () =>{

    const {currentResponse, fetchResponses, responses, createResponse} = useRemoteContext()

    const onRefresh = ()=> {
        console.log("onRefresh")
        fetchResponses()
    }

    const onCreate = ()=> {
        console.log("onCreate")
        createResponse({
            breakdownDate: new Date().toLocaleString(),
            companyName: "CarAid",
            driverName:"Maira",
            registrationNumber:"",
            reference:"xxxx"
        })
    }
    return (
        <Table striped>
      <thead>
        <tr>
          <th>Company</th>
          <th>Driver</th>
          <th>Registration Number</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr> */}
        {
            responses.map( (breakdown)=> (
                <tr key={breakdown.reference}>
                    <td>{breakdown.companyName}</td>
                    <td>{breakdown.driverName}</td>
                    <td>{breakdown.registrationNumber}</td>
                    <td>{breakdown.breakdownDate.toString()}</td>
                    <td><NewBreakdown breakdown={breakdown}/></td>
                </tr>
            ))
        }
      </tbody>
    </Table>
    )
}

export default ListScreen;