import React, { Component } from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"
import geographyObject from './states.json'
const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
};

class BasicMap extends Component {
    constructor(){
        super();
        this.state = {
            selectState: false,
            selectLocation: false,
            selectCountry: false,
            defaultFill:"#ECEFF1"
        };
    }


    highlightCountry = ()  => {
        this.setState({defaultFill: "#607D8B"})
    };



    render() {
        return (
            <div>
                <button onClick = {this.highlightCountry}>Highlight!</button>
            <div style={wrapperStyles}>
                <ComposableMap
                    projection="albersUsa"
                    projectionConfig={{
                        scale: 1000,
                        rotation: [-11,0,0],
                    }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <ZoomableGroup center={[0,20]} disablePanning >
                        <Geographies geography={ geographyObject } disableOptimization
                            >
                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                <Geography
                                    key={ i }
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                      default: {
                                            fill: this.state.defaultFill,
                                            stroke: "#348b83",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                      },

                                      hover: {
                                            fill: "#607D8B",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
            </div>
        )
    }
}

export default BasicMap