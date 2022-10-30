import pool from '../configs/connectDB';
import { Request, Response } from 'express';
function hashCode(input: String) {
    var hash = 0,
        i,
        chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
        chr = input.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
var mess = '';
var message = { mess: mess };
let authLOG = async (req: Request, res: Response) => {
    try {
        var userA = req.body.username;
        var pword = req.body.password;
        pword = hashCode(pword);
        const [rows, fields] = await pool.execute(
            'select * from userAdmin where userA = ? AND pword = ?',
            [userA, pword]
        );
        if ((rows as any).length == 0) {
            message.mess = 'Login failed please check again';
            return res.render('./LOG/login', { message: message });
        } else {
            req.session.loggedin = true;
            req.session.username = userA;
            return res.redirect('/console');
        }
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
let authREG = async (req: Request, res: Response) => {
    try {
        var userA = req.body.username;
        var pword = req.body.password;
        var cpword = req.body.confirmPassword;
        pword = hashCode(pword);
        cpword = hashCode(cpword);
        if (pword !== cpword) {
            message.mess = 'Passwords are not the same';
            return res.render('./REG/register', { message: message });
        } else if (pword === cpword) {
            const [rows, fields] = await pool.execute('select * from userAdmin where userA = ?', [
                userA,
            ]);
            if ((rows as any).length == 0) {
                await pool.execute('insert into userAdmin(userA, pword) values (?, ?)', [
                    userA,
                    pword,
                ]);
                message.mess = 'Sign Up Success';
                res.render('./LOG/login', { message: message });
            } else {
                message.mess = 'Username already exists';
                return res.render('./REG/register', { message: message });
            }
        }
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
let changePass = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var user = { username: username };
        var newPass = hashCode(req.body.newPass);
        var reNewPass = hashCode(req.body.reNewPass);
        var tmpUser = await pool.execute('select * from userAdmin where userA = ? AND pword = ?', [
            req.session.username,
            hashCode(req.body.oldPass),
        ]);

        if ((tmpUser as any)[0].length == 1) {
            if (newPass === reNewPass) {
                await pool.execute('update userAdmin set pword = ? where userA = ?', [
                    newPass,
                    req.session.username,
                ]);
                message.mess = 'Change password successfully';
                return res.render('console', { user: user, message: message });
            } else {
                message.mess = 'New passwords are not the same';
                return res.render('console', { user: user, message: message });
            }
        } else {
            message.mess = 'Old password is not correct.';
            return res.render('console', { user: user, message: message });
        }
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
let logout = (req: Request, res: Response) => {
    try {
        req.session.loggedin = false;
        req.session.username = '';
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    }
};
export { authLOG, authREG, changePass, logout };
