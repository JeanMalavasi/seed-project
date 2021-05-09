
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../Message.model';
import { MessageService } from '../message.service';
//Decorator que marca a classe como um componente
@Component({
    //Seletor que será chamado para renderizar o html
    selector: 'unic-message-app',
    //Caminho ate o arquivo html
    templateUrl: './unic.message.component.html',
    //Caminho ate o arquivo css
    styleUrls: ['./unic.message.component.css']
})

export class UnicMessageComponent {
    constructor(private messageService: MessageService){}
    
    //Decorator utilizado para que a variavel possa receber valores de fora, via parametros no selector do app
    @Input() messageVarClasse: Message = new Message("", "");
    //@Input('inputMessage') messageVarClasseAlias: Message = new Message("", "");
    
    //Criação de objetos que permitem criar e ouvir eventos, afim de enviar ou ouvir um evento vindo de um lugar.
    /*@Output() editClicked_MesageMetodoClasse = new EventEmitter<string>()
    @Output('outputMessage') editClicked_MesageMetodoClasseAlias = new EventEmitter<string>()
    */

    //Fonte de dados para alimitar o metodo de string interpolation,
    //presente no html
    /*message = {
        content: "ola",
        author: "jean"
    }*/

    //Função que sera chamada ao clicar no editar, usando Event Binding
    onEdit(form: NgForm){
        const messageAuxiliar = new Message(form.value.myContentEditngForm, "JP - Editado", this.messageVarClasse.messageId)
        //console.log(messageAuxiliar)
        this.messageService.editMessage(messageAuxiliar)
        .subscribe(
            // 1 - Sucesso
           dadosSucesso => console.log(dadosSucesso),
            // 2- Erro
           dadosErro => console.log(dadosErro)
            // 3 - Extra(não utilizado)
        );
            
     //console.log(form)
     form.resetForm()
    }



    //Como a função "deleteMessage()" retorna um "Observable", 
    //podemos utilizar o ".subscribe()", para enviar a requisição 
    onDelete(){
        //console.log(this.messageVarClasse.content + " Mensagem do Unic.message")
        //const messageAuxiliar = new Message(this.messageVarClasse.content , this.messageVarClasse.username)
        this.messageService.deleteMessage(this.messageVarClasse)
            .subscribe(
                // 1 - Sucesso
                dadosSucesso => console.log(dadosSucesso),
                // 2- Erro
                dadosErro => console.log(dadosErro)
            )
    }
}