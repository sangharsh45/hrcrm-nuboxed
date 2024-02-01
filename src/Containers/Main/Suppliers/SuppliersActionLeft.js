import React from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange
} from "./SuppliersAction";
import { connect } from "react-redux";
import {  Input, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";


const Option = StyledSelect.Option;

class SuppliersActionLeft extends React.Component {
    render() {
        const {
            user,
            viewType,
            setSuppliersViewType,
        } = this.props;
        return (
            <div class="items-center">
                <Tooltip
                title={<FormattedMessage id="app.suppliersList" defaultMessage="Suppliers List" />}
                >
                    <GridViewIcon
                        style={{
                            marginRight: "0.3rem",
                            color: viewType === "card" && "#1890ff",
                        }}
                        // iconType="appstore-o"
                        // tooltipTitle="Suppliers Library"
                        onClick={() => setSuppliersViewType("card")}
                    />
                </Tooltip>
                {/* <Tooltip title="ALL Suppliers">
                <Badge size="small">
                    <span
                        style={{
                            marginRight: "0.5rem",
                            color: viewType === "all" && "#1890ff",
                        }}
                        onClick={() => setSuppliersViewType("all")}
                    >All
                    </span>
                    </Badge>
                </Tooltip> */}
                {/* <Tooltip title="Dashboard View">
                    <AreaChartOutlined
                        style={{
                            marginRight: "0.5rem",
                            color: viewType === "dashboard" && "#1890ff",
                        }}
                        //iconType="area-chart"

                        onClick={() => setSuppliersViewType("dashboard")}
                    />
                </Tooltip>
                {viewType === "dashboard" && (
                    <FlexContainer alignItems="center">
                        <TimeInterval
                            times={dateRangeList}
                            handleClick={setSelectedTimeInterval}
                        />
                        <StyledRangePicker
                            // allowClear={this.handleCancle}
                            style={{ marginLeft: 8 }}
                            disabled={1
                                // organization.subscriptionType === "FREE" ||
                                // organization.subscriptionType === "STARTER"
                            }
                            onChange={(range) => {
                                setTimeRange(range[0], range[1]);
                                this.handlerangeClick();
                            }}
                            disabledDate={(date) =>
                                moment(date).isBefore(creationDate) ||
                                moment(date).isAfter(moment())
                            }
                        />
                    </FlexContainer>
                )} */}
                &nbsp;&nbsp;
                <div class=" ml-6 h-6 w-60">
      <Input
    //   placeholder={<FormattedMessage id="app.searchByname" defaultMessage="Search By Name" />}
     placeholder="Search By Name"
      width={"100%"}
            // suffix={suffix}
            // onPressEnter={handleSearch}  
            // onChange={handleChange}
            // value={currentData}
          />
   
      </div>
                &nbsp;
                &nbsp;

            </div>
        );
    }
}
const mapStateToProps = ({ auth, suppliers }) => ({
    user: auth.userDetails,
    dateRangeList: suppliers.dateRangeList,
    startDate: suppliers.startDate,
    endDate: suppliers.endDate,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            setSuppliersDashboardType,
            setSelectedTimeInterval,
            setTimeRange,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionLeft);
