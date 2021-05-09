//É utilizado o express para realizar o roteamento
var express = require('express');
var router = express.Router();

//É necessario ter acesso ao modelo de message, afim de manipular o banco com o mongoose
var Message = require('../models/message');

//A rota é "/", pois foi definido que "/" seria redirecionado para "/message",
//sendo assim, já estamos em "/message" ao estar em "/"
router.post('/', function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });
    message.save(function(err, result){
        //console.log(result + " save");
        if(err){
            return res.status(500).json({
                myErroTitle: 'Erro no save',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: 'Mensagem salva',
            objMessageSave: result
        });
    });
});

//Nesse caso queremos recueprar todas mensagens do banco
router.get('/', function (req, res, next){
    Message.find()
        //exec(), realiza a execução de todos os metodos que estao na "cadeia de chamadas"
        .exec(function(err, result){
            if(err){
                return res.status(500).json({
                    myErrorTitle: "Erro na busca de todos dados",
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem recuperada cm sucesso",
                //Representante de todos os dados recuperados
                objMessagemsRecuperados: result
            });
        });
});

//Nesse caso queremos deletar uma unica mensagem do banco, atraves do _id
router.delete('/:id', function (req, res, next){

    Message.findByIdAndDelete(req.params.id, function(err, result){
            if(err){
                return res.status(500).json({
                    myErrorTitle: "Erro no deletar",
                    myError: err
                });
            }

            res.status(200).json({
                myMsgSucess: "Mensagem deletada",
                //Representante do dado deletado
                objMessageDelete: result
            });
        });
});

//Nesse caso queremos editar uma unica mensagem do banco, atraves do _id
router.patch('/', function (req, res, next){
    const query = {"_id" : req.body.messageId}
    const update = { 
                    "content": req.body.content 
                    }
    // console.log("vim do background")
    // console.log(req.body.content + " background")
    // console.log(req.body.messageId + " background")

    Message.findOneAndUpdate(query, update, function(err, result){
        //result.content = req.body.content
        console.log(result)
            if(err){
                return res.status(500).json({
                    myErrorTitle: "Erro no editar",
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem editada",
                //Representante do dado deletado
                objMessageEdit: result
            });
        });
});

module.exports = router;