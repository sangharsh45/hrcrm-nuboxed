import React, { useMemo, useEffect } from "react";
import D3Funnel from "d3-funnel";

function FunnelChart(props) {
  const { height, width, currency, data, noOfStages = 6 } = props;

  const myRef = React.useRef(null);

  const colors = useMemo(() => {
    const chartColors = [];
    for (let i = 1; i < noOfStages + 1; i++) {
      chartColors.push(`rgb(66,136,224, ${i / noOfStages})`);
    }
    return chartColors;
  }, [noOfStages]);

  const options = useMemo(() => {
    return {
      chart: {
        curve: {
          // enabled: true
        },
        height: height,
        width: width,
        bottomWidth: 1 / 5,
        animate: 300,
        bottomPinch: 1,
      },
      block: {
        dynamicHeight: false,
        minHeight: 15,
        // highlight: true,
        fill: {
          // type: 'gradient',

          scale: colors.reverse(),
          // scale:['green',]
        },
      },
      label: {
        fill: "#000",
        fontSize: 12,
        format: function(label, value) {
          return `${label}  ${currency && currency} ${value} `;
        },
      },
      tooltip: {
        enabled: true,
      },
    };
  }, [height, width, currency, colors]);

  useEffect(() => {
    const chart = new D3Funnel(myRef.current);
    if (!data.length) {
      chart.draw(
        [{ label: " We couldn't find relevant data", value: 0 }],
        options
      );
    } else {
      chart.draw(data, options);
    }
  }, [data]);

  if (!data) {
    return <p>Do keep opportunities list updated to get maximum value.</p>;
  }
  return (
    <>
      {props.currentProcess && (
        <div
          ref={myRef}
          style={{ display: "flex", justifyContent: "center" }}
        />
      )}
    </>
  );
}

export default FunnelChart;
