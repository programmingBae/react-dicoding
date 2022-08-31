import React from 'react';

class NoteHeader extends React.Component {
    constructor(props){
        super(props);

        this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    }

    onSearchEventHandler(event){
        event.preventDefault();
        this.props.searchNote(event.target.value);
        console.log(event.target.value);
    }

    render(){
        return (
            <div className="note-app__header">
                <h1>Notes</h1>
                <div className="note-search">
                    <input 
                    type="text" 
                    placeholder="Cari catatan ..."
                    onChange={this.onSearchEventHandler} />
                </div>
            </div>
        );
    }
}

export default NoteHeader;