import React, { useContext, useEffect, useState } from "react";
import { Breakdown as ResponseData } from "../../functions/src/init";

import {initializeApp} from 'firebase/app'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { useNavigation } from "react-router-dom";

const app = initializeApp({
    apiKey: "AIzaSyDDMeG4U_XxlGWHZ_n4u8EE83n_u8DOhhc",
    authDomain: "rnrapp-408e7.firebaseapp.com",
    projectId: "rnrapp-408e7",
    storageBucket: "rnrapp-408e7.appspot.com",
    messagingSenderId: "766583632107",
    appId: "1:766583632107:web:49d9498d4f9e96db450eae",
    measurementId: "G-5QGZF895M4"
})

const functions = getFunctions(app)
// connectFunctionsEmulator(functions, "127.0.0.1", 5001)

const context = React.createContext({
    currentResponse: {} as ResponseData | null,
    responses: [] as ResponseData[],
    // responses: [Response],
    fetchResponses: ()=> {},
    createResponse:(response?:ResponseData, listener?: (success:boolean)=> {})=>{},
    updateBreakdown: (response:ResponseData, id:string, listener?: (success:boolean)=> {})=>{},
    // deleteResponse: (response:Response)=>{}
})

export function useRemoteContext(){
    return useContext(context)
}

type ResponseContextType = {
    children?:React.ReactNode
}

export const ResponseProvider:React.FC<ResponseContextType> = ({children})=>{

    const [currentResponse, setCurrentResponse] = useState<ResponseData|null>(null);
    const [responses, setResponses] = useState<ResponseData[]>([])
    
    const getResp =  httpsCallable(functions, "getAllResponses")
    const createResp =  httpsCallable(functions, "createReponse")
    const deleteResp =  httpsCallable(functions, "deleteResponse")
    const updateResp = httpsCallable(functions, "updateResponse")
    
    const fetchResponses = () => {
        getResp().then((v)=>{
            // console.log(v.data)
            let items = v.data as {error: Boolean, data: ResponseData[]}
            console.log(items.data)
            items.data.map((v)=>{v.reference = v.id})
            setResponses(items.data)
        }).catch(e => {
            console.error(e)
        })
    }

    const createResponse = (response?:ResponseData, listener?: (success:boolean)=> {})=> {
        createResp(response).then((v)=>{
            console.log(v.data)
            fetchResponses()
            if(listener) listener(true)
        }).catch(e =>{
            if(listener) listener(false)
            console.error(e)
        })
    }

    const updateBreakdown = (response:ResponseData, id:string, listener?: (success:boolean)=> {})=> {
        updateResp({
            id : id,
            response: response
        }).then((v)=>{
            console.log(v.data)
            fetchResponses()
            if(listener) listener(true)
        }).catch(e =>{
            if(listener) listener(false)
            console.error(e)
        })
    }

    const deleteResponse = ()=> {
        deleteResp().then((v)=>{
            console.log(v.data)
        }).catch(e =>{
            console.error(e)
        })
    }

    useEffect(()=>{
        if(responses.length == 0){
            fetchResponses()
        }
    }, [responses])

    const val = {
        currentResponse,
        responses,
        fetchResponses,
        createResponse,
        updateBreakdown
    }
    return (
        <context.Provider value={val}>{children}</context.Provider>
    )
}
