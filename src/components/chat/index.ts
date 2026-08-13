
export const initComponentChat= ()=>{
  type Message="sent"|'received'



class chatEl extends HTMLElement {
    constructor(){
        super()
    }
    shadow=this.attachShadow({mode:"open"})

    connectedCallback(){
        this.render()
    }
  

      chatEl=document.createElement('div') 
        styleEl=document.createElement('style')

         AddStyleToTheMessage(attribute:Message){

           const bubble=this.chatEl.querySelector('.paragraph')
           const userNameEl=this.chatEl.querySelector('.user-name')
          
           if (bubble){

             if(attribute==="sent"){
                 bubble.classList.add('sent__buble')
                 this.chatEl.classList.add('sent')
     
             }else{
                 bubble.classList.add("received__buble")
                 this.chatEl.classList.add('received')
                 userNameEl?.classList.add('active')
             }


           }


        }

    render(){
      
        const typeMessage=this.getAttribute('typeMessage')
        const message=this.getAttribute('text')
        const userName=this.getAttribute("userName") ?? ""
    
        this.chatEl.classList.add('container')
          this.styleEl.innerHTML=`
        *{
          box-sizing:border-box;}
          
          .container{
          display: flex;
          flex-direction:column;
  margin-bottom: 10px;
  width: 100%;
         
          }

          .sent{
          align-items: flex-end;
          }

          .received{
          align-items: flex-start
          }
           .paragraph{
            margin:0;
           text-align:center;
           padding:10px 15px;
            max-width: 70%;         
        width: fit-content;  
        border-radius:4px;
           
            }
          
                    :host {
            --mensaje-enviado: #B9E97C;
            --mensaje-recibido: #D8D8D8;
          }
            .sent__buble{
            background-color:var(--mensaje-enviado);
            
             color: black;
            }
            .received__buble{
            background-color:var(--mensaje-recibido);
             
             color: black;
          }
            .user-name{
            margin:0;
            margin-bottom:5px;
            font-size:14px;
            color:#A5A5A5;
            display:none;
            
        }
            .active{
            display:inherit;}
           



        `
        
        this.chatEl.innerHTML=`
        <p class="user-name">${userName}</p>
        <p class="paragraph">
        ${message}
        </p>
        `
        
        this.AddStyleToTheMessage(typeMessage as Message)


       

      
        this.shadow.appendChild(this.chatEl)
        this.shadow.appendChild(this.styleEl)


    }
}

customElements.define('chat-el',chatEl)

}