import React, { Component, useMemo } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button, Popconfirm,Tooltip, Switch, Checkbox } from "antd";

import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import WorkflowDocumentToggle from "./WorkflowDocumentToggle";
class WorkflowSingleDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTypeName: "",
    };
  }
  render() {
    const {
      document: { documentTypeName, mandatoryInd,processId, documentTypeId },
      handleChange,
      name,
      value,
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
              
                <FlexContainer justifyContent="space-evenly">
               
                  <div style={{width:"55%"}}>
                  {/* <Checkbox> */}
                  <DocumentName style={{ flexBasis: "90%" }}>
                    {documentTypeName}
                  </DocumentName>
                  {/* </Checkbox> */}
                  </div>
                 
                  {/* <FlexContainer style={{justifyContent:"flex-end",marginTop:"-31px"}} > */}
                  <div style={{width:"35%"}}>
                    <WorkflowDocumentToggle
                      mandatoryInd={mandatoryInd}
                      documentTypeName={documentTypeName}
                      documentTypeId={documentTypeId}
                      processId={processId}
                    />  
                    </div>
                    <div style={{width:"5%"}}>               
                    {/* {this.props.document.editInd ? (
                      <FontAwesomeIcon
                        icon={solid("pen-to-square")}
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        size="0.75em"
                      />
                    ) : null}   */}
                    </div>
                    <div style={{width:"5%"}}> 
                     <Tooltip title="Delete">
                    {/* <FontAwesomeIcon
                      icon={solid("trash")}
                      onClick={() => handleDeleteDocument(documentTypeId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    /> */}
                  </Tooltip>                
                  </div>
                </FlexContainer>
                {/* </FlexContainer> */}
              </div>
            ) : (
              <FlexContainer>
                <TextInput
                  name={name}
                  // value={value || documentTypeName}
                  defaultValue={documentTypeName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDocuments}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDocument(
                        documentTypeId,
                        processId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                  
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                  
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </FlexContainer>
              </FlexContainer>
            )
          }
        </ViewEditCard>
       
      </DocumentWrapper>
      
    );
  }
}

export default WorkflowSingleDocument;

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
