import React, { Component } from "react";
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
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" flex  flex-col justify-between ml-4">
                 <div class=" flex text-base text-[#40A9FF]">KPI</div>
                 <div class=" font-semibold" >
                  {kpi}
                </div>
                </div>
                <div class=" flex  flex-col justify-between">
                <div class=" flex text-base text-[#40A9FF]">Frequency</div>
                <div class=" font-semibold" >
                  {frequency}
                </div>
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
                  
                  <Tooltip title="Delete">
                    <DeleteOutlined
                        onClick={() => handleDeleteKpi(performanceManagementId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
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
               
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SingleKpi;

