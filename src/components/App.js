import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get("/notes/fetch-notes", {
      headers: {
        "Content-Type": "application/json",
        auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDk3YThlY2M5ZmYzZTRjMmUwM2MzZiIsImlhdCI6MTY2NTc2MDYyOX0.yanWfVSn56FEkEoOYs2j4fNRFw4B5qDLv31g9qPJglI"
      }
    })
      .then((res) => {
        let fetchedNotes = res.data;
        fetchedNotes.forEach((note) => {
          addNote({
            id: note._id,
            title: note.title,
            content: note.description
          });
        });
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(note) {
    setNotes(prevNotes => {
      return prevNotes.filter(notes => {
        return notes.id !== note.id;
      });
    });
  }

  function editNote(note) {
    
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            addNote={addNote}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        );
      })}
      <Footer />
    </div >
  );
}

export default App;
