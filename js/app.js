
// IIFE = Immediatly invoked function expression
import { eliminarCliente, obtenerClientes } from "./API.js";

(function () {
    
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', ()=>{
        // Se ejecuta si la base de datos esta creada y puede abrirse
        mostrarClientes();
        
    });

    //Funciones

    async function mostrarClientes() {
        limpiarHTML();

        // Se usa async await para poder utilizar los datos una vez cargados, de otro modo, nos saldria un error (pending)
        const clientes = await obtenerClientes();

        clientes.forEach((cliente) => {
          const { nombre, email, telefono, empresa, id } = cliente;

          const trRegistro = document.createElement("tr");
          // trRegistro.dataset.id = id;

          // scRIPTING DE LOS ELEMENTOS...
          const nombreCorreo = document.createElement("td");
          nombreCorreo.className =
            "px-6 py-4 whitespace-no-wrap border-b border-gray-200";
          const nombreLista = document.createElement("p");
          nombreLista.textContent = `${nombre}`;
          nombreLista.className = "font-bold";
          const correoLista = document.createElement("p");
          correoLista.textContent = `${email}`;

          const telefonoLista = document.createElement("td");
          telefonoLista.className =
            "px-6 py-4 whitespace-no-wrap border-b border-gray-200";
          telefonoLista.textContent = `${telefono}`;

          const empresaLista = document.createElement("td");
          empresaLista.className =
            "px-6 py-4 whitespace-no-wrap border-b border-gray-200";
          empresaLista.textContent = `${empresa}`;

          //Botones
          const botonesLista = document.createElement("td");
          botonesLista.className =
            "px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-red-700";
          // Agregar un botón de eliminar...
          const btnEliminar = document.createElement("a");
          // btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
          btnEliminar.setAttribute("href", `#`);
          btnEliminar.onclick = () => eliminarRegistro(id);
          btnEliminar.dataset.cliente = id;
          btnEliminar.textContent = "Eliminar";

          // Añade un botón de editar...
          const btnEditar = document.createElement("a");
          btnEditar.className = "text-blue-700 mx-5";
          btnEditar.setAttribute("href", `editar-cliente.html?id=${id}`);
          btnEditar.textContent = "Editar";

          // Agregar al HTML
          nombreCorreo.appendChild(nombreLista);
          nombreCorreo.appendChild(correoLista);
          trRegistro.appendChild(nombreCorreo);
          trRegistro.appendChild(telefonoLista);
          trRegistro.appendChild(empresaLista);
          botonesLista.appendChild(btnEditar);
          botonesLista.appendChild(btnEliminar);
          trRegistro.appendChild(botonesLista);

          listadoClientes.appendChild(trRegistro);

        });
    } 

    function eliminarRegistro(id) {
        
        const confirmar = confirm('¿Deseas eliminar este cliente?');

        if (confirmar === true) {
            
            eliminarCliente(id);

            return;
        } 
    }   

    function limpiarHTML() {
      while(listadoClientes.firstChild) {
            listadoClientes.removeChild(listadoClientes.firstChild);
        }
    }

})();
