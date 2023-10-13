import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Funnel } from '@ant-design/plots';

const FunnelChartCustomer = () => {
    // const data = [
    //     { stage: 'Step 1', value: 100 },
    //     { stage: 'Step 2', value: 80 },
    //     { stage: 'Step 3', value: 60 },
    //     { stage: 'Step 4', value: 40 },
    //     { stage: 'Step 5', value: 20 },
    //   ];
    const data = [
        {
          stage: 'onBoarded',
          number: 200,
        },
        {
          stage: 'openRequirement',
          number: 155,
        },
        {
          stage: 'selectted',
          number: 120,
        },
        {
          stage: 'submitted',
          number: 110,
        }    
      ];
      const color= ['#d62728', '#2ca02c', '#000000']
      const config = {
        data: data,
        xField: 'stage',
         yField: 'number',
         color:color
        // dynamicHeight: true,
        // legend: false,
      };
    
      return (
        <div>
          <Funnel {...config} />
        </div>
      );
    };

export default FunnelChartCustomer;
