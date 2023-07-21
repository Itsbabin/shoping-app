import { useState } from "react";
import noteContext from "./context/notestate";



const NoteState = (props) => {

    const [not, setNot] = useState([]);

    const getnote = async () => {
        const response = await fetch("http://localhost:5000/note/getnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": "eyJhbGciOiJIUzI1NiJ9.NjQ5NTkyZjc1ZTljZTAyZTZhODhjOGQ5.z2tJHgQxPCWDdjE8LZzLjCMOETYiLqbAPJYeOyVXkTs"
            },
        });
        const json = await response.json();

        setNot(json);
    }


    const addnote = async (title, description, tag) => {
        const response = await fetch("http://localhost:5000/note/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "eyJhbGciOiJIUzI1NiJ9.NjQ5NTkyZjc1ZTljZTAyZTZhODhjOGQ5.z2tJHgQxPCWDdjE8LZzLjCMOETYiLqbAPJYeOyVXkTs"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tag: tag
            })
        });
        const json = await response.json()
        console.log(json);
    }

    const deleteNote = async (id) => {
        const response = await fetch(`http://localhost:5000/note/delete/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "eyJhbGciOiJIUzI1NiJ9.NjQ5NTkyZjc1ZTljZTAyZTZhODhjOGQ5.z2tJHgQxPCWDdjE8LZzLjCMOETYiLqbAPJYeOyVXkTs"
            },
        });
        const json = await response.json()
        console.log(json);
        // const tbdlt = not.filter((not) => { return not._id !== id });
        // setNot(tbdlt);
    }

    return (
        <noteContext.Provider value={{ not, addnote, deleteNote, getnote }} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState; 