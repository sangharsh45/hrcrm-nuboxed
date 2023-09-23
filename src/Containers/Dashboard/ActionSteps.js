import { Divider, Steps } from 'antd';
import React from 'react';
const ActionSteps = (props) => (
  <>
    
    <Steps
      progressDot
      current={1}
      direction="vertical"
      items={props.actionSteps}
    />
  </>
);
export default ActionSteps;