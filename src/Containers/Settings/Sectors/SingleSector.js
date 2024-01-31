import React, { Component } from "react";
import { Button, Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleSectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      sectorName: "",
      editInd: true,
    };
  }
  render() {
    const {
      sector: { sectorName, sectorId, EditInd },
      handleChange,
      name,
      value,
      linkedSectors,
      updatingSectors,
      handleUpdateSector,
      handleDeleteSector,
    } = this.props;
    // const sortedSectors = [...linkedSectors].sort((a, b) => a.sectorName.localeCompare(b.sectorName));
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
                  {sectorName}
                </div>
                <div>
                  {this.props.sector.editInd ? (
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                
                  <Tooltip title="Delete">
                    <DeleteOutlined
                        onClick={() => handleDeleteSector(sectorId)}
                     
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
                  name={name}
                  // value={value || sectorName}
                  defaultValue={sectorName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingSectors}
                    disabled={!value}
                    onClick={() => {
                      console.log(value); // Log the 'value' before calling handleUpdateSector
                      handleUpdateSector(sectorId, value, toggleViewType());
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

export default SingleSectors;


