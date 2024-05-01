
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
      if (roomsAvailables.find(e => e.number === userInput)){
        const fechaInicio = prompt("Ingrese la fecha de inicio de la reserva (dd/mm/aaaa): ")
        const fechaFin = prompt("Ingrese la fecha de fin de la reserva (dd/mm/aaaa): ")
        const huesped = prompt("Ingrese el nombre del huesped: ")
        crearReserva(userInput, fechaInicio, fechaFin, huesped)
      }
    	}
		
    	else{
			throw new Error("Error al cargar los datos");
    	}
    
	} catch (error) {
		console.error("Error al manejar la promesa:", error);
	}
}

setTimeout(cargarDatos, 1000);
function crearReserva(numeroHabitacion, fechaInicio, fechaFin, huesped) {
  function generarGeneradorId() {
    let id = 1; // Variable id se inicializa fuera de la función interna

    return function () {
      return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
    };
  }
  const generarId = generarGeneradorId();
  
// Se obtiene la función interna generarId()

}

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
//   }); 



