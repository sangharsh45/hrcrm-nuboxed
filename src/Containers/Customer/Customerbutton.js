import React, { } from 'react'
import { Button, } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'


function Customerbutton (props) {
   
    return (
      
            <>
         <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center"> 
             
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[10rem] 
text-[#444444] m-3 p-1 w-[19vw] flex flex-col  ">
                      <CardImage>
              <Button  type='primary'>
                Last Three Month
              </Button>
              <Button type='primary'>
                Last Six Month
              </Button>
                        </CardImage>
                  
                    </div>
             
              </div>

            </>
      
    
    )
              }


const mapStateToProps = ({ candidate, auth,customer }) => ({
    documentsByCustomerId: customer.documentsByCustomerId,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //  getCustomerDocument
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Customerbutton)


const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`


const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
