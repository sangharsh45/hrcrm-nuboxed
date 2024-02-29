import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip,Badge } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { getSuppliesCount } from "./SuppliesAction";

class SuppliesActionLeft extends React.Component {
   
    componentDidMount(){
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
                <Badge
        size="small"
        count={(viewType === "all" && suppliesCount.count) || 0}
        overflowCount={999}
      >
                    <TocIcon
                    className="!text-2xl cursor-pointer"
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                        onClick={() => setSuppliesViewType("all")}
                    />
                       </Badge>
                </Tooltip>

                <Tooltip title="Deleted Materials">
                <Badge
        size="small"
        overflowCount={999}
      >
                                        <DeleteOutlined
                                        className="!text-2xl cursor-pointer"
                        style={{
                          
                            color: viewType === "dashboard" && "red",
                        }}

                        onClick={() => setSuppliesViewType("dashboard")}
                    />
                       </Badge>
                </Tooltip>

            </div>
        );
    }
}
const mapStateToProps = ({supplies }) => ({
    suppliesCount:supplies.suppliesCount
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
