import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Popconfirm, Button, Form,Typography } from "antd";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getProductbuilder,addProductBuilder,handleDiscountModal,handleOfferModal } from "../../ProductAction";
import { EditOutlined } from "@ant-design/icons";
import { Select } from "../../../../Components/UI/Elements";
import ProductDiscountModal from "./ProductDiscountModal";
import ProductOfferModal from "./ProductOfferModal";

const { Option } = Select;
const ButtonGroup = Button.Group;

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
          {editing && inputType === "picker"  ? (
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
          ) : editing && inputType !== "picker" ? (
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
          <Select>
            {["USD", "EURO","GBP","INR"].map((item) => {
              return <Option value={item}>{item} </Option>;
            })}
          </Select>
        </Form.Item>
    ):(
              children
          )}
      </td>
  );
};

function ProductbuilderTable (props) {

  useEffect(()=> {
    props.getProductbuilder();
  },[]);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
      setData(props.productBuilder)
  }, [props.productBuilder])

  const isEditing = (record) => record.suppliesId === editingKey;

  const edit = (record) => {
      form.setFieldsValue({
          quantity: '',
          subCategoryName: '',
          categoryName: '',
          attributeName: '',
         
          ...record,
      });
      setEditingKey(record.suppliesId);
  };

  const cancel = () => {
      setEditingKey('');
  };
  const save = async (key) => {
      try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.suppliesId);
          if (index > -1) {
              // alert("if");
              const item = newData[index];
              console.log(item)
              newData.splice(index, 1, { ...item, ...row });
              const a = newData[index];
              
                  props.addProductBuilder(
                      {
                          quantity: a.quantity,
                          subCategoryName: a.subCategoryName,
                          categoryName: a.categoryName,
                          attributeName: a.attributeName,
                          subAttributeName:a.subAttributeName,
                          suppliesId: a.suppliesId,
                          productId:props.particularDiscountData.productId,
                          creationDate:a.creationDate,
                          suppliesName:a.name,
                      }, 
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
        title: "",
        dataIndex: "",
        width: "2%",
      },
      {
        title: "Country",
        dataIndex: "country",
        width: "15%",

      },
      {
        title: "Price(B2B)",
        dataIndex: "price",
        width: "15%",
      },
      {
        title: "Price(B2C)",
        dataIndex: "price",
        width: "15%",
      },
       {
            title: "VAT",
            dataIndex: "VAT",

        },
        {
            title: "",
            width: "12%",
            render: (name, item, i) => {
                return (
                    
                                  <Button
                  type="primary"
                  shape="round"
                  style={{
                    backgroundColor: "teal",
                    // backgroundColor: "Yellow",
                    fontSize: "11px",
                  }}
                  onClick={() => {
                    props.handleDiscountModal(true);
                    // handleParticularRowData(item);
                  }}
                >
                  Discount
                </Button>            
                )          
            },
        },
        {
            title: "",
            width: "12%",
            render: (name, item, i) => {
                return (
                   
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: "Tomato",
                                        color: "white",
                                        fontSize: "11px",
                                    }}
                                    onClick={() => {
                                        handleOfferModal(true);
                                        // handleParticularRowData(item);
                                    }}
                                >
                                    Offer
                                </Button>
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
                            save(record.suppliesId)
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
            ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <EditOutlined />
                </Typography.Link>
            )
        },
    },
    ];
const tab = document.querySelector(".ant-layout-sider-children");
const tableHeight = tab && tab.offsetHeight - 200;
const mergedColumns = columns.map((col) => {
  if (!col.editable) {
      return col;
  }

  return {
      ...col,
      onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'currency1' ? 'text' : 'picker',
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
            rowKey="suppliesId"
            // columns={columns}
            dataSource={data}
            loading={props.fetchingProductBuilder}
            pagination={false}
            scroll={{ y: tableHeight }}
            components={{
              body: {
                  cell: EditableCell,
              },
          }}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
</Form>
<ProductDiscountModal
                addDiscountModal={props.addDiscountModal}
                handleDiscountModal={props.handleDiscountModal}
                // particularDiscountData={particularDiscountData}
            />
            <ProductOfferModal
                addProductOfferModal={props.addProductOfferModal}
                handleOfferModal={props.handleOfferModal}
                // particularDiscountData={particularDiscountData}
            />
          
           
    

    </>
);
}

const mapStateToProps = ({product }) => ({
    productBuilder: product.productBuilder,
    fetchingProductBuilder: product.fetchingProductBuilder,
    addDiscountModal: product.addDiscountModal,
    addProductOfferModal: product.addProductOfferModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductbuilder,
            addProductBuilder,
            handleDiscountModal,
            handleOfferModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);