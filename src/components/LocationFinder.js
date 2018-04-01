import React, {Component} from 'react';
import {Form, Grid, Message} from 'semantic-ui-react';
import RepresentationFinder from './RepresentationFinder';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Map from "./Map";

const renderSuggestion = ({ formattedSuggestion }) => (
  <div style={{textAlign:'left'}}>
    <i className="marker icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const shouldFetchSuggestions = ({ value }) => value.length > 0;

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  );
  clearSuggestions();
};

/**
 * State 1
 * -------
 * LocationFinder shows a textbox to enter your location (With autocompletion?)
 * It attempts to fill the textbox with your current location
 * It has a button to find representatives given location
 * State 2
 * -------
 * It displays a RepresentationFinder
 */
export default class LocationFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  validateAddress(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Geocode Success', { lat, lng });
        this.setState({
          geocodeResults: {
            lat: lat,
            lng: lng
          },
          loading: false,
        });
      })
      .catch(error => {
        console.log('Geocode Error', error);
        this.setState({
          geocodeResults: null,
          loading: false,
        });
      });
  }

  handleButton() {
    this.setState({
      loading: true,
    });
    this.validateAddress(this.state.address)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    });
    this.validateAddress(this.state.address);

  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    });
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: 'Search Locations'
    };

    return (
      <div style={{height:'300px', width:'50%', float: 'none', margin: '0 auto'}}>
        {!this.state.geocodeResults &&
        <Form error={!!this.props.error}>
          <Message
            error
            content={this.props.error}
          />
          <Form.Field>
            <PlacesAutocomplete
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSelect={this.handleSelect}
              onEnterKeyDown={this.handleSelect}
              onError={onError}
              shouldFetchSuggestions={shouldFetchSuggestions}
            />
          </Form.Field>
          <Form.Button
            type='submit'
            onClick={this.handleButton}
          >
            Search
          </Form.Button>
        </Form>
        }
        {this.state.geocodeResults &&
        <Grid padded centered>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Map lat={this.state.geocodeResults.lat} lng={this.state.geocodeResults.lng}/>
              </Grid.Column>
              <Grid.Column>
                <RepresentationFinder address={this.state.address}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid>
        }
      </div>
    );
  }
}