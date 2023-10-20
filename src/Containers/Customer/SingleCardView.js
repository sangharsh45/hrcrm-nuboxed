import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip } from "antd";
import { BussinessCard } from "../../Components/UI/Elements";
class SingleCardView extends Component {
  render() {
    return (
      <>
        <BussinessCard
          primaryTitle={this.props.customer.name}
          customerId={this.props.customer.customerId}
          onBoarded={this.props.customer.onBoarded}
          position={this.props.customer.position}
          handleClick={() =>
            this.props.history.push({
              pathname: `customer/${this.props.customer.customerId}`,
            })
          }
          handlePreview={() =>
            this.props.handleCustomerDrawerModal(this.props.customer, true)
          }
          handleEdit={() =>{
            this.props.setEditCustomer(this.props.customer);
            this.props.handleUpdateCustomerDrawerModal(
              this.props.customer,
              true)
          }}
        />
      </>
    );
  }
}
export default withRouter(SingleCardView);

function StageStatus({ stages, opportunity }) {
  const index = stages
    .sort((a, b) =>
      Number(a.probability) > Number(b.probability)
        ? 1
        : Number(b.probability) > Number(a.probability)
        ? -1
        : 0
    )
    .findIndex((stage) => stage.stageId === opportunity.stageId);
  return (
    <>
      {stages &&
        stages
          .sort((a, b) =>
            Number(a.probability) > Number(b.probability)
              ? 1
              : Number(b.probability) > Number(a.probability)
              ? -1
              : 0
          )
          .map((stage, i) => {
            let backgroundColor =
              index >= i ? `rgba(3, 89, 30, 0.${i + 2})` : "lightgray";
            let lossBackgroundColor =
              index >= i ? `rgba(204, 39, 24, 0.${i + 2})` : "#db584c";
            // if (stage.stageName === 'Lost') {
            //     backgroundColor = 'red'
            // }
            if (opportunity.stageName === "Lost") {
              if (stage.stageName === "Won") {
                return;
              } else {
                return (
                  <Tooltip title={"Lost"} key={stage.stageId}>
                    <p
                      style={{
                        backgroundColor: "#db584c",
                        margin: 0,
                        cursor: "pointer",
                        width: "24px",
                        height: "5px",
                        borderRadius: "20%",
                      }}
                    ></p>
                  </Tooltip>
                );
              }
            } else {
              if (stage.stageName === "Lost") {
                return;
              } else {
                return (
                  <Tooltip title={stage.stageName} key={stage.stageId}>
                    <p
                      style={{
                        backgroundColor,
                        margin: 0,
                        cursor: "pointer",
                        width: "24px",
                        height: "5px",
                        borderRadius: "20%",
                      }}
                    ></p>
                  </Tooltip>
                );
              }
            }
          })}
    </>
  );
}
