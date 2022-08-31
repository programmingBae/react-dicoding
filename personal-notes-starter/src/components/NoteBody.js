import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import NoteHeader from "./NoteHeader";
import { getInitialData } from "../utils";
import { showFormattedDate } from "../utils";

class NoteBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            tempNotes: [],
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onPindahkanHandler = this.onPindahkanHandler.bind(this);
        this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    }

    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: showFormattedDate(new Date().toISOString()),
                        archived: false,
                    }
                ]
            };
        })
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id != id);
        this.setState({ notes });
    }

    onArchiveHandler(id) {
        const notes = this.state.notes.map(note => note.id == id && note.archived == false ? { ...note, archived: true } : note);
        this.setState({ notes });
    }

    onPindahkanHandler(id) {
        const notes = this.state.notes.map(note => note.id == id && note.archived == true ? { ...note, archived: false } : note);
        this.setState({ notes });
    }

    onSearchEventHandler(searchedText) {
        if (searchedText != "" && this.state.tempNotes.length == 0) {
            const tempNotes = this.state.notes;
            const notes = this.state.notes.filter(note => note.title.includes(searchedText));
            this.setState({ notes, tempNotes });
        } else if(searchedText == "") {
            this.setState((prevState) => {
                return {
                    notes: prevState.tempNotes,
                    tempNotes: []
                }
            });
        }

        console.log(searchedText);
    }



    render() {
        return (
            <>
                <NoteHeader searchNote={this.onSearchEventHandler} />
                <div className="note-app__body">
                    <NoteInput addNotes={this.onAddNoteHandler} />
                    <h2>Catatan Aktif</h2>
                    {
                        this.state.notes.filter(note => note.archived == false).length > 0
                            ? <NoteList notes={this.state.notes.filter(note => note.archived == false)} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                            : <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }
                    <h2>Arsip</h2>
                    {
                        this.state.notes.filter(note => note.archived == true).length > 0
                            ? <NoteList notes={this.state.notes.filter(note => note.archived == true)} onDelete={this.onDeleteHandler} onArchive={this.onPindahkanHandler} />
                            : <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }
                </div>
            </>
        );
    }
}

export default NoteBody;