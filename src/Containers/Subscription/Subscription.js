import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SubscriptionHeader from "./Child/SubscriptionHeader";
import {handleCreateSubscriptionDrawer} from "./SubscriptionAction";
const CreateSubscriptionDrawer =lazy(()=>import("./Child/CreateSubscriptionDrawer"));

function Subscription (props) {

    return (
        <>
        <SubscriptionHeader 
          createSubscriptiondrawer={props.createSubscriptiondrawer}
          handleCreateSubscriptionDrawer={props.handleCreateSubscriptionDrawer}
          />
        <CreateSubscriptionDrawer
          createSubscriptiondrawer={props.createSubscriptiondrawer}
          handleCreateSubscriptionDrawer={props.handleCreateSubscriptionDrawer}
        />

        <div class="font-bold text-lg">
            Subscription
        </div>
        </>
    )
};

const mapStateToProps = ({ subscription }) => ({
  createSubscriptiondrawer:subscription.createSubscriptiondrawer
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleCreateSubscriptionDrawer
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Subscription);