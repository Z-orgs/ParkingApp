import { Request, Response } from 'express';
var mess = '';
var message = { mess: mess };
let getHomePage = (req: Request, res: Response) => {
    try {
        return res.render('index.ejs');
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
let getLoginPage = function (req: Request, res: Response) {
    try {
        if (req.session.loggedin) {
            return res.redirect('/console');
        } else {
            return res.render('./LOG/login', { message: message });
        }
    } catch (error) {
        return res.redirect('/login');
    }
};
let getRegPage = function (req: Request, res: Response) {
    try {
        if (req.session.loggedin) {
            return res.redirect('/console');
        } else {
            return res.render('./REG/register', { message: message });
        }
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
let getConsolePage = async (req: Request, res: Response) => {
    try {
        if (req.session.loggedin) {
            const username = req.session.username;
            var user = { username: username };
            message.mess = '';
            return res.render('console', { user: user, message: message });
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        req.session.loggedin = false;
        req.session.username = '';
        return res.render('BUG');
    }
};
export { getHomePage, getConsolePage, getRegPage, getLoginPage };
