import React, { Component } from "react";
import { Button, Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import { Select } from "../../../../Components/UI/Elements";

import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      listType:"",
      editInd: true,
    };
  }
  handleType=(value)=>
  this.setState({listType:value});
  render() {
    const {
      source: { name, sourceId,listType, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingSources,
      handleUpdateSource,
      handleDeleteSource,
    } = this.props;
    console.log(linkedSectors);
    console.log("name", name);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" font-semibold" >
                  {name}
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
                        onClick={() => handleDeleteSource(sourceId)}
                    
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
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "45%" }}
                />
               
                <Select 
              defaultValue={listType}
               style={{width:"25%",marginLeft:"0.5rem"}}
               placeholder="Select Type"
               onChange={this.handleType}
               >
           <option value="Event">Event</option>
                      <option value="Employee">Employee</option>
                      <option value="Customer">Customer</option>
                  <option value="Investor">Investor</option>
               </Select>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingSources}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleUpdateSource(sourceId, value,
                        this.state.listType,
                         toggleViewType());
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

export default SingleSource;


