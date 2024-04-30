
const url = "./data.json"; 
let data;
let flag = false

async function cargarDatos(){
	try {
		const response = await fetch(url);
    	if(response.ok){
			data = await response.json();
			console.log('Habitaciones: ',data.rooms);
			console.log('Tipos: ', data.roomTypes);
			flag = true;
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
//   });