import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api({url: '/projects', params: {title: 'Novo repo 2'}, method: 'GET'}).then(response => setRepositories(response.data)).catch(error => console.log(error))
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('project', { title: 'Novo repo', owner: 'repo' })
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`project/${id}`)
    const index = await repositories.findIndex(repository => repository.id === id)
    repositories.slice(index, 1)
    return repositories
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repository => 
              <li key={repository}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
