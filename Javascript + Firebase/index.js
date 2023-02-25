var firebaseConfig = {
    apiKey: "AIzaSyAy8coAvpHzrxYwq2K3ANkwBkfUBaDSDGQ",
    authDomain: "realtimedatabase-18f89.firebaseapp.com",
    databaseURL: "https://realtimedatabase-18f89-default-rtdb.firebaseio.com",
    projectId: "realtimedatabase-18f89",
    storageBucket: "realtimedatabase-18f89.appspot.com",
    messagingSenderId: "483489557135",
    appId: "1:483489557135:web:ac0504db754568edd21efa",
    measurementId: "G-BZ2W694EDD"
};
// Initializa Firebase
firebase.initializeApp(firebaseConfig);

function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input5").value='Selecciona';
}

function createR() {
    //Guardo los datos capturados usando el id de cada control
    var Matrícula = document.getElementById("Input1").value;
    var Marca = document.getElementById("Input2").value;
    var Modelo = document.getElementById("Input3").value;
    var Color = document.getElementById("Input4").value;
    var Clasificación = document.getElementById("Input5").value;
    var Año = document.getElementById("Input6").value;
    var Nombre_titular = document.getElementById("Input7").value;

    //validaciones
    if (Matrícula.length > 0) {
        //creo un objeto que guarda los datos
        var Auto = {Matrícula, Marca, Modelo, Color, Clasificación, Año, Nombre_titular}

        //console.log(Auto);

        firebase.database().ref('Automóviles/' + Matrícula).update(Auto).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("¡Listo!", "Agregado correctamente");
    } 
    else {
        swal("¡Error!", "Llena todos los campos");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read() {
    var table = document.getElementById("Table1");
    table.innerHTML = '';
  
    var ref = firebase.database().ref('/Automóviles/');
  
    ref.on("child_added", function(snapshot) {
      printRow(snapshot.val());
    });
  }

function printRow(Auto){
    
    if(Auto!=null){
        var table = document.getElementById("Table1"); 
        var row = table.insertRow(-1);
        row.setAttribute("id", Auto.Matrícula); // Establece un ID único para cada fila

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Auto.Matrícula;
        cell2.innerHTML = Auto.Marca;
        cell3.innerHTML = Auto.Modelo;
        cell4.innerHTML = Auto.Color;
        cell5.innerHTML = Auto.Clasificación;
        cell6.innerHTML = Auto.Año;
        cell7.innerHTML = Auto.Nombre_titular;
        cell8.innerHTML = '<button type="button" class="btn btn-danger" onClick="deleteR(\'' + Auto.Matrícula + '\')">Eliminar</button>';
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(\'' + Auto.Matrícula + '\')">Modificar</button>';
    }
}


function deleteR(Matrícula) {
    firebase.database().ref('/Automóviles/' + Matrícula).remove()
      .then(() => {
        var row = document.getElementById(Matrícula);
        row.parentNode.removeChild(row); // Eliminar la fila de la tabla
        swal("¡Listo!", "Eliminado correctamente");
      })
      .catch((error) => {
        console.error("Error eliminando registro: ", error);
      });
  }

  function seekR(Matrícula){
    var ref = firebase.database().ref('/Automóviles/' + Matrícula).on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Auto){
    if(Auto!=null)
    {
        document.getElementById("Input1").value=Auto.Matrícula;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Auto.Marca;
        document.getElementById("Input3").value=Auto.Modelo;
        document.getElementById("Input4").value=Auto.Color
        document.getElementById("Input5").value=Auto.Clasificación;
        document.getElementById("Input6").value=Auto.Año;
        document.getElementById("Input7").value=Auto.Nombre_titular;
    }
}

//Para consulta de Clasificación
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Automóviles");
    ref.orderByChild("Clasificación").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}

function printRowQ(Auto){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Auto.Matrícula;
        cell2.innerHTML = Auto.Marca;
        cell3.innerHTML = Auto.Modelo;
        cell4.innerHTML = Auto.Color;
        cell5.innerHTML = Auto.Clasificación;
        cell6.innerHTML = Auto.Año;
        cell7.innerHTML = Auto.Nombre_titular;
}