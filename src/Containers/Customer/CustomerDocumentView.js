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
             
              <CardWrapper>
               {this.props.documentsByCustomerId.map((item) => { 
                  return ( 
             
                 
                    <CardElement>
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

                    </CardElement>
                  )   
                      })} 
              </CardWrapper>

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

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    justify-content: center;
    flex-direction: column;
  }
`
const CardElement = styled.div`
 
//   width: 20%;
border-radius: 0.2rem;
  //border:2px solid #EEEEEE;
  //background-color: rgb(255, 255, 255);
  height: auto;
    color: rgb(68, 68, 68);
    margin: 0.3rem;
    padding: 0.3rem;
    width: 6vw;
   
//   padding: 0 20px;
  margin-top: 0.5em;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    width: 100%;
    
  }
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
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
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
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
