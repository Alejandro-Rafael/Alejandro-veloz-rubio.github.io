let cookie=document.cookie;

let nombre=cookie.split(';');

function deleteCookie(nombre) {

    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
  }

  
let name_complete=nombre[0].split('=');
let user_complete=nombre[1].split('=');

let nom_user=document.getElementById('nom_user')

nom_user.innerHTML=name_complete[1];

btn_logout=document.getElementById("log_out");

btn_logout.addEventListener('click',()=>{


    deleteCookie("nombre");
    deleteCookie("usuario");

    location.replace('../User/index.html');

})
