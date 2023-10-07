import { useEffect, useRef } from "react"

interface Props {
    query: string
    setQuery: (e: string) => void
}
const Search = ({ query, setQuery }: Props) => {
    const inputEl = useRef<HTMLElement | null>(null)
    useEffect(() => {
        const callback = (e: Event) => {
            if (document.activeElement === inputEl.current) return;
            if (e.code === "Enter") {
                inputEl.current.focus()
                setQuery("")
            }
        }
        document.addEventListener('keydown', callback)
        return () => document.removeEventListener('keydown', callback)
    }, [setQuery])

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search