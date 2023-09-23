import React, { Component } from 'react';
import styled from 'styled-components';

const BlurContainer = styled.div`
    width: 100%;
    height: 25em;
    filter: blur(0.3125em);
`
class BlurLoader extends Component {
  render() {
    return (
      <BlurContainer>
        {this.props.children}
      </BlurContainer>
    )
  }
}
export default BlurLoader;