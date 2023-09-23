import React, { Component } from 'react';
import { Empty } from "antd";
import BubbleChart from '@weknow/react-bubble-chart-d3';

class BubbleChart_ extends Component {
  render() {
    const { width, height, data, chartName, stacked, noLegend, noDataText } = this.props;
    console.log(data)
    if (!data || !data.length) {
      return (
        <Empty description={noDataText || ` We couldn't find relevant data`} />
      )
    }
    return (
      <div style={{ margin: '0.3rem' }}>
        <BubbleChart
          graph={{
            zoom: 1.1,
            offsetX: -0.05,
            offsetY: -0.01,
          }}
          width={width}
          height={height}
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          // bubbleClickFunc={this.bubbleClick}
          // legendClickFun={this.legendClick}
          data={data || []}
        />
      </div>
    )

  }
}

export default BubbleChart_;