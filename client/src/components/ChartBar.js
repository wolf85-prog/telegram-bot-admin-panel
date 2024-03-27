import React from 'react';
import PropTypes from "prop-types"; 
import * as d3 from "d3";

class ChartBar extends React.Component {
  scaleColor = d3.scaleSequential(d3.interpolateViridis);
    scaleHeight = d3.scaleLinear();
    scaleWidth = d3.scaleBand().padding(0.1);

    render() {
        this.updateScales();
        const { data, data2, width, height, range  } = this.props;
        const bars = data.map((d) => (
                           <rect key={d.item}
                                 width={this.scaleWidth.bandwidth()}
                                 height={height - this.scaleHeight(d.count)}
                                 x={ this.scaleWidth(d.item)}
                                 y={this.scaleHeight(d.count)}
                                 fill={this.scaleColor(d.item)}
                                 rx="5" ry="5"
                            />));
        return (
            <svg width={width} height={height} >
                { bars }
            </svg>
        );    
    }

    updateScales() {
        const { data, width, height } = this.props;
        this.scaleColor.domain([0, data.length]);
        this.scaleWidth
                   .domain(data.map((d) => (d.item)))
                   .range([0, width]);
        this.scaleHeight
                   .domain(d3.extent(data, (d) => (d.count)))
                   .range([height - 20, 0]);
    }
}

ChartBar.defaultProps = {
    animDuration: 600
};

ChartBar.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    animDuration: PropTypes.number
};

export default ChartBar