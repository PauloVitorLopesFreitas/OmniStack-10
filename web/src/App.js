import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      //Função que realiza uma busca de todos os usuarios cadastrados no banco de dados
      //para apresentar em tella.

      const response = await api.get('./devs');

      setDevs(response.data);
    }
    loadDevs();
    
  }, []);

  async function HandleAddDev(data) {
    //Salva no banco de dados o registro cadastrado
    const response = await api.post('/devs', data);    
      
    //apos inserir o usuario, a constante[devs] ira receber todos os devs mais o novo registro inserido
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>      
        <strong>Cadastrar</strong>
        <DevForm onSubmit={HandleAddDev}/>
      </aside>  

      <main>
        <ul>
          {/*Percorre o array de todos os devs e retorna todo o conteudo*/}
          {devs.map(dev => (
            //insere o componte (DevItem) com sua propriedade(dev) recebendo o 
            //respectivo valor que (dev) possui, que no caso são as informacoes de cada usuario.

            //Sempre ao renderizar o primeiro item de um array, deve ser informado
            //uma chave que nao se repete, neste caso é o id do user.
            <DevItem key= {dev._id} dev={dev}/>
          ))}
        </ul>  
      </main>  

    </div>  
  );  
}

export default App;
 