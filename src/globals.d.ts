declare module 'mysql2';
declare module 'path';
import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        loggedin: Boolean;
        username: string;
    }
}
