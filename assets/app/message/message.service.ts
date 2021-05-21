import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Message } from "./Message.model";
import 'rxjs/Rx'
import { Observable } from "rxjs"

//Só é possivel injetar services dentro de classes com algum decorator
//sendo assim, usa-se o injectable (decorator) para permitir a injeção de um service
@Injectable()
export class MessageService {
    //A ideia de se utilizar um service, é disponibilizar os dados e funçoes, para um grupo ou todo projeto
    //Neste caso, o array vai conter todas mensagens, e sera utilizado por componentes externos.
    private messageService: Message[] = []

    //Injeção do Http service na classe
    constructor(private http: Http) { }

    //requisição para adicionar mensagem
    addMessage(message: Message) {
        // this.messageService.push(message);
        // console.log(this.messageService);

        //JSON.stringify(message): este comando retorna o "body" em formato "JSON", contendo a mensagem a ser salva,
        //a mensagem sera anexada ao "post request"
        const bodyReq = JSON.stringify(message);

        //Como o dado enviado sera JSON, é necessario explicitar isso
        const myHeaders = new Headers({ 'Content-Type': 'application/json' });
        console.log(bodyReq);

        //Esta linha "seta" o "observable".
        return this.http.post('http://localhost:3000/message', bodyReq, { headers: myHeaders })
            //o map possibilita tranformar os dados que vem do servidor
            .map((responseRecebida: Response) => {
                //aqui é pego a resposta enviada pelo servidor e transforma em json
                const responseEmJSON = responseRecebida.json();
                //aqui é pego o objeto que possui o conteuco, o autor, o _id
                const messagesResponseSalva = responseEmJSON.objMessageSave;

                //É criado um objeto message, que possui as informaçoes retornadas do banco.
                let transformedCastMessagesModelFrontend: Message;
                transformedCastMessagesModelFrontend = new Message(messagesResponseSalva.content, responseEmJSON.userName, messagesResponseSalva._id)

                //É adicionado a nova mensagem ao vetor que exibe as mensagens
                this.messageService.push(transformedCastMessagesModelFrontend)

                //console.log(this.messageService)

                return transformedCastMessagesModelFrontend;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    getListMessage() {
        //return this.messageService;

        //Esta linha "seta" o "observable".
        return this.http.get('http://localhost:3000/message')
            //o .map(), vai transformar as respostas vindas do banco, devido ao objeto puro, ter campos diferentes dos esperados no front
            .map((responseRecebida: Response) => {
                const responseEmJSON = responseRecebida.json();
                const messagesResponseRecebida = responseEmJSON.objMessagemsRecuperados;
                const authorResponseRecebida = responseEmJSON.author
                console.log(authorResponseRecebida)
                //vetor que armazenará as respostas já transformadas
                let transformedCastMessagesModelFrontend: Message[] = [];
                //Pega todos dados no vetor e transforma um a um, numa nova Mensagem e o armazena no vetor de mensagens tranformaadas
                let count = 0
                for (let msg of messagesResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new Message(msg.content, authorResponseRecebida[count], msg._id, null)
                    )
                count++;
                    //console.log(msg._id);

                }
                //Sincroniza o front com o back
                this.messageService = transformedCastMessagesModelFrontend
                // console.log(this.messageService[0].userId)
                // console.log(this.messageService[0].content)
                // console.log(this.messageService[0].username)
                //Retorna um vetor com as mensagens prontas para serem exibidas, já seguindo o modelo do frontend
                return transformedCastMessagesModelFrontend;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    deleteMessage(message: Message) {
        this.messageService.splice(this.messageService.indexOf(message), 1);

        //JSON.stringify(message): este comando retorna o "body" em formato "JSON", contendo a mensagem a ser excluida,
        //a mensagem sera anexada ao "post request"
        //const bodyReq = JSON.stringify(message);

        //console.log(message.content + " Mensagen do message.service")

        //Esta linha "seta" o "observable".
        return this.http.delete('http://localhost:3000/message/' + message.messageId)
            //o map possibilita tranformar os dados que vem do servidor
            //aqui é pego a resposta enviada pelo servidor e transforma em json
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));


    }

    editMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({ 'Content-Type': 'application/json' });

        //console.log("vim do service")

        return this.http.patch('http://localhost:3000/message/', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) =>  {
                const responseEmJSON = responseRecebida.json();
                const messagesResponseRecebida = responseEmJSON.objMessageEdit;
                // console.log(message.content)
                // console.log(this.messageService[0].content)
                // console.log(messagesResponseRecebida.content)

                //Busca o index  da mensagem
                const index = this.messageService.findIndex( edit => edit.content === messagesResponseRecebida.content)
               
                //console.log(index)
                //Realiza a troca do conteudo da mensagem
                this.messageService[index].content = message.content
                return messagesResponseRecebida;
                
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}