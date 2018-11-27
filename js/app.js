( function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() { 
                     console.log('Service Worker Registered'); 
                });
      }
} )( );

( function(){
    var txtData = document.getElementById( "txtData" );
    var perros = { };
    var selectedPerros = [];
    var xhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/perros/";

    // Load old data
    if( localStorage.getItem( "selectedPerros" ) ) {
        selectedPerros = JSON.parse( localStorage.getItem( "selectedPerros" ) );
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            txtData.style.color = "black";
            txtData.innerHTML = data;
            perros = JSON.parse( data );
            console.log( perros );
            for( let i in perros.results ) {
                displayPerro( perros.results[ i ], i );
            }
        } else {
            txtData.style.color = "red";
            txtData.innerHTML = data;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    var displayPerro =  function( user, i  ){
        var perrosContainer = document.getElementById( "perrosContainer" );
        var perroContainer = document.createElement( "div" );
        var nombreContainer = document.createElement( "p" );
        var razaContainer = document.createElement( "p" );
        var detalleContainer = document.createElement( "p" );
        var estadoContainer = document.createElement( "p" );
        if( selectedPerros[ i ] ){
            perroContainer.className = "perroContainer pink";
        } else {
            perroContainer.className = "perroContainer";
        }
        userContainer.addEventListener( "click", function( mouse ) {
            if( !this.selected ) {
                perroContainer.className = "perroContainer pink";
                this.selected = true;
                selectedPerros[ i ] = true;
                saveData( "selectedPerros", selectedPerros );
            } else {
                perroContainer.className = "perroContainer";
                this.selected = false;
                selectedPerros[ i ] = false;
                saveData( "selectedPerros", selectedPerros );
            }
            console.log("selected");
        } );
        console.log( perro )
        nombreContainer.innerHTML = "<b>Nombre: </b>" + perro.nombre;
        razaContainer.innerHTML = "<b>Raza: </b>" + perro.raza;
        detalleContainer.innerHTML = "<b>Descripcion: </b>" + perro.detalle;
        estadoContainer.innerHTML = "<b>Estado: </b>" + perro.estado;
        // Add childs
        perroContainer.appendChild( nombreContainer );
        perroContainer.appendChild( razaContainer );
        perroContainer.appendChild( detalleContainer );
        perroContainer.appendChild( estadoContainer );
        // Add to page
        perrosContainer.appendChild( perroContainer );
    }

    var saveData = function( key, data ) {
        var toSave = JSON.stringify( data );
        localStorage.setItem( key, toSave );
    }


   
} )( );