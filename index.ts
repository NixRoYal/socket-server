import Server from './classes/server';
import router from './routes/router';
import bodyPparser from "body-parser";
import cors from "cors";
const server = new Server();

// Body Parser
server.app.use(bodyPparser.urlencoded({ extended: true }));
server.app.use(bodyPparser.json());
server.app.use(cors({ origin: true, credentials: true }));// CORS  acceso a cualquier persona a tu serivod
server.app.use('/api', router);// Rutas de servicios rutas de los servicios REST get,post,put,delete



server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
