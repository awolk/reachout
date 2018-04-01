import React, {Component} from 'react';
import {Grid, Message} from 'semantic-ui-react';
import TemplateHub from "./TemplateHub";
import RepresentationFinder from "./RepresentationFinder"

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      template: '',
      subject: ''
    };
  }

  handleTemplate = (template) => {
    this.setState({ template });
  };

  handleSubject = (evt, data) => {
    this.setState({ subject: data.value })
  };

  render() {
    return (
      <div>
        <Grid padded>
          <div className="ui internally celled grid">
            <div className="row">
              <div style={{width:"100%"}}>
                <RepresentationFinder
                  address={this.state.address}
                  template={this.state.template}
                  subject={this.state.subject}/>
              </div>
            </div>
          </div>
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
    )
  }
}