//se crea una variable que guardara los empleados
let empleados;

let empleados_2;
//se crea una varible que hace referencia a la tabla donde se mostrara los reportes de los empleados
let lista=document.getElementById('tabla_reportes');

let empleados_vector=[];

function empleados_open(){

    fetch('https://incidencia-karmina-2.onrender.com/api/Empleados',{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{

        empleados_vector=json

    })

}


function buscar_reportes_areas(){
    
    //se obtiene el area seleccionada
    let area=document.getElementById('areas_empleados').value;

    if(area==""){

        alert('Seleccione un area')
        lista.innerHTML="";
        
    }else{

        if(area=="todos"){

                 //se hace la peticion para buscar reportes en proceso en base al area
                 fetch(`https://incidencia-karmina-2.onrender.com/api/Reporte/reportes_area/responsable/${area}`,{
                    method:'GET',
                    body:JSON.stringify(),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(json=>{
            
                    if(json.length==0){
                        alert('Sin reportes pendientes')
                        lista.innerHTML="";
                    }else{
            
                        let titulos=`
                    <thead>
                    <tr>
                        <th>Numero de habitacion</th>
                        <th>Problema</th>
                        <th>Observaciones</th>
                        <th>Area Asignada</th>
                        <th>Empleado Asignado</th>
                        <th>Estado del reporte</th>
                        <th>Comentarios</th>
                        <th>Nombre del empleado que cerro el reporte</th>
                        <th>Finalizar reporte</th>
                    </tr>
                    </thead>
                    `;
            
                    let rest='';
                            
                            for(let i=0;i<json.length;i++){
                                if(json[i].observaciones==null){
                                    json[i].observaciones="- - -"
                                }

                                for(let j=0;j<empleados_vector.length;j++){

                                    if(empleados_vector[j].area_h==json[i].id_area){
            
                                        empleados_2+=`<option value="${empleados_vector[j].id_empleado}">${empleados_vector[j].apellido_p} ${empleados_vector[j].apellido_m} ${empleados_vector[j].nombres}</option>`;
                                    }
                                }

                                rest+=`
                                <tbody>
                                <tr>
                                    <td>${json[i].numero_habitacion}</td>
                                    <td>${json[i].problema}</td> 
                                    <td>${json[i].observaciones}</td> 
                                    <td>${json[i].nombre_de_area}</td> 
                                    <td>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</td>      
                                    
                                    <td>
                                    <select id="${json[i].id_report}estados">
                                    <option value="">*</option>
                                    <option value="Cerrado">Cerrado</option>
                                    <option value="Inconcluso">Inconcluso</option>
                                    </select>
                                    </td>          
                                    
                                    <td><textarea id="${json[i].id_report}comentarios"></textarea></td>  
                                    <td>
                                    <select id="${json[i].id_report}empleados">
                                    <option value="">*</option>
                                    ${empleados_2}
                                    </select>
                                    </td>    
                                    <td><button onclick="Empleado_asignado(${json[i].id_report},'buscar_reportes_areas')">Terminar reporte</button></td> 
                                </tr>
                                </tbody>
                                `;
                                empleados_2="";
                            }

                           
            
                        //se inserta los valores en la tabla
                        lista.innerHTML=titulos+rest;
            
                    }
            
                })


        }else{
        
                empleados="";
        
                fetch(`https://incidencia-karmina-2.onrender.com/api/Empleados/${area}`,{
                    method:'GET',
                    body:JSON.stringify(),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(json=>{
        
                    for(let i=0;i<json.length;i++){
            
                        empleados+=`<option value="${json[i].id_empleado}">${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</option>`;
                    }
        
        
                })
        
                
                //se hace la peticion para buscar reportes en proceso en base al area
             fetch(`https://incidencia-karmina-2.onrender.com/api/Reporte/reportes_area/responsable/${area}`,{
                method:'GET',
                body:JSON.stringify(),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(json=>{
        
                if(json.length==0){
                    alert('Sin reportes pendientes')
                    lista.innerHTML="";
                }else{
        
                    let titulos=`
                <thead>
                <tr>
                    <th>Numero de habitacion</th>
                    <th>Problema</th>
                    <th>Observaciones</th>
                    <th>Empleado Asignado</th>
                    <th>Estado del reporte</th>
                    <th>Comentarios</th>
                    <th>Nombre del empleado que cerro el reporte</th>
                    <th>Finalizar reporte</th>
                </tr>
                </thead>
                `;
        
                let rest='';
                        
                        for(let i=0;i<json.length;i++){
                            if(json[i].observaciones==null){
                                json[i].observaciones="- - -"
                            }
                            rest+=`
                            <tbody>
                            <tr>
                                <td>${json[i].numero_habitacion}</td>
                                <td>${json[i].problema}</td> 
                                <td>${json[i].observaciones}</td> 
                                <td>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</td>      
                                
                                <td>
                                <select id="${json[i].id_report}estados">
                                <option value="">*</option>
                                <option value="Cerrado">Cerrado</option>
                                <option value="Inconcluso">Inconcluso</option>
                                </select>
                                </td>          
                                
                                <td><textarea id="${json[i].id_report}comentarios"></textarea></td>  
                                <td>
                                <select id="${json[i].id_report}empleados">
                                <option value="">*</option>
                                ${empleados}
                                </select>
                                </td>    
                                <td><button onclick="Empleado_asignado(${json[i].id_report},'buscar_reportes_areas')">Terminar reporte</button></td> 
                            </tr>
                            </tbody>
                            `;
                        }
        
        
                    //se inserta los valores en la tabla
                    lista.innerHTML=titulos+rest;
        
                }
        
            })
        
            
    
        }



    }

    

}

//esta funcion manda llamar las areas del hotel
function areas_empleados(){

    //se usa la peticion fetch para mandar llamar a las areas
    fetch('https://incidencia-karmina-2.onrender.com/api/Areas_h',{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{

        //se crea una variable que ahce referencia la select areas
        let areas_hotel=document.getElementById('areas_empleados');

        //en esta variable se guardar las areas a traves de un ciclo for
        let lista_areas_hotel='<option value="">*</option><option value="todos">Todas las areas</option>';


        for(let i=0;i<json.length;i++){

            lista_areas_hotel+=`<option value="${json[i].id_area}">${json[i].nombre_de_area}</option>`;
        }

        //se inserta las areas en el select
        areas_hotel.innerHTML=lista_areas_hotel;
        
 
})

}

//esta funcion registra la finalizacion del reporte
function Empleado_asignado(id_reporte,definitiva){

    //se obtinen los valores de cada reporte como id del reporte, estado, comentarios y el empleado que cerro
    //fecha y hora 
    let id=id_reporte;

    let estado=document.getElementById(id_reporte+"estados").value;

    let empleado=document.getElementById(id_reporte+"empleados").value;

    let comentarios=document.getElementById(id_reporte+"comentarios").value;

    let date = new Date();
    let options = {timeZone: 'America/Mexico_City'};
    let time = date.toLocaleString('es-MX', options);

    if(estado=="" || empleado=="" || comentarios ==""){
        alert('Campos no validos')
    }else{

        //todos los datos obtenidos se crean en un JSON
        let datos=
        {
            id_report:id,
            estado:estado,
            empleado:parseInt(empleado),
            comentarios:comentarios,
            time:time
        }


        //se hace una peticion fetch donde se manda los datos JSON
        fetch('https://incidencia-karmina-2.onrender.com/api/Reporte/Cierre_reportes/final',{
            method:'PUT',
            body:JSON.stringify(datos),//se mandan los datos
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(json=>{
            //si todo sale bien 
            // se actualiza los reportes
            
            if(definitiva=='buscar_reportes'){

                buscar_reportes();

            }else if(definitiva=='buscar_reportes_areas'){
          
                buscar_reportes_areas();
            }
        })

    }

   
}

//hacemos llamar a las areas de empleados
areas_empleados()

empleados_open()