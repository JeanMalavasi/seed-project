import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UnicMessageComponent } from './message/unic-message/unic.message.component';
import { InputMessageComponent } from './message/input-message/input.message.component';
import { ListMessageComponent } from './message/list-message/list.message.component';
import { MessagesComponent } from './message/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header/header.component';
import { myRouting } from './app.routing';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HttpModule } from '@angular/http';
import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { MessageService } from './message/message.service';

@NgModule({
    declarations: [
        AppComponent,
        /*Declaraçao do componente ListMessage, para que seu html
        possa ser renderizado no appComponent.html*/
        UnicMessageComponent,
        InputMessageComponent,
        ListMessageComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        /*Necessario para utilização do Template-Driven, two-way binding*/
        FormsModule,
        //É feito o registro das rotas, tornando as visiveis e permitindo que o angular manipule elas
        myRouting,
        //Necessario para utilização do Data-driven
        ReactiveFormsModule,
        //Necessario para realizar as requisiçoes http
        HttpModule
    ],
    providers: [
        AuthGuard,
        MessageService, 
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}