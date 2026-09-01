import { initComponentChat } from './components/chat'
import {initComponentTextField} from './components/texfield'
import { initComponentHeader } from './components/header'
import { initComponentButton } from './components/button'


import { initRouter } from './router';


initComponentTextField();
initComponentHeader();
initComponentChat();
initComponentButton()




function main(){
   const appEl=document.querySelector('.app')
    if(appEl){


        // initPageWelcome(appEl)
        initRouter(appEl)
    }



}

main()