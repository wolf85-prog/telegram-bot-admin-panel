import React from 'react';
import * as d3 from "d3";

const Chart2 = ({ data, data2, width, height, range }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const scaleColor = d3.scaleSequential(d3.interpolateViridis);
  const scaleHeight = d3.scaleLinear();
  const scaleWidth = d3.scaleBand().padding(0.1);
  
  const getX = d3.scaleBand()
    .domain(data.map(item => item.name))
    .range([0, width]);

  const getY = d3.scaleLinear()
    .domain([0, range])
    .range([height, 0]);
  
  const getYAxis = ref => {
    const yAxis = d3.axisLeft(getY)
      .tickSize(-width)
      .tickPadding(7);
    d3.select(ref).call(yAxis);
  };

  const getXAxis = ref => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis);
  };

  // const linePath = d3.line()
  //   .x(d => getX(d.name) + getX.bandwidth() / 2)
  //   .y(d => getY(d.value))
  //   .curve(d3.curveMonotoneX)(data)

  // const linePath2 = d3.line()
  //   .x(d => getX(d.name) + getX.bandwidth() / 2)
  //   .y(d => getY(d.value))
  //   .curve(d3.curveMonotoneX)(data2)

  const areaPath = d3.area()
    .x(d => getX(d.name) + getX.bandwidth() / 2)
    .y0(d => getY(d.value))
    .y1(() => getY(0))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const index = Math.floor(x / getX.step());
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <div className="wrapper-chart">
      <svg
        className="svg"
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ось y */}
        {/* <g className="axis" ref={getYAxis} /> */}

        {/* ось x */}
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0,${getY(0)})`}
        />
        <path
          fill="#7cb5ec"
          d={areaPath}
          opacity={0}
        />

        {/* {data.map((item, index) => {
          return (
            <g key={index}>
              <circle
                cx={getX(item.name) + getX.bandwidth() / 2}
                cy={getY(item.value)}
                r={index === activeIndex ? 6 : 4}
                fill="#7cb5ec"
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: `ease-out .1s` }}
              />
              <text
                fill="#fff"
                x={getX(item.name) + getX.bandwidth() / 2}
                y={getY(item.value) - 10}
                textAnchor="middle"
              >
                {item.value}
              </text>
            </g>
          );
        })}
        {data2.map((item, index) => {
          return (
            <g key={index}>
              <circle
                cx={getX(item.name) + getX.bandwidth() / 2}
                cy={getY(item.value)}
                r={index === activeIndex ? 6 : 4}
                fill="#7cb5ec"
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: `ease-out .1s` }}
              />
              <text
                fill="#fff"
                x={getX(item.name) + getX.bandwidth() / 2}
                y={getY(item.value) - 10}
                textAnchor="middle"
              >
                {item.value}
              </text>
            </g>
          );
        })} */}
        { data.map((item, index) => {
          return (
            <g key={index}>
              <rect key={index}
                width={40}
                height={height - getY(item.value)}
                x={getX(item.name) + getX.bandwidth() / 2 - 20}
                y={getY(item.value)}
                fill='#7cb5ec'
                rx="2" ry="2"
              />
              <text
                fill="#fff"
                x={getX(item.name) + getX.bandwidth() / 2}
                y={getY(item.value) - 10}
                textAnchor="middle"
              >
                {item.value ? item.value : ''}
              </text>
            </g>
          );
        })}

      </svg>
    </div>
  );
};


export default Chart2