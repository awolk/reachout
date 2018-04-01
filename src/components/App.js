import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import { Grid, Header, Message } from 'semantic-ui-react';
import TemplateHub from "./TemplateHub";


/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
export default class App extends Component {
  state = {
    template: '',
    subject: ''
  };

  handleTemplate = (template) => {
    this.setState({ template });
  };

  handleSubject = (evt, data) => {
    this.setState({ subject: data.value })
  };

  render() {
    return (
      <div>
        <Grid container stretched style={{ padding: '5em 0em' }} columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1' dividing>ReachOut</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <LocationFinder template={this.state.template} subject={this.state.subject}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid centered>
        <Message style={{width:'80%'}}>
          <TemplateHub
            onTemplateChange={this.handleTemplate}
            subject={this.state.subject}
            onSubjectChange={this.handleSubject}
          />
        </Message>
        </Grid>
      </div>
    );
  }
}