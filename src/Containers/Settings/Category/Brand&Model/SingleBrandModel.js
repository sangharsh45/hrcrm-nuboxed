import React, { Component } from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleBrandModel extends Component {
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
            brandmodel: { brand,creationDate, model, phoneMasterListId },
            handleChange,
            handleModelChange,
            name,
            value,
            updatingBrandModel,
        } = this.props;
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
        return (
            <div class=" w-full cursor-pointer">
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <div class=" flex justify-between" >
                                <div class=" font-semibold" >
                                    {brand} {model}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                                </div>
                                <div>
                                    <BorderColorIcon

                                        tooltipTitle="Edit"
                                        iconType="edit"
                                        onClick={toggleViewType}
                                        style={{ fontSize: "1rem" }}
                                    />
                                    {/* ) : null}  */}
                                   
                                    <Tooltip title="Delete">
                                        <DeleteOutlined

                                         
                                            style={{
                                                verticalAlign: "center",
                                                marginLeft: "1rem",
                                                fontSize: "1rem",
                                                color: "red",
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        ) : (
                            <div class=" flex">
                                <TextInput
                                    name={name}
                                    value={value || brand}
                                    defaultValue={brand}
                                    onChange={handleChange}
                                    width="36%"
                                    style={{ marginRight: "2px" }}
                                />
                              
                                <TextInput
                                    name={name}
                                    value={value || model}
                                    defaultValue={model}
                                    onChange={handleModelChange}
                                    width="36%"
                                />
                                
                                <div class=" flex justify-end" >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={updatingBrandModel}
                                    // onClick={() =>
                                    //     handleupdateBrandModel(
                                    //         phoneMasterListId,
                                    //         value,
                                    //         toggleViewType()
                                    //     )
                                    // }
                                    >
                                        Save
                                        {/* <FormattedMessage id="app.save" defaultMessage="Save" /> */}
                                    </Button>
                                   
                                    <Button type="cancel"  onClick={() => toggleViewType()}>
                                        Cancel
                                        {/* <FormattedMessage id="app.cancel" defaultMessage="Cancel" /> */}
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

export default SingleBrandModel;

