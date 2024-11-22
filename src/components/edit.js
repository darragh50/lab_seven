import React from 'react';
 import { useParams } from 'react-router-dom';
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";

 export default function Edit(props) {
   //Is used to get the id of the movie from the URL
   let { id } = useParams();
   //Set all variables
   const [title, setTitle] = useState("");
   const [year, setYear] = useState("");
   const [poster, setPoster] = useState("");
   //This hook, also provided by React Router, returns a function that enables navigation to different routes programmatically
   const navigate = useNavigate();

//useEffect hook allows you to perform side effects in your components
 useEffect(() => {
     axios.get('http://localhost:4000/api/movie/' + id)
         .then((response) => {
             setTitle(response.data.title);
             setYear(response.data.year);
             setPoster(response.data.poster);
         })
         .catch((error) => {
             console.log(error);
         });
 }, [id]);

 //Send data entered to /read  
 const handleSubmit = (event) => {
     event.preventDefault();
     const newMovie = { id, title, year, poster };
     axios.put('http://localhost:4000/api/movie/' + id, newMovie)
         .then((res) => {
             console.log(res.data);
             navigate('/read');
         });
 }

 //Update values entered by user
 return (
     <div>
         <form onSubmit={handleSubmit}>
             <div className="form-group">
                 <label>Movie Title: </label>
                 <input type="text" 
                 className="form-control" 
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)} />
             </div>
             <div className="form-group">
                 <label>Release Year: </label>
                 <input type="text" 
                 className="form-control" 
                 value={year} 
                 onChange={(e) => setYear(e.target.value)} />
             </div>
             <div className="form-group">
                 <label>Poster URL: </label>
                 <input type="text" 
                 className="form-control" 
                 value={poster} 
                 onChange={(e) => setPoster(e.target.value)} />
             </div>
             <div className="form-group">
                 <input type="submit" value="Edit Movie" className="btn btn-primary" />
             </div>
         </form>
     </div>
 );
 }