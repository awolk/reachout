import React, { Component } from 'react';
import axios from 'axios';

/**
 * Divided horizontally
 * Left side - Map
 * Right Side - Lists representatives
 */

class RepresentationFinder extends Component {
    // assume the previous module which holds state has:
    // this.props.
    // ASSUMING ADDRESS IS PASSED DOWN FROM WHATEVER
    componentDidMount() {
        axios.get('https://www.googleapis.com/civicinfo/v2/representatives',{
            params: {
                key: '',//todo key here,
                address: this.prop.address,
            }
        }).then(result => {this.setState({reps: result.data.officials})})
    }
    render(){
        return (
            <div>
                <div className="results">
                    <ul>
                        {this.state.reps.map((rep, i) =>
                            <li key={i}>
                                <span className="photo"><img src={rep.photoUrl} alt={rep.name}/></span>
                                <span className="name">{rep.name}</span>
                                <span className="address">{rep.address[0].line1}<br/>{rep.address[0].city} {rep.address[0].state}, {rep.address[0].zip}</span>
                                <span className="phone">{rep.phones[0]}</span>
                                <span className="social">
                                {rep.channels.map((soc, i) => {
                                    if (soc.type === 'Facebook') {
                                        return <a key={i} href={'http://www.facebook.com/' + soc.id}
                                                  className="ion-social-facebook"/>
                                    }
                                    if (soc.type === 'Twitter') {
                                        return <a key={i} href={'http://www.twitter.com/' + soc.id}
                                                  className="ion-social-twitter"/>
                                    }
                                })}
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}