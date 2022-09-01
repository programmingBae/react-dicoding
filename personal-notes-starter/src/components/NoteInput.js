import React from "react";

class NoteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maxChar: 50,
            title: '',
            body: '',
        }

        this.onTitleEventHandler = this.onTitleEventHandler.bind(this);
        this.onBodyEventHandler = this.onBodyEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.addNotes(this.state);
        this.setState((prevState) => {
            return {
                maxChar: 50,
                title: "",
                body: ""
            }
        })
    }

    onTitleEventHandler(event){
        this.setState(() => {
            return{
                maxChar: 50  - event.target.value.length,
                title: event.target.value,
            };
        })
    }

    onBodyEventHandler(event){
        this.setState(() => {
            return{
                body: event.target.value,
            }
        })
    }

    render(){
        return(
            <div className="note-input">
                <h2>Buat Catatan</h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="note-input__title__char-limit">Sisa karakter : {this.state.maxChar} </p>
                    <input value={this.state.title} maxLength="50" onChange={this.onTitleEventHandler} className="note-input__title" type="text" placeholder="Ini adalah judul ..." required />
                    <textarea value={this.state.body} onChange={this.onBodyEventHandler} className="note-input__body" type="text" placeholder="Tuliskan catatanmu disini ..." required />
                    <button type="submit">Buat</button>
                </form>
            </div>
        );
    }
}

export default NoteInput;