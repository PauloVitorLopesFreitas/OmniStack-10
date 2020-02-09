const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    //Armazena no array (connections) o novo usuario cadastrado.
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });    
  });
};

exports.findConnections = (coordinates, techs) => {
  //retorna todas as conexões de devs cadastrados que estão entre 10km
  //e que possuem as tecnologias filtradas
  return connections.filter(connection => {
     return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  //percorre todo o array e envia os dados do dev cadastrado ao Frontend através do websocket
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}