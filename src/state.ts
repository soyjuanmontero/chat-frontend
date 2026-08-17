import {  ref, onValue, push } from "firebase/database";
import { db } from "./db";


interface User{
    userName:string,
    userId:string


}
interface Messages{
    message:string,
    userName:string,
    userId:string
}

interface Data{
    user?:User,
    messages?:Messages[]
}
interface State{
    data:Data,
     listener:Function[],
    messageRef:any
    getState():Data,
    sendData():Promise<Data>,
    setState(newState:Data):void
   listenToMessages ():void
    sendMessage(message:string):void
    subscribe(callback:()=>any):void
}

const API_BASE_URL="https://chat-backend-4wx7.onrender.com" 



 const state:State={
  data: sessionStorage.getItem('user') 
    ? { user: JSON.parse(sessionStorage.getItem('user')!) }
    : {},
     listener:[],
 
    getState(){
        return this.data
    },
   async  sendData(){
   
        
       try{
      const response= await fetch(API_BASE_URL+'/users',{
            method:'POST',
             headers: {
        'Content-Type': 'application/json'
             },
              body: JSON.stringify({
       
        ...this.getState() 
    })
        })
  
    if (!response.ok) {
        throw new Error(`Error del servidor: Código ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("El servidor no devolvió JSON, devolvió HTML u otro formato.");
    }

    
    const data= await response.json()
   
    
   
    return data


}
catch(error ){

    console.error("Hubo un fallo en la petición:", error);
}
   

  


    },
    setState(newState:Data){
        this.data={
        ...this.getState(),
            ...newState}

                for(let cb of this.listener){
            cb()
        }
        
    },


     messageRef : ref(db, 'general'),

    listenToMessages(){


onValue(this.messageRef, (snapshot) => {
  const data = snapshot.val();
const messagesArray = data ? Object.values(data) as Messages[] : [];


this.setState({
    ...this.getState(),
    messages: messagesArray
});
 
}, (error) => {

    console.error("Error al escuchar mensajes:", error); 
  });;

    },

//     sendMessage(message){
        

// // Envía el mensaje directamente generando una clave única
// const newState=this.getState()

//   if (!newState.user) {
//         console.error("No hay usuario logueado");
//         return; 
//     }

//     push(this.messageRef, {
//         message: message,
//         userId: newState.user.userId,
//         userName: newState.user.userName
//     });
    

//     },
 async  sendMessage(message){
    const newState=this.getState()
      if (!newState.user) {
        console.error("No hay usuario logueado");
        return; 
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+'/chats/general',{
            method:'POST',
             headers: {
        'Content-Type': 'application/json'
             },
              body: JSON.stringify({
       
          message: message,
        userId: newState.user.userId,
        userName: newState.user.userName
    })
        })
  
    if (!response.ok) {
        throw new Error(`Error del servidor: Código ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("El servidor no devolvió JSON, devolvió HTML u otro formato.");
    }

    
    const data= await response.json()
   
    
   
    


}
catch(error ){

    console.error("Hubo un fallo en la petición:", error);
}
   

  


    },
       subscribe(callback:()=>{}){

        this.listener.push(callback)}
 } 
 export {state}

