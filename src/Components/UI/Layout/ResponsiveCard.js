import styled from 'styled-components';

const ResponsiveCard = styled.div`
    display: block;
    box-sizing: border-box;
    -webkit-transition: all 0.3s linear;
           -moz-transition: all 0.3s linear;
             -o-transition: all 0.3s linear;
                transition: all 0.3s linear;
    width: calc(20%);
    &:hover{
      box-shadow: 0em 0.25em 0.625em -0.125em ${props => props.theme.boxShadowColor};
    }
    @media all and  (min-width: 56.25em) and (max-width: 75em ) {
        -webkit-transition: all 0.3s linear;
           -moz-transition: all 0.3s linear;
             -o-transition: all 0.3s linear;
                transition: all 0.3s linear;
    width: calc(33.333333%);
  } 
     @media all and (max-width: 56.1875em) and (min-width: 43.75em ) {
        -webkit-transition: all 0.3s linear;
           -moz-transition: all 0.3s linear;
             -o-transition: all 0.3s linear;
                transition: all 0.3s linear;
      width: calc(50%);
  }
      @media all and (max-width: 43.6875em) and (min-width: 31.25em ) {
        -webkit-transition: all 0.3s linear;
           -moz-transition: all 0.3s linear;
             -o-transition: all 0.3s linear;
                transition: all 0.3s linear;
      width: calc(100%);
     /* flex: 0 1 calc(33.333333%); */ */
  } 
     @media all and (max-width: 31.1875em) {
        -webkit-transition: all 0.3s linear;
           -moz-transition: all 0.3s linear;
             -o-transition: all 0.3s linear;
                transition: all 0.3s linear;
      width: calc(100%);
  }
`
export default ResponsiveCard;