import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";

class InventoryActionLeft extends React.Component {
  render() {
    const { viewType, setInventoryViewType } = this.props;

    return (
      <>
        <FlexContainer alignItems="center">
          <Tooltip title="Location">
            <span
              onClick={() => setInventoryViewType("table")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "table" && "#1890ff",
                cursor: "pointer",
              }}
            >
              <i class="fas fa-globe"></i>
            </span>
          </Tooltip>
          <Tooltip title="Catalogue">
            <span
              onClick={() => setInventoryViewType("table1")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fab fa-creative-commons-remix"></i>
            </span>
          </Tooltip>
          <Tooltip title="Material">
            <span
              onClick={() => setInventoryViewType("table2")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fas fa-cookie-bite"></i>
            </span>
          </Tooltip>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ teams }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryActionLeft);
