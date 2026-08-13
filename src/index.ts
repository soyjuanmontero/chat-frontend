import { initComponentChat } from './components/chat'
import {initComponentForm} from './components/form'
import { initComponentHeader } from './components/header'
import {initPageWelcome} from './pages/welcome'

import { initRouter } from './router';
import { ref, onValue } from "firebase/database"
import { db } from "./db"

initComponentForm();
initComponentHeader();
initComponentChat();




function main(){
   const appEl=document.querySelector('.app')
    if(appEl){


        // initPageWelcome(appEl)
        initRouter(appEl)
    }



}

main()