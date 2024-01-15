import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import {
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {linktagCustomer} from "../../../../Opportunity/OpportunityAction";
import {  LinkOutlined } from "@ant-design/icons";
import styled from "styled-components";

class DealView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkContactModalVisible: false,
    };
  }
  handleLinkContactModalVisible = () =>
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });

  unlinkCallback = () => this.props.updateAccount({});

  linkCallback = (accountId) => {
    console.log("inside link callback");
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });
    this.props.setAccount(accountId);
  };

  render() {
    
  

    console.log(this.props.account);
    const {
      dealDetailsbyID: { opportunityName,invOpportunityId },
      account: { accountId, accountName, imageId, imageURL },
      dealDetailsbyID,
      toggleViewType,

    } = this.props;
 
    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex flex-no-wrap justify-start w-[85%] mt-[-8px]"
          >
            <div class=" w-[20%] mt-[4px]" >
              <MultiAvatar
                primaryTitle={dealDetailsbyID.opportunityName}
                imageId={imageId}
                imageURL={imageURL}
              />
              {/* )} */}
            </div>
            &nbsp;
            <div class=" flex flex-col w-[80%]" >
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
                // style={{ marginLeft: "0.625em" }}
              >
                {`${opportunityName || ""}`}
              </Title>
              <SubTitle
                overflow="hidden"
                textOverflow="ellipsis"
                style={{ marginLeft: "0.625em" }}
              >
                {accountName}
              </SubTitle>
            </div>
            <div class=" flex flex-col w-[20%]" >
            {this.props.partnerLogin === "Yes" &&
            this.props.department === "Partner" ? null : (
              <div class=" flex justify-end" style={{ placeItems: "center" }} >
                {this.props.account &&
                  this.props.account.hasOwnProperty("accountId") ? (
                    <StyledPopconfirm
                      placement="bottom"
                      title={<FormattedMessage
                        id="app.doyouwishtodetach"
                        defaultMessage="Do you wish to detach?"
                      />}
                    >
              
                    </StyledPopconfirm>
                  ) : (
                    <Tooltip //title="Tag Customer"
                      title={<FormattedMessage
                        id="app.tagcustomer"
                        defaultMessage="Tag Customer"
                      />}
                    >
                      <LinkOutlined
                        tooltipTitle="Tag Customer"
                        iconType="link"
                        onClick={this.handleLinkContactModalVisible}
                        size="16px"
                        style={{ color: "#fb8500",fontSize:"0.8rem" }}
                      />
                    </Tooltip>
                  )}
              &nbsp;
                <Tooltip 
                  title={<FormattedMessage
                    id="app.edit"
                    defaultMessage="Edit"
                  />}
                >
                 <span
                    tooltipTitle="Edit"
                    iconType="edit"
                    onClick={toggleViewType}
                    // size="16px"
                  >
                       <BorderColorIcon  style={{fontSize:"0.8rem"}}/>
              </span>
                </Tooltip>
              </div>
            )}
            </div>
          </div>

          
        </div>
        
        {/* <LinkTagCustomerModal
        invOpportunityId={invOpportunityId}
        linkContactModalVisible={this.state.linkContactModalVisible}
        handleLinkContactModalVisible={this.handleLinkContactModalVisible}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ customer,auth,opportunity}) => ({
  customerByUserId:customer.customerByUserId,
  userId: auth.userDetails.userId,
  linkingtagCustomerOpportunity:opportunity.linkingtagCustomerOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linktagCustomer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealView);
const AppIcon1 = (props) => (
  
  <BorderColorIcon
 

  />


);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;