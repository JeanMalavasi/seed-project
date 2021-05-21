import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guard/auth.guard';


import { Message } from './message/Message.model';
import { MessageService } from './message/message.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    //utilizando o providers, foi declarado uma instancia global de MessageService
    

})
export class AppComponent {
    /*messageBinding: Message = new Message("Texto2", "Jean")
    messageBindingAlias: Message = new Message("Texto Alias2", "Jean Alias")

    //Vetor que simulara, varios dados no banco
    messageS: Message[] = [ new Message("Texto 1", "Jean 1"),
                            new Message("Texto 2", "Jean 2"),
                            new Message("Texto 3", "Jean 3")]
    */
};