import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getMoviesData, logOut } from './redux/user'



export function Movies() {
    const movies = useSelector((state) => state.user.moviesData)
    const dispatch = useDispatch()
    const API_KEY = "40e456f9f4e383c0b32b6088b11617fa"
    // fetches the movie data from the API then dispatches them and they get saved into the state
    // and now state.user.moviesData contains the fetched data
    // if data exists then they will get rendered using map()
    useEffect(() => {
        async function getMovies() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            const data = await response.json() 
            dispatch(getMoviesData(data))
        }
        getMovies()
    }, [dispatch])

    return(
        <div className='movies-container'>
            <nav>
                <h2>React Website</h2>
                <div className='nav-email'>{JSON.parse(window.localStorage.getItem("user")).email}</div>
                <button className='login-button' 
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(logOut())
                    }}>Log out</button>
            </nav>
            {
            movies !== null ? 
            <>
           {movies.results.map((element, index) => (
            <div  className='movie-item-container' key={index}>
                <div className='movie-item'>
                <div className='movie-poster'>
                        <img src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} alt={element.title}/>
                    </div>
                    <div className='movie-title'>
                        <h3>{element.title}</h3>
                    </div>
                </div>
                </div>
            ))}
            </>
            
            :

            <>
            </>
        }

        </div>
    )
}