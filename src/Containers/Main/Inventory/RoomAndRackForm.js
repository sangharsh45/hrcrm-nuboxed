import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { addRoomAndRackInInventory } from "./InventoryAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons"

const RoomAndRackForm = (props) => {

    const [rows, setRows] = useState([{ zone: "", rack: "", id: 1, roomFullInd: 0 }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);

    function buttonOnClick() {
        let data = {
            roomRackList: rows,
            locationtypeId: props.rowData.locationtypeId,
            locationDetailsId: props.rowData.locationDetailsId,
        }
        props.addRoomAndRackInInventory(data);
    };

    function handleChangeValue1(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, zone: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleChangeValue2(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, rack: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleAddRowClick() {
        setId((v) => v + 1);
        setLevel((v) => v + 1);
        setRows((v) => [...v, { zone: "", rack: "", id: id + 1, roomFullInd: 0 }]);
    }
    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
        setLevel((v) => v - 1);
    }
    console.log(rows);
    return (
        <>
            {rows.map((row, i) => {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "39%" }}>
                                <label>{`Zone ${i + 1}`}</label>
                                <Input
                                    type='text'
                                    value={`${row.zone}`}
                                    onChange={(e) =>
                                        handleChangeValue1(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>
                            <div style={{ width: "39%" }}>
                                <label>Rack</label>
                                <Input
                                    type='text'
                                    value={`${row.rack}`}
                                    onChange={(e) =>
                                        handleChangeValue2(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>
                            {rows.length > 1 && (row.id + 1 > row.id) ? (
                                <div style={{ width: "15%", marginTop: "30px" }}>
                                    <CloseOutlined
                                        onClick={() => handleDelete(row)}
                                        style={{ fontSize: "16px", color: "red" }} />
                                </div>
                            ) : null}

                        </div>
                    </>
                )
            })}
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "47px",
                marginTop: "25px",
            }}>
                <Button
                    style={{
                        backgroundColor: "#24a3fb",
                        marginRight: "15px",
                        border: "none",
                    }}
                    type="primary"
                    onClick={handleAddRowClick}
                >
                    Add More
                </Button>
                <Button
                    htmlType='submit'
                    type='primary'
                    onClick={buttonOnClick}
                    loading={props.addingRoomAndRackInInventory}
                >
                    Save
                </Button>
            </div>

        </>

    )
}

const mapStateToProps = ({ inventory, auth, locations }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addRoomAndRackInInventory
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);
