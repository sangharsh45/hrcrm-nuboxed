
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {  Button, Tooltip } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledSelect } from "../../../../Components/UI/Antd";



const Option = StyledSelect.Option;

class LocationActionRight extends React.Component {
 
  componentDidMount() {
   
  }
  
  render() {
    console.log(this.props.handleLocationModal)
    return (
      <FlexContainer alignItems="center">

        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handleLocationModal(true)}
          >
           

            Add
          </Button>
        </Tooltip>
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({  }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({  }, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationActionRight)
);
