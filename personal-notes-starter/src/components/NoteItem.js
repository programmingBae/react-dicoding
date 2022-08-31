import React from "react";
import NoteItemContent from "./NoteItemContent";
import NoteItemAction from "./NoteItemAction";


const NoteItem = ({id, title, body, createdAt, archived, onDelete, onArchive }) => {
    return (
        <div className="note-item">
            <NoteItemContent title={title} body={body} createdAt={createdAt} />
            <NoteItemAction id={id} archived={archived} onDelete={onDelete} onArchive={onArchive} />
        </div>
    );
}

export default NoteItem;