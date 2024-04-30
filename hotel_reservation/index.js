/* 
const url = "./data.json"; 



async function cargarDatos(){
	try {
		const response = await fetch(url);
    	if(response.ok){
			const data = await response.json();
			const {rooms, roomTypes} = data;
			const peopleNumber = Number (prompt(`Para cuantas personas es la reserva?`))
			const roomsAvailables = rooms.filter((room) => {	
				return roomTypes.find((type) => room.roomTypeId === type.id).capacity >= peopleNumber && room.availability;
			})
			const userInput = Number (prompt( "Ingrese el numero de habitacion a reservar: " + roomsAvailables.map((room)=>`\nRoom Number: ${room.number} (${
              roomTypes.find((type) => type.id === room.roomTypeId).name
            })`) ))
    	}
		
    	else{
			throw new Error("Error al cargar los datos");
    	}
    
	} catch (error) {
		console.error("Error al manejar la promesa:", error);
	}
}

setTimeout(cargarDatos, 1000);

// cargarYMostrarData()
//   .then(({ rooms, roomTypes }) => {
//     const userInput = prompt(
//       "Ingrese el numero de habitacion a reservar: " +

//         rooms
//           .map((room) => {
//             return `\nRoom Number: ${room.number} (${
//               roomTypes.find((type) => type.id === room.type)
//             })`;
//           })
//           .join(", ")
//     );

//   })
//   .catch((error) => {
//     console.error("Error al manejar la promesa:", error);
//   }); */


// Ruta del archivo data.json
const url = "./data.json"; // Cambiar por la ruta correcta

// Función para cargar y mostrar el contenido de data.json
function cargarYMostrarData() {
  // Retorna una nueva promesa que se resuelve después del setTimeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Realiza la solicitud fetch dentro del setTimeout
      fetch(url)
        .then((pepito) => {
          if (!pepito.ok) {
            throw new Error("Error al cargar los datos.");
          }
		  console.log(pepito);
          return pepito.json();
        })
        .then((data) => {
          console.log("Habitaciones:", data.rooms);
          console.log("Tipos de Habitaciones:", data.roomTypes);
          resolve(data); // Resuelve la promesa con los datos cargados
        })
        .catch((error) => {
          console.error(error);
          reject(error); // Rechaza la promesa si hay un error
        });
    }, 3000);
  });
}

new Promise((resolve, reject) => {
	
})

// Llamar a la función para cargar y mostrar el contenido de data.json
cargarYMostrarData()
  .then((datos)=>{

  })
  .catch((error) => {
    console.error("Error al manejar la promesa:", error);
  });