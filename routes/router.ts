import { Router, Request, Response } from "express";
const router = Router();

router.get('/mensajes', (rq: Request, rs: Response) => {
    rs.json({ ok: true, mensaje: 'Todo esta bien' });
});

router.post('/mensajes', (rq: Request, rs: Response) => {
    const cuerpo = rq.body.cuerpo;
    const de = rq.body.de;
    rs.json({ ok: true, cuerpo, de });
});

router.post('/mensajes/:id', (rq: Request, rs: Response) => {
    const cuerpo = rq.body.cuerpo;
    const de = rq.body.de;
    const id = rq.params.id;
    rs.json({ ok: true, cuerpo, de, id });
});

export default router;
