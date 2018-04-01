import React, { Component} from 'react';
import axios from 'axios';
import keys from '../keys';
import { Grid, Message, Button, Icon } from 'semantic-ui-react';
import EmailLink from './EmailLink';
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
        this.setState({reps: officials.reverse()});
      })
      .catch(err => {
        throw err;
      });
  }

  render(){
    return (
      <Message style={{marginBottom: '1rem', width: '65%', float:'none', margin:'0 auto'}}>
        <div>
          <div className="results">
            <Grid divided columns={5}>
              {this.state.reps && this.state.reps.map((rep, i) =>
                <Grid.Row key={i}>
                  <Grid.Column width={5}>
                    <div align="center">
                      {rep.photoUrl &&
                      <img className="ui image avatar " style={{marginBottom:"0.3em"}} src={rep.photoUrl} alt={rep.name}/>
                      }
                      {!rep.photoUrl &&
                      <img className="ui image avatar" style={{marginBottom:"0.3em"}} src={face} alt={rep.name}/>
                      }
                      <br/>
                      <strong style={{fontSize:"1.2em"}}>
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
                    {rep.phones && <div><i className="phone icon"/><a href={`tel:${rep.phones[0]}`}>{rep.phones[0]}</a><br/></div>}
                    {rep.emails &&
                    <div>
                      <i className="mail icon"/>
                      <EmailLink email={rep.emails[0]} subject={this.props.subject} body={this.props.template}/>
                    </div>
                    }
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {rep.channels &&
                        <div>
                          {rep.channels.map((soc, i) => {
                            if (soc.type === 'Facebook') {
                              return (
                                <Button
                                  key={i}
                                  color='facebook'
                                  href={'http://www.facebook.com/' + soc.id}
                                  style={{marginBottom: '.2rem'}}>
                                  <Icon name='facebook' /> Facebook
                                </Button>
                              );
                            }
                            if (soc.type === 'Twitter') {
                              return (
                                <Button key={i} color='twitter' href={'http://www.twitter.com/' + soc.id}>
                                  <Icon name='twitter' /> Twitter
                                </Button>
                              );
                            }
                            return <span key={i}/>;
                          })}<br/>
                        </div>
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