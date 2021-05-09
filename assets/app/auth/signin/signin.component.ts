import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({

    selector: 'signin-app',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    
})

export class SigninComponent { 
    myForm: FormGroup


    ngOnInit(){
        //Aqui é feita a criaçao do propio form
        this.myForm = new FormGroup({
            emailTS: new FormControl(null, 
            [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }

    onSubmit(){
        console.log(this.myForm)
        //this.myForm.reset()
    }
}