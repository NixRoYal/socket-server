import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        let userDelete = usuariosConectados.borrarUsuario(cliente.id);
        console.log('Usuario borrado: ', userDelete);
        console.log('Cliente desconectado');
    })
}


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (pl: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', pl);
        io.emit('mensaje-nuevo', pl);
    });
}

// COnfigurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (pl: { nombre: string }, cb: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, pl.nombre);
        cb({
            ok: true, mensaje: `Usuario ${pl.nombre} configurado`
        })
        // io.emit('mensaje-nuevo', pl);
    });
}
