export class User{
    /*Devido a naão poder usar os modelos do backend diretamente,
      é necessario criar esses modelos no frontend*/
    constructor(public email: string, public password: string, public firstName?: string, public lastName?: string, public sex?: number)
    {

    }
}