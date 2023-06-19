const NombreInput = document.querySelector('#Nombre');
const ApellidoInput = document.querySelector('#Apellido');
const NumerodevueloInput = document.querySelector('#Numerodevuelo');
const telefonoInput = document.querySelector('#telefono');
const LugardeorigenInput = document.querySelector('#Lugardeorigen');
const DestinoInput = document.querySelector('#Destino');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editar;


class citas{
    //vamos a almacenar los arreglos de las citas 
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);//para ir viendo como se van agregando las citas
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id);
    }

    editarCita(citaAct){
        this.citas = this.citas.map(citas => citas.id === citaAct.id ? citaAct : citas);
    }

    /*sintaxis 
    condition ? true : false

    estatus ?   estatus = 'temperatura elevada' :  estatus = 'temperatura esta fresca'

    let estatus;
    if(estatus>30){
        estatus = 'temperatura elevada'
    }else{
        estatus = 'temperatura esta fresca'
    }
    */
}

class ui{
    imprimirAlerta(mensaje,tipo){
        //vamos un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //vamos el mensaje de error
        divMensaje.textContent = mensaje;

        //agregamos el mensaje
        document.querySelector('#contenido').
        insertBefore(divMensaje,document.querySelector('.agregar-cita'));
        
        setTimeout(()=>{
            divMensaje.remove();
        },5000);

    }


    //btn, btn-danger, mr-2
    imprimirCitas({citas}){
       // console.log(citas);
       this.limpiarHTML();

        citas.forEach(citas=>{
            const {Nombre,Apellido,Numerodevuelo,telefono,Lugardeorigen,Destino, fecha,hora,id} = citas;
            
            const divCita = document.createElement('div');
        divCita.classList.add('cita','p-3');
        //estamos creando un atributo personalizado
        divCita.dataset.id = id;

        //generar textos para las fichas de citas
        const NombreParrafo = document.createElement('h2');
        NombreParrafo.classList.add('card-title','font-weight-bolder');
        NombreParrafo.textContent = Nombre;

        const ApellidoParrafo = document.createElement('h2');
        ApellidoParrafo.classList.add('card-title','font-weight-bolder');
        ApellidoParrafo.textContent = Apellido;
        

        const NumerodevueloParrafo = document.createElement('p');
        NumerodevueloParrafo.innerHTML = `
            <span class="font-weigh-bolder">Numero de vuelo:</span>${Numerodevuelo}
        `;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
            <span class="font-weigh-bolder">Telefono:</span>${telefono}
        `;

        const LugardeorigenParrafo = document.createElement('p');
        LugardeorigenParrafo.innerHTML = `
            <span class="font-weigh-bolder">Lugar de Origen:</span>${Lugardeorigen}
        `;

        const DestinoParrafo = document.createElement('p');
        DestinoParrafo.innerHTML = `
            <span class="font-weigh-bolder">Destino:</span>${Destino}
        `;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
            <span class="font-weigh-bolder">Fecha:</span>${fecha}
        `;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
            <span class="font-weigh-bolder">Hora:</span>${hora}
        `;
      
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger','mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = () => eliminarCita(id);   

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = () => cargarEdicion(citas);

        divCita.appendChild(NombreParrafo);
        divCita.appendChild(ApellidoParrafo);
        divCita.appendChild(NumerodevueloParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(LugardeorigenParrafo);
        divCita.appendChild(DestinoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        


        contenedorCitas.appendChild(divCita);
        
        })

        
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const useri = new ui();
const administrarCitas = new citas();


//eventos
eventListener();
function eventListener(){
    NombreInput.addEventListener('input', datosCitas);
    ApellidoInput.addEventListener('input', datosCitas);
    NumerodevueloInput.addEventListener('input', datosCitas);
    telefonoInput.addEventListener('input', datosCitas);
    LugardeorigenInput.addEventListener('input', datosCitas);
    DestinoInput.addEventListener('input', datosCitas);
    fechaInput.addEventListener('input', datosCitas);
    horaInput.addEventListener('input', datosCitas);
    formulario.addEventListener('submit', nuevaCita);
}

//vamos a crear una estructura que me permita
//guardar la informacion
const citasObj = {
    Nombre: '',
    Apellido: '',
    Numerodevuelo: '',
    telefono: '',
    Lugardeorigen: '',
    Destino: '',
    fecha: '',
    hora: '',
}

function datosCitas(e){
    //console.log(e.target.name);
    citasObj[e.target.name] = e.target.value;
    console.log(citasObj);
}

function nuevaCita(e){
    //validar y agregar una nueva cita a la clase de citas
    e.preventDefault(); //SIEMPRE VA A SER ASI (AL MENOS JS)
    
    //extraer la informacion del obejto de cita
    const {Nombre,Apellido,Numerodevuelo,telefono,Lugardeorigen,Destino, fecha, hora} = citasObj;

    //validacion
    if(Nombre==='' || Apellido ==='' || Numerodevuelo ==='' || telefono ==='' 
    || Lugardeorigen ==='' || Destino ==='' || fecha ==='' || hora ===''){
        //console.log('Todos los campos son obligatorios');
        useri.imprimirAlerta('Todos los campos son obligatorios','error')
        return;
    }

    if(editar){
        console.log('estoy editando');

        formulario.querySelector('button[type=submit]').textContent = 'Crear cita';
        editar = false;

        administrarCitas.editarCita({...citasObj});

        //mensaje datos correctos
        useri.imprimirAlerta('Se ha modificado la cita correctamente');
    }else{
        console.log('estoy creando una nueva cita');
        //vamos a generar un id
        citasObj.id = Date.now();

        administrarCitas.agregarCita({...citasObj});

        //mensaje datos correctos
        useri.imprimirAlerta('Se ha agregado la cita correctamente');
    }

    //crear nuevas citas
    //console.log(citasObj);

    

    //reset al formulario
    formulario.reset();

    reiniciarObjeto();

    useri.imprimirCitas(administrarCitas);

}


function reiniciarObjeto(){
    citasObj.Nombre = '';
    citasObj.Apellido = '';
    citasObj.Numerodevuelo = '';
    citasObj.telefono = '';
    citasObj.Lugardeorigen = '';
    citasObj.Destino = '';
    citasObj.fecha = '';
    citasObj.hora = '';
}

function eliminarCita(id){
    //console.log(id);
    administrarCitas.eliminarCita(id);

    //mostramos el mensaje 
    useri.imprimirAlerta('la cita se elimino correctamente');

    //actualizar el objeto
    useri.imprimirCitas(administrarCitas);

}

function cargarEdicion(cita){
   // console.log(cita);

   const { Nombre,Apellido,Numerodevuelo,telefono,Lugardeorigen,Destino, fecha, hora,id} = cita;

   //llenar los inputs
    NombreInput.value = Nombre;
    ApellidoInput.value = Apellido;
    NumerodevueloInput.value = Numerodevuelo;
    telefonoInput.value = telefono;
    LugardeorigenInput.value = Lugardeorigen;
    DestinoInput.value = Destino;
    fechaInput.value = fecha;
    horaInput.value = hora;

    //vamos a llenar el objeto
    citasObj.Nombre = Nombre;
    citasObj.Apellido = Apellido;
    citasObj.Numerodevuelo = Numerodevuelo;
    citasObj.telefono = telefono;
    citasObj.Lugardeorigen = Lugardeorigen;
    citasObj.Destino = Destino;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.id = id;

    //vamos a cambiar el texto del boton
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;
}