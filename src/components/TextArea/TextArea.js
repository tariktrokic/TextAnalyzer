import React from 'react';
import styles from './TextArea.module.css';

class TextArea extends React.Component {
    state = {
        textInput: ''
    };

    onHandleChange = (e) => {
        this.setState({
            textInput: e.target.value
        });
    };

    onHandleKeypress = (e) => {
        // Pressing enter key also calls the button click (when button is focused)
        if (e.keyCode === 13) this.props.handleTextAreaButtonClick(this.state.textInput);
    };

    render() {
        return (
            <div className={styles.textAreaContainer}>
                <textarea value={this.state.textInput} onChange={this.onHandleChange} className={styles.textArea} placeholder="Start typing something here..."></textarea>
                <button onClick={() => this.props.handleTextAreaButtonClick(this.state.textInput)} onKeyPress={this.onHandleKeypress} className={styles.textAreaActionButton}>Analyze</button>
            </div>
        );
    };
};

export default TextArea;