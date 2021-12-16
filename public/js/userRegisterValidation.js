window.onload = function(){
    
    let formulario = document.querySelector('#regFormulario');
    let name = document.querySelector('#name');
    let username = document.querySelector('#username');
    name.focus()
    let email = document.querySelector('#email');
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    let domicilio = document.querySelector('#address');
    let password = document.querySelector('#password');
    let repassword = document.querySelector('#repassword');
    let showErrores = document.querySelector('ul.errores');

    

    formulario.addEventListener('submit', function(e){
        let messages = [];
        showErrores.innerHTML = '';

        console.log(validRegex.test(email.value));
        
        if(name.value === '' || name.value == null ){
            messages.push('El nombre y apellido debe estar completo')
        }
        if(username.value === '' || username.value == null ){
            messages.push('El nombre de usuario debe estar completo')
        }
        else if(username.value.length <= 6){
            messages.push('El nombre de usuario debe ser mayor a 6 letras')
        }
        if (!validRegex.test(email.value)){
            messages.push('El email no es válido')
        }
        if(domicilio.value === '' || domicilio.value == null ){
            messages.push('El domicilio debe estar completo')
        }
        if(password.value === '' || password.value == null ){
            messages.push('La contraseña debe estar completo')
        }
        if(repassword.value === '' || repassword.value == null ){
            messages.push('La confirmación de contraseña es obligatoria')
        }
        if(messages.length > 0) {
            e.preventDefault();
            for(let i = 0; i < messages.length; i++){
                showErrores.innerHTML += "<li>" + messages[i] + "</li>"
            }
        }
    })
   
}

