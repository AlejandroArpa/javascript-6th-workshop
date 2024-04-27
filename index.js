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






document.getElementById("1stExc").addEventListener('click', excersice1)
document.getElementById("2ndExc").addEventListener('click', excersice2)
document.getElementById("3thExc").addEventListener('click', excersice3)
