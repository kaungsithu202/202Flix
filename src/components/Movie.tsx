import { IMovie } from '../types'

interface Props {
    movie: IMovie
    onSelectMovie: (id: string) => void
}
const Movie = ({ movie, onSelectMovie }: Props) => {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

export default Movie