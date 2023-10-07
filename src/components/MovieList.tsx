import { IMovie } from "../types"
import Movie from "./Movie"
interface Props {
    movies: IMovie[],
    onSelectMovie: (id: string) => void
}

const MovieList = ({ movies, onSelectMovie }: Props) => {

    return (
        <ul className="list list-movies">
            {movies?.map((movie: IMovie) => (
                <Movie movie={movie} key={crypto.randomUUID()} onSelectMovie={onSelectMovie} />
            ))}
        </ul>
    )
}

export default MovieList