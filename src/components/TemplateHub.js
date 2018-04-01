import React, { Component } from 'react';
import { Input, Tab, Button, Card } from 'semantic-ui-react';
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
    lastLink: null,
    loadedTemplates: [],
    tabIndex: 0
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
      .then((template) => {
        if (!template)
          return;
        const {subject, body} = template;
        this.props.onSubjectChange(null, {value: subject});
        this.setState({
          editorState: EditorState.createWithContent(ContentState.createFromText(body))
        });
        this.props.onTemplateChange(body);
      });
    getTemplates(6)
      .then(loadedTemplates => {
        this.setState({ loadedTemplates });
      });
  }


  saveTemplate = () => {
    const key = newTemplate(this.props.subject, this.state.editorState.getCurrentContent().getPlainText());
    const lastLink = `${window.location.origin}/${key}`;
    window.history.replaceState({}, 'ReachOut', `/${key}`);
    this.setState({ lastLink });
  };

  switchToTemplate(template) {
    const {subject, body, key} = template;
    window.history.replaceState({}, 'ReachOut', `/${key}`);
    this.props.onSubjectChange(null, {value: subject});
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(body)),
      tabIndex: 0
    });
    this.props.onTemplateChange(body);
  }

  handleTabChange = (evt, data) => {
    this.setState({
      tabIndex: data.activeIndex
    });
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
          <Tab.Pane>
            <Card.Group>
              {this.state.loadedTemplates.map((template, i) =>
                <Card key={i} link onClick={this.switchToTemplate.bind(this, template)}>
                  <Card.Content>
                    <Card.Header>{template.subject}</Card.Header>
                    <Card.Description>{template.body}</Card.Description>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Tab.Pane>
      }
    ];
    return (
      <Tab
        panes={panes}
        activeIndex={this.state.tabIndex}
        onTabChange={this.handleTabChange}/>
    );
  }
}