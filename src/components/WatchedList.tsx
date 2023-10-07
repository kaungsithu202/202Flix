import { IWatchedData } from "../types"
import WatchedMovies from "./WatchedMovies"
interface Props {
    watched: IWatchedData[]
}
const WatchedList = ({ watched, onDeleteWatched }: Props) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovies
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    )
}

export default WatchedList