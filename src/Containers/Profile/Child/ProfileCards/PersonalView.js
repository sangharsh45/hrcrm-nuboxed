import React, { Component } from "react";
import { Divider } from "antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../Components/UI/Elements";
import { StyledCollapse } from "../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../Components/Utils";
import { Icon } from "antd";
import dayjs from "dayjs";
import { CaretRightOutlined, EditOutlined } from "@ant-design/icons";
const Panel = StyledCollapse.Panel;
class PersonalView extends Component {
  render() {
    const {
      user: { bloodGroup, dob },
      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <FlexContainer justifyContent="flex-end">
          <EditOutlined
            tooltipTitle="Edit"
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          />
        </FlexContainer>
        <StyledCollapse
          bordered={false}
          defaultActiveKey={["0"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header={"Personal"} key="1" style={{}}>
            <ProfileItemRow label="Blood Group" value={bloodGroup} />
            <ProfileItemRow
              label="Date Of Birth"
              value={dob ? dayjs(dob).format("YYYY-MM-DD") : ""}
            />
          </Panel>
        </StyledCollapse>

        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default PersonalView;

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
