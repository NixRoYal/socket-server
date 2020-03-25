import { Router, Request, Response } from "express";
import Server from '../classes/server';
const router = Router();

router.get('/mensajes', (rq: Request, rs: Response) => {
    rs.json({ ok: true, mensaje: 'Todo esta bien' });
});

router.post('/mensajes', (rq: Request, rs: Response) => {
    const cuerpo = rq.body.cuerpo;
    const de = rq.body.de;
    const payload = { de, cuerpo }
    const server = Server._;
    server.io.emit('mensaje-nuevo', payload);
    rs.json({ ok: true, cuerpo, de });
});

router.post('/mensajes/:id', (rq: Request, rs: Response) => {
    const cuerpo = rq.body.cuerpo;
    const de = rq.body.de;
    const id = rq.params.id;
    const payload = { de, cuerpo }

    const server = Server._;
    server.io.in(id).emit('mensaje-privado', payload);

    rs.json({ ok: true, cuerpo, de, id });
});

export default router;
