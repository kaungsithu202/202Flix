import { ReactNode } from "react";
import { IMovie } from "../types";

export interface IMovies {
    movies: IMovie[]
}
export interface Props {
    children: ReactNode
}

const Main = ({ children }: Props) => {
    return (
        <main className="main">
            {children}
        </main>
    )
}

export default Main