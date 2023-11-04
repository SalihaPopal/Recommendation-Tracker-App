import React from 'react';
import './MovieCard.css'; 

export default function MovieCard({movie}) {

  console.log('Medium URL:', movie.medium_url);

  // const { title, mood, recommender} = movie 

  return (
    <div className='card-container'>
      <div className='cord-img-container'>
        <img className='card-img' src={movie.medium_url} alt='movie-card' />
      </div>

      <div className='card-details'>
        <div>
        <span className='title'>{movie.title}</span>
      </div>
      <div>
        <span className='mood'>Mood: {movie.moods}</span>
      </div>
      <div>
        <span className='recommender'>Recommended by: {movie.recommender}</span>
      </div>
      </div>
  
    </div>
  )
}
