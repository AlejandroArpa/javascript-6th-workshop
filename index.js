import createComponent from "./createComponent.js";
class ExerciseComponent {
    constructor(title, description, code, buttonId) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.buttonId = buttonId;
    }
    generateComponent(){
        return createComponent(this.title, this.description, this.code, this.buttonId)
    }
    addToHtml(parentId){
        const parentElement = document.getElementById(parentId);
        const componentHtml = this.generateComponent();
        if(parentElement){
            parentElement.innerHTML += componentHtml;
        }
    }
}

const excer1 = new ExerciseComponent(
    "Ejercicio 1",
    "De acuerdo al código proporcionado a continuación, se realizará unas series de preguntas para validar si las variables son accesibles o no, al final se dará una retroalimentación.",
    `
    // Global Scope
    var globalVariable = "Soy una variable global.";
    function testScope() {
        // Function Scope
        var functionVariable = "Soy una variable local.";
        if (true) {
            // Block Scope
            let blockVariable = "Soy una variable de bloque.";
            console.log("Dentro del bloque:", blockVariable);
        }
        console.log("Dentro de la función:", functionVariable);
    }
    console.log("Fuera de la función:", globalVariable);
    testScope();
    `,
    "1stExc"
)

const excer2 = new ExerciseComponent(
    "Ejercicio 2",
    "De acuerdo al codigo proporcionado a continuación, se realizara unas series de preguntas para predecir el comportamiento del programa, al final se dara una retroalimentación.",
    `// vars call
    console.log("Valor de a:", a);
    console.log("Valor de b:", b);
    console.log("Valor de c:", c);
    
    // functions call
    console.log("Resultado de funcionDeclarada:", funcionDeclarada());
    console.log("Resultado de funcionExpresada:", funcionExpresada());
    
    // vars declaration
    var a = 1;
    let b = 2;
    const c = 3;
    
    // functions declarations
    function funcionDeclarada() {
    return "Función declarada ha sido llamada.";
    }
    
    const funcionExpresada = function () {
    return "Función expresada ha sido llamada.";
    };`, "2ndExc"
)

const excer3 = new ExerciseComponent(
    "Ejercicio 3",
    "De acuerdo al codigo proporcionado a continuación, se realizara unas series de preguntas para predecir el comportamiento del programa, al final se dara una retroalimentación.",
    `const crearSumador = (num)=>{
        const suma = (num2) =>{
            return num + num2
        }
        return suma;
    }
    
    const sumarCinco = crearSumador(5);
    console.log(sumarCinco(3));`, "3thExc"
)


const excer7 = new ExerciseComponent(
	"Ejercicio 7",
	"De acuerdo al codigo proporcionado a continuación, se realizara una pregunta para predecir el comportamiento del programa, al final se dara una retroalimentación.",
	`console.log("Inicio del script");

	setTimeout(() => {
		console.log("Primer setTimeout");
	}, 0);
	
	setTimeout(() => {
		console.log("Segundo setTimeout");
	}, 0);
	
	Promise.resolve("Promesa resuelta").then(console.log);
	
	console.log("Fin del script");
	
	Lista console.log para ejercicios:

		1. console.log("Inicio de Script")
		2. console.log("Primer settimeout")
		3. console.log("segundo settimeout")
		4. console.log("Promesa resuelta")
		5. console.log("Fin del script")`,
	"7thExc"
)

const excersice7 = () =>{
	const answer = prompt(`En esta ocasión la idea es indicar el orden en el que van a aparecer los console.log.
	La respuesta debe de ser de la siguiente forma, supongamos que el orden es 1-2-3-4-5 los numeros deben de ir separados por '-'`)
	const arrayCorrect = [1,5,4,2,3];
	const arrayAnswer = answer.split('-');
	let result = true
	arrayAnswer.forEach((element,idx) => {
		if(Number(element) !== arrayCorrect[idx]){
			alert(`Te equivocaste en el orden del ${idx+1} console.log, aqui deberia de ir el ${arrayCorrect[idx]} console.log`);
			result=false;
		} 
	});
	result ? alert("Felicitaciones ese es el orden") : null;
}

