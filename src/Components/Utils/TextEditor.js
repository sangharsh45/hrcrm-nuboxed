import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };
    }
    componentDidMount() {
        this.focusEditor();
    }

    onChange = editorState => {
        this.setState({
            editorState
        });
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    };

    render() {
        return (
            <div className="editorContainer">
                <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}>
                    <b>B</b>
                </button>
                <button onClick={this.onItalicClick}>
                    <em>I</em>
                </button>{" "}
                <div className="editors">
                    <div style={styles.editor} onClick={this.focusEditor}>
                        <Editor
                            ref={this.setEditor}
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                        />
                    </div>
                    <button
                        type='button'
                        onClick={() => console.log(convertToRaw(this.state.editorState.getCurrentContent()))}
                    > submit </button>
                </div>
            </div>
        );
    }
}
export default TextEditor;
const styles = {
    editor: {
        border: '0.0625em solid gray',
        minHeight: '6em'
    }
};