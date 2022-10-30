import pool from '../configs/connectDB';
import { Request, Response } from 'express';
var mess = '';
var mess0 = '';
var message = { mess: mess, mess0: mess0 };
let getAllUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        const [rows, fields] = await pool.execute('SELECT * FROM userB where Admin = ?', [
            username,
        ]);
        message.mess0 = '';
        return res.render('allUser', { dataUser: rows, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let getAllVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        const [rows, fields] = await pool.execute('SELECT * FROM vehicle where Admin = ?', [
            username,
        ]);
        message.mess0 = '';
        (rows as any).forEach((veh: any) => {
            veh.type =
                veh.type === 'type1'
                    ? 'Bicycle/ Electric bicycle'
                    : veh.type === 'type2'
                    ? 'Motorcycle'
                    : veh.type === 'type3'
                    ? 'Car'
                    : 'Other';
        });
        return res.render('allVehicle.ejs', { dataVehicle: rows, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};

let getDetailPageU = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let id = req.params.userId;
        const [row, fields] = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        return res.render('detailU.ejs', { dataUser: row });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let getDetailPageV = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let id = req.params.idV;
        const [row, fields] = await pool.execute(
            'select * from vehicle where idV = ? AND Admin = ?',
            [id, username]
        );
        (row as any).forEach((veh: any) => {
            veh.type =
                veh.type === 'type1'
                    ? 'Bicycle/ Electric bicycle'
                    : veh.type === 'type2'
                    ? 'Motorcycle'
                    : veh.type === 'type3'
                    ? 'Car'
                    : 'Other';
        });
        return res.render('detailV.ejs', { dataVehicle: row });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let addNewUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var user = { username: username };
        message.mess = 'Added user successfully';
        let { fullName, tel, addr } = req.body;
        var [row, field] = await pool.execute('select * from userB where tel = ? and Admin = ?', [
            tel,
            username,
        ]);
        if ((row as any).length !== 0) {
            message.mess = 'Phone number already exists.';
            return res.render('console', { user: user, message: message });
        }
        await pool.execute(
            'insert into userB(fullName, inDebt, tel, addr, Admin) values(?, ?, ?, ?, ?);',
            [fullName, 0, tel, addr, username]
        );
        return res.render('console', { user: user, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let addNewVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var user = { username: username };
        message.mess = 'Added vehicle successfully';
        let { typeVehicle, license, id } = req.body;
        var [row, fields] = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        if ((row as any).length === 0) {
            message.mess = 'ID not found.';
            return res.render('console', { user: user, message: message });
        }
        var [row, fields] = await pool.execute(
            'select * from vehicle where license = ? AND Admin = ?',
            [license, username]
        );
        if ((row as any).length !== 0) {
            message.mess = 'License plate already exists.';
            return res.render('console', { user: user, message: message });
        }
        await pool.execute('insert into vehicle(license, type, id, Admin) values(?, ?, ?, ?);', [
            license,
            typeVehicle,
            id,
            username,
        ]);
        return res.render('console', { user: user, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let addNewTurn = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var user = { username: username };
        message.mess = 'Added parking turn successfully';
        let priceType1o = await pool.execute('select priceType1 from userAdmin where userA = ?', [
            username,
        ]);
        var tp1 = (priceType1o as any)[0][0].priceType1;
        let priceType2o = await pool.execute('select priceType2 from userAdmin where userA = ?', [
            username,
        ]);
        var tp2 = (priceType2o as any)[0][0].priceType2;
        let priceType3o = await pool.execute('select priceType3 from userAdmin where userA = ?', [
            username,
        ]);
        var tp3 = (priceType3o as any)[0][0].priceType3;
        let priceType4o = await pool.execute('select priceType4 from userAdmin where userA = ?', [
            username,
        ]);
        var tp4 = (priceType4o as any)[0][0].priceType4;
        let license = req.body.license;
        var [rows, fields] = await pool.execute(
            'select * from vehicle where license = ? AND Admin = ?',
            [license, username]
        );
        if ((rows as any).length === 0) {
            message.mess = 'No license plate found.';
            return res.render('console', { user: user, message: message });
        }
        let price =
            (rows as any)[0].type === 'type1'
                ? tp1
                : (rows as any)[0].type === 'type2'
                ? tp2
                : (rows as any)[0].type === 'type3'
                ? tp3
                : tp4;
        var [row, fields] = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            (rows as any)[0].id,
            username,
        ]);
        if ((rows as any).length === 0) {
            message.mess = 'ID not found.';
            return res.render('console', { user: user, message: message });
        }
        let inDebt = (rows as any)[0].inDebt;
        inDebt += price;
        await pool.execute('update userB set inDebt = ? where id = ? AND Admin = ?', [
            inDebt,
            (rows as any)[0].id,
            username,
        ]);
        return res.render('console', { user: user, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let deleteVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let idV = req.body.idV;
        await pool.execute('delete from vehicle where idV = ? AND Admin = ?', [idV, username]);
        return res.redirect('allVehicle');
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let deleteUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let id = req.body.id;
        await pool.execute('delete from vehicle where id = ? AND Admin = ?', [id, username]);
        await pool.execute('delete from userB where id = ? AND Admin = ?', [id, username]);
        return res.redirect('allUser');
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let editUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let id = req.params.id;
        let user = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        return res.render('updateU', { dataUser: (user as any)[0][0] });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let updateUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var [rows, fields] = await pool.execute('SELECT * FROM userB where Admin = ?', [username]);
        let { id, fullName, tel, addr } = req.body;
        let user = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        var [row, field] = await pool.execute('select * from userB where tel = ? and Admin = ?', [
            tel,
            username,
        ]);
        if ((rows as any).length !== 0 && (user as any)[0][0].tel !== tel) {
            message.mess0 = 'Phone number already exists.';
            return res.render('allUser', { dataUser: rows, message: message });
        }
        await pool.execute(
            'update userB set fullName = ?, tel = ?, addr = ? where id = ? AND Admin = ?',
            [fullName, tel, addr, id, username]
        );
        message.mess0 = 'Updated user successfully.';
        return res.render('allUser', { dataUser: rows, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let editVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let idV = req.params.idV;
        let vehicle = await pool.execute('select * from vehicle where idV = ? AND Admin = ?', [
            idV,
            username,
        ]);
        return res.render('updateV', { dataVehicle: (vehicle as any)[0][0] });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let updateVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var [rows, fields] = await pool.execute('SELECT * FROM vehicle where Admin = ?', [
            username,
        ]);
        (rows as any).forEach((veh: any) => {
            veh.type =
                veh.type === 'type1'
                    ? 'Bicycle/ Electric bicycle'
                    : veh.type === 'type2'
                    ? 'Motorcycle'
                    : veh.type === 'type3'
                    ? 'Car'
                    : 'Other';
        });
        let { idV, type, license, id } = req.body;
        var [row, field] = await pool.execute(
            'select * from vehicle where license = ? and Admin = ?',
            [license, username]
        );
        let vehicle = await pool.execute('select * from vehicle where idV = ? AND Admin = ?', [
            idV,
            username,
        ]);
        if ((rows as any).length !== 0 && (vehicle as any)[0][0].license !== license) {
            message.mess0 = 'License plate already exists.';
            return res.render('allVehicle.ejs', { dataVehicle: rows, message: message });
        }
        var [row, fields] = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        if ((rows as any).length === 0) {
            message.mess0 = 'ID not found.';
            return res.render('allVehicle.ejs', { dataVehicle: rows, message: message });
        }
        await pool.execute(
            'update vehicle set license = ?, type = ?, id = ? where idV = ? AND Admin = ?',
            [license, type, id, idV, username]
        );
        message.mess0 = 'Updated vehicle successfully.';
        return res.render('allVehicle.ejs', { dataVehicle: rows, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let payment = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        var user = { username: username };
        message.mess = 'Payment success';
        let { money, id } = req.body;
        if (money < 0) {
            message.mess = 'The amount cannot be negative.';
            return res.render('console', { user: user, message: message });
        }
        let userB = await pool.execute('select * from userB where id = ? AND Admin = ?', [
            id,
            username,
        ]);
        if ((userB as any)[0].length === 0) {
            message.mess = 'ID not found.';
            return res.render('console', { user: user, message: message });
        }
        let newInDebt = (userB as any)[0][0].inDebt - money;
        await pool.execute('update userB set inDebt = ? where id = ? AND Admin = ?', [
            newInDebt,
            id,
            username,
        ]);
        return res.render('console', { user: user, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let searchUser = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let name = req.body.keywordName;
        const [rows, fields] = await pool.execute(
            'select * from userB where fullName like ? AND Admin = ?',
            ['%' + name.toString() + '%', username]
        );
        return res.render('allUser', { dataUser: rows });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let searchVehicle = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let license = req.body.keywordLicense;
        const [rows, fields] = await pool.execute(
            'select * from vehicle where license like ? AND Admin = ?',
            ['%' + license.toString() + '%', username]
        );
        return res.render('allVehicle', { dataVehicle: rows });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
let changePrice = async (req: Request, res: Response) => {
    try {
        const username = req.session.username;
        let { priceType1, priceType2, priceType3, priceType4 } = req.body;
        await pool.execute(
            'update userAdmin set priceType1 = ?, priceType2 = ?, priceType3 = ?, priceType4 =? where userA = ?',
            [priceType1, priceType2, priceType3, priceType4, username]
        );
        var user = { username: username };
        if (priceType1 < 0 || priceType2 < 0 || priceType3 < 0 || priceType4 < 0) {
            message.mess = 'The price ticket cannot be negative.';
            return res.render('console', { user: user, message: message });
        }
        message.mess = 'Success';
        return res.render('console', { user: user, message: message });
    } catch (error) {
        console.log(error);
        return res.render('BUG');
    } finally {
        message.mess = '';
        message.mess0 = '';
    }
};
export {
    getAllUser,
    getDetailPageU,
    getDetailPageV,
    addNewUser,
    addNewVehicle,
    getAllVehicle,
    addNewTurn,
    deleteVehicle,
    deleteUser,
    editUser,
    updateUser,
    editVehicle,
    updateVehicle,
    payment,
    searchUser,
    searchVehicle,
    changePrice,
};
