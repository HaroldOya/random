(  function() {
    var app = {
        perroEstadoFilter: document.getElementById( "perroEstadoFilter" ),
        perroList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "https://pipeordenes.pythonanywhere.com/perros/";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayPerros( data );
                app.perroList = data.results;
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

    var displayPerros = function( perros ) {
        var perrosContainer = document.getElementById( "perrosContainer");
        perrosContainer.innerHTML = "";

        for( let perro of perros ) {
            var perroContainer = document.createElement( "div" );
            var txtName = document.createElement( "h2" );
            var imgPerro = document.createElement( "img" );
            var txtEstado = document.createElement( "p" );
            var txtRaza = document.createElement( "p" );
            var txtDescription = document.createElement( "p" );
            perroContainer.className = "perroContainer";
            txtName.innerHTML = perro.nombre;
            imgPerro.src = perro.imagen;
            imgPerro.alt = perro.nombre;
            txtEstado.innerHTML = "<b>Estado: </b>" + perro.estado;
            txtRaza.innerHTML = "<b>Raza: </b>" + perro.raza;
            txtDescription.innerHTML = perro.detalle;
            // Agregar los hijos correspondientes
            perroContainer.appendChild( txtName );
            perroContainer.appendChild( imgPerro );
            perroContainer.appendChild( txtEstado );
            perroContainer.appendChild( txtRaza );
            perroContainer.appendChild( txtDescription );
            // Agregar el contenedor al documento
            perrosContainer.appendChild( perroContainer );
        }
    }

    app.perroEstadoFilter.addEventListener( "change", function( e ) {
        var filteredPerros = app.perroList.filter( function( perro ) {
            if( perro.estado == app.perroEstadoFilter.value ) {
                return perro;
            }
        } );
        displayPerros( filteredPerros );
    } );
    
    loadData();
} ) ( );