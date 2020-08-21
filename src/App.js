import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
      const newRepository = {
        title: `New Repository ${Date.now()}`,
        url: "http://github.com/...", 
        techs: ["Node.js", "..."]
      }

      const response = await api.post('repositories', newRepository);
      setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try{
      const response = await api.delete(`repositories/${id}`);

      if(response.status === 204){
      let index = repositories.findIndex((repository) => repository.id === id);
      let repositoryAfterRemove = [...repositories];
      repositoryAfterRemove.splice(index, 1);
      setRepositories(repositoryAfterRemove);
      }
    }catch(error){
      if(error.response){
        alert(error.response.data.error);
      }
    };
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
