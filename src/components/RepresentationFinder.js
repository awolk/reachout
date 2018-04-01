import React, { Component} from 'react';
import axios from 'axios';
import keys from '../keys';
import {Grid, Message} from 'semantic-ui-react';
import face from './face-icon.png';

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
        includedOffices: true
      }
    })
      .then(result => {
        let officials = result.data.officials;
        result.data.offices.forEach((office) => {
          office.officialIndices.forEach((index) => {
            officials[index].office = office.name
          })
        });
        this.setState({reps: officials});
      })
      .catch(err => {
        throw err;
      });
  }




  render(){
    return (
      <Message>
        <div>
          <div className="results">
            <Grid divided columns={5}>
              {this.state.reps && this.state.reps.reverse().map((rep, i) =>
                <Grid.Row key={i}>
                  <Grid.Column width={3}>
                    <div align="center">
                      {rep.photoUrl &&
                      <img className="ui image avatar " src={rep.photoUrl} alt={rep.name}/>
                      }
                      {!rep.photoUrl &&
                      <img className="ui image avatar" src={face}/>
                      }
                      <br/>
                      <strong>
                      {rep.name}
                      <br/>
                      </strong>
                      {rep.office}
                    </div>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {rep.address && rep.address[0].line1 && rep.address[0].city && rep.address[0].state && rep.address[0].zip &&
                    <div>
                      {rep.address[0].line1}<br/>{rep.address[0].city} {rep.address[0].state}, {rep.address[0].zip}
                    </div>
                    }
                  </Grid.Column>
                  <Grid.Column width={4}>
                    {rep.phones && <div><i className="phone icon"/>{rep.phones[0]}<br/></div>}
                    {rep.emails && <div><i className="mail icon"/>{rep.emails[0]}</div>}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {rep.channels &&
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          {rep.channels.map((soc, i) => {
                            if (soc.type === 'Facebook') {
                              return <Grid.Row align="center">
                                <a className="ui facebook button" role="button" href={'http://www.facebook.com/' + soc.id}>
                                  <i aria-hidden="true" className="facebook icon"></i> Facebook</a></Grid.Row>
                            }
                            if (soc.type === 'Twitter') {
                              return <Grid.Row align="center" ><a className="ui twitter button" role="button" href={'http://www.twitter.com/' + soc.id}>
                                <i aria-hidden="true" className="twitter icon"></i> Twitter</a></Grid.Row>
                            }
                            return <span/>;
                          })}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    }
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </div>
        </div>
      </Message>
    );
  }
}