import {state } from '../../state'

interface Params {
    goTo: Function
}

export function initPageStep1(params:Params){
    state.subscribe(()=>{
        console.log('subscribe')
        renderMessages(containerMessages)
    })
    
    function renderMessages(element:Element){
        const currentState=state.getState()
        console.log(currentState)
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
      }
    });
        
    }    
   
    
    

  

    


     const  divEl=document.createElement('div')
      const styleEl=document.createElement('style')

     
        styleEl.innerHTML=`
    .container{
    margin :0 31px 72px;
    }
    .title{
    margin:16px 0 26px;
    }
    .container-messages{
    height:60vh;
    overflow-y: scroll;
    display:flex;
    flex-direction: column;
    justify-content: flex-end;

    }
    `
   

    divEl.innerHTML=`
    
    <header-el></header-el>
    <div class="container">
    <h1 class='title'>Chat</h1>
    <div class='container-messages'>
        
     
    </div>

    <form-el id="form" textButton="Enviar"></form-el>

    
    </div>
    `
        const form=divEl.querySelector('#form')    
        const containerMessages=divEl.querySelector('.container-messages') as Element
        form?.addEventListener('sendInfo',(e:any)=>{
        
        const message=e.detail.info
        
        const  verifiedMessage=message.trim(
        )
        
        if(verifiedMessage===""){
            
            
            return
        }
        
        
 state.sendMessage(message)
    
        
    })
          divEl.appendChild(styleEl)
          
       state.listenToMessages()

return divEl

} 