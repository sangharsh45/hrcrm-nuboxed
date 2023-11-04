import React, { useEffect } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getAllVat } from "../../SettingsAction"
const VatTable = (props) => {
    useEffect(() => {
        props.getAllVat()
    }, [])
    const columns = [
        {
            title: "Name"
        },
        {
            title: "Value"
        },
    ]
    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.allVat}
                pagination={false}
            />
        </>
    )
}
const mapStateToProps = ({ settings, auth }) => ({
    allVat: settings.allVat
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllVat
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(VatTable);

