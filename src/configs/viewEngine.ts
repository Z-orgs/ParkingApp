import express, { Express } from 'express';
import session from 'express-session';
const configViewEngine = (app: Express) => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};
export default configViewEngine;
