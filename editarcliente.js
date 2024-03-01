import { actualizarCliente, obtenerClienteId } from "./API.js";
import { validar } from "./funciones.js";


(function () {
    // Variables

    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmpresa = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');

    let idCliente;

    // Event Listeners

    document.addEventListener('DOMContentLoaded', () =>{
        
        // Listener para el formulario
        formulario.addEventListener('submit', actualizarClienteFormulario);

        // Verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);

        // Extraer unicamente el id de la URL
        idCliente = parseInt(parametrosURL.get('id'));

       obtenerClienteFormulario(idCliente);
    });

    // Funciones

    async function obtenerClienteFormulario(idCliente) {
        const datosCliente = await obtenerClienteId(idCliente);

        // Llenar formulario
        llenarFormulario(datosCliente);
    }

    function llenarFormulario(datosCliente) {
        const {nombre, email, telefono, empresa} = datosCliente;

        inputNombre.value = nombre;
        inputEmail.value = email;
        inputTelefono.value = telefono;
        inputEmpresa.value = empresa;
    }


    function actualizarClienteFormulario(e) {
        e.preventDefault();

        // Actualizar cliente
        const clienteActualizado = {
            nombre: inputNombre.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            empresa: inputEmpresa.value,
            id: idCliente 
        }

        if (validar(clienteActualizado)) {
            
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Actualizar cliente / registro
        actualizarCliente(clienteActualizado)

    }

})();