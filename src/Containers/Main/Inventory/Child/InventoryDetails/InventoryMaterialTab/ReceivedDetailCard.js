import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import {
    getMaterialReceivedDetailData,
    updateReceivedDamagedUnit,
    generateGrnForPo
} from "../../../InventoryAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BorderColorOutlined } from '@mui/icons-material';
import { Button, Form, Input, Popconfirm, Switch, Typography, message } from 'antd';
import PoReceiveToggle from './PoReceiveToggle';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const ReceivedDetailCard = (props) => {
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    }, [])
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(props.receivedDetailData)
    }, [props.receivedDetailData])

    const isEditing = (record) => record.poSupplierSuppliesId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            unitReceived: '',
            unitDamaged: '',
            remark: '',
            ...record,
        });
        setEditingKey(record.poSupplierSuppliesId);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.poSupplierSuppliesId);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, ...row });
                const a = newData[index];

                if (a.unit >= a.unitReceived && a.unitDamaged <= a.unit) {
                    props.updateReceivedDamagedUnit(
                        {
                            unitReceived: a.unitReceived,
                            unitDamaged: a.unitDamaged,
                            remark: a.remark,
                            units: a.inquiryUnits,
                            userId: props.userId,
                            poSupplierSuppliesId: key,
                            poReceivedInd: true,
                            unitReceiveInd: true
                        },
                        props.row.poSupplierDetailsId,
                        a.suppliesId
                    );
                } else {
                    message.error("Received unit should be less then units !")
                }

                setEditingKey('');
            } else {
                alert("else");
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const result = props.receivedDetailData.filter((item) =>
        item.unitReceiveInd === true && item.grnReceivedInd === false).map((opt) => opt.poSupplierSuppliesId)
    console.log(result)
    const show = props.receivedDetailData.some((item) => item.unitReceiveInd === true && item.grnReceivedInd === false)
    console.log(show)
    const checkall = props.receivedDetailData.every((item) => item.grnReceivedInd === true)
    console.log(checkall)
    const columns = [
        {
            title: "Name",
            dataIndex: "suppliesFullName",
            width: "15%"
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            render: (text, item) => {
                return (
                    <>
                        {item.categoryName} {item.subCategoryName}
                    </>
                )
            },
            width: "9%"
        },
        {
            title: "Attribute",
            render: (text, item) => {
                return (
                    <>
                        {item.attributeName} {item.subAttributeName}
                    </>
                )
            },
            width: "7%"
        },
        {
            title: "Price",
            dataIndex: "price",
            width: "6%"
        },
        {
            title: "Unit",
            dataIndex: "unit",
            width: "6%"
        },
        {
            title: "Received",
            dataIndex: "unitReceived",
            width: "6%",
            editable: true,
        },
        {
            title: "Damaged",
            dataIndex: "unitDamaged",
            width: "6%",
            editable: true,
        },
        {
            title: "Remark",
            dataIndex: "remark",
            width: "6%",
            editable: true,
        },
        {
            title: "Received",
            width: "6%",
            render: (text, item) => {
                return (
                    <>
                        <PoReceiveToggle
                            poSupplierDetailsId={props.row.poSupplierDetailsId}
                            suppliesId={item.suppliesId}
                            poReceivedInd={item.poReceivedInd}

                        />
                    </>
                )
            },
        },

        {
            title: '',
            width: "6%",
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() =>
                                save(record.poSupplierSuppliesId)
                            }
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : record.poReceivedInd && record.grnReceivedInd === false && (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <BorderColorOutlined />
                    </Typography.Link>
                )
            },
        },

    ]
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'remark' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <Form form={form} component={false}>
                <StyledTable
                    rowKey="poSupplierSuppliesId"
                    dataSource={data}
                    scroll={{ y: 320 }}
                    pagination={false}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                />
            </Form>
            <div className=' flex justify-end mt-1'>
                {show && <Button
                    type='primary'
                    onClick={() => props.generateGrnForPo({
                        createGrnNo: result,
                        grnNumber: "",
                        grnReceivedInd: true
                    })}
                >
                    Generate Grn
                </Button>}
            </div>
        </>
    )
}
const mapStateToProps = ({ inventory }) => ({
    receivedDetailData: inventory.receivedDetailData
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getMaterialReceivedDetailData,
        updateReceivedDamagedUnit,
        generateGrnForPo
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedDetailCard);


