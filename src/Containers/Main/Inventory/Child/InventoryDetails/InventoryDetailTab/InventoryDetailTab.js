import React, { lazy, PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import {
  handleAddDispatchModal,
  handleAddOutputReasonModal,
} from "../../../InventoryAction";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { FormattedMessage } from "react-intl";

const ReceivedTable = lazy(() =>
import( "../Recieved/ReceivedTable"));
const InventoryConsumptionForm = lazy(() =>
  import("../Consumption/InventoryConsumptionForm")
);
const InventoryConsumptionTable = lazy(() =>
  import("../Consumption/InventoryConsumptionTable")
);
const DispatchTable = lazy(() => import("../Dispatch/DispatchTable"));
const CatalogueInventoryTable = lazy(() =>
  import("../CatalogueInventory/CatalogueInventoryTable")
);

const TabPane = StyledTabs.TabPane;
class InventoryDetailTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: this.props.tabData || "1",
      breadCumb: false,
      breadCumb1: false,
      value: 1,
      reportClick: false,
      showReport: false,
    };
  }
  componentDidMount() {
    console.log(this.props.tabData.typeOf);
    this.setState({ activeKey: this.props.tabData });
  }

  handleCatalogueCreateClick = (data) => {
    this.setState({ breadCumb: data });
    this.setState({ breadCumb1: false });
    this.setState({ showReport: false });
  };

  handleCatalogueReportClick = (data) => {
    this.setState({ breadCumb1: data });
    this.setState({ breadCumb: false });
    this.setState({ showReport: true });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };


  handleTabChange = (key) => this.setState({ activeKey: key });
  handleReportClick = (data) => {
    this.setState({
      reportClick: data,
    });
    this.setState({
      showReport: true,
    });
  };
  render() {
    const { activeKey } = this.state;
    const { user } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
          >

            <TabPane
              tab={
                <>
                  {/* <span
                  //    onClick={() => this.handleOrderCreateClick(false)}
                  > */}
                  <i class="fas fa-satellite-dish"></i>&nbsp; 
                  <FormattedMessage id="app.receive" defaultMessage="Receive" />
                   
                  {/* </span> */}
                  {/* {activeKey === "1" && (
                 
                  )} */}
                </>
              }
              key="1"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                <ReceivedTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  {/* <span
                  //    onClick={() => this.handleOrderCreateClick(false)}
                  > */}
                  {/* <i class="fas fa-cookie-bite"></i> */}
                  <i class="fab fa-linode"></i>  &nbsp;
                  <FormattedMessage id="app.materials" defaultMessage="Materials" /> 
               
                  {/* </span> */}
                  {/* {activeKey === "1" && (
                 
                  )} */}
                </>
              }
              key="2"
            >
              {" "}
              <Suspense fallback={"Loading..."}>
                {(user.functionName === "Management" ||
                  user.functionName === "Production") &&
                  user.designation === "Manager" ? (
                  <InventoryConsumptionForm />
                ) : null}

              <div class=" mt-3"> <InventoryConsumptionTable /></div>
               
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-share-square"></i>&nbsp;
                    <FormattedMessage id="app.dispatch" defaultMessage="Dispatch" />
                    
             
                  </span>
                  {/* {activeKey === "2" && (
                    <>
                      <Tooltip title="Dispatch">
                        <PlusOutlined
                          onClick={() => this.props.handleAddDispatchModal(true)}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                      </Tooltip>{" "}
                    </>
                  )} */}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading..."}>
                <DispatchTable />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                  <ViewInArIcon
              // style={{ fontSize: "large" }}
            />&nbsp;
                 <FormattedMessage id="app.catalogue" defaultMessage="Catalogue" />
            
             
                  </span>
                  {/* {activeKey === "2" && (
                    <>
                      <Tooltip title="Dispatch">
                        <PlusOutlined
                          onClick={() => this.props.handleAddDispatchModal(true)}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                      </Tooltip>{" "}
                    </>
                  )} */}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading..."}>
                <CatalogueInventoryTable />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          {/* <AddDispatchModal
            addDispatchModal={this.props.addDispatchModal}
            handleAddDispatchModal={this.props.handleAddDispatchModal}
          />
          <AddOutputReasonModal
            addOutputReasonModal={this.props.addOutputReasonModal}
            handleAddOutputReasonModal={this.props.handleAddOutputReasonModal}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ inventory, auth }) => ({
  addDispatchModal: inventory.addDispatchModal,
  user: auth.userDetails,
  addOutputReasonModal: inventory.addOutputReasonModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleAddDispatchModal,
      handleAddOutputReasonModal,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetailTab)
  
);


// import React from "react";

// function InventoryDetailTab(){
//   return (
//     <>
//     <div>hiii</div>
//     </>
//   )
// }
// export default InventoryDetailTab;
