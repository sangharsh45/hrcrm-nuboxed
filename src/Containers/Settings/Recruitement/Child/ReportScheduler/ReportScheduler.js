// import React, { Component, lazy, useEffect } from "react";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import AllCustomerForm from "./AllCustomerForm";
// import AllCustomerListTable from "./AllCustomerListTable";
// import AllVendorListTable from "./AllVendorListTable";
// import ReportSchedulerForm from "./ReportSchedulerForm";
// import ReportSchedulerTable from "./ReportSchedulerTable";
// import VendorForm from "./VendorForm";

// const TabPane = StyledTabs.TabPane;

// function SchedulerTab(props) {
//     return (
//         <>
//             <TabsWrapper>
//                 <StyledTabs defaultActiveKey="1" type="card">
//                     <TabPane tab={`Internal`} key="1">
//                         <div style={{ marginTop: 10 }}>
//                             <ReportSchedulerForm />
//                             <ReportSchedulerTable/>
//                         </div>
//                     </TabPane>
//                     <TabPane tab={`Customer`} key="2">
//                         <div style={{ marginTop: 10 }}>
//                             <AllCustomerForm/>
//                             <AllCustomerListTable/>
//                         </div>
//                     </TabPane>
//                     <TabPane tab={`Vendor`} key="3">
//                         <div style={{ marginTop: 10 }}>
//                             <VendorForm/>
//                             <AllVendorListTable/>
//                         </div>
//                     </TabPane>
//                 </StyledTabs>
//                 {/* <h1>Approval</h1> */}
//             </TabsWrapper>
//         </>
//     );
// }



// export default SchedulerTab;




import React, {  PureComponent,lazy, Suspense,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentList } from "../../../SettingsAction";
 const AllCustomerListTable = lazy(() =>
  import("../ReportScheduler/AllCustomerListTable")
);
const AllCustomerForm = lazy(() =>
import("../ReportScheduler/AllCustomerForm")
);

const TabPane = StyledTabs.TabPane;
class SchedulerTab extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {},
            departmentId:"",
        }
    }

    componentDidMount() {
        this.props.getDepartmentList()
    }

    handleOnClick = (departmentId) => {
        console.log(departmentId);
        debugger;
        this.setState({
            departmentId: departmentId,
        });

    };
    render() {
        const { departmentList } = this.props;
        // console.log(this.state.departmentData.departmentId)
        return (
            <>
                <TabsWrapper>
                    <StyledTabs type="card">
                        {departmentList.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member.departmentId)}>
                                            {member.departmentName}
                                        </span>
                                    }
                                >

{this.state.departmentId && (
                                        <Suspense fallback={"Loading..."}>
                                           
                                        <AllCustomerForm
                                         departmentList={this.props.departmentList} 
                                         departmentId={this.state.departmentId}/>
                             <AllCustomerListTable 
                             departmentList={this.props.departmentList} departmentId={this.state.departmentId}/>
                            
                                        </Suspense>
                                         )}


                                </TabPane>
                            );
                        })}

                    </StyledTabs>
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    departmentList: settings.departmentList,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerTab);













