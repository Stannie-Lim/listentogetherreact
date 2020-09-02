const socketio = require('socket.io');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const volleyball = require('volleyball');
app.use(volleyball);
app.use(express.json());

const staticFolder = path.join(__dirname, "..", "..", "static");
const distFolder = path.join(__dirname, "..", "..", "dist");
app.use(express.static(staticFolder));
app.use(express.static(distFolder));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(staticFolder, "index.html"));
});

// api routes
app.use("/api", require("./api"));

// error middleware
app.use((err, req, res, next)=> {
  console.error(err);
  res.status(500).send({ message: err. message });
});


const port = process.env.PORT || 3000;

const io = require('socket.io').listen(server);

require('./socket')(io);

server.listen(port, () => console.log(`listening on ${port}`));