import React from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange
} from "./SuppliersAction";
import { connect } from "react-redux";
import { Avatar, Input, Tooltip } from "antd";
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
            <div class="flex items-center">
                <Tooltip
                    title={<FormattedMessage id="app.cardview" defaultMessage="Card View" />}>

                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
                            <TocIcon className="text-white" /></Avatar>

                    </span>
                </Tooltip>

                <Tooltip title="ALL Suppliers">
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("all")}
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                            <div className="text-white">ALL</div></Avatar>

                    </span>
                </Tooltip>

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
