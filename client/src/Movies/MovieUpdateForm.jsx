import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export default function UpdateForm(props)
{
    let history = useHistory();

    let id = useParams().id;
    let Movie = props.movielist.filter((i)=>{return i.id == id});

    if (Movie.length == 0)
        Movie.push({error:"ID Invalid"});

    Movie = Movie[0];

    let [FormData, sFormData] = useState({id:-300});

    if (Movie.error)
        return (<h1>?</h1>);
    
    if (FormData.id != Movie.id)
        sFormData(Movie);

    let formCB = function(e)
    {
        Axios.put(`http://localhost:5000/api/movies/${id}`, FormData).then((res) =>
        {
            props.setmovielist(props.movielist.map((i)=>
                {
                    if (res.data.id != i.id)
                        return i;
                    
                    return res.data;
                }));

            history.push("/");
        }).catch((err) => 
        {
            console.log(err.response)
        });
    }

    let HandleChange = function(e)
    {
        sFormData({...FormData, [e.target.name]:e.target.value });
    }

    return (
        <>
            <form onSubmit={(e)=>{e.preventDefault(); formCB(e);}}>
                <input type="text" name="title" onChange={(e)=>{HandleChange(e);}} value={FormData.title} placeholder="Title" />
                <input type="text" name="director" onChange={(e)=>{HandleChange(e);}} value={FormData.director} placeholder="Director" />
                <input type="number" name="metascore" onChange={(e)=>{HandleChange(e);}} value={FormData.metascore} placeholder="Metascore" />
                <button type="submit">Update</button>
            </form>
        </>
    )
}