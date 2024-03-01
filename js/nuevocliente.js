import { nuevoCliente, obtenerClientes } from "./API.js";
import { imprimirAlerta, validar } from "./funciones.js";

(function() {

    // Variables
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{
        // Formulario
        formulario.addEventListener('submit', validarCliente);
    });


    // Funciones

    async function validarCliente(e) {
        e.preventDefault();

        const clientes = await obtenerClientes();
        
        // Leer todos los inputs
        const inputNombre = document.querySelector('#nombre').value;
        const inputEmail = document.querySelector('#email').value;
        const inputTelefono = document.querySelector('#telefono').value;
        const inputEmpresa = document.querySelector('#empresa').value;

        // Crear un objeto con la informacion

        const cliente = {
            nombre: inputNombre,
            email: inputEmail,
            telefono: inputTelefono,
            empresa: inputEmpresa,
            id: Date.now()
        }

        if (validar(cliente)) {
            
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Validacion, si ya existe el email

        if(clientes.some( clte => clte.email === cliente.email)){

            imprimirAlerta('El email ya esta registrado', 'error');
            return;
        }

        nuevoCliente(cliente);
    }

})();
