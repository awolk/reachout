import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import { Grid, Header } from 'semantic-ui-react';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
class App extends Component {
  render() {
    return (
        <div>
        <Grid container style={{ padding: '5em 0em' }}>
            <Header as='h1' dividing>ReachOut</Header>
            <Grid.Row>
                <Grid.Column>
                    <LocationFinder/>
                </Grid.Column>
            </Grid.Row>

        </Grid>
            <h1 style={{textAlign: 'center'}}> Google Maps API + React </h1>
            <MapContainer google={this.props.google} />
        </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBuZzoY6hXiSLSP6A_224DFq9XPTUspcj0'
})(App)