import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard/MovieCard';
import Moods from '../components/Moods/Moods';

export default function Movies({ onHandleItemClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]); // Store selected moods

  const moviesUrl = 'http://localhost:8080/recommendations/movies';

  const getMovies = async () => {
    try {
      let response = await fetch(moviesUrl);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      let movies = await response.json();
      setMovies(movies);
      setMoods(movies);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
      setLoading(false);
    }
  }

  const filterMoviesByMoods = () => {
    if (selectedMoods.length === 0) {
      // If no moods selected, fetch all movies
      getMovies();
    } else {
      // Fetch movies filtered by selected moods
      const selectedMoodIds = selectedMoods.map(mood => mood.mood_id).join(',');
      const filteredMoviesUrl = `http://localhost:8080/recommendations/movies?with_moods=${selectedMoodIds}`;

      fetch(filteredMoviesUrl)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  }

  useEffect(() => {
    filterMoviesByMoods();
  }, [selectedMoods]); // Trigger filter when selectedMoods change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='h1'>Recommended Movies</h1>
      <Moods
        moods={moods}
        setMoods={setMoods}
        selectedMoods={selectedMoods}
        setSelectedMoods={setSelectedMoods} // Pass setSelectedMoods to Moods component
      />
      <div className='main'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

