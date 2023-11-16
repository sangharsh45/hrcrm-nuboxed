import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Popconfirm, Form, Input, Typography, Button, Space, DatePicker,Tooltip} from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Spacer } from "../../../../Components/UI/Elements";
import {
    getAlLocshift,
} from "./LocationAction";
import { CurrencySymbol } from "../../../../Components/Common";
import { Select } from "../../../../Components/UI/Elements";

const { Option } = Select;
const ButtonGroup = Button.Group;

function ALoctionTable(props) {
    useEffect(() => {
        props.getAlLocshift(props.storedLoc.locationDetailsId);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => {
                        //   this.searchInput = node;
                        // }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 240, marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    // setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        };
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
    }

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.skillSetDetailsId === editingKey;
  
    useEffect(() => {
      setData(dataSourcef)
    }, [dataSourcef])
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
                  <Select>
                    {/* {props.topicsByCandidateId.map((item) => { */}
                      {/* return */}
                       {/* <Option value={item.skillSetDetailsId}>{item.skillName} </Option>; */}
                       <Option value="xyz">XYZ</Option>;
                    {/* })} */}
                  </Select>
                </Form.Item>
                ) :editing && inputType === "picker" ?(
                  <Form.Item
                  name={dataIndex}
                  style={{
                    margin: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: `Please Input ${title}!`
                    }
                  ]}
                >
                  
                {inputNode}
                  </Form.Item>
                        ) :(
                            children
                          )}
                      </td>
                    );
                  };
                  const edit = (record) => {
                    form.setFieldsValue({
                      skillSetDetailsId: "",
                      shiftName: "",
                      ...record,
                    });
                    setEditingKey(record.skillSetDetailsId);
                  };
                
                  const cancel = () => {
                    setEditingKey('');
                  };
                  const save = async (key) => {
                    // alert("Hello")
                    try {
                      // alert("Try")
                      const row = await form.validateFields();
                      const newData = [...data];
                      const index = newData.findIndex((item) => key === item.skillSetDetailsId);
                      // //console.log(item.orderId)
                      // //console.log(newData)
                      if (index > -1) {
                        // alert("if");
                        const item = newData[index];
                        //console.log(item)
                        newData.splice(index, 1, { ...item, ...row });
                        const a = newData[index];          
                        props.updateExperienceByCandidateId(
                          {
                            skillSetDetailsId: a.skillSetDetailsId,
                            shiftName: a.shiftName,
                            // candidateId: a.candidateId,
                          },
                          key,
                          a.skillSetDetailsId
                        );
                        setEditingKey('');
                
                      } else {
                        alert("else");
                        // newData.push(row);
                        setData(newData);
                        setEditingKey('');
                
                      }
                    } catch (errInfo) {
                     
                    }
                  };
                  const dataSourcef = [
                    {
                      key: '1',
                      userName: 'Mike',
                      age: 32,
                      shiftName: '10 Downing Street',
                    },
                    {
                      key: '2',
                      userName: 'John',
                      age: 42,
                      shiftName: '10 Downing Street',
                    },
                  ];
    const columns = [
        {
            title: "",
            width: "2%",
        },
        {
            title: "Name",
            width: "15%",
            dataIndex: "userName",
            // defaultSortOrder: "descend",
            // ...getColumnSearchProps("shiftName"),
            // render: (text, item) => {
            //     const currentdate = moment().format("DD/MM/YYYY");
            //     const date = moment(item.creationDate).format("DD/MM/YYYY");
            //     return {

            //         children: (
            //             <Badge size="small" count={item.productNum}>
            //                 <span
            //                     onClick={() => {
            //                         handleOrder(item.orderId);
            //                         handleSetParticularOrderData(item);
            //                     }}

            //                 >{`${item.shiftName} `}

            //                     &nbsp;&nbsp;
            //                     {date === currentdate ? (
            //                         <span
            //                             style={{
            //                                 color: "tomato",
            //                                 fontWeight: "bold",
            //                             }}
            //                         >
            //                             New
            //                         </span>
            //                     ) : null}
            //                 </span>
            //             </Badge>
            //         ),
            //     };
            // },
        },
        {
            title: "Shift",
            dataIndex: "shiftName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("shift"),
            width: "18%",
        },
        {
            title: "Effective",
            dataIndex: "contactPersonName",
            defaultSortOrder: "descend",
            ...getColumnSearchProps("contactPersonName"),
            width: "18%",
        },
       
        {
            title: '',
            dataIndex: 'operation',
            width: "12%", 
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link
                    onClick={() =>
                      save(record.skillSetDetailsId)
                    }
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                    </Typography.Link>
                  <Popconfirm title="Sure to cancel?"
                    onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) :
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                   <EditOutlined/>
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
            inputType: col.dataIndex === 'shiftName' ? 'text' : 'picker',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      }); 

    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 200;

    return (
        <>
         <Form form={form} component={false}>
            <StyledTable
                rowKey="orderId"
                // columns={columns}
                dataSource={dataSourcef}
                loading={props.fetchingAlLocShift}
                scroll={{ y: tableHeight }}
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
          
        </>
    );
}

const mapStateToProps = ({ location, auth }) => ({
    alLocShift: location.alLocShift,
    fetchingAlLocShift: location.fetchingAlLocShift,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLocshift,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ALoctionTable);
