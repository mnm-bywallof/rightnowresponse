import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";

interface CardDetailType{
    title: string,
    summary: string,
    iconUrl: string,
    backgroundColor: string,
    button: React.ReactNode
}

const HomeCard : React.FC<CardDetailType> = ({title,iconUrl,backgroundColor,button,summary})=> {
    return (
    <Card style={
        {padding:25, 
        justifyContent:'center',
        textAlign:'center', 
        flex:1,
        flexFlow:'column',}}>

            <div style={{display:'flex',flexFlow:'row',justifyContent:'center'}}>
                <img src={iconUrl} style={{
                    height: 100,
                    width: 100,
                    textAlign:'center',
                    justifyContent:'center',
                    alignContent:'center'
                }}/>
            </div>

            <h3>{title}</h3>
            <text>{summary}</text>
            {
                button
            }
        
    </Card>)
}

export default HomeCard