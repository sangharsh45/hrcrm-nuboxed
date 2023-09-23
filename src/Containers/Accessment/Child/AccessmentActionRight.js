import React,{lazy}from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { ActionIcon } from "../../../Components/Utils";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Icon, Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Spacer, TextInput } from "../../../Components/UI/Elements";
import { StyledSelect } from "../../../Components/UI/Antd";
// import { setAccountFilterText, setAccountFilterUser } from "../AccountAction";
// import { getUsers } from "../../Team/TeamAction";
// const EmployeeShareForm=lazy(()=>import("./EmployeeShareForm"));

const Option = StyledSelect.Option;

class AccessmentActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
    // this.props.getUsers();
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const { handleAccessmentModal, userId } = this.props;
    return (
      <>
      {/* <FlexContainer alignItems="center">
       
     

        <Button type="primary"
         ghost onClick={() => handleAccessmentModal(true)}>

          Add
        </Button>

        </FlexContainer> */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
 

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccessmentActionRight)
);
