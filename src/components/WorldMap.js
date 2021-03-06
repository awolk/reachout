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
  render() {
    return (
      <div>
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
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: this.props.selCountry || (this.props.selState && geography.properties.NAME_1 === this.props.state) ? '#607D8B' :'#ECEFF1',
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