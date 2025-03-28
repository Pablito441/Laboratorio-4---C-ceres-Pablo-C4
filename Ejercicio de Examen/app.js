import readline from "readline";
import fs from "fs/promises";
import yargs from "yargs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pedirDato = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
};

const ejercicioExamen = async () => {
  const product = await pedirDato("¿Cuál es tu nombre del producto? ");
  const price = await pedirDato("¿Cuál es el precio del producto? ");
  const amount = await pedirDato(
    "Escribí la cantidad de unidades del producto: "
  );

  const newProduct = {
    nombre: product,
    precio: parseFloat(price),
    cantidad: parseInt(amount, 10),
  };

  const { file } = yargs(process.argv).argv;
  const archivo = file || "productos.json";
  try {
    let productos = [];

    try {
      const data = await fs.readFile(archivo, "utf-8");
      productos = JSON.parse(data);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    productos.push(newProduct);

    await fs.writeFile(archivo, JSON.stringify(productos, null, 2));

    const contenido = await fs.readFile(archivo, "utf-8");
    console.log("Contenido del archivo: ", JSON.parse(contenido));
  } catch (error) {
    console.error("Error al manejar el archivo: ", error);
  }
};

(async () => {
  await ejercicioExamen();
  rl.close();
})();
