import express, { Request, Response } from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
const app = express();
const PORT = process.env.PORT || 80;
configViewEngine(app);
initWebRoute(app);
app.use((req: Request, res: Response) => {
    return res.redirect('/');
});
app.listen(PORT, () => {
    console.log(`OK: ${PORT}`);
});
