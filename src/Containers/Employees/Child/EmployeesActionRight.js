import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class EmployeesActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {}
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleEmployeeModal, userId } = this.props;
    return (
      <>
        <div class=" flex items-center">
          {this.props.role === "ADMIN" && (
            <Tooltip placement="left" title="XL">
              <a
                href={`${base_url}/excel/export/vendor/user/employee/${userId}`}
              >
                <InsertDriveFileIcon style={{ fontSize: "x-large" }} />
              </a>
            </Tooltip>
          )}

          <Button
            type="primary"
            ghost
            onClick={() => handleEmployeeModal(true)}
          >
            Add
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionRight)
);
