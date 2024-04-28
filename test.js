console.log("Inicio del script");

  setTimeout(() => {
    console.log("Primer setTimeout");
  }, 0);
  
  setTimeout(() => {
    console.log("Segundo setTimeout");
  }, 0);
  
  Promise.resolve("Promesa resuelta").then(console.log);
  
  console.log("Fin del script");