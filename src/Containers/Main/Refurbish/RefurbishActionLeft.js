import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';

class RefurbishActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      value: 1,
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  render() {

    const { setProductionViewType, viewType,  } = this.props
    return (
      <>
        <FlexContainer alignItems="center">

          {/* {user.designation === "Executive" && */}


          <Tooltip title="Order">
            <span
              style={{
                marginRight: "0.5rem",
                color: viewType === "list" && "red",
                cursor:"pointer"
              }}
              // iconType="book"
              // tooltipTitle="All"
              onClick={() => setProductionViewType("list")}
            ><GridViewIcon style={{fontSize:"1.4rem"}}  /></span>
          </Tooltip>
          {/* {user.designation === "Manager" && */}
          <Tooltip title="All Orders">
            <TocIcon
              style={{
                marginRight: "1.4rem",
                color: viewType === "all" && "#1890ff",
                cursor:"pointer"
              }}
              // iconType="appstore-o"
              // tooltipTitle="Supplies Library"
              onClick={() => setProductionViewType("all")}
            />
          </Tooltip>
          {/* } */}

        </FlexContainer>

      </>
    );
  }
}
const mapStateToProps = ({ auth, production }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
