import React from "react";


class ContactInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            tag: '',
        }

        this.onNamaEventHandler = this.onNamaEventHandler.bind(this);
        this.onTagEventHandler = this.onTagEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onNamaEventHandler(event){
        this.setState(() => {
            return {
                name: event.target.value
            };
        })
    }

    onTagEventHandler(event){
        this.setState(() => {
            return {
                tag: event.target.value
            };
        })
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        this.props.addContact(this.state);
    }

    render(){
        return (
            <form className='contact-input' onSubmit={this.onSubmitEventHandler}>
              <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNamaEventHandler} />
              <input type="text" placeholder="Tag" value={this.state.tag} onChange={this.onTagEventHandler} />
              <button type="submit">Tambah</button>
            </form>
        );
    }

}

export default ContactInput;