const nodemailer = require('nodemailer');
const signupModel = require("../src/Models/signupModel");
const signupController = () => {
    return {
        signup: (req, res) => {
            res.render('signup');
        },
        registerSignup: async (req, res) => {
            const email = req.body.email;
            try {
                const register = await signupModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password
                })
            } catch (error) {
                console.log(error);
            }
            let OTP = Math.random();
            OTP = OTP * 1000000;
            OTP = Math.ceil(OTP);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vs125609@gmail.com',
                    pass: 'Vikram@123',
                }
            });
            const mailOption = {
                from: 'vs125609@gmail.com',
                to: `${email}`,
                subject: `Verification By One Time Password`,
                text: `Your Verification Code is ${OTP}`
            };
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Email Sent Successfully " + info.response);
                }
            })
            module.exports.OTP = OTP;
            module.exports.email = email;
            res.redirect('verify');
        }
    }
};
module.exports = signupController;