import React, { Component } from 'react';
import LocationFinder from './LocationFinder';
import { Grid, Header } from 'semantic-ui-react';


/**
 * Divided vertically
 * Top - LocationFinder
 * Bottom - TemplateHub
 */
class App extends Component {
  render() {
    return (
        <Grid container style={{ padding: '5em 0em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h1' dividing>ReachOut</Header>
                </Grid.Column>
            </Grid.Row>
            <LocationFinder/>
        </Grid>
    );
  }
}

export default App;