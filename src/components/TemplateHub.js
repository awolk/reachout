import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
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
    this.props.onTemplateChange(editorState.getCurrentContent().getPlainText());
  };

  render() {
    return (
      <div>
        <Input
          style={{marginBottom: '1rem', width: '60vw'}}
          placeholder='Subject'
          value={this.props.subject}
          onChange={this.props.onSubjectChange}
        />
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.updateEditorState}
        />
      </div>
    );
  }
}