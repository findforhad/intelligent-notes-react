import { useState } from "react";

const AddNotes = ({ createNewNote }) => {
  const [note, setNote] = useState("");
  return (
    <div>
      <p>Add New Note</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNewNote({
            note,
            complete: false,
          });
        }}
      >
        <input onChange={({ target }) => setNote(target.value)} value={note} />
        <button type="submit">Add New Notes</button>
      </form>
    </div>
  );
};

export default AddNotes;
