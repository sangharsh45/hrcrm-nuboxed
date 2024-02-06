import React, { Component } from 'react'
import { base_url } from "../../Config/Auth";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
    getCustomerDocument
} from '../Customer/CustomerAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

class CandidateDocumentView extends Component {
   
     



componentDidMount() {
    this.props.getCustomerDocument(this.props.customer.customerId);
 
  }
  
  render() {

    return (
      
            <>
             
             <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">  
               {this.props.documentsByCustomerId.map((item) => { 
                  return ( 
             
                 
                    <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[10rem] 
                    text-[#444444] m-3 p-1 w-[19vw] flex flex-col  ">
                      <CardImage>
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <InsertDriveFileIcon 
                   style={{fontSize:"2.5em",color:"cornflowerblue"}}
                  // icon={solid("file")} 
                  />
                   </a>
                       
                      


                      {/* <CardDescription> */}
                        {/* <Header>
                             {item.documentName} 
                            </Header> */}
                        </CardImage>
                        {/* <Price>
                          {item.price} {item.currencyName}
                        </Price> */}
                        {/* <Price>Color: {item.productColour}</Price> */}
                         <Price>{item.documentContentType} </Price> 
                      
                        {/* <Desc dangerouslySetInnerHTML={{ __html: item.description }}></Desc> */}



                      
                      {/* </CardDescription> */}

                    </div>
                  )   
                      })} 
              </div>

            </>
      
    
    )
              }
}

const mapStateToProps = ({ candidate, auth,customer }) => ({
    documentsByCustomerId: customer.documentsByCustomerId,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerDocument
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDocumentView)




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


const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
  margin-left:14px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const Desc = styled.p`
  height: 0px;
`
const Price = styled.div`
  height: 1.5em;
  font-weight: 500;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
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
