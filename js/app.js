( function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() { 
                     console.log('Service Worker Registered'); 
                });
      }
} )( );

(  function() {
        var urljson = "http://127.0.0.1:8000/perros/?format=json";
        var container = document.getElementById("perrosContainer");
        fetch(urljson)
        .then(data => data.json())
        .then(data => {
            container.innerHTML = '';
            for(let i of data){
                container.innerHTML += `
                <div class="lista">
                <div class="lista-nombre">
                <h3 id="nombre" style="text-align: center">${i.nombre}</h3>
                </div>
                <div class="lista-imagen">
                    <a href="#">
                        <img src="${i.imagen}" alt="${i.nombre}">
                    </a>
                </div>
              
                <div class="lista-raza">
                    <p id="nombre"><b>Raza:</b>${i.raza} <b> Estado:</b>${i.estado}</p>
                </div>
                <div class="lista-nombre">
                    <p id="nombre">${i.detalle}</p>
                </div> 
                `
            }
        })
        
    

    
} ) ( );



$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });