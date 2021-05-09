import { Component, OnInit } from "@angular/core";
import { Message } from "../Message.model";
import { MessageService } from "../message.service";

@Component({

    selector: 'list-message-app',
    templateUrl: './list.message.component.html',
    styleUrls: ['./list.message.component.css'],
    //utilizando o providers, foi declarado uma instancia local de MessageService
    //providers: [MessageService]

})

export class ListMessageComponent implements OnInit {
    //utilizando o constructor, foi feita de fato a injeção do service na classe
    constructor(private messageService: MessageService){}
    
    messages: Message[] = []
    
    //Utilização de um ciclo de vida do angular, que executa a tarefa quando o componente é iniciado
    ngOnInit(): void {
        //Foi feito com que o vetor messageS, apontasse para o array de messageService, o qual armazena os dados
        //this.messages = this.messageService.getListMessage()
        
        //Como a função "getListMessage()" retorna um "Observable", 
        //podemos utilizar o ".subscribe()", para enviar a requisição 
        this.messageService.getListMessage()
            .subscribe(
                //Dados sucesso está recebendo o retorno de getList
                //em caso de sucesso recebe o vetor "transformedCastMessagesModelFrontend", com os dados
                //em caso de erro, recebera o erro
                (dadosSucesso: Message[]) => {
                    this.messages = dadosSucesso;
                    console.log(dadosSucesso)
                },
                dadosErro => console.log(dadosErro)
            )
    }

    //Verifica a quantidade de elementos no vetor, para fazer a redenrização usando ngIf
    verificaTamanho(array: Message[]){
        if(array.length > 0){
            return true
        }
        return false
    }
}