const excersice1 = () =>{
    const ans =[];
    ans.push(confirm("Crees que el console de globalVariable NO va a arrojar un error?"));
    ans.push(confirm("Crees que el console de functionVariable NO va a arrojar un error?"));
    ans.push(confirm("Crees que el console de blockVariable NO va a arrojar un error?"));
    let correct;
    ans[0] && ans[1] && ans[2] ? correct = true : correct = false;
    if(correct){
        alert("Felicidades, la tienes clara");
    }
    else{
        if(!ans[0]){
            alert("Te equivocaste en la primera: como globalVariable es global, y esta definida al ppo se puede acceder en cualquier parte.")    
        }
        if(!ans[1]){
            alert("Te equivocaste en la segunda: como functionVariable se llama dentro del scope de testScope por eso se puede acceder, aparte de que es declarada como var")
        }
        if(!ans[2]){
            alert("Te equivocaste en la tercera: como blockVariable es llamado dentro del bloque, entonces es accesible")
        }

    }

}
const excersice2 = () =>{
    const ans =[];
    const correctAns =["undefined", "error", "error", "funcion declarada ha sido llamada", "error" ];
    ans.push(prompt(`Que valor tiene "a" al ejecutar console.log("Valor de a:", a); ten en cuenta que si va a arrojar un error solo debes escribir "error"`).toLocaleLowerCase());
    ans.push(prompt(`Que valor tiene "b" al ejecutar console.log("Valor de b:", b); ten en cuenta que si va a arrojar un error solo debes escribir "error"`).toLocaleLowerCase());
    ans.push(prompt(`Que valor tiene "c" al ejecutar console.log("Valor de c:", c); ten en cuenta que si va a arrojar un error solo debes escribir "error"`).toLocaleLowerCase());
    ans.push(prompt(`Que valor tiene "funcionDeclarada()" al ejecutar console.log("Resultado de funcionDeclarada:", funcionDeclarada()); ten en cuenta que si va a arrojar un error solo debes escribir "error"`).toLocaleLowerCase());
    ans.push(prompt(`Que valor tiene "funcionExpresada()" al ejecutar console.log("Resultado de funcionExpresada:", funcionExpresada()); ten en cuenta que si va a arrojar un error solo debes escribir "error"`).toLocaleLowerCase());
    correct = true;
    ans.forEach( (e,idx) => {
        e === correctAns[idx]? null : correct=false;
    });
    correct ? alert("felicidades has acertado") : alert("uy te equivocaste"); 
}

const excersice3 = () =>{
    prompt("Cual crees que es el resultado que va a mostrar?") === "8" ? alert("Correcto") : alert("Te equivocaste, el resultado es 8");
}

/*Respuesta a preguntas:
Las funciones mantienen su acceso a variables externas ya que al momento de declararse crean un closure de las variables y funciones accesibles, (todas aquellas que estan por fuera ). 
Si se crean muchas instancias de funciones con closure la memoria se va gastando, ya que se deben de mantener hasta el momento de su ejecucion por lo que hay que tener cuidado con los recursos.
*/

//Excercise 4
/* console.log(
    "Intentando llamar a 'funcionDeclarada' antes de su declaración:"
  );
  try {
    console.log(funcionDeclarada());
  } catch (error) {
    console.log("Error:", error.message);
  }
  
  console.log(
    "Intentando llamar a 'funcionExpresada' antes de su declaración:"
  );
  try {
    console.log(funcionExpresada());
  } catch (error) {
    console.log("Error:", error.message);
  }
  
  // Declaración de una función declarada
  function funcionDeclarada() {
    return "Función declarada ha sido llamada.";
  }
  
  // Declaración de una función expresada
  const funcionExpresada = function () {
    return "Función expresada ha sido llamada.";
  };
  
  console.log("Llamando a 'funcionDeclarada' después de su declaración:");
  console.log(funcionDeclarada());
  
  console.log("Llamando a 'funcionExpresada' después de su declaración:");
  console.log(funcionExpresada());
 */

  //Results 
/* Intentando llamar a 'funcionDeclarada' antes de su declaración:
Función declarada ha sido llamada.
Intentando llamar a 'funcionExpresada' antes de su declaración:
Error: Cannot access 'funcionExpresada' before initialization
Llamando a 'funcionDeclarada' después de su declaración:
Función declarada ha sido llamada.
Llamando a 'funcionExpresada' después de su declaración:
Función expresada ha sido llamada. */

