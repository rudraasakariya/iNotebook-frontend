import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";

function Note(props) {

  function handleDelete() {
    axios.delete("/notes/delete-note/" + props.id, {
      headers: {
        "Content-Type": "application/json",
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDk3YThlY2M5ZmYzZTRjMmUwM2MzZiIsImlhdCI6MTY2NTc2MDYyOX0.yanWfVSn56FEkEoOYs2j4fNRFw4B5qDLv31g9qPJglI"
      }
    }).then((res) => {
      props.deleteNote(res.data.note);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleEdit() {

    
    // axios.put("/notes/update-note/" + props.id, {
    //   title: "",
    //   description: ""
    // }, {
    //   headers: {
    //     Accept: "application/json",
    //     "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDk3YThlY2M5ZmYzZTRjMmUwM2MzZiIsImlhdCI6MTY2NTc2MDYyOX0.yanWfVSn56FEkEoOYs2j4fNRFw4B5qDLv31g9qPJglI"
    //   }
    // }).then((res) => {
    //   console.log(res.data);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  return (
    <div className="note" >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
