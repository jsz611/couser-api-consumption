import { useState, useEffect } from 'react'
import Tours from './components/Tours'
import './App.css'

const URL = '/react-tours-project';

function App() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

 const fetchTours = async () => {
  setLoading(true)
  try {
    const response = await fetch(URL)
    if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
      console.log(`HTTP error! status: ${response.status}`);
      setLoading(false);
      return; 
    }
    const data = await response.json()
    console.log('Dados recebidos da API:', data) 

    setLoading(false)
    setTours(data)
    console.log('Estado tours atualizado para:', data); 
  } catch (error) {
    setLoading(false)
    console.error('Erro ao buscar tours:', error) 
  }
}


console.log('Tours no estado do App:', tours);

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <h2>Loading</h2>
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <h2>No Data</h2>
        <button className='btn' onClick={() => fetchTours()}>
          Refresh
        </button>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  )
}

export default App
