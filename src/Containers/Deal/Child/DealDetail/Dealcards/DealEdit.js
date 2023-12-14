import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { updateDealName } from "../../../DealAction";
import { Button } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput} from "../../../../../Components/UI/Elements";
class DealEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }
  handleUpdate = () => {
    this.props.updateDealName(
      this.state.fields,
      this.props.dealDetailsbyID.invOpportunityId,
     
       this.callback
    );
  };

  callback = () => {
    this.props.toggleViewType();
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
  render() {
    const { dealDetailsbyID, toggleViewType, updatingDealName } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditableInput
            defaultValue={dealDetailsbyID.opportunityName}
            handleChange={this.handleChange}
            name={"opportunityName"}
            value={this.state.fields.opportunityName}
            width="100%"
          />
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingDealName}
          onClick={this.handleUpdate}
          >
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
            {/* Save */}
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
            {/* Cancel */}
          </Button>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ deal }) => ({
  updatingDealName: deal.updatingDealName,
  updatingDealNameError: deal.updatingDealNameError
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateDealName 
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        width={width}
      />
    );
  }
}
