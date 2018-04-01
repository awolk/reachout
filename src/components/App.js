import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import {Header} from 'semantic-ui-react';

/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
export default class App extends Component {

  render() {
    return (
      <div>
        <div class="ui inverted vertical center aligned segment" style={{minHeight:"200px"}}>
          <Header as='h1' class="ui inverted header" style={{fontSize:"4em", fontWeight:"normal", marginTop:"1.2em", marginBottom:"1.2em"}}>
            ReachOut
          </Header>
          <Header as='h2' class="ui inverted header" style={{fontSize:"1.7em", fontWeight:"normal", marginTop:"0.5em"}}>
          </Header>
        </div>
        <LocationFinder/>
      </div>
    );
  }
}