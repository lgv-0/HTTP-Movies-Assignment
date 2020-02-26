import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateForm(props)
{
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
        
    }

    let HandleChange = function(e)
    {
        sFormData({...FormData, [e.target.name]:e.target.value });
    }

    console.log(Movie);

    return (
        <>
            <form onSubmit={(e)=>{e.preventDefault(); formCB(e);}}>
                <input type="text" name="title" onChange={(e)=>{HandleChange(e);}} value={FormData.title} placeholder="Title" />
                <input type="text" name="director" onChange={(e)=>{HandleChange(e);}} value={FormData.director} placeholder="Director" />
                <input type="number" name="metascore" onChange={(e)=>{HandleChange(e);}} value={FormData.metascore} placeholder="Metascore" />
            </form>
        </>
    )
}