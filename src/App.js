import React, { Component } from "react";
import { database } from "./firebase";
import './style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: []
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const messagesRef = database
      .ref("messages")
      .orderByKey()
      .limitToLast(10);

    messagesRef.on("child_added", capture => {
      const message = {
        name: capture.val().name,
        text: capture.val().text,
        time: '',
        id: capture.key
      };

      this.setState(prevState => ({
        messages: [message, ...prevState.messages]
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();

    database.ref("messages").push({
      name: this.name.value,
      text: this.text.value,
      time: new Date().toLocaleTimeString('en-US')
    });

    this.text.value = "";
  }

  render() {
    return (
      <div>
        <h1>Chat Room Firebase</h1>
        <ul className="chat-thread">
          {this.state.messages.map(message => (
            <li key={message.id}>
              {message.text}
              <small style={{ color: "gray" }}> by {message.name}</small>
              <small style={{ color: "gray" }}> {message.time}</small>
            </li>
          ))}
        </ul>
        <br/>
        <br/>
        <div className="form-container">
          <form onSubmit={this.onAddMessage}>
            <input
              type="text"
              placeholder="your name"
              ref={node => (this.name = node)}
            />
            <input
              type="text"
              placeholder="your message"
              ref={node => (this.text = node)}
            />
            <br />
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
