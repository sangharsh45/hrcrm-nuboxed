import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd'
import { getProductListByDistributor, addAllProductInOrder } from "../../AccountAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import moment from 'moment'

const AddCatalogueTable = (props) => {

    useEffect(() => {
        props.getProductListByDistributor(props.distributorId, props.orderId)
    }, [])

    const handleFinalSubmit = () => {
        props.addAllProductInOrder({
            type: props.toggle ? "Catalogue" : "Non-Catalogue",
            distributorId: props.distributorId,
            orderId: props.orderId,
            products: props.productByDistributor,
            userId: props.userId,
            createdBy: props.userId,
            subscriptionType: "Onetime",
            deliveryType: "Daily",
            deliveryUnit: "Instance",
            noOfDays: 1,
            deliveryStartDate: moment(),
            deliveryEndDate: moment(),
            subscriptionStartDate: moment()
        }, props.distributorId, props.orderId)
    }
    const column = [
        {
            title: "",
            width: "1%"
        },

        {
            title: "Name",
            width: "15%",
            dataIndex: 'name'
        },

        {
            title: "Category",
            width: "18%",
            dataIndex: "categoryName"
        },
        {
            title: "Sub Category",
            width: "18%",
            dataIndex: "subCategoryName"
        },
        {
            title: "Attribute",
            width: "10%",
            dataIndex: "attributeName"
        },
        {
            title: "Sub Attribute",
            width: "10%",
            dataIndex: "subAttributeName"
        },
        {
            title: "Units",
            width: "13%",
            dataIndex: "quantity",

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

