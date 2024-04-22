import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import HomeCard from "../Components/HomeCard.tsx";
import { useRemoteContext } from "../Components/RemoteContext.tsx";
import { useNavigate } from "react-router-dom";
import carPng from '../Content/Brand/car.png'
import checklist from '../Content/Brand/check-list.png'
import NewBreakdown from "../Components/NewBreakdown.tsx";

function getIcon(id:string) : string{
    return `../Content/Brand/${id}`
}

const Home : React.FC = ()=> {

    const {responses, fetchResponses} = useRemoteContext()
    const nav = useNavigate()

    return (
        <Col style={{minHeight:'80vh',background:'transparent',justifyItems:'center',alignItems:'center',alignContent:'center'}}>
            <Row style={{gap:0}}>
                <Col>
                    <HomeCard title="Create Breakdown alert!" button={<NewBreakdown/>}
                        iconUrl={carPng} backgroundColor="tomato" summary="We will alert the near-by mechanics." />
                </Col>

                <Col>
                    <HomeCard title="Breakdowns" button={<Button onClick={()=>{window.location.href = "/list"}}>{"Open list"}</Button>}
                        iconUrl={checklist} backgroundColor="tomato" summary={`We have about ${responses.length} reported`} />
                </Col>

            </Row>
        </Col>
    )
}

export default Home