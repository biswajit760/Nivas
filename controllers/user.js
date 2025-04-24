const User = require("../models/user.js");
module.exports.renderSignupForm = (req, res) => {
    res.render("./user/signup.ejs")
}

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Pass error to error-handling middleware
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => { 
    res.render("./user/login.ejs")
}

module.exports.login = async(req, res) =>{
    req.flash("success", "Welcome Back to WanderLust !");
    let redirectUrl = res.locals.redirectUrl ||  "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next)=>{
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings")
    })
}