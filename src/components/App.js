import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import { Grid, Header } from 'semantic-ui-react';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import TemplateHub from "./TemplateHub";


/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
class App extends Component {
  render() {
    return (
      <Grid container stretched style={{ padding: '5em 0em' }} columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1' dividing>ReachOut</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <LocationFinder/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <TemplateHub/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBuZzoY6hXiSLSP6A_224DFq9XPTUspcj0'
})(App)