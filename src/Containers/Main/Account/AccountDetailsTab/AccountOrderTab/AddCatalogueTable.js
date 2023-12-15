import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd'
import { getProductListByDistributor, addAllProductInOrder } from "../../AccountAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'

const AddCatalogueTable = (props) => {

    useEffect(() => {
        props.getProductListByDistributor(props.distributorId)
    }, [])

    const handleFinalSubmit = () => {
        props.addAllProductInOrder({
            type: props.toggle ? "Catalogue" : "Non-Catalogue",
            distributorId: props.distributorId,
            orderId: props.orderDetailsId,
            products: props.productByDistributor,
            userId: props.userId,
            createdBy: props.userId,
        }, props.distributorId)
    }
    const column = [
        {
            title: "",
            width: "1%"
        },
        {
            title: "Article",
            width: "12%"
        },
        {
            title: "Name",
            width: "15%"
        },

        {
            title: "Category",
            width: "18%"
        },
        {
            title: "Attribute",
            width: "10%"
        },
        {
            title: "Sub-Attribute",
            width: "10%"
        },
        {
            title: "Units",
            width: "13%",
            dataIndex: "unit"
        },


    ];

    return (
        <>
            <StyledTable
                dataSource={props.productByDistributor}
                pagination={false}
                columns={column}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    disabled={!props.productByDistributor.length}
                    type="primary"
                    onClick={handleFinalSubmit}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}

const mapStateToProps = ({ distributor, auth }) => ({
    productByDistributor: distributor.productByDistributor,
    userId: auth.userDetails.userId,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getProductListByDistributor,
        addAllProductInOrder
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueTable);

