const OTP = require('./signupController');
const email = require('./signupController');
let otpSystem;
let registeredEmail;
let otpUser;
const verifyController = () => {
    return {
        verify: (req, res) => {
            otpSystem = parseInt(OTP.OTP);
            registeredEmail = email.email;
            res.render('verify', { email: registeredEmail,invalidOTP:`` });
        },
        postverify: (req, res) => {
            otpUser = parseInt(req.body.OTP);
            if (otpUser == otpSystem) {
                res.redirect('/');
            }
            else {
                res.render('verify', { email: registeredEmail, invalidOTP: `Invalid OTP` })
            }
        }
    }
}
module.exports = verifyController;