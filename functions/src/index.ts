/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest, onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {onDocumentWritten} from "firebase-functions/v2/firestore";

import {initializeApp} from 'firebase/app'
import {getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { DocumentData } from "firebase-admin/firestore";
import {generateRandomResponse,Breakdown} from './init'

const app = initializeApp({
    apiKey: "AIzaSyDDMeG4U_XxlGWHZ_n4u8EE83n_u8DOhhc",
    authDomain: "rnrapp-408e7.firebaseapp.com",
    projectId: "rnrapp-408e7",
    storageBucket: "rnrapp-408e7.appspot.com",
    messagingSenderId: "766583632107",
    appId: "1:766583632107:web:49d9498d4f9e96db450eae",
    measurementId: "G-5QGZF895M4"
})

const db = getFirestore(app)

const COLLECTION = "responses"
const col = collection(db,COLLECTION)

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

//get the list of all the responses.
export const getAllResponses = onCall(async(request)=>{
    const query = await getDocs(col)
    const response = {
        error : true,
        data : new Array<DocumentData>
    }

    query.docs.forEach((doc)=>{
        let d = doc.data()
        d.id = doc.id
        d.reference = doc.id
        response.data.push(d)
    })
    return response
})

//create a response
export const createReponse = onCall(async(request)=>{
    const response = {
        error : true,
        data : request.data
    }

    logger.warn(request.data)
    const newResponse : Breakdown = request.data.breakdownDate ? request.data : generateRandomResponse()

    logger.debug(newResponse)

    const create = await addDoc(col, newResponse)

    newResponse.reference = create.id
    response.data = newResponse

    return response
})

//delete/remove a response
export const deleteResponse = onCall(async(request)=>{
    const response = {
        error : true,
        deleted: false,
        data : null || ""
    }

    if(request.data.id){
        const id = request.data.id
        await deleteDoc(doc(db,`${COLLECTION}/${id}`)).then((v)=>{
            response.deleted = true
        }).catch(()=>{
            response.deleted = false
        })
        response.data = id
        logger.info(id)
    }

    return response
})

export const updateResponse = onCall(async (request)=>{
    const responseData = request.data.response as DocumentData
    const responseId = request.data.id

    const response = {
        error : true,
        data : "",
        updated: false
    }

    await updateDoc(doc(db, `${COLLECTION}/${responseId}`), responseData).then((v)=>{
        response.error = false
        response.updated = true
    }).catch(()=>{
        response.error = true
        response.updated = false
    })

    return response
})

export const onResponseCreated = onDocumentWritten(`${COLLECTION}/{docId}`, (ev)=>{
    
})
