import React, { Component } from 'react'
import { MainWrapper } from "../../Components/UI/Elements";
 
import ParetoChart from 'pareto-chart'
 
class Example extends Component {
  render () {
    return (
   
        <ParetoChart
          width={200}
          height={200}
          lineLabel='Cumulative percentage'
          data={{
            'Customer complaints': {
              'Dificult parking': 40,
              'Rude sales person': 13,
              'Poor lighting': 10,
              'Confusing layout': 27,
              'Limmited sizes': 15
            },
            'Complaints about documents ': {
              'Certificate error': 20,
              'Certificate missing': 40,
              'Invoice error': 10,
              'Packaging error': 5,
              'Wrong quantity': 3,
              'Others': 2
            },
            'Defects by discipline': {
              'Tests': 20,
              'Codification': 40,
              'Release': 10,
              'Analysis': 5,
              'Planning': 15
            }
          }} />
         
    )
  }
}
export default (Example);