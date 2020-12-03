const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')


router.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: process.env.PORT,
        auth: {
            user: "a0e619621fe632",
            pass: "86c2ca55b8b003"
        }
    });


    const mailOptions = {
        from: req.body.email,
        to: 'destinatario@teste.com',
        subject: `Esse é um email teste ${req.body.name} `,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('#### ERROR =>', error)
            res.json({ type: 'danger', message: 'Erro eo enviar o e-mail', data: error })
        } else {
            res.json({
                type: 'success',
                message: 'E-mail enviado com sucesso',
                data: info.respo
            })
        }
    });
})


module.exports = router;