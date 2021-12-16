window.addEventListener('load', function(){

    // Definimos selectores HTML
    let model = document.querySelector('#model');
    let popup = document.getElementById("myPopup");

    let description = document.querySelector('#description');
    let popup2 = document.getElementById("myPopup2");

    let upload_img = document.getElementById('upload_img');
    let popup3 = document.getElementById("myPopup3");

    // Validating model
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

    // validating description
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

    // validating filetype
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    upload_img.addEventListener('change', function(){
        if(!allowedExtensions.exec(upload_img.value)){
            popup3.classList.add("show");
            fileInput.value = '';
        }
        else{
            popup3.classList.remove("show");
        }
        
    });
});