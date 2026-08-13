
export const initComponentForm= ()=>{




class formEl extends HTMLElement {
    constructor(){
        super()
    }
    shadow=this.attachShadow({mode:"open"})

    connectedCallback(){
        this.render()
         this.event()
       
    }   
      formEl=document.createElement('form')
         styleEl=document.createElement('style')
    
    event(){
                  this.formEl.addEventListener('submit',(e)=>{
                e.preventDefault()
                const data=e.target as any
                if(data){


                    const infoInput=data.elements.info.value
                  
                

                const enviarMensaje=new CustomEvent('sendInfo',{
                    detail:{
                        info:infoInput
                        
                    },
                     bubbles: true,
                     composed:true
            })

            this.dispatchEvent(enviarMensaje)

            data.reset()
        }
        
    })
    
    
}

    render(){
       
        const textLabel=this.getAttribute('textLabel') ?? ""
        const textButton=this.getAttribute('textButton')

          this.styleEl.innerHTML=`
        *{
          box-sizing:border-box;}
        .text-label{
            font-family:"roboto";
            font-size:24px;
            font-weight:500;
            margin:0;
        }
            .input-text, .button-primary{
            height:55px;
            width:100%}
            .input-text{
            border:solid 2px #000000;
            margin-bottom:16px;
            }
            .button-primary{
            background-color:#9CBBE9;
              font-family:"roboto";
            font-size:22px;
            font-weight:500;
            }
            
        
        `


        this.formEl.innerHTML=`
        <div>
            <label class='label'>
                <p class="text-label">${textLabel}</p>
                <input class='input-text' type="text" name="info">
            </label>

        </div>
        <div>
            <button class='button-primary' type="submit">${textButton}</button>
        </div>
        
        `
       
    
          
    
      
        this.shadow.appendChild(this.formEl)
        this.shadow.appendChild(this.styleEl)


    }
}

customElements.define('form-el',formEl)

}