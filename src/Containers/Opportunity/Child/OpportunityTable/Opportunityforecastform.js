import React, { useContext, useEffect, useRef, useState } from "react";
import { addOpportunityForecast } from "../../OpportunityAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getLibrarys } from "../../../Settings/Library/LibraryAction";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
const { Option } = Select;

const Opportunityforecastform = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, []);

  const backendData = props.opportunityForecast;
  useEffect(() => {
    const data = backendData.map((item, i) => {
      return { ...item, key: i + 1 };
    });
    setDataSource(data);
  }, []);
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {title === "Year" ? (
            <Select
              ref={inputRef}
              style={{
                width: 70,
              }}
              onChange={save}
            >
              <Option value={"2023"}>2023</Option>
              <Option value={"2022"}> 2022</Option>
              <Option value={"2021"}> 2021</Option>
              <Option value={"2020"}> 2020</Option>
              <Option value={"2019"}> 2019</Option>
            </Select>
          ) : title === "Value" ? (
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          ) : title === "Month" ? (
            <Select
              ref={inputRef}
              style={{
                width: 70,
              }}
              onChange={save}
            >
              <Option value="Jan"> Jan</Option>
              <Option value="Feb"> Feb</Option>
              <Option value="Mar"> Mar</Option>
              <Option value="Apr"> Apr</Option>
              <Option value="May"> May</Option>
              <Option value="Jun"> Jun</Option>
              <Option value="Jul"> Jul</Option>
              <Option value="Aug"> Aug</Option>
              <Option value="Sep"> Sep</Option>
              <Option value="Oct"> Oct</Option>
              <Option value="Nov"> Nov</Option>
              <Option value="Dec"> Dec</Option>
            </Select>
          ) : title === "Skill" ? (
            <Select
              ref={inputRef}
              style={{
                width: 100,
              }}
              onChange={save}
            >
              {props.librarys.map((item) => {
                return <Option value={item.definationId}>{item.name} </Option>;
              })}
            </Select>
          ) : null}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const handleDelete = (key, id) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    console.log(key, id);
  };
  const defaultColumns = [
    {
      title: "Skill",
      dataIndex: "skillName",
      width: "30%",
      editable: true,
    },

    {
      title: "Value",
      dataIndex: "noOfPosition",
      width: "15%",
      editable: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      editable: true,
    },
    {
      title: "Month",
      dataIndex: "month",
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Button
              type="primary"
              style={{
                marginBottom: 16,
              }}
              onClick={() =>
                handleBackendCall(record.key, record.opportunityForecastLinkId)
              }
            >
              Save
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() =>
                handleDelete(record.key, record.opportunityForecastLinkId)
              }
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      noOfPosition: ``,
      year: "",
      month: ``,
      skillName: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const handleBackendCall = (key, opportunityForecastLinkId) => {
    console.log(key);
    const newData = dataSource.filter(
      (item) => item.opportunityForecastLinkId === opportunityForecastLinkId
    );
    console.log(newData);

    const a = newData[0];
    console.log(a);

    props.addOpportunityForecast(
      {
        noOfPosition: a.noOfPosition,
        month: a.month,
        year: a.year,
        skill: a.skillName,
        opportunityId: props.item.opportunityId,
        orgId: props.organizationId,
        userId: props.userId,
      }
      // key,
      // a.sequenceId
    );
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add Skills
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, opportunity, librarys, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  opportunityForecast: opportunity.opportunityForecast,
  selectingOpportunity: opportunity.selectingOpportunity,
  selectingOpportunityError: opportunity.selectingOpportunityError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunityForecast,
      getLibrarys,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Opportunityforecastform);
