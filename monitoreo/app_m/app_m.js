//se crea una funcion en donde hace referencia al div 
let empl_select=document.getElementById('empleados');

//en esta variable se hace referencia a la tabla donde se agregara los reportes
let lista=document.getElementById('result_all_reports');

//se hace una peticion de tipo fetch para traer todas las areas del hotel
fetch('https://incidencia-karmina-2.onrender.com/api/Areas_h',{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        //se crea una variable hace referencia al select donde guarda las areas
        let areas_hotel=document.getElementById('areas_reportes');
        //se crea una variable que guardara todas las areas
        let lista_areas_hotel=`<option value="">*</option>`;


        //este ciclo for guarda todas las areas
        for(let i=0;i<json.length;i++){

            lista_areas_hotel+=`<option value=${json[i].id_area}>${json[i].nombre_de_area}</option>`;
        }

        

        //se inserta todas las areas en el select
        areas_hotel.innerHTML=lista_areas_hotel;
        
 
})



function empleados(){

         //en caso contrario se hara una peticion fetch
         fetch(`https://incidencia-karmina-2.onrender.com/api/Empleados/`,{
            method:'GET',
            body:JSON.stringify(),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(json=>{
    
    
            if(json.length==0){
    
                alert('No se encontraron empleados')
                empl_select.innerHTML=" ";
    
            }else{
      
                    //se almacenara todos los empleados del area seleccionada a traves de esta variable y el ciclo for
                    let lista_empleados_hotel='<option value="">*</option>';
    
    
                    for(let i=0;i<json.length;i++){
    
                        lista_empleados_hotel+=`<option value=${json[i].id_empleado}>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</option>`;
                    }

                    //si inserta los empleados
                    empl_select.innerHTML=lista_empleados_hotel; 
    
            }
    
     
        })

}

   


   

  





//se usa hace referencia al boton buscar reportes cuando se hace click ejecuta las tareas
let btn_buscar_area=document.getElementById('btn_buscar_reparea');

btn_buscar_area.addEventListener('click',()=>{
    
    let area=document.getElementById('areas_reportes').value;
    let fecha=document.getElementById('fecha').value;
    let estado=document.getElementById('estados').value;
    let empleado=document.getElementById('empleados').value;
    let num_room=document.getElementById('num_room').value;
    let folio=document.getElementById('folio').value;

    let fecha_buscar="";
    let new_date=fecha.split('-');


    for(let i=new_date.length-1;i>=0;i--){

        if(i>0){
            fecha_buscar+=`${new_date[i]}-`;
        }else{

            fecha_buscar+=new_date[i]
        }
    }

    //se crea un array que alamacenara solo los valores diferentes a null
    let array_v=[];
    //varaible que almacenara la sentencia where
    let res="";
    //operador logico para la sentencia
    let logic="&&";

    if(fecha_buscar=="" && area=="" && estado=="" && empleado=="" && num_room=="" && folio==""){

        res="todos";

        //se hace una peticion fetch con la sentencia para obtener datos en base a los filtros impuestos por el usuario
    fetch( `https://incidencia-karmina-2.onrender.com/api/Reporte/monitoreo_reportes/${res}`,{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{

        //si no se encuentra nada mostrara un mensaje 
        if(json.length==0 || json.index==0  || json.code=='ER_BAD_FIELD_ERROR'){
             
            alert("No se encontro resultados");
            lista.innerHTML="";

        }else{


            // si se encuentra resultados crea una variable con lso titulos de la tabla
            let titulos=`
        <thead>
        <tr>
            <th>ID</th>
            <th>Fecha del reporte</th>
            <th>Numero de habitacion</th>
            <th>Problema</th>
            <th>Observaciones</th>
            <th>Area</th>
            <th>Empleado Asignado</th>
            <th>Hora en que se asigno al empleado</th>
            <th>Estatus del reporte</th>
            <th>Fecha y hora del estatus: abierto</th>
            <th>Fecha y hora del estatus: en proceso</th>
            <th>Fecha y hora del estatus: cerrado</th>
            <th>Fecha y hora del estatus: inconcluso</th>
            <th>Comentarios</th>
            <th>Nombre del empleado que cerro el reporte</th>
        </tr>
        </thead>
        `
        //otra variable donde se guardara las columnas de la table con la informacion encontrada
        let rest='';
        
        //se usa un ciclo for para acomodar los datos en la tabla con la condicion de que, si es nulo el valor se sustituya con un guion
        for(let i=0;i<json.length;i++){

            if(json[i].observaciones==null){
                json[i].observaciones="- - -"
            }

            if(json[i].apellido_p==null && json[i].apellido_m==null && json[i].nombres==null ){
                json[i].apellido_p='-'
                json[i].apellido_m='-'
                json[i].nombres='-'
                
            }

            if(json[i].cierr_p ==null && json[i].cierr_m==null && json[i].cierr_n==null){

                json[i].cierr_p='-'
                json[i].cierr_m='-'
                json[i].cierr_n='-'
            }

            rest+=`
            <tbody>
            <tr>
                <td>${json[i].id_report}</td>
                <td>${json[i].fecha_hora_report}</td>
                <td>${json[i].numero_habitacion}</td>
                <td>${json[i].problema}</td>
                <td>${json[i].observaciones}</td>
                <td>${json[i].nombre_de_area}</td>    
                <td>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</td>      
                <td>${json[i].date_asignacion_respon}</td>
                <td>${json[i].estado}</td>          
                <td>${json[i].hora_alta}</td>  
                <td>${json[i].hora_proceso}</td> 
                <td>${json[i].hora_cierre}</td>
                <td>${json[i].hora_inconcluso}</td>  
                <td>${json[i].comentarios}</td>  
                <td>${json[i].cierr_p} ${json[i].cierr_m} ${json[i].cierr_n}</td>     
            </tr>
            </tbody>
            `;
        }

        //se inserta los datos obtenidos en la tabla html 
        lista.innerHTML=`${titulos}${rest}`;

        }

    })



    }else{

        if(fecha_buscar!==""){
            array_v.push(`reportes_clientes.fecha_hora_report='${fecha_buscar}'`);
        }
        if(estado!==""){
            array_v.push(`reportes_clientes.estado='${estado}'`);
        }
        if(empleado!==""){
            array_v.push(`reportes_clientes.responsable=${empleado}`);
        }
        if(area!==""){
            array_v.push(`reportes_clientes.area=${area}`);
        }
        if(num_room!==""){
            array_v.push(`reportes_clientes.numero_habitacion=${num_room}`);
        }
        if(folio!==""){
            array_v.push(`reportes_clientes.id_report=${folio}`);
        }
            

    
//en este ciclo for se crea la sentencia where donde si el ciclo tiene mas o igual a 1 vuelta 
//se agrega el operador && en caso contrario solo se sigue adicionandos 
    for(i=0;i<array_v.length;i++){

        if(i>=1){
            res+=` ${logic} ${array_v[i]}`
        }else{
            res+=`${array_v[i]}`
        }
        

    }
    
    //se hace una peticion fetch con la sentencia para obtener datos en base a los filtros impuestos por el usuario
    fetch( `https://incidencia-karmina-2.onrender.com/api/Reporte/monitoreo_reportes/${res}`,{
            method:'GET',
            body:JSON.stringify(),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(json=>{

            //si no se encuentra nada mostrara un mensaje 
            if(json.length==0 || json.index==0  || json.code=='ER_BAD_FIELD_ERROR'){
                 
                alert("No se encontro resultados");
                lista.innerHTML="";

            }else{


                // si se encuentra resultados crea una variable con lso titulos de la tabla
                let titulos=`
            <thead>
            <tr>
                <th>ID</th>
                <th>Fecha del reporte</th>
                <th>Numero de habitacion</th>
                <th>Problema</th>
                <th>Observaciones</th>
                <th>Area</th>
                <th>Empleado Asignado</th>
                <th>Hora en que se asigno al empleado</th>
                <th>Estatus del reporte</th>
                <th>Fecha y hora del estatus: abierto</th>
                <th>Fecha y hora del estatus: en proceso</th>
                <th>Fecha y hora del estatus: cerrado</th>
                <th>Fecha y hora del estatus: inconcluso</th>
                <th>Comentarios</th>
                <th>Nombre del empleado que cerro el reporte</th>
            </tr>
            </thead>
            `
            //otra variable donde se guardara las columnas de la table con la informacion encontrada
            let rest='';
            
            //se usa un ciclo for para acomodar los datos en la tabla con la condicion de que, si es nulo el valor se sustituya con un guion
            for(let i=0;i<json.length;i++){

                if(json[i].observaciones==null){
                    json[i].observaciones="- - -"
                }

                if(json[i].apellido_p==null && json[i].apellido_m==null && json[i].nombres==null ){
                    json[i].apellido_p='-'
                    json[i].apellido_m='-'
                    json[i].nombres='-'
                    
                }

                if(json[i].cierr_p ==null && json[i].cierr_m==null && json[i].cierr_n==null){

                    json[i].cierr_p='-'
                    json[i].cierr_m='-'
                    json[i].cierr_n='-'
                }

                rest+=`
                <tbody>
                <tr>
                    <td>${json[i].id_report}</td>
                    <td>${json[i].fecha_hora_report}</td>
                    <td>${json[i].numero_habitacion}</td>
                    <td>${json[i].problema}</td>
                    <td>${json[i].observaciones}</td>
                    <td>${json[i].nombre_de_area}</td>    
                    <td>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</td>      
                    <td>${json[i].date_asignacion_respon}</td>
                    <td>${json[i].estado}</td>          
                    <td>${json[i].hora_alta}</td>  
                    <td>${json[i].hora_proceso}</td> 
                    <td>${json[i].hora_cierre}</td>
                    <td>${json[i].hora_inconcluso}</td>  
                    <td>${json[i].comentarios}</td>  
                    <td>${json[i].cierr_p} ${json[i].cierr_m} ${json[i].cierr_n}</td>     
                </tr>
                </tbody>
                `;
            }

            //se inserta los datos obtenidos en la tabla html 
            lista.innerHTML=`${titulos}${rest}`;

            }

        })
    
    }

});

empleados();
