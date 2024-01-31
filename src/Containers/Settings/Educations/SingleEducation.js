import React, { Component } from "react";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleEducations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      educationType: "",
      editInd: true,
    };
  }
  render() {
    const {
      education: { educationType, educationTypeId },
      handleChange,
      name,
      value,
      linkedEducations,
      updatingEducations,
      handleUpdateEducation,
      handleDeleteEducation,
    } = this.props;
    console.log(linkedEducations);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" font-semibold" >
                  {educationType}
                </div>
                <div>
                  {this.props.education.editInd ? (
                    <BorderColorIcon
                    
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
                
                  <Tooltip title="Delete">
                    <DeleteOutlined
                     
                      onClick={() => handleDeleteEducation(educationTypeId)}
                    
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
                  // value={value || educationType}
                  defaultValue={educationType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingEducations}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateEducation(
                        educationTypeId,
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

export default SingleEducations;


