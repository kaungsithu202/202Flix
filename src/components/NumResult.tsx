
interface Props {
    moviesCount: number
}

const NumResult = ({ moviesCount }: Props) => {
    return (
        <p className="num-results">
            Found <strong>{moviesCount}</strong> results
        </p>
    )
}

export default NumResult