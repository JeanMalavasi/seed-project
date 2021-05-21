import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { User } from "../user.model";
import { AuthService } from "../auth.service";


@Component({

    selector: 'signup-app',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    
})

export class SignupComponent implements OnInit{ 
    
    constructor(private authService: AuthService){}
        
    //myForm recebe um objeto JS, que representa e registra os "controls" desse form
    myForm: FormGroup


    ngOnInit(){
        //Aqui é feita a criaçao do propio form
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, 
            [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required),
            sexTS: new FormControl(null, Validators.required)
        });
    }

    onSubmit(form: NgForm){
        //console.log(form.value)
        const usuarioAuxiliar = new User(
            form.value.emailTS, 
            form.value.passwordTS, 
            form.value.firstNameTS,
            form.value.lastNameTS,
            form.value.sexTS
            )
        console.log(usuarioAuxiliar)
        
        this.authService.addUser(usuarioAuxiliar)
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

    //     //this.myForm.reset()
    }
}