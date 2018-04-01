import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import { Grid, Header } from 'semantic-ui-react';
import TemplateHub from "./TemplateHub";
import BasicMap from "./WorldMap";

/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
export default class App extends Component {
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
            <LocationFinder/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <TemplateHub/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
          <BasicMap/>
      </div>
    );
  }
}