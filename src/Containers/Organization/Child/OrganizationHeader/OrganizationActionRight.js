import React, {lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const Option = StyledSelect.Option;

class OrganizationActionRight extends React.Component {
 
  render() {
    const {
      userId,
      user,
      role,
      handleOrganizationModal,
    } = this.props;
    return (
      <div class=" flex  items-center">
   
      
        <Tooltip placement="left" title="Create">
          {this.props.user.customerCreateInd ===true && user.crmInd === true &&(
          <Button
            type="primary"
            onClick={() => handleOrganizationModal(true)}
          >
                             <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          
          </Button>
           )} 
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizationActionRight)
);
