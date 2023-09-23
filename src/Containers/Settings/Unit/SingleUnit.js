import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      unitName: "",
      editInd: true,
    };
  }
  render() {
    const {
      unit: { unitName, unitId },
      handleChange,
      name,
      value,
      linkedTasks,
      updatingUnits,
      handleUpdateUnit,
      handleDeleteUnit,
    } = this.props;

    return (
      <UnitWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <UnitName style={{ flexBasis: "85%" }}>
                  {unitName}
                  </UnitName>
                <div>
                  {this.props.unit.editInd ? (
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
                    
                       onClick={() => handleDeleteUnit(unitId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>
                </div>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <TextInput
                   name={name}
                 
                  defaultValue={unitName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                     loading={updatingUnits}
                     disabled={!value}
                    onClick={() =>
                      handleUpdateUnit(unitId, value, toggleViewType())
                    }
                  >
                  
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                 
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </UnitWrapper>
    );
  }
}

export default SingleUnit;

const UnitWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const UnitName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const UnitValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
