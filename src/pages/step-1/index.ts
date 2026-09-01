import {state } from '../../state'

interface Params {
    goTo: Function
}

export function initPageStep1(params:Params){
    state.subscribe(()=>{
        
        renderMessages(containerMessages)
    })
    
    function renderMessages(element:Element){
       
        
        const currentState=state.getState()
       
        element.innerHTML=''
    currentState.messages?.forEach(e => {
      
        const newChatEl=document.createElement("chat-el")
        
        
        if(currentState.user?.userId===e.userId){
            
            
            newChatEl.setAttribute('typeMessage','sent')

        }else{
            newChatEl.setAttribute('typeMessage','received')
            newChatEl.setAttribute('userName',e.userName)
        }

        
       
    
            newChatEl.setAttribute('text',e.message)
        
        if(element){
    
    
          element.appendChild(newChatEl )
          requestAnimationFrame(() => {
        containerMessages.scrollTop = containerMessages.scrollHeight;
    });
      }
    });
        
    }    
   
     function captureData(element:HTMLFormElement){

   if(element){
      element.addEventListener('sendInfo',async (e:any)=>{
        
        
        form= e.detail
       
        
      })
    }

 }
    
    

  

    


     const  divEl=document.createElement('div')
      const styleEl=document.createElement('style')
      let roomId=state.getState().room?.roomId

     
        styleEl.innerHTML=`
    .container{
    margin :0 31px 72px;
    }
    .title{
    margin:16px 0 26px;
    font-size:52px;
    font-weight:700
    }
    .room-id{
    margin:0;
    font-size:24px
    font-weight:500}

    .container-messages{
    height:60vh;
    overflow-y: auto;
    display:flex;
    flex-direction: column;
    gap: 12px; 
    padding: 10px;

    }
    `
   

    divEl.innerHTML=`
    
    <header-el></header-el>
    <div class="container">
    <div class="title-container">
    <h1 class='title'>Chat</h1>
    
    <p class="room-id" >Room id:${roomId}</p>
    </div>
    <div class='container-messages'>
        
     
    </div>

    <form class="welcome-form">
     <text-field  nameInput="message" typeInput="text"></text-field>
        <div>
            <button-el  textButton="Enviar"classButton="button-primary"></button-el>
        </div>
    </form>
    
    </div>
    `
        
        const containerMessages=divEl.querySelector('.container-messages') as Element
        
        const formEl=divEl.querySelector('.welcome-form') as HTMLFormElement
        const textFieldEl=divEl.querySelector("tex-field")
      
        let form:any={}
       
        captureData(formEl)

   formEl.addEventListener("submit",async (e:any)=>{
    e.preventDefault()
    const {message}=form
    
    const res= await state.sendMessage(message)
    if(textFieldEl){
        (textFieldEl as any).clearInput()
    }
   
    formEl.reset()
   


   })
          divEl.appendChild(styleEl)
          const currenState=state.getState()
        
          if(currenState.room?.rtdbRoomId)
          {
       

              state.listenToMessages(currenState.room.rtdbRoomId)
          }

return divEl

} 