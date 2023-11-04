import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard/MovieCard';
import Moods from '../components/Moods/Moods';



export default function Movies({ onHandleItemClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
 

  const moviesUrl = 'http://localhost:8080/recommendations/movies';

  const getMovies = async () => {
    try {
      let response = await fetch(moviesUrl);
      let movies = await response.json();
      setMovies(movies);
      setMoods(movies)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  },[]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='h1'>Recommended Movies</h1>
<Moods 
  moods={moods} 
  setMoods={setMoods} 
  selectedMoods={selectedMoods} 
  setSelectedMoods={setSelectedMoods} 
/>

      <div className='main'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      </div>
    </div>
  );
}
