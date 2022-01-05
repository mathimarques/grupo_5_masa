window.addEventListener('load', function(){

    let burger = document.getElementById('burger');
    let nav = document.getElementById('nav');
    let navbar = document.querySelector('.navbar');
    let nav_wrapper = document.getElementById('nav_wrapper');

    burger.addEventListener('click', function(){
        nav.classList.toggle('active');
        navbar.classList.toggle('mobile');
        nav_wrapper.classList.toggle('active');
    });

});