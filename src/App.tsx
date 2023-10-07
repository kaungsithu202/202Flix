import { useEffect, useState } from "react";
import Box from "./components/Box";
import Loading from "./components/Loading";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import NumResult from "./components/NumResult";
import Search from "./components/Search";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import { IMovie, IWatchedData } from "./types";
import MovieDetails from "./components/MovieDetails";

export const API_KEY = "a666bd0b"

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState<IWatchedData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [query, setQuery] = useState<string>("Batman");
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchMovie = async () => {
      try {
        setError("")
        setLoading(() => true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, { signal: controller.signal })
        if (!res.ok) {
          throw new Error("Something Went Wrong")
        }
        const data = await res.json()

        setMovies(data?.Search)
        if (data.Response === "False") {
          throw new Error("Movie Not Found")
        }
        setLoading(() => false)
      }
      catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }

    }
    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }
    handleCloseMovie()
    fetchMovie()
    return () => controller.abort()

  }, [query])

  const handleSelectMovie = (id: string) => {
    setSelectedId((prevId) => prevId === id ? null : id)
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleAddWtached = (movie) => {
    setWatched(watched => [...watched, movie])
  }
  const handleDeleteWtached = (id) => {
    console.log(id)

    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }


  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult moviesCount={movies?.length} />
      </Navbar>
      <Main>
        <Box>
          {loading && !error && <Loading />}
          {movies === undefined && error && <p className="center error">{error}</p>}
          {!error && !loading && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
        </Box>
        <Box>
          {selectedId ?
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWtached}
              watched={watched}
            /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWtached} />
            </>}
        </Box>
      </Main>
    </>
  );
}