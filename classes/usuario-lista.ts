import { Usuario } from './usuario';
export class UsuariosLista {
    private lista: Usuario[] = [];
    constructor() { }
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(usuario);
        return usuario;
    }
    public actualizarNombre(id: string, nombre: string) {
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando Usuario');
        console.log(this.lista);
    }
    public getLista() {
        return this.lista.filter(user => user.nombre !== 'sin-nombre');
    }
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id)
    }
    public getUsuarioEnSale(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUser;
    }
}
