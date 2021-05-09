import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({

    selector: 'signup-app',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    
})

export class SignupComponent implements OnInit{ 
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
            passwordTS: new FormControl(null, Validators.required)
        });
    }

    onSubmit(){
        console.log(this.myForm)
        //this.myForm.reset()
    }
}{

}