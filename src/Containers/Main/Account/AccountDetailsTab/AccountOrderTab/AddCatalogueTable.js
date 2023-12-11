import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd'
import { BorderColorOutlined } from '@mui/icons-material'
import { getAllProductList } from "../../AccountAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Input, Popconfirm, Typography } from 'antd'
import { saveUnitForCatalogueItem } from "../../AccountAction"

const AddCatalogueTable = (props) => {

    useEffect(() => {
        props.getAllProductList()
    }, [])


    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(props.allProduct)
    }, [props.allProduct])

    const isEditing = (record) => record.boqId === editingKey;
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
        const dateFormat = "MM/DD/YYYY";
        const inputNode = <Input />;
        console.log(inputType)
        return (
            <td {...restProps}>
                {editing && inputType !== "picker" ? (
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
    const edit = (record) => {
        form.setFieldsValue({
            units: '',
            ...record,
        });
        setEditingKey(record.boqId);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        // alert("try");
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.boqId);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, ...row });
                const a = newData[index];
                props.saveUnitForCatalogueItem(
                    {
                        unit: a.unit,
                        type: props.toggle ? "Catalogue" : "Non-Catalogue"
                    },
                )
                setEditingKey('');
            } else {
                alert("else");
                // newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
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
            editable: true,
            dataIndex: "unit"
        },
        {
            title: '',
            width: "10%",
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() =>
                                save(record.boqId)
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
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <BorderColorOutlined style={{ cursor: "pointer", color: "blue", fontSize: "1rem" }} />
                    </Typography.Link>
                )
            },
        },

    ];
    const mergedColumns = column.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'units' ? 'number' : 'picker',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            {true && (
                <Form form={form} component={false}>
                    <StyledTable
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        rowKey="boqId"
                        dataSource={data}
                        pagination={false}
                        scroll={{ y: 500 }}
                        loading={props.fetchingNonStandardIndentData}
                    />
                </Form>
            )}
        </>
    )
}

const mapStateToProps = ({ distributor }) => ({
    allProduct: distributor.allProduct
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getAllProductList,
    saveUnitForCatalogueItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueTable);

