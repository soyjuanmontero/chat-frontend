import { initPageStep1 } from "./pages/step-1";
import { initPageWelcome } from "./pages/welcome";

interface Params {
    goTo: Function
}
interface Routes{
    path:RegExp,
    render:(params:Params)=>Element
}

const routes:Routes[]=[
    {
        path: /\//,
        render:initPageWelcome

    },
     {
        path: /\/step-1/,
        render:initPageStep1

    }


]



export function initRouter(container:Element){

    function goTo(path:string){
        
        history.pushState({}, "", path)

        handlerRoute(path)
        if(path === "/step-1"){
            history.pushState({}, "", path);
        }
    
       


    }

    function handlerRoute(route:string){
        for(let r of routes ){
           if(r.path.test(route)){
            const el=r.render({goTo:goTo})
            container.innerHTML=""
            container.appendChild(el)

        }


    }    

    

}
addEventListener("popstate", (event) => { 
   
    
  
   handlerRoute(location.pathname)
    })




    handlerRoute(location.pathname)
}

