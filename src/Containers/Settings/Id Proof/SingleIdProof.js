import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";


class SingleIdProof extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      IdProofType: "",
    };
  }
  render() {
    const {
      idProof: { IdProofType, IdProofTypeId },
      handleChange,
      name,
      value,
      linkedIdProofs,
      updatingIdProofs,
      handleUpdateIdProof,
      handleDeleteIdProof,
    } = this.props;
    console.log(linkedIdProofs);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <IdProofWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <IdProofName style={{ flexBasis: "85%" }}>
                  {IdProofType}
                </IdProofName>
                <div>
                  {this.props.idProof.editInd ? (
                    <BorderColorIcon
                 
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
                    
                      onClick={() => handleDeleteIdProof(IdProofTypeId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>
                  {/* <ActionIcon
                                  tooltipTitle="Delete"
                                 iconType="delete"
                                  handleIconClick={() => handleDeleteSector(typeId)}
                                  size="0.75em"
                                theme="filled"
                               style={{ color: "#666" }}
                                 /> */}
                </div>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <TextInput
                  name={name}
                  // value={value || idProofType}
                  defaultValue={IdProofType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingIdProofs}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateIdProof(
                        IdProofTypeId,
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
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </IdProofWrapper>
    );
  }
}

export default SingleIdProof;

const IdProofWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const IdProofName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const IdProofValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
