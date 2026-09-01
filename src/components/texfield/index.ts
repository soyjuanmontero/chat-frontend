
export const initComponentTextField= ()=>{




class textField extends HTMLElement {
    static formAssociated = true;
    
    internals: ElementInternals;
    constructor(){
        super()
        this.internals = this.attachInternals();
    }
    shadow=this.attachShadow({mode:"open"})

    connectedCallback(){
        this.render()
         this.event()
        
       
    }   
   
      divEl=document.createElement('div')
         styleEl=document.createElement('style')

    
    event(){
        const input=this.divEl.querySelector(".input-text")
        if(input){


              input.addEventListener('input',(e)=>{
               
                e.preventDefault()
                const data=e.target as HTMLInputElement | HTMLSelectElement;
               
                if(data){

                    const name=data.name
                    const infoInput=data.value
                    this.internals.setFormValue(infoInput);
                   
                    
                    
                  
                    const enviarMensaje=new CustomEvent('sendInfo',{
                        
                        detail:{
                           [ name]:infoInput
                            
                        },
                        bubbles: true,
                        composed:true
                    })
                    
                    this.dispatchEvent(enviarMensaje)
                

           
        }
        
    })}
           
    
    
}
 textLabel=this.getAttribute('textLabel') ?? ""
 
 nameInput=this.getAttribute("nameInput")
 typeInput=this.getAttribute("typeInput")?? "text"
 tag=this.getAttribute("tag")?? ""


dynamicTag(tag:String){
    if(tag==="select"){
        return `<select class="input-text" name="${this.nameInput}">
          <option value="" selected disabled></option>

        <option value="new">Nuevo Room</option>
        <option value="exist" >Room existente</option>
        
        </select>`
        
    }else{
        return `<input class='input-text' type="${this.typeInput}" name="${this.nameInput}">`
        
    }
}

render(){
       
        

          this.styleEl.innerHTML=`
        *{
          box-sizing:border-box;}
        .text-label{
            font-family:"roboto";
            font-size:24px;
            font-weight:500;
            margin:0;
        }
            .input-text{
            height:55px;
            width:100%;
            
            border:solid 2px #000000;
            margin-bottom:16px;
            }
          
            
        
        `
const  tag =this.dynamicTag(this.tag)


        this.divEl.innerHTML=`
        
            <label class='label'>
                <p class="text-label">${this.textLabel}</p>
                
                ${tag}
            </label>

        
       
        
        `
        const inputEl=this.divEl.querySelector(".input-text")
        if(inputEl){

        
        inputEl.addEventListener('keydown', (e:any) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const form = this.closest('form');
        if (form) {
            form.requestSubmit();
        }
    }
});
}
       
    
          
    
      
        this.shadow.appendChild(this.divEl)
        this.shadow.appendChild(this.styleEl)


    }
    formResetCallback() {
      this.clearInput();
    }
     clearInput() {
    const input = this.divEl.querySelector('.input-text') as HTMLInputElement | HTMLSelectElement;
    
    if (input) {
        input.value = ""; 
        this.internals.setFormValue("");
    }
}
}

customElements.define('text-field',textField)

}