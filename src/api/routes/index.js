import authRouter from './auth.router.js';
import carRouter from './car.router.js';
import userRouter from './user.router.js';
import genreRouter from './genre.router.js';
import rentedCarInfoRouter from './rentedCarInfo.router.js';
const routes = (app) => {
    app.use('/auth',   authRouter );
    app.use('/car',   carRouter );
    app.use('/rentedCarInfo', rentedCarInfoRouter );
    app.use('/user',   userRouter );
    app.use('/genre',   genreRouter );
}
export default routes;