import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";
import { Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleKpi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      kpi: "",
      frequency:"",
      editInd: true,
    };
  }
  handleFrequency=(value)=>
  this.setState({frequency:value});
  render() {
    const {
        kpi: { kpi, performanceManagementId,frequency, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingKpi,
      handleupdateKpi,
      handleDeleteKpi,
    } = this.props;
    console.log(linkedSectors);
    console.log("kpi", kpi);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <SectorWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" flex  flex-col justify-between ml-4">
                 <h1>KPI</h1>
                <SectorName style={{ flexBasis: "65%" }}>
                  {kpi}
                </SectorName>
                </div>
                <div class=" flex  flex-col justify-between">
                <h1>Frequency</h1>
                <SectorName style={{ flexBasis: "65%" }}>
                  {frequency}
                </SectorName>
                </div>
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
                    <DeleteOutlined
                        onClick={() => handleDeleteKpi(performanceManagementId)}
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
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name1}
                  // value={value || sectorName}
                  defaultValue={kpi}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <Select 
              defaultValue={frequency}
               style={{width:"25%"}}
               placeholder="Select Frequency"
               onChange={this.handleFrequency}
               >
         <option value="Monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="halfYearly">Half yearly</option>
                  <option value="Annual">Annual</option>
               </Select>
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingKpi}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleupdateKpi(performanceManagementId, value, toggleViewType());
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
              </div>
            )
          }
        </ViewEditCard>
      </SectorWrapper>
    );
  }
}

export default SingleKpi;

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
