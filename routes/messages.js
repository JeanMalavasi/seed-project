//É utilizado o express para realizar o roteamento
var express = require('express');
var router = express.Router();

//É necessario ter acesso ao modelo de message, afim de manipular o banco com o mongoose
var Message = require('../models/message');
var User = require('../models/user');

//A rota é "/", pois foi definido que "/" seria redirecionado para "/message",
//sendo assim, já estamos em "/message" ao estar em "/"
router.post('/', function (req, res, next) {

    var message = new Message
        ({
            content: req.body.content,
            user: req.body.userId
        });

    User.findById(message.user, function (err, result) {
        if (err) {
            return res.status(500).json
                ({
                    myErroTitle: 'Erro no save',
                    myError: err
                });
        }

        // console.log(result)
        user = result.firstName + " " + result.lastName
        // console.log(user)

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    myErroTitle: 'Erro no save',
                    myError: err
                });
            }

            res.status(201).json({
                myMsgSucess: 'Mensagem salva',
                objMessageSave: result,
                userName: user
            })
        })
    })
});

//Nesse caso queremos recueprar todas mensagens do banco
router.get('/', function (req, res, next) {

    Message.find()
        .exec(function (err, resultMessage) {
            const author = []

            // console.log(err)
            // console.log(resultMessage)
            let countElement = resultMessage.length
            let count = 0
            console.log(count)
            console.log(countElement)

            while (count < countElement) {
                // console.log(count)
                User.findById(resultMessage[count].user, function (err, resultUser) {

                    console.log("cheguei na busca de user")
                    author.push(resultUser.firstName + " " + resultUser.lastName)
                    console.log(author)

                })
                count++;

            }
            console.log(author)
            console.log("cheguei no fim")

            res.status(200).json({
                myMsgSucess: "Mensagem recuperada cm sucesso",
                //Representante de todos os dados recuperados
                objMessagemsRecuperados: resultMessage,
                author: author
            });
        })
})

//Nesse caso queremos deletar uma unica mensagem do banco, atraves do _id
router.delete('/:id', function (req, res, next) {

    Message.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
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
router.patch('/', function (req, res, next) {
    console.log(req)
    const query = { "_id": req.body.messageId }
    const update = {
        "content": req.body.content
    }
    // console.log("vim do background")
    // console.log(req.body.content + " background")
    // console.log(req.body.messageId + " background")

    Message.findOneAndUpdate(query, update, function (err, result) {
        //result.content = req.body.content
        console.log(result)
        if (err) {
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