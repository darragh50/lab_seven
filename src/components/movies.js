import MovieItem from "./movieitem";

function Movies(props) {
    return (
        <>
        {/**Pass all data back */}
            {props.myMovies.map((movie) => (
                <MovieItem
                    myMovie={movie}
                    key={movie._id}
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

export default Movies;