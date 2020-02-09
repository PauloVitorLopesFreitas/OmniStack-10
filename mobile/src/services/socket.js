import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.19:3333', {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  //A função será executada ao receber do backend o cadastro do novo usuário.
  socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {  
  socket.io.opts.query = {
    //Ao realizar a conexão é enviado ao backend todos os parametros do filtro.
    latitude,
    longitude,
    techs,
  }
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  };
}

export {
  connect,
  disconnect,
  subscribeToNewDevs
};

