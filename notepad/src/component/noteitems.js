import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notestate'
import Notecard from './Notecard';
export default function Noteitems() {
    const context = useContext(noteContext);
    const a = context.not;
    const getnote = context.getnote;

    useEffect(() => {
        getnote();
    }, [])
    
    return (
        <>
        <div className='container'> 
                <h2>Your Notes</h2>
        </div>
        {a.map((note) => {
            return (
                <Notecard key={note._id} note={note} />);
            })
        }
        </>
    )
}
