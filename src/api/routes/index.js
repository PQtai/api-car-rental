import authRouter from './auth.router.js';
import carRouter from './car.router.js';
import genreRouter from './genre.router.js';
const routes = (app) => {
    app.use('/auth',   authRouter );
    app.use('/car',   carRouter );
    app.use('/genre',   genreRouter );
}
export default routes;