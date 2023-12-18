import React, { useEffect, useState } from 'react'
import BuilderWithPartIdTable from './BuilderWithPartIdTable'
import { Button, Input, Select } from 'antd';
import { addProductBuilderInProcess } from "./RefurbishAction"
import { bindActionCreators } from 'redux';
import { getBuilderByProId } from "../../Product/ProductAction";
import { connect } from 'react-redux';
const { Option } = Select;
const TaggedBuilderList = (props) => {
    useEffect(() => {
        props.getBuilderByProId(props.row.productId);
    }, []);

    const [partName, setPartName] = useState("")
    const [partNo, setPartNo] = useState("")

    const handlePartName = (value) => {
        setPartName(value)
    }
    const handlePartNo = (e) => {
        setPartNo(e.target.value)
    }
    const handleClick = () => {
        props.addProductBuilderInProcess({
            productManufacturingId: props.row.productManufacturingId,
            productId: props.row.productId,
            orderId: props.row.orderId,
            suppliesId: partName,
            cartNo: partNo,
            userId: props.userId
        }, props.row.productManufacturingId)
        setPartName("")
        setPartNo("")
    }
    return (
        <>
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <div style={{
                    width: "40%",
                }}>
                    <label style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Part</label>
                    <Select

                        value={partName}
                        onChange={(value) => handlePartName(value)}
                    >
                        {props.builderbyProductId.map((a) => {
                            return <Option value={a.suppliesId}>{a.suppliesName}</Option>;
                        })}
                    </Select>
                </div>
                <div style={{
                    width: "35%",
                }}>
                    <label style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Part No</label>
                    <Input value={partNo}
                        // width={250}
                        type='text' onChange={(value) => handlePartNo(value)} />
                </div>
                <div style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Button type='primary' onClick={handleClick}>Add</Button>
                </div>
            </div>
            <BuilderWithPartIdTable row={props.row} />
        </>
    )
}

const mapStateToProps = ({ product, auth }) => ({
    builderbyProductId: product.builderbyProductId,
    userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addProductBuilderInProcess,
            getBuilderByProId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TaggedBuilderList);


