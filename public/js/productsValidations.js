window.addEventListener('load', function(){

    // Definimos selectores HTML
    let model = document.querySelector('#model');
    let popup = document.getElementById("myPopup");

    let description = document.querySelector('#description');
    let popup2 = document.getElementById("myPopup2");


    model.addEventListener('focusout', function(){
        if(model.value=="" || model.value.length<5){
            popup.classList.add("show");
        }
    });
    model.addEventListener('change', function(){
        if(model.value!="" || model.value.length>5){
            popup.classList.remove("show");
        }
    });

    description.addEventListener('focusout', function(){
        if(description.value=="" || description.value.length<20){
            popup2.classList.add("show");
        }
    });
    description.addEventListener('change', function(){
        if(description.value.length>20){
            popup2.classList.remove("show");
        }
    });

});