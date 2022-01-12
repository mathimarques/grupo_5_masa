window.onload = function () {
    let formulario = document.querySelector('#uFormulario');
    let username = document.querySelector('#username');
    username.focus()
    let password = document.querySelector('#password');
    let errores = document.querySelector('#errores');

    let usernamePopup = document.getElementById("loginPopup1");
    let passwordPopup = document.getElementById("loginPopup2");


    username.addEventListener('focusout', function () {
        if (username.value === '' || username.value == null) {
            usernamePopup.classList.add("show");
        }
        else{
            usernamePopup.classList.remove("show");
        }
    });
    password.addEventListener('focusout', function () {
        if (password.value === '' || username.value == null) {
            passwordPopup.classList.add("show");
        }
        else{
            passwordPopup.classList.remove("show");
        }
    });


    formulario.addEventListener('submit', function (e) {
        let messages = [];
        if (username.value === '' || username.value == null) {
            messages.classList.add("show");
        }
        else if (username.value.length <= 6) {
            messages.push('El nombre de usuario debe ser mayor a 6 letras')
        }
        if (password.value === '' || password.value == null) {
            messages.push('contraseña debe estar completo')
        }
        if (messages.length > 0) {
            e.preventDefault();
            errores.innerText = messages.join(' y ')
        }
    })

}