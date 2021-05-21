import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../User.model";

@Component({

    selector: 'signin-app',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    
})

export class SigninComponent {
    constructor(private authService: AuthService){}

    onSubmit(form: NgForm){
        console.log(form.value)
        const usuarioAuxiliar = new User(
            form.value.emailTS, 
            form.value.passwordTS
            )

            this.authService.signin(usuarioAuxiliar)
            .subscribe(
                //.subcribe(), recebe 3 callbacks
                // 1 - Sucesso
                dadosSucesso => console.log(dadosSucesso),
                // 2- Erro
                dadosErro => console.log(dadosErro)
                // 3 - Extra(não utilizado)
            );
        //this.myForm.reset()
    }
}