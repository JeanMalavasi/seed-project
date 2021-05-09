import { Component } from "@angular/core";

@Component({

    selector: 'logout-app',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    
})

export class LogoutComponent{
    onLogout(){
        console.log("logout")
    }
}