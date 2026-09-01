import { state } from "../../state"

interface Params {
    goTo: Function
}

export function initPageLogin(params:Params){

     function captureData(element:HTMLFormElement){

   if(element){
      element.addEventListener('sendInfo',async (e:any)=>{
        
        
        form= {
          ...form,
          ...e.detail
        }
        
      })
    }

 }
        function executeWithADelay() {
            
            setTimeout(() => {
      params.goTo("/welcome")

  }, 1000);
}
       function showMessage(res:any,element:Element){

        
      

element.innerHTML=res.message

            if(!res.success){
                
                element.classList.add("error")
                element?.classList.remove('invisible')
             
            }
            else{
               
                if(element.classList.contains("error")){
                    element.classList.remove("error")
                    
                }
                    element?.classList.remove('invisible')
                    executeWithADelay()
            }
            
            
       

        
        }
 



  


    const divEl=document.createElement('div')
    const styleEl=document.createElement('style')
    
    
    styleEl.innerHTML=`
    .container{
    margin :0 31px 72px;
    }
    .title{
    margin:16px 0 26px;
    }
    
    .invisible{
    display:none;
    }
     .container-boton-signup{
     font-size: 15px;
        color: #666;
    margin-top:70px;
    }

.card-form {
        background: #ffffff;
        border: 1px solid #e0e0e0; /* Borde más visible */
        border-radius: 12px; /* Bordes más redondeados */
        padding: 22px; /* Más padding interno */
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* Sombra mucho más marcada */
        width: 100%;
        
        box-sizing: border-box;
        transition: box-shadow 0.3s ease;
    }
        .card-form:hover {
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
        .success-message {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
    }
        .error{
        color:#e41f1f;
        }
    `
   

    divEl.innerHTML=`
    
    <header-el></header-el>
    <div class="container">
    <h1 class='title'>Bienvenidos</h1>
    <p>
    <div class="card-form">
    <div class="success-message invisible"> "¡Usuario creado con éxito! Redirigiendo..."</div>
    <form class="welcome-form">
    <text-field textLabel="Email" nameInput="email" typeInput="email"></text-field>
    <text-field textLabel="Tu nombre" nameInput="userName" typeInput="text"></text-field>
   
    <button-el class="buttonForm" textButton="Crear usuario" classButton="button-signup"></button-el>
    
    </form>
    </div>

    
      <div class=container-boton-signup>
      <p>¿Ya tienes una cuenta?</p>
<button-el class="buttonSignup" textButton=" iniciar sesion"classButton="button-primary"></button-el>
    </div>
  
    </div>
    `
  
    const formEl=divEl.querySelector('.welcome-form') as HTMLFormElement
    const buttonSignupEl=divEl.querySelector('.buttonSignup')
    
    const resMessageEl=divEl.querySelector('.success-message')
    let form:any={}
    
  captureData(formEl)
    if(formEl){
       formEl.addEventListener("submit",async (e)=>{
        
        e.preventDefault()
        const {email, userName}=form
        const res= await state.signup(email,userName)

        if(resMessageEl){
            

            showMessage(res,resMessageEl)

        }
      })
    }
if(buttonSignupEl){

    buttonSignupEl.addEventListener("click", (e)=>{
        console.log(e)
        params.goTo("/welcome")
    })
}



    divEl.appendChild(styleEl)

    return divEl
}