import React from "react";
import { withRouter } from "react-router";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { RollbackOutlined } from "@ant-design/icons";

class InventoryDetailActionLeft extends React.Component {
  render() {
    const {
      inventory: { locationName,address },
      toggleViewType,
    } = this.props;
    const addressdata1=address && address && address[0].street;
    const addressdata2=address && address && address[0].city;
    const addressdata3=address && address && address[0].state;
    const addressdata4=address && address && address[0].postalCode;
    const addressdata5=address && address && address[0].country;
    return (
      <>
      <FlexContainer alignItems="center">
        <Tooltip title="Back">
          <RollbackOutlined
            style={{ marginRight: "0.3rem", color: "#1890ff" }}
            // iconType="rollback"
            // tooltipTitle{}="Back"
            // style={{ color: "#1890ff" }}
            onClick={() => {
              this.props.history.goBack();
              this.props.handleResetTab();
            }}
          />
        </Tooltip>
        <FlexContainer justifyContent="space-between">
       
            <FlexContainer flexDirection="row" style={{ width: "30rem",display:"flex",alignItems:"center" }}>
            <Title width="25%">
             <label class="text-lg"> {` ${locationName || ""} `}</label>
            </Title>
           
          <div style={{ width: "70%",justifyContent:"center",marginLeft:"1rem" }}>
          {`${addressdata1 || ""} ${addressdata2 || ""} ${addressdata3 || ""} ${addressdata4 || ""} ${addressdata5 || ""}`} 
          </div>
        
          
         
         
        </FlexContainer>
      </FlexContainer>
      </FlexContainer>
    
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetailActionLeft)
);

const InventoryItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