//al intentar llamar una funcion declarada antes de su declaracion, como el hoisting la sube, no hay ningun problema, caso contrario ocurre con la expresada
//Las funciones declaradas pueden ser llamadas antes de su declaracion ya que, como ocurre con var, el hoisting le asigna un espacio de memoria justo antes 
//de empezar a ejecutar las lineas de codigo.

//Excersice 5
/* const manejarAsincronia = (callback, promise) => {
	promise.then((answer)=>callback(answer))
	.catch((answer)=>callback(answer))
}

const promise = new Promise((resolve, reject) => {
		setTimeout(()=>resolve('Resolve'), 1000),
		setTimeout(()=>reject('Reject'), 2000)
})

manejarAsincronia((where)=>{
	console.log(`Ejecutado desde: ${where}`);
}, promise) */
//Con este ejercicio me quedo mas que claro el funcionamiento de una promesa. Püntos claves para el Alejandro del futuro:
/* 
1. Reject y resolve son funciones que se pasan como argumentos al new promise
2. Pueden retornar algo, y lo que va a retornar se le pasa como parametro
3. Dentro del then y catch se pasa la referencia a la funcion, mas no la ejecucion de la misma, por lo mismo si se necesita pasar parametros a la
      a la funcion a ejecutar, se puede declarar una funcion anonima y en el cuerpo de la funcion hacer el llamado a la otra funcion
*/

//Excersice 6
/* console.log("Mensaje 1: Inmediatamente");
setTimeout(()=>console.log("Mensaje 2: Con timeout de 0 segundos"),0);
console.log("Mensaje intermedio");
setTimeout(()=>console.log("Mensaje 3: Con timeout de 1 segundo"),1000); */

//El comportamiento es que los console log van a ser tratados como asincronos, y el setTimeout a pesar de tener un tiempo en cero va a ser asincrono, ṕor lo que 
//debe de epasar al monticulo, luego a la cola de macro tareas, y vuelve a la pila mediante el event loop, pero como hay primero en la pila un console log, es por esto
//que primero se muestra el mensaje intermedio
/*
NOTA IMPORTANTE:
Macro tareas:
	Eventos de temporización: como setTimeout, setInterval.
	Eventos de I/O: como operaciones de disco, operaciones de red.
	Eventos de UI: como clicks, scrolling, typing.
	Parsing HTML, cuando se carga una página.
	Ejecución de scripts: ejecutar un <script> completo.
	Requests de renderizado: como requestAnimationFrame.
Micro tareas:
	Callbacks de Promesas: como .then(), .catch(), y .finally().
	Procesos de MutationObserver: usados para observar cambios en el DOM.
	queueMicrotask(): que explicitamente encola una micro tarea.
*/

//Excersice 8
const createCounter = () =>{
    let counter = 0;
    const addCounter = () =>{
        const num = document.getElementById("number").value ? document.getElementById("number").value : 0;
        counter+=Number (num);
        console.log(counter);
        document.getElementById("labeCount").textContent=counter;
    }
    return addCounter 
}

const counter1 = createCounter();

//Excersice 9
function excersice9 () {
    let timmer = document.getElementById("delay").value ? document.getElementById("delay").value : 0;
    timmer = Number(timmer) * 1000;
    document.getElementById('spinner').style.display = 'flex';
    const getInfo = () =>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else throw new Error(`Error en la peticion: ${response.status}`);
            }
        )
        .then(data => console.log(data))
        .catch(err => console.error("Uyyy un error: ", err.message))
        .finally(() => document.getElementById('spinner').style.display = 'none')
    }
    setTimeout(getInfo, timmer);
}

excer1.addToHtml('main');
excer2.addToHtml('main');
excer3.addToHtml('main');
excer7.addToHtml('main');
document.getElementById("1stExc").addEventListener('click', excersice1);
document.getElementById("2ndExc").addEventListener('click', excersice2);
document.getElementById("3thExc").addEventListener('click', excersice3);
document.getElementById("7thExc").addEventListener('click', excersice7);
document.getElementById("count+").addEventListener('click', counter1);
document.getElementById("9thExc").addEventListener('click', excersice9);