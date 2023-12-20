import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";

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
            brandmodel: { brand, model, phoneMasterListId },
            handleChange,
            handleModelChange,
            name,
            value,
            updatingBrandModel,
        } = this.props;

        return (
            <SectorWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <div class=" flex justify-between" >
                                <SectorName style={{ flexBasis: "90%" }}>
                                    {brand} {model}
                                </SectorName>
                                <div>
                                    <BorderColorIcon

                                        tooltipTitle="Edit"
                                        iconType="edit"
                                        onClick={toggleViewType}
                                        style={{ fontSize: "1rem" }}
                                    />
                                    {/* ) : null}  */}
                                    &nbsp;
                                    <Tooltip title="Delete">
                                        <DeleteIcon

                                            size="14px"
                                            style={{
                                                verticalAlign: "center",
                                                marginLeft: "5px",
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
                                <br />
                                <TextInput
                                    name={name}
                                    value={value || model}
                                    defaultValue={model}
                                    onChange={handleModelChange}
                                    width="36%"
                                />
                                <br />
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
                                    &nbsp;
                                    <Button type="primary" ghost onClick={() => toggleViewType()}>
                                        Cancel
                                        {/* <FormattedMessage id="app.cancel" defaultMessage="Cancel" /> */}
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

export default SingleBrandModel;

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
