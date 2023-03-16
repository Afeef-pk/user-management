const User = require('../models/userModel')

const loadRegister = async (req, res) => {

    try {
        res.render('registration')
    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async (req, res) => {

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            is_admin: 0
        })

        const userData = await user.save()
        if (userData) {

            res.render('registration', { message: "SUCCESSFULLY REGISTRED" })

            // const loadLoginAfterRegister = setTimeout(afterRegister, 3000);
            // function afterRegister() {
            //     res.redirect('/login')
            // }
        } else {
            res.render('registration', { message: "your registration has been failed" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

//login user method

const loginLoad = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

//verify login

const verifyLogin = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password
        const userData = await User.findOne({ email: email })

        if (userData) {

            if (password === userData.password) {

                if (userData.is_admin === 1) {
                    res.render('login', { message: "Email or Password is incorrect" })
                } else {
                    req.session.user_id = userData._id
                    res.redirect('/home')
                }
            } else {
                res.render('login', { message: "Password is incorrect" })
            }
        }

        else {
            res.render('login', { message: "Email or Password is incorrect" })
        }

    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async (req, res) => {

    try {
        const userData = await User.findById({ _id: req.session.user_id })
        res.render('home', { user: userData })
    } catch (error) {
        console.log(error.message)
    }
}

const userLogout = async (req, res) => {

    try {
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}