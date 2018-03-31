import React, { Component } from 'react';
import { Message, Input, Form, Grid } from 'semantic-ui-react';

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
        this.state = {location: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = () => {
        //if (!this.state.location)
            //return;
        //this.props.attemptSearch(this.state.location);
    };

    handleInputChange(event) {
        this.setState({location: event.target.value});
    }

    componentDidMount() {
        if (this.inputRef)
            this.inputRef.focus();
    }

    render() {
        return (
            <Grid centered padded>
                <Form error={!!this.props.error}>
                    <Message
                        error
                        content={this.props.error}
                    />
                    <Form.Field>
                        <Input
                            required
                            placeholder='Location'
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            ref={input => this.inputRef = input}
                        />
                    </Form.Field>
                    <Form.Button
                        type='submit'
                        onClick={this.handleSearch}
                    >
                        Search
                    </Form.Button>
                </Form>
            </Grid>
        );
    }
}