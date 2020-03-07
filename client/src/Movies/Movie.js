import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movieList, setMovieList })
{
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  let history = useHistory();

  const fetchMovie = id =>
    {
      axios.get(`http://localhost:5000/api/movies/${id}`).then((res) =>
      {
        setMovie(res.data)
      }).catch((err) => 
      {
        console.log(err.response)
      });
    };
  
  const delMovie = id =>
  {
    axios.delete(`http://localhost:5000/api/movies/${id}`).then((res) =>
    {
      setMovieList(movieList.filter((i)=>{return i.id != res.data}));
      history.push("/");
    }).catch((err) => 
    {
      console.log(err.response)
    });
  }

  const saveMovie = () =>
  {
    addToSavedList(movie);
  };

  useEffect(() =>
  {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie)
  {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <Link to={`/update-movie/${movie.id}`}>Edit</Link>
      &nbsp;
      <a onClick={(e)=>{delMovie(movie.id)}} href="#">Delete</a>
    </div>
  );
}

export default Movie;
