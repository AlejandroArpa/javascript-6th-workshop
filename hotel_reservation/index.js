
const url = "./data.json"; 
const booking =[];
const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4},(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

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
					try{
						let dates = prompt("Ingrese las fechas con el siguiente formato (fecha de inicio y fecha de salida)separadas por coma : dd/mm/aaaa,dd/mm/aaaa");
						if (regex.test(dates)){
							dates = dates.split(',');
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
						else alert("Formato de fechas inválido");
					}
					catch{(err)=>{
						alert(`Error en el ingreso de informacion ${err}`)
					}
					}
				}
				else alert("Habitacion no disponible");
			}
			else alert("Habitacion no encontrada o disponible segun requerimientos");
		}
		else alert("valor ingresado no valido")
	}
	else alert("valor ingresado no valido")
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
		return[(`Sus reservas son: ${nameBooking.map(book => `\nid de reserva: ${book.id}, fecha de entrada: ${book.date1}, fecha de salida: ${book.date2}, habitación numero: ${book.room} (${roomTypes.find((type) => type.id === rooms.find(room => room.number === book.room).roomTypeId).name  })`)}`), nameBooking];
	}
	else{
		return[("No se encontraron reservas asociadas"), nameBooking];
	}
	
}

const editarReserva = (name, rooms, roomTypes) => {
	const idToEdit = parseFloat(prompt(`Ingrese el id de la reserva a editar:
${verReservas(name, rooms, roomTypes)[0]}`));
	const bookingName = verReservas(name, rooms, roomTypes)[1];
	if(bookingName.length>0){
		let exist = false;
		bookingName.forEach(element => {
			element.id === idToEdit ? exist = true : null
		});
		if(isValidNumber(idToEdit) && exist){
			const book = [];
			booking.forEach((e,idx) => {
				if(e.id === idToEdit){
					const copyBook = {...e}
					book.push(copyBook);
					book.push(idx)
					}
			});
			if(book.length > 0){
				let newDate = prompt("Ingrese las nuevas fechas separadas por ','");
				if (regex.test(newDate)){
					newDate = newDate.split(',');
					book[0].date1 = newDate[0];
					book[0].date2 = newDate[1];
					booking.splice(book[1], 1, book[0]);
					alert("Reserva modificada");
				}
				else {
					alert("Formato de fechas inválido");
				}
			}
			else{
				alert(`el id ${idToEdit} no ha sido encontrado`);
			}
		}
		else alert("Valor ingresado no valido");
	}
}

const cancelarReserva = (name, rooms, roomTypes) => {
	const idToEdit = parseFloat(prompt(`Ingrese el id de la reserva a editar:
${verReservas(name, rooms, roomTypes)[0]}`));
	const bookingName = verReservas(name, rooms, roomTypes)[1];
	if(bookingName.length>0){
		let exist = false;
		bookingName.forEach(element => {
			element.id === idToEdit ? exist = true : null
		});
		if(isValidNumber(idToEdit) && exist){
			booking.forEach((e,idx) => {
				if(e.id === idToEdit){
					if(confirm(`Seguro desea eliminar la reserva:
id: ${e.id}, fecha de ingreso: ${e.date1}, fecha de salida: ${e.date2}, habitacion: ${e.room}`)
					){
						booking.splice(idx, 1);
						rooms.forEach(room =>{
							if(room.number === e.room){
								room.availability = true;
							}
						})
						alert("Reserva eliminada")
					}
					else{
						alert
					}
				}
			});
		}
		else{
			alert("id No encontrado")
		}
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
				alert(verReservas(prompt("Ingrese a nombre de quien esta la reserva:"), rooms, roomTypes)[0]);
				break;
			case '4':
				editarReserva(prompt("Ingrese a nombre de quien esta la reserva:"), rooms, roomTypes);
				break;
			case '5':
				cancelarReserva(prompt("Ingrese a nombre de quien esta la reserva:"), rooms, roomTypes);
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