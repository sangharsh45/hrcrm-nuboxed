import React from "react";
import styled from "styled-components";

const Space = styled.div`
  margin: ${props => props.marginTop || "1.125em"} 0em;
`;
export default function LargeSpacer(props) {
  return <Space {...props} />;
}
