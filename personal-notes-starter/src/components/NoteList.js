import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({notes, onDelete, onArchive}) => {
    return(
        <div className="notes-list">
            {
                notes.map((note) => (
                    <NoteItem key={note.id} 
                    title={note.title} 
                    body={note.body} 
                    createdAt={note.createdAt} 
                    archived={note.archived}
                    onDelete={onDelete} 
                    onArchive={onArchive}
                    {...note} />
                ))
            }
        </div>
    );
}

export default NoteList;