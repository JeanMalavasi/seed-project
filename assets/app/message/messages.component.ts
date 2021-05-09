import { Component } from '@angular/core';

//Decorator que marca a classe como um componente
@Component({
    //Seletor que será chamado para renderizar o html
    selector: 'messages-app',
    //Caminho ate o arquivo html
    templateUrl: './messages.component.html',
    //Caminho ate o arquivo css
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent {
   
}