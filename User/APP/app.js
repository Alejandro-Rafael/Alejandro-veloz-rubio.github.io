document.addEventListener('keydown', (event) => {

    var codeValue = event.code;

    if(codeValue=="Enter"){
        login()
    }

    
  }, false);


function login(){

    let user=document.getElementById('user').value
    let password=document.getElementById('password').value

    if(user==""  || password==""){

        alert("Campos no validos");

    }else{

        fetch( `https://incidencia-karmina-2.onrender.com/api/Usuarios/${user}`,{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{

        if(json[0].usuario==user && json[0].contraseña==password){

            document.cookie = `nombre=${json[0].nombre}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/;`;
            document.cookie = `usuario=${json[0].usuario}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/;`;
            location.replace('../menu/index.html');
            
        }else{

            alert('Usuario o contraseña incorrectos');
    
        }

    })

}



}




  
    

    

    





