import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip, Input } from "antd";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";

import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleInvestorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      editInd: true,
    };
  }
  render() {
    const {
      investor: { name, investorCategoryId, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingInvestor,
      handleupdateInvestor,
      handleDeleteInvestor,
    } = this.props;
    console.log(linkedSectors);
    console.log("name", name);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <SectorWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <SectorName style={{ flexBasis: "85%" }}>
                  {name}
                </SectorName>
                <div>
                  {/* {this.props.source.editInd ? ( */}
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  {/* ) : null}  */}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
                        onClick={() => handleDeleteInvestor(investorCategoryId)}
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
                  name={name1}
                  // value={value || sectorName}
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingInvestor}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleupdateInvestor(investorCategoryId, value, toggleViewType());
                    }}>

                  
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
      </SectorWrapper>
    );
  }
}

export default SingleInvestorList;

const SectorWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const SectorName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const SectorValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
