import { Routes } from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

//É criado uma array de objetos js, representado todas subrotas de auth
//Cada rota sendo um path (localhost:3000/autenticacao/"path")
export const AUTH_ROUTES: Routes = [
    //Path que lida com a raiz da aplicação (localhost:3000/autenticacao/"path"), redirecionando ele para "/mensagens"
    { path: '', redirectTo: 'signup', pathMatch: 'full'},
    //Path que lida com o component signup do auth (localhost:3000/autenticacao/signup)
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'logout', component: LogoutComponent}

]