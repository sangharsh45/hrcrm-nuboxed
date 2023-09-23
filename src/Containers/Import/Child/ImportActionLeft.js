import React from "react";
import { withRouter } from "react-router-dom";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import { RollbackOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ImportActionLeft = props => {
  return (
    <FlexContainer alignItems="center">
      <Tooltip title="Back">
        <RollbackOutlined
            // iconType="rollback"
          // tooltipTitle="Back"
          style={{ marginRight: "0.3rem",color: "#1890ff", fontSize: "1.56em" }}
          onClick={() => props.history.goBack()}
        />
      </Tooltip>
    </FlexContainer>
  );
};

export default withRouter(ImportActionLeft);
