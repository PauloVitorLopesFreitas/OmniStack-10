const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({      
      //parametro (in) ira trazer todos os operadores com as tecnologias pesquisadas no filtro.
      techs: {
        $in: techsArray,
      },
      location: {
        //parametro ($near) é utilizado para encontrar objetos em determinada localizacao.
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,//parametro de 10km informado em metros para localizar usuarios
        },
      },
    });

    return response.json({ devs });
  }
}