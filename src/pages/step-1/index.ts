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
        
        if(!currentState.messages){
            return
        }
        const reversed = currentState.messages.toReversed();
         


       
        element.innerHTML=''
      
        
    reversed.forEach(e => {
       
      
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
    height:100vh;
    display:flex;
    flex-direction:column;
    }
    .container_title-messages{
        padding :16px 0 0 28px;
  
    }
    .title{
        margin:0;
        
        font-size:52px;
    font-weight:700
    }
    .room-id{
    margin:0;
    font-size:24px
    font-weight:500;}

    .container-messages{
        overflow-y: auto;
        flex:1;
       
    
    display:flex;
    flex-direction: column-reverse;
    gap: 12px; 
    padding: 10px;

    }
    .welcome-form{
    margin:0 28px;}
    .vacio{
    flex:1;}
   
    `
   

    divEl.innerHTML=`
    
    <div  class="container">
            <header-el></header-el>
        <div class="container_title-messages">
           
                 <h1 class='title'>Chat</h1>
    
                <p class="room-id" >Room id:${roomId}</p>
         </div>
             <div class='container-messages'>
            <div class="vacio"></div>
     
            </div>

            <form class="welcome-form">
                 <text-field  nameInput="message" typeInput="text"></text-field>
                 <div>
                 <button-el  textButton="Enviar"classButton="button-primary"></button-el>
                </div>
            </form>
        </div>
    
    </div>
    `
        
        const containerMessages=divEl.querySelector('.container-messages') as Element
        
        const formEl=divEl.querySelector('.welcome-form') as HTMLFormElement
        const textFieldEl=divEl.querySelector("tex-field")
      
        let form:any={}
       
        captureData(formEl)

   formEl.addEventListener("submit",async (e:any)=>{
    e.preventDefault()
    let {message}=form
    
    const res= await state.sendMessage(message)
    form.message=""
    if(textFieldEl){
        (textFieldEl as any).clearInput()
    }
   
    formEl.reset()
   


   })
          divEl.appendChild(styleEl)
          const currentState=state.getState()
        
          if(currentState.room?.rtdbRoomId)
          {
       

              state.listenToMessages(currentState.room.rtdbRoomId)
          }

return divEl

} 