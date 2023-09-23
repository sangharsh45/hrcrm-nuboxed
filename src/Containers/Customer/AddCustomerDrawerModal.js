import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { handleCustomerDrawerModal } from "../Customer/CustomerAction";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../Components/UI/Antd";
 import CustomerWordCloud from "./CustomerWordCloud";
import CustomerDocumentView from "./CustomerDocumentView";
import Customerbutton from "./Customerbutton";
 
class AddCustomerDrawerModal extends Component {

 
  render() {
    const {
      customerDrawerProps: { name,  },
      handleCustomerDrawerModal,
      opportunityDrawerVisible
    } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title={name}
          width={400}
          style={{marginTop:"5rem"}}
          visible={this.props.addDrawerCustomerModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() =>
          this.props.handleCustomerDrawerModal(this.props.customerDrawerProps, false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>

          <CustomerDocumentView
          customer={this.props.customerDrawerProps}
          />
          <CustomerWordCloud
          customer={this.props.customerDrawerProps}
          // customerKeySkill={this.props.customerKeySkill}
          />
          <Customerbutton
         
         
          />
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
  customerDrawerProps: customer.customerDrawerProps,
  addDrawerCustomerModal:customer.addDrawerCustomerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerDrawerModal);