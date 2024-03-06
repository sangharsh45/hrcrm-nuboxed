import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Badge, Avatar } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { getSuppliesCount } from "./SuppliesAction";

class SuppliesActionLeft extends React.Component {

    componentDidMount() {
        this.props.getSuppliesCount();
    }
    render() {
        const {
            viewType,
            setSuppliesViewType,
            suppliesCount,
        } = this.props;

        return (
            <div class="flex items-center">

                <Tooltip title="All Materials">
                    <Badge size="small"
                        count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white">All</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>


                <Tooltip title="Deleted Materials">
                    <Badge
                        size="small"
                        overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("dashboard")}
                            style={{
                                color: viewType === "dashboard" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
                                <DeleteOutlined className="text-white" /></Avatar>

                        </span>
                    </Badge>
                </Tooltip>
            </div>
        );
    }
}
const mapStateToProps = ({ supplies }) => ({
    suppliesCount: supplies.suppliesCount
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
