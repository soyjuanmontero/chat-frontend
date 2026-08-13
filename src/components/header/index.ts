
export const initComponentHeader= ()=>{




class headerEl extends HTMLElement {
    constructor(){
        super()
    }
    shadow=this.attachShadow({mode:"open"})

    connectedCallback(){
        this.render()
    }
    render(){
        const headerEl=document.createElement('div')
        const styleEl=document.createElement('style')
    
        headerEl.classList.add('container')
          styleEl.innerHTML=`
        *{
          box-sizing:border-box;}
          .container{
          height:60px;
          background-color:#FF8282;
          }
        
            
        
        `


       

      
        this.shadow.appendChild(headerEl)
        this.shadow.appendChild(styleEl)


    }
}

customElements.define('header-el',headerEl)

}