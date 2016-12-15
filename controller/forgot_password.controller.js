require('dotenv').config()
const models = require('../models')
const User = models.User
const Message = models.Message
const crypto = require('crypto');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api/forgot_password'

const helper = require('sendgrid').mail

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

function makeRandomPassword()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    sendRequest: (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((data) => {
            if (data.id) {

                from_email = new helper.Email("admin@brtr.com")
                to_email = new helper.Email(`${req.body.email}`)
                subject = "Forgot Password"
                content = new helper.Content(
                    "text/html",
                    `
                    <div style="text-align:center; background-color:black; padding:50px">
                      <img src='http://i.imgur.com/5KBXgFb.png' alt='brtr'/><br/><br/>
                      <form action="${BASE_URL}/api/forgot_password/verify_request_password/${data.password}">
                        <input type="submit" value="Click here to reset your password" />
                    </form>
                    </div>
                  `
                )
                mail = new helper.Mail(from_email, subject, to_email, content)

                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });

                sg.API(request, function(error, response) {
                    res.status(200).json('email send')
                })
            }
        }).catch((err) => {
            res.status(500).json(err)
        })
    },

    resetPassword: (req, res) => {
        User.findOne({
            where: {
                password: req.params.password
            }
        }).then((data) => {
            if (data.username) {
                const newPass = makeRandomPassword()
                const newPassHash = crypto.createHash('md5').update(newPass).digest("hex")
                from_email = new helper.Email("admin@brtr.com")
                to_email = new helper.Email(data.email)
                subject = "Forgot Password"
                content = new helper.Content(
                    "text/plain",
                    `your new password is ${newPass}`
                )
                mail = new helper.Mail(from_email, subject, to_email, content)

                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });

                sg.API(request, function(error, response) {
                    User.update({
                        password: newPassHash
                    }, {
                        where: {
                            email: data.email
                        }
                    }).then((data) => {
                        res.status(200).json('Redirecting.. Your new password will be ready in a few seconds..')
                    }).catch((err) => {
                        res.status(500).json(err)
                    })

                })
            }
        })
    }
}
