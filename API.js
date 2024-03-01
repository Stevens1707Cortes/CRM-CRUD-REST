const url = 'http://localhost:4000/clientes';

// Cuando se crea un nuevo cliente

export const nuevoCliente = async cliente => {
    
    try {

       await fetch(url, {
            // Metodo por utilizar: GET, POST, PUT, PATCH, DELETE
            method: 'POST',
            // Contenido de la peticion hacia la url.
                // Este body se envia de 2 formas: como String o como Object
            body: JSON.stringify(cliente), // Convertimos nuestro cliente en un string y lo enviamos por medio de POST
            // Informacion sobre el tipo de datos que estamos enviando
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html';

    } catch (error) {
        console.log(error);
    }
}

// Obtener los clientes de la API

export const obtenerClientes = async () =>{

    try {
        const resultado = await fetch(url);
        const datos = await resultado.json();
        return datos;

    } catch (error) {
        console.log(error);
    }
}

// Eliminar clientes de la API

export const eliminarCliente = async (id) => {
        
    try {
        
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

    } catch (error) {
        console.log(error);
    }
        
}   

// Obtiene Cliente por ID

export const obtenerClienteId = async (id) => {
    try {
        const resultados = await fetch(`${url}/${id}`);
        const datos = await resultados.json();
        return datos;

    } catch (error) {
        console.log(error);
    }
}

// Actualizar cliente

export const actualizarCliente = async (cliente) => {
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente), 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href = 'index.html';

    } catch (error) {
        console.log(error);
    }
}