import React, {Component} from 'react';
import {Grid, Message, Header, Popup, Button} from 'semantic-ui-react';
import TemplateHub from "./TemplateHub";
import RepresentationFinder from "./RepresentationFinder";
import BasicMap from "./WorldMap";

export default class Container extends Component {
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
        <Header align='center' style={{marginTop:'1em'}} as={'h2'}>Showing representatives for<br/>{this.props.address}</Header>
        <BasicMap
          selCountry={false}
          selState={true}
          state={this.props.state}
        />
        <Grid padded>
          <div className="ui internally celled grid">
            <div className="row">
              <div style={{width:"100%"}}>
                <RepresentationFinder
                  address={this.props.address}
                  template={this.state.template}
                  subject={this.state.subject}/>
              </div>
            </div>
          </div>
        </Grid>
        <div style={{width:'80%', position:'relative', float:'none', margin:'0 auto', marginTop:'2em', marginBottom:'2em'}}>
          <Message centered>
            <div style={{float:'right'}}>
              <Popup
                trigger={<Button icon='question' />}
                content={<div>Create an email under 'New Template' or select one from 'Browse Templates'.<br/><br/>Use '[Name]', '[Office]', and '[Address]' to make a generic message.<br/><br/>Click on a representative's email to send that person your email.</div>}
                on='click'
                hideOnScroll
              />
            </div>
            <div style={{display:'inline'}}>
              <TemplateHub
                style={{display:'inline'}}
                onTemplateChange={this.handleTemplate}
                subject={this.state.subject}
                onSubjectChange={this.handleSubject}
              />
            </div>
          </Message>
        </div>
      </div>
    )
  }
}