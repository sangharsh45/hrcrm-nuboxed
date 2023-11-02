import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Button, Form, Input, Popconfirm, Tooltip, Typography } from "antd";
import {
  getDistributorOrderByDistributorId,
  handleInventoryLocationInOrder,
  handlePauseButtonModal,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  updateOfferPrice,
  handlePaidModal
} from "./AccountAction";
import moment from "moment";
// import AddInventoryOrderModal from "./AddInventoryInOrderModal";
// import AddNotesOrderModal from "./AddNotesOrderModal";
// import PauseButtonModal from "./PauseButtonModal";
// import StatusOfOrderModal from "./StatusOfOrderModal";
import { EuroCircleFilled, StarTwoTone, StepForwardFilled } from "@ant-design/icons";
// import PaidButtonModal from "./PaidButtonModal";

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

function AccountOrderTable(props) {
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }


  useEffect(() => {
    props.getDistributorOrderByDistributorId(props.distributorId);
  }, [props.distributorId]);

  const handleCallBack = () => {
    props.getDistributorOrderByDistributorId(props.distributorId);
  }
  const { user } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    setData(props.distributorOrder)
  }, [props.distributorOrder])

  const isEditing = (record) => record.orderId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      offerPrice: "",
      ...record,
    });
    setEditingKey(record.orderId);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.orderId);
      if (index > -1) {
        // alert("if");
        const item = newData[index];
        console.log(item)
        newData.splice(index, 1, { ...item, ...row });
        const a = newData[index];
        console.log(props.quotationId);
        props.updateOfferPrice(
          {
            offerPrice: a.offerPrice,
            orderPhoneId: a.orderId,
            expectedPrice: 0,
            customerPriceInd: true
          },
          a.orderId,
          props.distributorId,
        );
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
  const columns = [
    {
      width: "1%"
    },
    {
      // title: "Priority",
      dataIndex: "priority",
      width: "4%",
      render: (name, item, i) => {
        //debugger;
        return (
          <div>
            {item.priority === "High" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "1.5625em",
                  width: "1.5625em",
                  backgroundColor: "red",
                }}
              ></div>
            )}
            {item.priority === "Medium" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "1.5625em",
                  width: "1.5625em",
                  backgroundColor: "orange",
                }}
              ></div>)}
            {item.priority === "Low" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "1.5625em",
                  width: "1.5625em",
                  backgroundColor: "teal",
                }}
              ></div>)}
          </div>
        )
      }
    },
    {
      title: "Order No",
      dataIndex: "newOrderNo",
      width: "12%",
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <span
              style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
              onClick={() => {
                handleSetParticularOrderData(item);
                props.handlePauseButtonModal(true);
              }}
            >{item.newOrderNo}</span>
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
      // render: (text, item) => {
      //   const currentdate = moment().format("DD/MM/YYYY");
      //   const date = moment(item.creationDate).format("DD/MM/YYYY");
      //   return {
      //     props: {
      //       style: {
      //         background:
      //           (showPayment || show || showHistory) && orderId === item.orderId
      //             ? "rgb(158 183 223)"
      //             : null,
      //       },
      //     },
      //     children: (
      //       <span
      //         onClick={() => {
      //           handleOrder(item.orderId);
      //           handleSetParticularOrderData(item);
      //         }}
      //         style={{
      //           textDecoration: "underline",
      //           color: show && item.orderId === orderId ? "orange" : "#1890ff",
      //           color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
      //           fontWeight: item.orderStatus === "Completed" ? "bold" : null,
      //           cursor: "pointer",
      //         }}
      //       >{`${item.orderId} `}

      //         &nbsp;&nbsp;
      //         {date === currentdate ? (
      //           <span
      //             style={{
      //               color: "tomato",
      //               fontWeight: "bold",
      //             }}
      //           >
      //             New
      //           </span>
      //         ) : null}
      //       </span>
      //     ),
      //   };
      // },
    },
    {
      title: "Created",
      dataIndex: "creationDate",
      width: "18%",
      sorter: (a, b) => {
        var nameA = a.creationDate; // ignore upper and lowercase
        var nameB = b.creationDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: `${item.userName} on ${moment(item.creationDate).format("DD-MM-YY")}`,
        };
      },
    },
    {
      title: "Location",
      width: "12%",
      render: (text, item) => {
        return (
          <>{item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}</>
        )
      }
    },
    {
      title: "Phones#",
      dataIndex: "count",
      width: "8%",

    },
    {
      title: "Awb",
      dataIndex: "awbNo",
      width: "8%",
    },
    {
      title: "Contact",
      dataIndex: "contactPersonName",
      width: "11%",
    },
    {
      title: "Expected Price",
      dataIndex: "expectedPrice",
      width: "12%",
    },
    {
      title: "Final Price",
      dataIndex: "suggestedPrice",
      width: "10%",
    },
    {
      title: "Revised Price",
      dataIndex: "offerPrice",
      editable: true,
      width: "10%",
    },
    {
      title: '',
      width: "7%",
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() =>
                save(record.orderId)

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
        ) : record.qcStartInd === 3 ?
          (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
           
          </Typography.Link>)
          : null
      },
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Notes">
            <div
              style={{ cursor: "pointer", fontSize: "13px" }}
              onClick={() => {
                handleSetParticularOrderData(item);
                props.handleNotesModalInOrder(true);
              }}
            />

          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "3%",
      render: (text, item) => {
        return (
          <>
            {/* <FontAwesomeIcon icon="fas fa-stream" /> */}
            <StepForwardFilled
              onClick={() => {
                props.handleStatusOfOrder(true);
                handleSetParticularOrderData(item);
              }}
            />
          </>
        )
      }
    },
    {
      title: "",
      width: "3%",
      render: (text, item) => {
        return (
          <>
            <EuroCircleFilled
              onClick={() => {
                props.handlePaidModal(true);
                handleSetParticularOrderData(item);
              }}
            // style={{ color: "blue" }}
            />
          </>
        )
      }
    },
    {
      title: "",
      width: "16%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {item.transferInd === 0 ? (
              <Tooltip title="Add Inventory Location">
                <Button
                  style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white" }}
                  onClick={() => {
                    handleSetParticularOrderData(item);
                    props.handleInventoryLocationInOrder(true);
                  }}
                >
                  Order Pickup
                </Button>
              </Tooltip>

            ) : null
            }
          </>
        );
      },
    },
    {
      width: "5%",
      render: (text, item) => {
        return (
          <>
            <Tooltip title="Rating">
              <StarTwoTone />
            </Tooltip>
          </>
        )
      }
    },
    {
      width: "5%",
      render: (text, item) => {
        return (
          <>
            <Tooltip title="Feedback">
             
            </Tooltip>
          </>
        )
      }
    },
  ];
  // if (props.fetchingDistributorByDistributorIdError) {
  //   return <APIFailed />;
  // }
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

      {true && (
        <Form form={form} component={false}>
          <StyledTable
            rowKey="orderId"
            dataSource={data}
            scroll={{ y: 320 }}
            pagination={false}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            loading={props.fetchingDistributorByDistributorId}
            columns={mergedColumns}
            sticky={true}
            rowClassName="editable-row"
          />
        </Form>)}
      {/* <AddInventoryOrderModal
        particularRowData={particularRowData}
        addInventoryInOrder={props.addInventoryInOrder}
        handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
      /> */}
      {/* <PauseButtonModal
        particularRowData={particularRowData}
        handlePauseButtonModal={props.handlePauseButtonModal}
        addPauseButtonModal={props.addPauseButtonModal}
      /> */}
      {/* <AddNotesOrderModal
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      /> */}
      {/* <StatusOfOrderModal
        handleStatusOfOrder={props.handleStatusOfOrder}
        addStatusOfOrder={props.addStatusOfOrder}
        particularRowData={particularRowData}
      /> */}
      {/* <PaidButtonModal
        addPaidButtonModal={props.addPaidButtonModal}
        handlePaidModal={props.handlePaidModal}
        particularRowData={particularRowData}
      /> */}
    </>
  );
}

const mapStateToProps = ({ auth, distributor }) => ({
  distributorOrder: distributor.distributorOrder,
  user: auth.userDetails,
  addPaidButtonModal: distributor.addPaidButtonModal,
  role: auth.userDetails.role,
  userId: auth.userDetails.userId,
  addInventoryInOrder: distributor.addInventoryInOrder,
  addPauseButtonModal: distributor.addPauseButtonModal,
  fetchingDistributorByDistributorId: distributor.fetchingDistributorByDistributorId,
  addNotesInOrder: distributor.addNotesInOrder,
  addStatusOfOrder: distributor.addStatusOfOrder
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderByDistributorId,
      handleInventoryLocationInOrder,
      handlePauseButtonModal,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      updateOfferPrice,
      handlePaidModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOrderTable);
