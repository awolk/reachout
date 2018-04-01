import React, { Component } from 'react';
import axios from 'axios';
import keys from '../keys';

/**
 * Divided horizontally
 * Left side - Map
 * Right Side - Lists representatives
 */

export default class RepresentationFinder extends Component {
  state = {
    reps: null
  };

  componentDidMount() {
    axios.get('https://www.googleapis.com/civicinfo/v2/representatives',{
      params: {
        key: keys.CIVIC_API_KEY,
        address: this.props.address,
      }
    })
      .then(result => {
        this.setState({reps: result.data.officials});
      })
      .catch(err => {
        throw err;
      });
  }




  render(){
    return (
      <div>
        <div className="results">
          <ul>
            {this.state.reps && this.state.reps.map((rep, i) =>
              <li key={i}>
                <span className="photo"><img src={rep.photoUrl} alt={rep.name}/></span>
                <span className="name">{rep.name}</span>
                <span className="address">{rep.address[0].line1}<br/>{rep.address[0].city} {rep.address[0].state}, {rep.address[0].zip}</span>
                <span className="phone">{rep.phones[0]}</span>
                  {rep.channels &&
                  <span className="social">
                  {rep.channels.map((soc, i) => {
                      if (soc.type === 'Facebook') {
                          return <a key={i} href={'http://www.facebook.com/' + soc.id}
                                    className="ion-social-facebook">Facebook</a>
                      }
                      if (soc.type === 'Twitter') {
                          return <a key={i} href={'http://www.twitter.com/' + soc.id}
                                    className="ion-social-twitter">Twitter</a>;
                      }
                      return <span/>;
                  })}
                </span>
                  }
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}