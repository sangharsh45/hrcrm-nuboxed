import React from 'react'
import styled from 'styled-components';
const Wrapper = styled.div`
  && svg{
    width: 6.25em;
    height: 6.25em;
    margin: 1.25em;
    display:inline-block;
}
`
const ClockLoader = () => {
    return (
        <Wrapper>
            <svg version="1.1" id="L2" x="0em" y="0em"
                viewBox="0 0 100 100" enableBackground="new 0 0 100 100" >
                <circle fill="none" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="48" />
                <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                    <animateTransform
                        attributeName="transform"
                        dur="2s"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                </line>
                <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                    <animateTransform
                        attributeName="transform"
                        dur="15s"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                </line>
            </svg>


        </Wrapper >
    )
}

export default ClockLoader
