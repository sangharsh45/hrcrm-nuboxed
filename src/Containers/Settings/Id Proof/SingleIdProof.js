import React, { Component } from "react";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { TextInput } from "../../../Components/UI/Elements";
import { DeleteOutlined } from "@ant-design/icons";
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
      idProof: { IdProofType,creationDate, IdProofTypeId },
      handleChange,
      name,
      value,
      linkedIdProofs,
      updatingIdProofs,
      handleUpdateIdProof,
      handleDeleteIdProof,
    } = this.props;
    console.log(linkedIdProofs);
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
                  {IdProofType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.idProof.editInd ? (
                    <BorderColorIcon
                 
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                
                  <Tooltip title="Delete">
                    <DeleteOutlined
                    
                      onClick={() => handleDeleteIdProof(IdProofTypeId)}
                    
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
                  // value={value || idProofType}
                  defaultValue={IdProofType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
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

export default SingleIdProof;


