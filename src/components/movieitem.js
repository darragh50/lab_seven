import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const MovieItem = (props)=> {
  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); //Only run this effect when the mymovie prop changes

//HandleDelete Function
const handleDelete = (e) => {
  //Stops it being called multiple times
  e.preventDefault();
  //Call axios to use the http delete function and assign the url + movieID
    axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
        .then(() => {
            props.Reload(); //Refresh the movie list after deletion
        })
        .catch((error) => {
            console.error("Error deleting movie:", error);
        });
};

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        {/**Adds an "Edit" button to each movie item, allowing users to navigate to the edit page for that specific movie*/}
        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
        {/**Button used to delete when clicked - "Danger" is the button style */}
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default MovieItem;