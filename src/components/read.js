import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);

  //Defines and manages the Reload function, which fetches updated movie data from the server and updates the state
  const Reload = () => {
    console.log("Reloading movie data...");
    axios.get('http://localhost:4000/api/movies')
        .then((response) => {
            setData(response.data.movies);
        })
        .catch((error) => {
            console.error("Error reloading data:", error);
        });
};

//Call reload()
  useEffect(() => {
    Reload();
  },[]);

  return (
    <div>
      <h2>Movie List</h2>
      {/**Return the Reload() function */}
      <Movies myMovies={data} ReloadData={Reload} />
    </div>
  );
}

export default Read;