//É utilizado o express para realizar o roteamento
var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//É necessario ter acesso ao modelo de user, afim de manipular o banco com o mongoose
var User = require('../models/user');
const { stringify } = require('querystring');



//Cadastro de usuario
router.post('/', function (req, res, next) {
    console.log("chegou no back")
    // console.log(req.body)
    // console.log(req.body.firstNameTS)

    //Encriptação de senha e criação do usuario, para persistir no banco
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email,
                sex: req.body.sex,
            });

            //Verifica se o usuario já foi cadastrado, pelo campo do email
            User.findOne({ email: user.email })
                .then(userAux => {
                    if (userAux) {
                        return res.status(401).json({
                            message: "Usuario já existente."
                        })
                    }

                    user.save().then(result => {
                        if (!result) {
                            return res.status(500).json({
                                message: "Erro ao criar a conta."
                            });
                        }
                        res.status(201).json({
                            message: "Conta criada com sucesso!",
                            result: result
                        });
                    })
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });


        });
});

//Login de usuario
router.post('/signin', (req, res, next) => {
    console.log("cheguei no back de login")
    let findUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    mesage: "Falhao ao logar-se."
                })
            }

            findUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            console.log(findUser);
            if (!result) {
                return res.status(401).json({
                    mesage: "Senha incorreta"
                })
            }

            //Criação do jwt
            const token = jwt.sign(
                { email: findUser.email, userId: findUser._id },
                "segredo_para_criar_o_token",
                { expiresIn: "1h" }
            )

            console.log(token)
            console.log(result)
            res.status(200).json({
                token: token,
                expiresIn: 120,
                userId: findUser._id
            });

        })
        .catch(e => {
            console.log(e)
        })
})

module.exports = router;