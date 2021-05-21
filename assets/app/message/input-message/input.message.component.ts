import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Message } from "../Message.model";
import { MessageService } from "../message.service";

@Component({

    selector: 'input-message-app',
    templateUrl: './input.message.component.html',
    styleUrls: ['./input.message.component.css'],
    //utilizando o providers, foi declarado uma instancia local de MessageService
    //providers: [MessageService]

})

export class InputMessageComponent {
    //utilizando o constructor, foi feita de fato a injeção do service na classe
    constructor(private messageService: MessageService){}

    //Metodo de salvar as mensagens no vetor
    /*onSave(textConsole: string){
        const messageAuxiliar = new Message(textConsole, "JP - Service") 
        this.messageService.addMessage(messageAuxiliar);
        //console.log(textConsole)
    }*/

    //Metodo que utiliza de template driven, para capturar o conteudo do input posto no form "(name="myContentngForm")"
    onSubmit(form: NgForm){
        const messageAuxiliar = new Message(form.value.myContentngForm, "JP - Template-Driven", "",localStorage.getItem('id_user'))
        this.messageService.addMessage(messageAuxiliar)
            //Com a função "addMessage(), retornado um "Observable"
            //podemos utilizar o ".subscribe()", para enviar a requisição
            .subscribe(
                //.subcribe(), recebe 3 callbacks
                // 1 - Sucesso
                dadosSucesso => console.log(dadosSucesso),
                // 2- Erro
                dadosErro => console.log(dadosErro)
                // 3 - Extra(não utilizado)
            );

         //console.log(form)
         form.resetForm()
    }
}