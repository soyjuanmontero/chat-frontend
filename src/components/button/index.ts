
export const initComponentButton= ()=>{




class buttonEl extends HTMLElement {
    constructor(){
        super()
    }
    shadow=this.attachShadow({mode:"open"})

    connectedCallback(){
        this.render()
    }
    render(){
        const divEl=document.createElement('div')
        const styleEl=document.createElement('style')
      const   textButton=this.getAttribute('textButton')
      const classButton=this.getAttribute('classButton')
    
        divEl.classList.add('container')
          styleEl.innerHTML=`

          .button{
          
          font-family:"roboto";
        font-size:22px;
        font-weight:500;
         height:55px;
        width:100%;
        border-radius:4px;
          }
      .button-primary{
            background-color:#9CBBE9;
            
            }
            .button-signup{
            background-color:#adadad}
        
            
        
        `
divEl.innerHTML=`
        <button class="button ${classButton}" type="submit">${textButton}</button>
`
        const buttonEl=divEl.querySelector(".button")
        if(buttonEl){

        
       buttonEl.addEventListener('click', () => {
 
  const form = this.closest('form');
  
  if (form) {
    
    form.requestSubmit();
  }
  
});
}

      
        this.shadow.appendChild(divEl)
        this.shadow.appendChild(styleEl)


    }
}

customElements.define('button-el',buttonEl)

}