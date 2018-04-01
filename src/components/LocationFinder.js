import React, {Component} from 'react';
import {Form, Message} from 'semantic-ui-react';
import Container from './Container';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import reach from './reach.png';

const google = window.google;

const renderSuggestion = ({ formattedSuggestion }) => (
  <div style={{textAlign:'left'}}>
    <i className="marker icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const shouldFetchSuggestions = ({ value }) => true;

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
  state = {
    address: null,
    state: null,
    loading: false,
  };

  componentDidMount() {
    if (!navigator.geolocation) return;
    console.log('Attempting to geolocate');
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      console.log('Creating geocoder');
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(latitude, longitude);
      console.log('Geocoding');
      geocoder.geocode({latLng: latLng}, (results, status) => {
        console.log('Geocoded');
        if (status !== google.maps.GeocoderStatus.OK)
          return;
        const address = results[0].formatted_address;
        this.setState({
          address,
          loading: true
        }, () => {
          this.validateAddress();
        });
      });
    });
  }

  validateAddress() {
    geocodeByAddress(this.state.address)
      .then(results => {
        return results[0].address_components.find(
          component => component.types.indexOf("administrative_area_level_1") !== -1
        ).long_name;
      })
      .then(state => {
        this.setState({
          state,
          loading: false,
        });
      })
      .catch(error => {
        console.log('Geocode Error', error);
        this.setState({
          state: null,
          loading: false,
        });
      });
  }

  handleSelect = (address) => {
    this.setState({
      address,
      loading: true,
    }, () => {
      this.validateAddress();
    });
  };

  handleChange = (address) => {
    this.setState({
      address,
      state: null,
    });
  };

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: 'Search Locations',
    };

    return (
      <div>
        {!this.state.state &&
        <div>
          <Form error={!!this.props.error} style={{width:'90%', float: 'none', margin: '0 auto'}}>
            <Message
              error
              content={this.props.error}
            />
            <Form.Field
              style={{width:"50%", float: 'none', margin: '0 auto', marginTop: '3em'}}
            >
              <PlacesAutocomplete
                highlightFirstSuggestion
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSelect={this.handleSelect}
                onError={onError}
                shouldFetchSuggestions={shouldFetchSuggestions}
                options={{componentRestrictions: {country: "us"}}}
              />
            </Form.Field>
          </Form>
          <img className="image" src={reach} style={{width: "25%", height: "auto", position: "absolute", right: "0px",  bottom: "0px"}}/>
        </div>
        }
        {this.state.state &&
        <Container address={this.state.address} state={this.state.state}/>
        }
      </div>
    );
  }
}