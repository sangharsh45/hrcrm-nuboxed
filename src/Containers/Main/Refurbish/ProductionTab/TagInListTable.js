import React, { useEffect } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { getTagInProcess } from "../RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const TagInListTable = (props) => {

    useEffect(() => {
        props.getTagInProcess(props.RowData.productRepurbishId)
    }, [])
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Part Name",
            dataIndex: "suppliesName",
            width: "40%",
        },

        {
            title: "Part Number",
            dataIndex: "cartNo",
            width: "30%",
        },
    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.tagInPros}
                pagination={false}
                scroll={{ y: 600 }}
            />
        </>
    );
}
const mapStateToProps = ({ refurbish, auth }) => ({
    tagInPros: refurbish.tagInPros
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTagInProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TagInListTable);

