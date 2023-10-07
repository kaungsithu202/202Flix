import React, { useEffect, useState } from 'react'
import { API_KEY } from '../App'
import StarRating from './StarRating'
import Loading from './Loading'

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie

    const handleAdd = () => {
        console.log("runtime", runtime)

        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime?.split(" ").at(0)),
            userRating

        }
        onAddWatched(newWatchedMovie)
    }

    useEffect(() => {

        const getMovieDetails = async () => {
            setLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`)
            const data = await res.json()
            setMovie(data)
            setLoading(false)
        }
        getMovieDetails()
    }, [selectedId])

    useEffect(() => {
        if (!title) return
        document.title = `Movie | ${title}`
        return () => document.title = "202Flix"
    }, [title])

    useEffect(() => {
        const callback = (e: KeyboardEvent) => {
            if (e.code === "Escape") onCloseMovie()
        }
        document.addEventListener("keydown", callback)
        return () => document.removeEventListener("keydown", callback)
    }, [onCloseMovie])



    // useEffect(() => document.title = `Movie ${title}`, [title])

    return (
        <div className='details'>
            {loading ? <Loading /> : <>
                <header>
                    <button className='btn-back' onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`Poster of ${movie} movie`} />
                    <div className='details-overview'>
                        <h2>{title}</h2>
                        <p>
                            {released} &bull; {runtime}
                        </p>
                        <p>{genre}</p>
                        <p>
                            <span>⭐️</span>
                            {imdbRating}IMDB rating
                        </p>
                    </div>
                </header>
                <section>
                    <div className='rating'>
                        {!isWatched ? <>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />
                            {userRating > 0 && <button className='btn-add' onClick={handleAdd}>+ Add to list</button>}
                        </> : <p>
                            You rated with movies {watchedUserRating} <span>⭐️</span>
                        </p>}
                    </div>
                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed By {director}</p>
                </section></>}
        </div >
    )
}

export default MovieDetails