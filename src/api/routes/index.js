import authRouter from './auth.router.js';
import carRouter from './car.router.js';
const routes = (app) => {
    app.use('/auth',   authRouter );
    app.use('/car',   carRouter );
}
export default routes;