import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { User } from "./User.model";
import 'rxjs/Rx'
import { Observable } from "rxjs"
import moment = require("moment");

//Só é possivel injetar services dentro de classes com algum decorator
//sendo assim, usa-se o injectable (decorator) para permitir a injeção de um service
@Injectable()
export class AuthService {
    //A ideia de se utilizar um service, é disponibilizar os dados e funçoes, para um grupo ou todo projeto
    //Neste caso, o array vai conter todas mensagens, e sera utilizado por componentes externos.
    private authService: User[] = []

    //Injeção do Http service na classe
    constructor(private http: Http) { }

    //requisição para adicionar mensagem
    addUser(user: User) {
        //JSON.stringify(message): este comando retorna o "body" em formato "JSON", contendo a mensagem a ser salva,
        //a mensagem sera anexada ao "post request"
        const bodyReq = JSON.stringify(user);

        //Como o dado enviado sera JSON, é necessario explicitar isso
        const myHeaders = new Headers({ 'Content-Type': 'application/json' });

        console.log(bodyReq)

        return this.http.post(
            'http://localhost:3000/user', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }


    signin(user: User) {
        console.log(user)
        //JSON.stringify(message): este comando retorna o "body" em formato "JSON", contendo a mensagem a ser salva,
        //a mensagem sera anexada ao "post request"
        const bodyReq = JSON.stringify(user);
        
        //Como o dado enviado sera JSON, é necessario explicitar isso
        const myHeaders = new Headers({ 'Content-Type': 'application/json' });
        console.log(bodyReq + " headers no front")

        return this.http.post(
            'http://localhost:3000/user/signin', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) => {
                const responseEmJSON = responseRecebida.json();
                // const tokenResponseRecebido = responseEmJSON.objtoken;
                
                // console.log(responseEmJSON.token)
                // console.log(responseEmJSON.expiresIn)
                //calcuila o tempo ate o fim da sessão
                const expiresAt = moment().add(responseEmJSON.expiresIn, 'second');
                // console.log(expiresAt)

                //armazena o token cm a entrada chvae id_token
                localStorage.setItem('id_user', responseEmJSON.userId);
                localStorage.setItem('id_token', responseEmJSON.token);
                //armazena o tempo ate o fim da sessao
                localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

}