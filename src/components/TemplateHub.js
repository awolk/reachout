import React, { Component } from 'react';
import { Input, Tab, Button } from 'semantic-ui-react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { newTemplate, getTemplates, getTemplateByKey } from "../database";

/**
 * For now - just a WYSIWYG editor
 */
export default class TemplateHub extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    lastLink: null
  };

  updateEditorState = (editorState) => {
    this.setState({editorState});
    this.props.onTemplateChange(editorState.getCurrentContent().getPlainText());
  };

  componentDidMount() {
    if (window.location.pathname.length <= 1)
      return;
    const key = window.location.pathname.slice(1);
    getTemplateByKey(key)
      .then(({subject, body}) => {
        this.props.onSubjectChange(null, {value: body});
        this.setState({
          editorState: EditorState.createWithContent(ContentState.createFromText(body))
        });
        this.props.onTemplateChange(body);
      });
  }


  saveTemplate = () => {
    const key = newTemplate(this.props.subject, this.state.editorState.getCurrentContent().getPlainText());
    const lastLink = `${window.location.origin}/${key}`;
    this.setState({ lastLink });
  };

  render() {
    const panes = [
      {menuItem: 'New Template', render: () =>
          <Tab.Pane>
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
            <hr/>
            <Button onClick={this.saveTemplate}>Save/Share Template</Button>
            {this.state.lastLink &&
            <a href={this.state.lastLink}>{this.state.lastLink}</a>
            }
          </Tab.Pane>
      },
      {menuItem: 'Browse Templates', render: () =>
          <Tab.Pane/>
      }
    ];
    return (
      <Tab panes={panes}/>
    );
  }
}