
const url = "./data.json"; 
const booking =[]

function isValidNumber(input) {
    return !isNaN(input);
}

const cargarDatos = async () =>{
	try {
		const response = await fetch(url);
		if(response.ok){
			const data = await response.json();
			return data
		}
		else{
			throw new Error("Error al cargar los datos");
		}

	} catch (error) {
		console.error("Error al manejar la promesa:", error);
	}
}

const mostrarHabitaciones = ( rooms, roomTypes, filterByAvailable = false, filterByCapacity = 0) =>{
	let availables = [];
	if(filterByAvailable && !filterByCapacity){
		availables = rooms.filter((room) => {
			return room.availability === true;}
		)
		return[(availables.map((room) => {
			return `\nHabitacion numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name})`
			}).join(", ")
		), availables]
	}
	else if(filterByAvailable && filterByCapacity){
		availables = rooms.filter((room) => {
			if (roomTypes.find((type) => type.id === room.roomTypeId).capacity >= filterByCapacity && room.availability){
				return true;
			};
			}
		)
		return[(availables.map((room) => {
			return `\nHabitacion numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name})`
			}).join(", ")
		), availables]
	}
	else{
		availables = rooms;
		return[(rooms.map((room) => {
			return `\nHabitacion numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name}), estado: ${room.availability ? 'disponible':'ocupada'}`
			}).join(", ")
		), availables]
	}
}

const hacerReserva = (rooms, roomTypes, generarId) =>{
	const peopleNumber = parseFloat(prompt("Para cuantas personas?"));
	if(isValidNumber(peopleNumber)){
		const returnRooms = mostrarHabitaciones(rooms, roomTypes, true, peopleNumber);
		const idParaReservar =parseFloat( prompt('Ingrese el id de la habitacion a reservar: ' + returnRooms[0]));
		if(isValidNumber(idParaReservar)){
			const room = returnRooms[1].find( room => room.number === idParaReservar);
			if(room){
				if(room.availability){
					alert("habitacion disponible");
					console.log();
					try{
						const dates = prompt("Ingrese las fechas con el siguiente formato (fecha de inicio y fecha de salida)separadas por coma : dd/mm/aaaa,dd/mm/aaaa").split(',');
						const name = prompt("Ingrese a nombre de quien desea reservar: ");
						if(name){
							const id =generarId();
							const book = {
								id,
								name,
								date1: dates[0],
								date2: dates[1],
								room: room.number
							}
							if(confirm("Desea guardar su reserva?")){
								room.availability = false;
								booking.push(book);
								alert("Reserva creada");
								console.log(book);
							}
						}
					}
					catch{
						alert("Error en el ingreso de informacion")
					}

					
				}
				else{
					alert("Habitacion no disponible");
				}
			}
			else{
				alert("Habitacion no encontrada o disponible segun requerimientos");
			}
		}
		else{
			alert("valor ingresado no valido")
		}
	}
	else{
		alert("valor ingresado no valido")
	}
}

function generarGeneradorId() {
	let id = 1; // Variable id se inicializa fuera de la función interna
	return function () {
		return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
	};
}

const verReservas = (name, rooms, roomTypes) => {
	const nameBooking = [];
	booking.forEach(e => {
		if(e.name.toLocaleLowerCase() === name.toLocaleLowerCase()){
			nameBooking.push(e);
		}
	});
	if(nameBooking.length>0){
		alert(`Sus reservas son: ${nameBooking.map(book => `\nid de reserva: ${book.id}, fecha de entrada: ${book.date1}, fecha de salida: ${book.date2}, habitación numero: ${book.room} (${roomTypes.find((type) => type.id === rooms.find(room => room.number === book.room).roomTypeId).name  })`)}`)
	}
	else{
		alert("No se encontraron reservas asociadas")
	}

}


const main = async () =>{
	let {rooms, roomTypes} = await cargarDatos();
	await new Promise(resolve => setTimeout(resolve,1000));
	let seguir = true;
	const generarId = generarGeneradorId();
	while(seguir){
		const option = prompt(`Por favor ingresa una de las siguientes opciones:
1. Ver habitaciones
2. Hacer reserva
3. Ver reservas
4. Editar reserva
5. Cancelar reserva
6. Salir`);
		switch(option){
			case '1':
				alert("Habitaciones y su estado: " + mostrarHabitaciones(rooms, roomTypes)[0]);
				break;
			case '2':
				hacerReserva(rooms, roomTypes, generarId);
				break;
			case '3':
				verReservas(prompt("Ingrese a nombre de quien esta la reserva:"), rooms, roomTypes)
				break;
			case '4':
				break;
			case '5':
				break;
			case '6':
				seguir = false;
				break;
			default:
				alert("Ingrese una opcion valida")
		}
	}
}

main();