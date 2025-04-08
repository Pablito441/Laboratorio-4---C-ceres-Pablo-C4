const express = require("express");
const path = require("path");
const createServer = (options) => {
  const app = express();

  app.use(express.static(options.path));

  app.get("*", (req, res) => {
    const indexPath = path.join(
      __dirname + `../../../${options.path}/index.html`
    );
    res.sendFile(indexPath);
  });

  app.listen(options.port, () => {
    console.log("escuchando en el puerto: ", options.port);
  });
};

module.exports = {
  createServer,
};
