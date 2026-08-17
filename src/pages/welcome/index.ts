import { state } from "../../state"

interface Params {
    goTo: Function
}

export function initPageWelcome(params:Params){

  // class welcome extends ht


    const divEl=document.createElement('div')
    const styleEl=document.createElement('style')
    styleEl.innerHTML=`
    .container{
    margin :0 31px 72px;
    }
    .title{
    margin:16px 0 26px;
    }
    `
   

    divEl.innerHTML=`
    
    <header-el></header-el>
    <div class="container">
    <h1 class='title'>Bienvenidos</h1>
      <form-el id="form" textLabel="Escribe tu nombre" textButton="Comenzar"></form-el>
    
    </div>
    `
    const formEl=divEl.querySelector('form-el')
    // console.log(formEl)
    if(formEl){
      formEl.addEventListener('sendInfo',async (e:any)=>{
        

        const message=e.detail.info
      
         const  verifiedMessage=message.trim(
        )

        if(verifiedMessage===""){

            alert("Por favor, ingresa un nombre válido para continuar.")
            return
        }
        
        const result=await state.sendData()
      
       
      
        
       
       if(result){
          if(!result.user?.userId){
          return 
        }
          state.setState({
        user:{

          userName:verifiedMessage,
          userId:result.user?.userId

        } 
        
        
      })
      const currentState=state.getState()
      
      sessionStorage.setItem('user', JSON.stringify(currentState.user));
      

        params.goTo("/step-1")
       } 
       else {
        alert("Hubo un error al conectar con el servidor");
    }


       

      })
    }
    divEl.appendChild(styleEl)

    return divEl
}