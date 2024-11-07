import {useState} from 'react'
import { useEffect } from 'react'
import notesService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Write a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleImportance = (id) => {
  //console.log(`Importance of note ${id} needs to be toggled`)
  const note = notes.find(n => n.id === id)
  const changedNote = {...note, important: !note.important}
  
  notesService
  .update(id, changedNote)
  .then(response => {
  setNotes(notes.map(x => x.id !== id  ? x : response))
  })
  .catch (error => {
    setErrorMessage(
      `Note '${note.content}' was already deleted from the server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNotes(notes.filter(n => n.id !== id))
  })
}

  useEffect(() => {
    console.log('Inicio effect')
    notesService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  //console.log('Render', notes.length, 'notes');
  

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    //console.log("Button clicked", event.target)
  const newNoteObject = {
    content: newNote,
    important: Math.random() > 0.5
 
  }

  notesService.create(newNoteObject).then(response => {
    setNotes(notes.concat(response))
    setNewNote('')
    })
  }
 
  
  
  const handleNotChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=> setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          x => <Note 
          key={x.id} 
          note={x} 
          toggleImportance={() => toggleImportance(x.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNotChange}/>
        <button type="submit">Add Note</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
