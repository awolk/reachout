import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * For now - just a WYSIWYG editor
 */
export default class TemplateHub extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  updateEditorState = (editorState) => {
    this.setState({editorState});
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onEditorStateChange={this.updateEditorState}
      />
    );
  }
}