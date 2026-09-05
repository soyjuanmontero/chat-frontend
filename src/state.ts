import {  ref, onValue, push } from "firebase/database";
import { db } from "./db";


interface User{
    email?:string
    userName?:string,
    userId?:string
    // /


}
interface Room{
    room?:string 
    roomId?:string
    rtdbRoomId?:string

}
interface Messages{
    message:string,
    userName:string,
    userId:string
}

interface Data{
    user?:User,
    room?:Room,
    messages?:Messages[]
}
interface State{
    data:Data,
     listener:Function[],
    
    getState():Data,
    
    setState(newState:Data):void
   listenToMessages (id:string):void
    sendMessage(message:string):void
    subscribe(callback:()=>any):void
   auth():Promise<any>
   createRoom():Promise<any>
   getRoomExistId():Promise<any>
   signup(email:string,userName:string):Promise<any>
}

const API_BASE_URL="https://chat-backend-4wx7.onrender.com"  
// const API_BASE_URL="http://localhost:3000" 



 const state:State={
  data: sessionStorage.getItem('state') 
    ? JSON.parse(sessionStorage.getItem('state')!) 
    : {},
     listener:[],
 
    getState(){
        return this.data
    },

    setState(newState:Data){
        this.data={
        ...this.getState(),
            ...newState}

                for(let cb of this.listener){
            cb()
        }
        
    },


    
    listenToMessages(id){
        const messageRef = ref(db, 'rooms/'+id+'/messages')


onValue(messageRef, (snapshot) => {
  const data = snapshot.val();
const messagesArray = data ? Object.entries(data).map(([id, value]:any) => ({
    id,
    ...value
})) as Messages[] : [];



this.setState({
    ...this.getState(),
    messages: messagesArray
});
 
}, (error) => {

    console.error("Error al escuchar mensajes:", error); 
  });;

    },


 async  sendMessage(message){
     const newState=this.getState()
     const id=newState.room?.rtdbRoomId
     
      if (!newState.user) {
        console.error("No hay usuario logueado");
        return; 
    }
    if(!message){
        return
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+`/chatRoom/room/${id}/messages`,{
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
    return data
   
    
   
    


}
catch(error ){

    console.error("Hubo un fallo en la petición:", error);
}
   

  


    },
       subscribe(callback:()=>{}){

        this.listener.push(callback)
    },
    async signup(email,userName){
        
   

      if (!userName || !email) {
        console.error("Error ingrese los datos nuevamente");
        return {success:false, message:"Ingrese los datos para poder crear su cuenta"}
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+'/users/signup',{
            method:'POST',
             headers: {
        'Content-Type': 'application/json'
             },
              body: JSON.stringify({
       
        email,
        userName
    })
        })
  
   


    
    const data= await response.json()
       if (!response.ok) {
       console.warn("Respuesta negativa del servidor:", data.message);
            return { success: false, message: data.message || "Error al crear el usuario intente nuevamente" };
    }
   return {success:true,message:data.message}
   
    }
    catch(error ){

    console.error("Hubo un fallo en la petición:", error);
    return {success:false, message:"Error al crear el usuario intente nuevamente"}
}
   
},
async auth(){
     const email=state.getState().user?.email
      if (!email) {
        console.error("Error ingrese los datos nuevamente");
        return { success: false, message: "Falta el correo electrónico" };
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+'/users/auth',{
            method:'POST',
             headers: {
        'Content-Type': 'application/json'
             },
              body: JSON.stringify({
       
       email
    })
        })
        const data= await response.json()
       
        
    if (!response.ok) {
       console.warn("Respuesta negativa del servidor:", data.message);
            return { success: false, message: data.message || "Error en la autenticación" };
    }
    
    
    
   
         
       state.setState({
         user:{
           ...state.getState().user,
           userId:data.userId,
           userName:data.userName 
           
          },
          
        })
        return { success: true, data };
        
    
  
}




catch(error ){

    console.error("Hubo un fallo en la red o en la petición:", error);
        return { success: false, message: "Error de conexión con el servidor" };
}
   

},
async createRoom(){
const userId=state.getState().user?.userId
       if (!userId) {
        console.error("Error");
         return { success: false, message: "ingrese los datos nuevamente" };
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+'/chatRoom/room',{
            method:'POST',
             headers: {
        'Content-Type': 'application/json'
             },
              body: JSON.stringify({
       
       userId
    })
        })
        const data= await response.json()
  
         if (!response.ok) {
       console.warn("Respuesta negativa del servidor:", data.message);
            return { success: false, message: data.message || "Error al crear la sala intente nuevamente" };
    }
 

    
   
   
       state.setState({
         room:{
           ...state.getState().room,
           roomId:data.roomId,
           rtdbRoomId:data.rtdbRoomId
           
          },
          
        })
        
    
  return { success: true, data };
   
}
catch(error ){

 console.error("Hubo un fallo en la petición:", error);
 return { success: false, message: "Error de conexión con el servidor" };
}
    
 } ,
 async getRoomExistId(){
    const currenState=state.getState()
const userId=currenState.user?.userId
const roomId=currenState.room?.roomId
       if (!userId || !roomId) {
        console.error("Error");
       return { success: false, message: "Room ID no existe, ingrese un ID valido para ingresar a la sala o puede crear una nueva" };
    }
   
        
       try{
      const response= await fetch(API_BASE_URL+"/chatRoom/room/"+roomId+"?userId="+userId,{
              method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
             
        })
  
        const data= await response.json()
    if (!response.ok) {
         console.warn("Respuesta negativa del servidor:", data.message);
            return { success: false, message: data.message || "No pudimos dar acceso a la sala intente nuevamente" };
    }
    
 
    
     
       state.setState({
         room:{
           ...state.getState().room,
           rtdbRoomId:data.rtdbRoomId,
           
          },
          
        })

    return { success: true, data };
}
catch(error ){

 console.error("Hubo un fallo en la petición:", error);
 return { success: false, message: "No pudimos dar acceso a la sala intente nuevamente" };
}

 }
//  
 }
 export {state}

