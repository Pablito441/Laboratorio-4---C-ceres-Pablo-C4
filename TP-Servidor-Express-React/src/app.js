const { envs } = require("./config/env");
const { createServer } = require("./service/service");

const main = () => {
  createServer(envs);
};

(async () => {
  main();
})();

//Anoto las dependencias que instale para siempre recordarlas
//npm install nodemoon
//npm install dotenv
//npm install env-var
//npm install express
