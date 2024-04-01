//se crea un variable que almacenara datos
let datos;

let form=document.getElementById("form_client");

//esta funcion manda llamar a todas las incidencias registradas
function tipos_incidencias() {

//se hace una peticion para mandar llamar a todas las incidencias
fetch('https://incidenciakarmina-production.up.railway.app/api/Incidencias',{
    method:'GET',
    body:JSON.stringify(),
    headers:{
        'Content-Type':'application/json'
    }
})
.then(res=>res.json())
.then(json=>{

    //se guarda las incidencias en la variable datos
    datos = json;

    //se hace referencia al select que permitira selecionar incidencias
    let selec_incidencias=document.getElementById('tipos_inci')
    
    //se crea una variable que crea la primera opcion del select
    let lista='<option value="">*</option>';
    
    //se crea un ciclo for para almacenar todos los valores 
    for(let i=0;i<json.length;i++){

        lista+=`<option value="${json[i].tipo_incidencia}">${json[i].tipo_incidencia}</option>`;
    }
    
    //los valores se insertan en el select
    selec_incidencias.innerHTML=lista;
})
    
}  



//se hace referencia al boton para agregar reportes
let btnagregarproducto=document.getElementById('btnagregar');
//escucha el click y ejecuta las tareas descritas
btnagregarproducto.addEventListener('click',()=>{

    //almacena todos los datos necesarios en variables
    let num_room=document.getElementById('num_room').value;
    let Incidencia=document.getElementById('tipos_inci').value;
    let area_in;
    let date = new Date();
    let options = {timeZone: 'America/Mexico_City'};
    let time = date.toLocaleString('es-MX', options);
    let time_2=date.toLocaleDateString('es-CL', options);
    let estado="Abierto";

    //se asegura que haya un valor vacio y muestra un mensaje
    if(num_room=="" || Incidencia==""){
        alert("No puede haber campos vacios")
    }else{

        //se crea un ciclo form para registrar el area de la incidencia
        for(let i=0;i<datos.length;i++){
            if(Incidencia==datos[i].tipo_incidencia){
                area_in=datos[i].area;
            }
        }
    
        //se crea un formato JSON con los datos obtenidos
        let datos_report=
        {
            fecha:time,
            time_2:time_2,
            num_room:num_room,
            problema:Incidencia,
            estado:estado,
            area:area_in
        };
    
        //se hace la peticion a la api para registrar el reporte
        fetch('https://incidenciakarmina-production.up.railway.app/api/Reporte',{
            method:'POST',
            body:JSON.stringify(datos_report),//se mandan los datos
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(json=>{

            //se muestra un mensaje de confirmacion
            alert('Se agrego su reporte con exito'); 
            form.reset();

        })

    }
});

//se manda llamar a la funcion tipos de incidencias
tipos_incidencias();