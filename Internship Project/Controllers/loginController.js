const router = require('../routes/route');
const models = require('../src/Models/Model');
const signupModel = require('../src/Models/signupModel');

const loginController = () => {
    return ({
        login: (req, res) => {
            res.render('login', { credentials: true });
        },
        postLogin: async (req, res) => {
            const insertedData = req.body;
            const contentData = await models.find();
            const userData = await signupModel.find();
            var credentials = false;
            userData.forEach(function (loginData) {
                if (insertedData.email == loginData.email && insertedData.firstName == loginData.firstName && insertedData.lastName == loginData.lastName && insertedData.password == loginData.password) {
                    credentials = true;
                    res.render('index', { result: contentData });
                }
            })
            if (credentials == false) {
                res.render('login', { credentials: credentials });
            }
        }
    })
}
module.exports = loginController;