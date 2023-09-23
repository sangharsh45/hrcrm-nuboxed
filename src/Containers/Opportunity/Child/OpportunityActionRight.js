import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import OpportunityShareForm from "./OpportunityShareForm";

const Option = StyledSelect.Option;

class OpportunityActionRight extends React.Component {
  render() {
    const {
      userId,
      subscriptionType,
      users,
      user,
      department,
      accountFilterText,
      handleOpportunityModal,
      setAccountFilterText,
      setAccountFilterUser,
    } = this.props;
    return (
      <div class=" flex items-center">
         {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true &&(
      <OpportunityShareForm/>
         )}
        <Button
        style={{lineHeight:"inherit"}}
           type="primary"
          // default
        href={`${base_url}/excel/export/user/opportunity/${userId}`}
        >
          {/* Export */}
          <FormattedMessage
                id="app.export"
                defaultMessage="Export"
              />
        </Button>
        <Tooltip placement={"left"} title={<FormattedMessage
                id="app.create"
                defaultMessage="Create"
              />}>
           {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
           {user.opportunityCreateInd ===true && (
          <Button
            type="primary"
            // ghost
            onClick={() => handleOpportunityModal(true)}
          >
            Add
          </Button>
            )}  
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)
);
