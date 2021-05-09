export class Message {
    /*Devido a não poder usar os modelos do backend diretamente,
      é necessario criar esses modelos no frontend*/
    
    constructor(public content: string, public username: string, public messageId?: string, public userId?: string) //this.messageId = messageId;
    {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
}

