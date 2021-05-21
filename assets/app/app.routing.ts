import { RouterModule, Routes } from "@angular/router";
import { construct } from "core-js/fn/reflect";
import { AUTH_ROUTES } from "./auth/auth.routing";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AuthGuard } from "./guard/auth.guard";

import { MessagesComponent } from "./message/messages.component";


//É criado uma array de objetos js, representado todas rotas
//Cada rota sendo um path (localhost:3000/"path")
const APP_ROUTES: Routes = [
    //Path que lida com a raiz da aplicação (localhost:3000/), redirecionando ele para "/mensagens"
    { path: '', redirectTo: '/mensagens', pathMatch: 'full'},
    //Path que lida com o component mensagens da aplicação (localhost:3000/mensagens)
    { path: 'mensagens', component:MessagesComponent, canActivate: [AuthGuard] },
    //Path que lida com o component autenticação da aplicação (localhost:3000/autenticação)
    //É declarado que a rota "/autenticaçao", tambem poderá tratar suas filhas "/autenticacao/"path""
    { path: 'autenticacao', component:AuthenticationComponent, children: AUTH_ROUTES },

]

//É feito o registro das rotas, tornando as visiveis e permitindo que o angular manipule elas
export const myRouting = RouterModule.forRoot(APP_ROUTES);