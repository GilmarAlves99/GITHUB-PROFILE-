import React, { useReducer, useState } from 'react';
import './App.css';
import GithubImage from './github.png'

function App() {
  // valor rok Rouck []= [primeiro valor de fato do estado, valor que cewta o valor no estado ]
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();
  /*
  Função para tirar de forma padrao e evento de enviar o formulario
  */
  const handleSubmit = (event) => {
    // esse evento tira o reflesh da pagina 
    event.preventDefault();
    // ele acessar a api
    fetch(`https://api.github.com/users/${search}`)
      .then(response => response.json())
      .then(userResponse => setUserData(userResponse));
  }
  console.log(userData);

  const handleChange = (event) => {
    /*aqui voce ira mostrar o que esta escrevendo no input
    console.log(event.target.value);*/
    //para aparecer no input vc tem que sobreEscrever
    setSearch(event.target.value);
  }

  return (

    <div className="container text-center">
      <h1 className="py-5 text-uppercase">Github profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              required
              value={search}
              onChange={handleChange}
              placeholder="ex. GilmarAlves99"
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </span>
          </div>

        </div>

      </form>
      <div className="py-3">
        {!userData && (
          <img src={GithubImage}
            alt=""
            className="responsive rounded-circle"
            height="200px" />
        )}
        {userData && (

          <div>
            <img src={userData.avatar_url}
              alt=""
              className="responsive rounded-circle"
              height="200px" />

            <h1 className="pt-5">
              <a href={userData.html_url}
                target="_new">
                {userData.login}
              </a>

            </h1>
            <h3>{userData.location}</h3>

            <h4>Bio:</h4>
           
              {userData.bio}
          
            <p>
             Followers: {userData.followers}<br />
             Following: {userData.following}<br />
              <a href={userData.blog}>
                {userData.blog}
              </a>

            </p>
            <p>{userData.email}</p>



          </div>
        )}


      </div>
    </div>
  );
}

export default App;
