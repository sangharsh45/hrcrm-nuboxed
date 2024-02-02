import React, { useEffect } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { getTaggedBrandById } from "./SuppliesAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const TaggedBrandTable = (props) => {
    useEffect(() => {
        props.getTaggedBrandById(props.particularDiscountData.suppliesId)
    }, [])

    const columns = [
        {
            width: "2%"
        },
        {
            title: "Brand",
            dataIndex: "brand"
        },
        {
            title: "Model",
            dataIndex: "model"
        }
    ]
    return (
        <>
            <StyledTable
                dataSource={props.taggedBrand}
                columns={columns}
                pagination={false}
            />

        </>
    )
}
const mapStateToProps = ({supplies }) => ({
    taggedBrand: supplies.taggedBrand
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaggedBrandById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TaggedBrandTable);

