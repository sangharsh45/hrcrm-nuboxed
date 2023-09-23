import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Divider } from "antd";
import {
    Title,
    SubTitle,
    MultiAvatar,
    StyledLabel,
} from "../../../../../../Components/UI/Elements";
import { StyledCollapse } from "../../../../../../Components/UI/Antd";
import moment from "moment";
import { Icon } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
import { CaretRightOutlined } from "@ant-design/icons";
const Panel = StyledCollapse.Panel;
class EmployeePersonalView extends Component {
    render() {
        const {
            singleEmployee: {
                bloodGroup,
                dob,
            },
            toggleViewType,
        } = this.props;
        console.log("***************", this.props);
        return (
            <>
                <FlexContainer justifyContent="flex-end">
                    {/* <ActionIcon
                        //tooltipTitle="Edit"
                        tooltiptitle={<FormattedMessage
                            id="app.edit"
                            defaultMessage="Edit"
                        />}
                        iconType="edit"
                        handleIconClick={toggleViewType}
                        size="1em"
                    /> */}
                </FlexContainer>
                <StyledCollapse
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined type="caret-right" rotate={isActive ? 90 : 0} />
                    )}
                >
                    <Panel
                        header={"Personal"}
                        key="1"
                        style={{}}
                    >
                        <ProfileItemRow //label="Blood Group" 
                            label={<FormattedMessage
                                id="app.bloodGroup"
                                defaultMessage="Blood Group"
                            />}

                            value={bloodGroup} />
                        <ProfileItemRow //label="Date Of Birth" 
                            label={<FormattedMessage
                                id="app.dob"
                                defaultMessage="Date Of Birth"
                            />}
                            value={moment(dob).format("YYYY-MM-DD")} />
                    </Panel>
                </StyledCollapse>





                {/* <ProfileItemRow label="Role" value={role} /> */}
            </>
        );
    }
}

export default EmployeePersonalView;

const ProfileItemRow = ({ label, value }) => {
    return (
        <FlexContainer
            alignItems="center"
            flexWrap="nowrap"
            style={{ margin: "0.4rem" }}
        >
            <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
            <SubTitle style={{ marginLeft: "-1.125em" }}>{value}</SubTitle>
        </FlexContainer>
    );
};
















