window.onload = function(){
    let formulario = document.querySelector('#uFormulario');
    let username = document.querySelector('#username');
    username.focus()
    let password = document.querySelector('#password');
    let errores = document.querySelector('#errores');

    formulario.addEventListener('submit', function(e){
        let messages = [];
        if(username.value === '' || username.value == null ){
            messages.push('El nombre de usuario debe estar completo')
        }
        else if(username.value.length <= 6){
            messages.push('El nombre de usuario debe ser mayor a 6 letras')
        }
        if(password.value === '' || password.value == null ){
            messages.push('contraseña debe estar completo')
        }
        if(messages.length > 0) {
            e.preventDefault();
            errores.innerText = messages.join(' y ')
        }
    })
   
}