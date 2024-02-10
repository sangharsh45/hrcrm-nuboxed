import { Popconfirm, DatePicker, Typography, Input, Form, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getDistributorOrderPayment, updateOrderPayment } from "../../AccountAction";
import { BorderColorOutlined } from "@mui/icons-material";
;

function OrderPaymentTable(props) {

    useEffect(() => {
        props.getDistributorOrderPayment(props.particularRowData.orderId)
    }, [])
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [deliveryDate, setdeliveryDate] = useState(undefined)
    useEffect(() => {
        setData(props.paymentHistory)
    }, [props.paymentHistory])

    const isEditing = (record) => record.paymentId === editingKey;

    function handleDatePickerCahnge(date, dateString) {
        setdeliveryDate(dayjs(dateString).format('YYYY-MM-DD'))
    }
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
        return (
            <td {...restProps}>
                {editing && inputType !== "picker" ? (
                    <Form.Item
                        name={dataIndex}
                        // style={{
                        //     margin: 0,
                        // }}
                        rules={[
                            {
                                required: true,
                                message: `Input required ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : editing && inputType === "picker" ? (
                    <DatePicker format={dateFormat}
                        onChange={(date, dateString) => handleDatePickerCahnge(date, dateString)} />
                ) : (
                    children
                )}
            </td>
        );
    };
    const edit = (record) => {
        form.setFieldsValue({
            paymentAmount: "",
            ...record,
        });
        setEditingKey(record.paymentId);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        // alert("try");
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.paymentId);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, deliveryDate, ...row });
                const a = newData[index];
                let newEndDate =dayjs(a.date).format('YYYY-MM-DD');

                props.updateOrderPayment(
                    {
                        paymentAmount: a.paymentAmount,
                        transactionNumber: a.transactionNumber,
                        paymentId: a.paymentId,
                        date: `${newEndDate}T00:00:00Z`,
                        remarks: a.remarks,
                        docId: a.docId,
                        orderCurrencyId: a.orderCurrencyId,
                        orderPaymentType: a.orderPaymentType,
                        paymentMode: a.paymentMode,
                        userId: a.userId,
                        orderId: props.particularRowData.orderId
                    },
                    key,
                    a.indentId,

                );

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

    const columns = [
        {
            title: "",
            width: "1%"
        },
        {
            title: "Transaction #",
            width: "13%",
            dataIndex: "transactionNumber",
        },
        {
            title: "Created By",
            width: "10%",
            dataIndex: "salesExecutive",
        },
        {
            title: "Entry",
            width: "11%",
            dataIndex: "date",
            render: (name, item, i) => {
                return (
                    <>{dayjs(item.date).format("DD-MM-YY")}</>
                );
            }
        },
        {
            title: "Amount",
            width: "8%",
            dataIndex: "paymentAmount",
            render: (name, item, i) => {
                return (
                    <>{item.paymentAmount} {item.orderCurrencyName}</>
                );
            },
            editable: true
        },

        {
            title: "Mode",
            dataIndex: "paymentModeName",
            width: "7%",
        },
        {
            title: "Reason",
            dataIndex: "remarks",
            width: "12%",
        },
        {
            title:"Approved By",
            dataIndex:"approveByName",
            width:"18%",
            render: (text, item) => {
                const approvedname = item.approveByName;
                const approvedDate =dayjs(item.approveDate).format('YYYY-MM-DD');
                return (
                  <>
                     {item.approveByFinanceInd===true ?(
                        <div class="flex">
                            <span class="text-green-700">
                            {approvedname} on 
                            </span>
                            &nbsp;
                            <span class="text-green-700"> {approvedDate}</span>
                           
                            </div>
                    ):"No Data"}
                  </>
                );
              },

        },
        {
            title: '',
            dataIndex: 'operation',
            width: "6%",
            render: (_, record) => {
            
                const editable = isEditing(record);
               
                return editable ? (
                    
                    <span>
                        
                        <Typography.Link
                            onClick={() =>
                                save(record.paymentId)
                                // alert("Save success")
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
                ) :
               
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                     {record.approveByFinanceInd===false && (
                        <BorderColorOutlined  className="text-base"/>
                     )}
                    </Typography.Link>
                

            },
        },

    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'paymentAmount' ? 'number' : 'picker',
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
                        key="id"
                        dataSource={data}
                        pagination={false}
                        scroll={{ y: 200 }}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={mergedColumns}
                        loading={props.fetchingPaymentHistory}
                        rowClassName="editable-row"
                        sticky={true}
                    />
                </Form>
            )}
        </>
    );
}


const mapStateToProps = ({ distributor, }) => ({
    paymentHistory: distributor.paymentHistory,
    fetchingPaymentHistory: distributor.fetchingPaymentHistory
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorOrderPayment,
            updateOrderPayment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);



