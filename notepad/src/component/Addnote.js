import React, { useContext , useState } from 'react'
import Noteitems from './noteitems'
import noteContext from '../context/notestate'


export default function Addnote() {
    const context = useContext(noteContext);
    const addnote = context.addnote;
    const [note, setnote] = useState({title : "",tag : " ",description : ""});
    const onchange = (e)=>{
      setnote({...note , [e.target.name] : e.target.value})
    }
    const handleClick = ()=>{
          addnote(note.title , note.description , note.tag);
    }
    return (
    <>
      <form  className='note'>
        <h1>Add Your Note</h1>
        <div className='container'>
          <div className='no1'>

            <label htmlFor="title">Title:</label>
            <input type="text"  name="title" 
              placeholder='Give a title' onChange={onchange} />
          </div>

          <div className='no1'>
            <label htmlFor="tag">Tag:</label>
            <input type="text" name="tag"  placeholder='Enter a tag' onChange={onchange} /><br /><br />
          </div>

        </div>
        <label htmlFor="description">Note:</label><br />
        <textarea name="description" rows="5" cols="30"  placeholder='Write your note' onChange={onchange}></textarea><br /><br />
        <button  onClick={handleClick}>submit</button>
      </form>
      <div className='container'>
        <Noteitems />
      </div>

    </>
  )
}
