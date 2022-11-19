import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    axios.post("/notes/create-note", {
      title: note.title,
      description: note.content
    }, {
      headers: {
        Accept: "application/json",
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDk3YThlY2M5ZmYzZTRjMmUwM2MzZiIsImlhdCI6MTY2NTc2MDYyOX0.yanWfVSn56FEkEoOYs2j4fNRFw4B5qDLv31g9qPJglI"
      }
    }).then((res) => {
      let note = {
        id: res.data.note.id,
        title: res.data.note.title,
        content: res.data.note.description
      };
      props.onAdd(note);
    }).catch((errors) => {
      console.log(errors);
    });
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();

  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
