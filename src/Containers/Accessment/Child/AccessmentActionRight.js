import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

class AccessmentActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
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
