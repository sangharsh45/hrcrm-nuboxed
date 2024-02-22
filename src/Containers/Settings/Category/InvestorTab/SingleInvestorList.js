import React, { Component } from "react";
import { Button, Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
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
      investor: { name,creationDate, investorCategoryId,editInd, EditInd },
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
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                 <div class=" font-semibold" >
                  {name}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.investor.editInd ? (
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                 ) : null} 
               
                  <Tooltip title="Delete">
                    <DeleteOutlined
                        onClick={() => handleDeleteInvestor(investorCategoryId)}
                   
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
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
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

export default SingleInvestorList;


