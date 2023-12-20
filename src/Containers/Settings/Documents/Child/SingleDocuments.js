import React, { Component, } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import {linkTypeToggle} from "../DocumentsAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tooltip, Select } from "antd";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import DocumentStatusToggle from "./DocumentStatusToggle";
class SingleDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTypeName: "",
      type:"",
      
      
    };
  }
  handleStageType=(value)=>{
    const { documentTypeId } = this.props.document;
    console.log(value)
    this.setState({type:value});
    let data={
      userType:value,
      documentTypeId: documentTypeId,
    }
    this.props.linkTypeToggle(data);
    // this.props.linkTypeToggle(value);
  }

  render() {
    const {
      document: { documentTypeName,editInd, mandatoryInd, userType, documentTypeId },
      handleChange,
      name,
      value,
  
      documents,
      linkedDocuments,
      updatingDocuments,
      handleUpdateDocument,
      handleDeleteDocument,
    } = this.props;
    console.log(linkedDocuments);
    return (
      <DocumentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
                <div class=" flex" >
                  <div class=" w-60">
                  <DocumentName style={{ flexBasis: "90%" }}>
                    {documentTypeName}
                  </DocumentName>
                  </div>
                  {/* <FlexContainer style={{justifyContent:"flex-end",marginTop:"-31px"}} > */}
                  <div class="flex justify-between w-96">
                  <div  >
                    <Select style={{ width: "100%"}}
                onChange={this.handleStageType}
                value={userType}
                // defaultValue={this.state.type}
                placeholder="Select Entity"
                >
                  <option value="User">User</option>
        <option value="Customer">Customer</option>
      
                </Select> 
                    </div>
                  <div >
                    <DocumentStatusToggle
                  editInd={editInd}
                      mandatoryInd={mandatoryInd}
                      documentTypeName={documentTypeName}
                      documentTypeId={documentTypeId}
                    />  
                    </div>
                  
                    <div >               
                   {this.props.document.editInd === true &&(
                      <BorderColorIcon
                      
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{fontSize:"1rem"}}
                      />
                    ) }  
                 
                    {this.props.document.editInd === true &&(
                     <Tooltip title="Delete">
                    <DeleteIcon
                    
                      onClick={() => handleDeleteDocument(documentTypeId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>  
                      ) }                
                  </div>
                  </div>
                </div>
                {/* </FlexContainer> */}
              </div>
            ) : (
              <div class=" flex" >
                <TextInput
                  name={name}
                  // value={value || documentTypeName}
                  defaultValue={documentTypeName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                {/* <br />
                <br /> */}
              <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDocuments}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDocument(
                        documentTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </DocumentWrapper>
    );
  }
}
const mapStateToProps = ({ document }) => ({
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkTypeToggle
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleDocuments);

const DocumentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DocumentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DocumentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
