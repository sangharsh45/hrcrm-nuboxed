import React, { useContext, useEffect, useRef, useState } from "react";
// import "./index.css";
import { addSequence,getSequence ,getSequenceDetail,handleCAndidateSequenceModal} from "../../../../Settings/SettingsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  Icon, Tooltip } from "antd";
  // import {getLibrarys} from "../../../Settings/Library/LibraryAction";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import AddCandidateSequenceModal from "./AddCandidateSequenceModal";
import DiamondIcon from '@mui/icons-material/Diamond';
const { Option } = Select;

const Sequenceform = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [currentSequenceData,setCurrentSequenceData]= useState([]);
  const [count, setCount] = useState(0);
    useEffect(() => {
      props.getSequence(props.organizationId)  
    // props.getLibrarys(props.organizationId);
    // props.getDepartmentList()
}, [])


function handlesetCurrentSequenceData(item){
  setCurrentSequenceData(item)
}

const backendData=props.sequence
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
      [dataIndex]: record[dataIndex]
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values
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
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        {title === "Name" ? (
    
    <Input ref={inputRef} 
    onPressEnter={save}
     onBlur={save}
      />
        ) :title === "Type" ? (
          <Select
          ref={inputRef}
          style={{
            width: 70
          }}
        onChange={save}
         >
           <Option value={"Mail"} >Mail</Option>
                  <Option value={"Call"} > Call</Option>
                  <Option value={"Whatsapp"} > Whatsapp</Option>
         </Select>
        ):title === "Days" ? (
          <Input ref={inputRef} 
          onPressEnter={save} 
          onBlur={save}
           />
      ) :
                   null}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
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
      title: "Name",
      dataIndex: "name",
     width: "30%",
     editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "30%",
      editable: true,
    },
    {
      title: "Days",
      dataIndex: "noOfDays",
           width: "30%",
           editable: true,
    },
    {
      width: "8%",
        render: (name, item, i) => { 
          // const data1= item.currency
          return (
            <>
              {/* {item.billing} {item.currency} */}
              <Tooltip title="">
              <span
               onClick={() => {
               props.handleCAndidateSequenceModal(true);
              //  handlesetCurrentSequenceId(item.sequenceId);
               props.getSequenceDetail(item.sequenceId)
     handlesetCurrentSequenceData(item)
              
             }}
              >
              <DiamondIcon style={{fontSize:"1.3em"}} 
              // icon={solid("diamond-turn-right")}
               />
            </span>
            </Tooltip>
            </>
          );
        },
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
                marginBottom: 16
              }}
              onClick={() => handleBackendCall(record.key, record.sequenceId)}
            >
              Save
            </Button>
            <Popconfirm
              title="Do you want to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(record.key, record.sequenceId)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null
    }
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      //sequenceId:"",
      name:"",
      priority:"",
      type:"",
      noOfDays:"",
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
      ...row
    });
    setDataSource(newData);
  };
  const handleBackendCall = (key, sequenceId) => {
    console.log(key);
    const newData = dataSource.filter((item) => item.sequenceId === sequenceId);
    console.log(newData);
   
    const a=newData[0]
     console.log(a);

    
    props.addSequence(
                         {
                          // ...values,
                          type: a.selectedType,
                          priority: a.priority,
                          name:a.name,
                          orgId:props.organizationId,
                          noOfDays:a.noOfDays,
                          },
                          props.organizationId,
              // resetForm ()
                        );
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
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
         handleSave
      })
    };
  });
  return (
    <>
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16
        }}
      >
        Add Sequence
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
    <AddCandidateSequenceModal
sequenceDetail={props.sequenceDetail}
item={currentSequenceData}
handleCAndidateSequenceModal={props.handleCAndidateSequenceModal}
candidateSequenceModal={props.candidateSequenceModal}
/>
    </>
  );

};



 const mapStateToProps = ({ auth, settings, librarys, customer }) => ({

      addingSequence: settings.addingSequence,
  addingSequenceError: settings.addingSequenceError,  
      sequence: settings.sequence, 
      sequenceDetail:settings.sequenceDetail,
  organizationId: auth.userDetails.organizationId,
  candidateSequenceModal:settings.candidateSequenceModal,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
       
       getSequence,
      addSequence,
      handleCAndidateSequenceModal,
      getSequenceDetail
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sequenceform);






// import React from "react";
// import { Formik, Form, Field, FastField } from "formik";
// import { Button, Icon, Tooltip } from "antd";
// import { FormattedMessage } from "react-intl";
// import { StyledLabel, Spacer } from "../../../../../Components/UI/Elements";
// import { FlexContainer } from "../../../../../Components/UI/Layout";
// import { addSequenceLeads } from "../../../RulesAction";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { addSequence,getSequence } from "../../../../Settings/SettingsAction";
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import { ExclamationCircleOutlined, MailOutlined } from "@ant-design/icons";
// class SequenceForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       priority: "High",
//       selectedType: "LinkedIn post",
//     };
//   }
//   handleButtonClick = (type) => {
//     this.setState({
//       priority: type,
//     });
//   };
//   handleTypeChange = (type) => {
//     this.setState({
//       selectedType: type,
//     });
//   };
//   handleReset = (resetForm) => {
//     // const {callback}=this.props;
//     // callback && callback();
//     resetForm();
//   };
//   render() {
//     const { isEditing, prefillTask, addSequence, addingSequence } = this.props;
//     return (
//       <>
//         <Formik
//           initialValues={{
//             name: "",
//             // type:"",
//             // pageName: "Contact Us",
//             taskDays: "",
//             type: this.state.selectedType,
//             priority: this.state.priority,
//             // type: "Task",
//             noOfDays:"",
//           }}
//           onSubmit={(values, { resetForm }) => {
//             this.props.addSequence(
//               {
//                 ...values,
//                 type: this.state.selectedType,
//                 priority: this.state.priority,
//               },
//               this.props.orgId,
//               resetForm ()
//             );
//           }}
//         >
//           {({
//             errors,
//             touched,
//             isSubmitting,
//             setFieldValue,
//             setFieldTouched,
//             values,
//             ...rest
//           }) => (
//             <Form>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginTop: "2%",
//                   marginBottom: "3%",
//                 }}
//               >
//                 <div style={{ width: "33%", marginRight: "2%" }}>
//                   <Field
//                     isRequired
//                     name="name"
//                     label="Name"
//                     component={InputComponent}
//                     isColumn
//                     width={"100%"}
//                     inlineLabel
//                     style={{
//                       flexBasis: "60%",
//                       // height: "33px",
//                       // marginTop: "4px",
//                     }}
//                   />
//                 </div>

//                 <FlexContainer
//                   justifyContent="spcae-between"
//                   style={{ width: "100%" }}
//                 >
//                   <div style={{ width: "25%" }}>
//                   <FlexContainer
//                         justifyContent="spcae-between"
//                         style={{ width: "100%" }}
//                       >
//                         <div style={{ width: "100%" }}>
//                           <StyledLabel>
//                             {/* Priority */}
//                             <FormattedMessage
//                               id="app.priority"
//                               defaultMessage="Priority"
//                             />
//                           </StyledLabel>
//                           <FlexContainer>
//                           <Tooltip title="High">
//                               <Button
//                                 type="primary"
//                                 shape="circle"
//                                 icon={
//                                   <ExclamationCircleOutlined
//                                   />
//                                 }
//                                 onClick={() => this.handleButtonClick("High")}
//                                 style={{
//                                   backgroundColor:
//                                     this.state.priority === "High"
//                                       ? "red"
//                                       : "white",
//                                 }}
//                               />
//                             </Tooltip>
//                             &nbsp;
//                             <Tooltip title="Medium">
//                               <Button
//                                 type="primary"
//                                 shape="circle"
//                                 icon={
//                                   <ExclamationCircleOutlined
//                                   />
//                                 }
//                                 onClick={() => this.handleButtonClick("Medium")}
//                                 style={{
//                                   backgroundColor:
//                                     this.state.priority === "Medium"
//                                       ? "Orange"
//                                       : "white",
//                                 }}
//                               />
//                             </Tooltip>
//                             &nbsp;
//                             <Tooltip title="Low">
//                               <Button
//                                 type="primary"
//                                 shape="circle"
//                                 icon={
//                                   <ExclamationCircleOutlined
//                                   />
//                                 }
//                                 onClick={() => this.handleButtonClick("Low")}
//                                 style={{
//                                   backgroundColor:
//                                     this.state.priority === "Low"
//                                       ? "teal"
//                                       : "white",
//                                 }}
//                               ></Button>
//                             </Tooltip>
//                           </FlexContainer>
//                         </div>
//                       </FlexContainer>
//                   </div>
//                   <div style={{ width: "42%", marginLeft: "1%" }}>
//                     <FlexContainer
//                       justifyContent="space-between"
//                       style={{ width: "100%" }}
//                     >
//                       <div
//                        style={{ width: "65%" }}
//                        >
//                         <StyledLabel>Type</StyledLabel>

//                         <FlexContainer
//                           justifyContent="space-between"
//                           style={{ width: "100%", marginTop: "3px" }}
//                         >
//                           <Tooltip title="Mail">
//                             <div
//                               onClick={() => this.handleTypeChange("Mail")}
//                               style={{
//                                 fontSize: "20px",
//                                 cursor: "pointer",
//                                 color:
//                                   this.state.selectedType === "Mail"
//                                     ? "Orange"
//                                     : null,
//                               }}
//                             >
//                               <MailOutlined 
//                               type="mail"
//                               />
//                             </div>
//                           </Tooltip>

//                           <Tooltip title="Call">
//                             <div
//                               onClick={() => this.handleTypeChange("Call")}
//                               style={{
//                                 fontSize: "20px",
//                                 cursor: "pointer",
//                                 color:
//                                   this.state.selectedType === "Call"
//                                     ? "Orange"
//                                     : null,
//                               }}
//                             >
//                               <FontAwesomeIcon icon={solid('phone')} />
//                             </div>
//                           </Tooltip>

//                           <Tooltip title="Whatsapp">
                            
//                              <span
//                               onClick={() => this.handleTypeChange("Whatsapp")}
//                               style={{
//                                 fontSize: "20px",
//                                 cursor: "pointer",
//                                 color:
//                                   this.state.selectedType === "Whatsapp"
//                                     ? "Orange"
//                                     : null,
//                               }}
//                             >
//                               {/* <FontAwesomeIcon icon={brands('whatsapp')} /> */}
//                               <FontAwesomeIcon icon={brands("whatsapp")} />
//                               </span>
                            
                            
//                           </Tooltip>
//                         </FlexContainer>
//                       </div>
//                     </FlexContainer>
//                   </div>
//                   &nbsp;&nbsp;&nbsp;
//                   <div style={{ width: "20%" }}>
//                     <Field
//                       isRequired
//                       name="noOfDays"
//                       label="Days"
//                       component={InputComponent}
//                       isColumn
//                       width={"100%"}
//                       inlineLabel
//                       style={{
//                         flexBasis: "60%",

//                       }}
//                     />
//                   </div>
//                 </FlexContainer>
//               </div>
//               <Spacer />
//               <FlexContainer justifyContent="flex-end">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={this.props.addingSequence}
//                 >
//                   Submit
//                 </Button>
//               </FlexContainer>
//             </Form>
//           )}
//         </Formik>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ rule, settings, auth }) => ({
//   addingSequence: settings.addingSequence,
//   // user: auth.userDetails,
//   orgId: auth.userDetails.organizationId,
//   sequence: settings.sequence,
//   addingSequence: settings.addingSequence,
//   addingSequenceError: settings.addingSequenceError,  
//   fetchingSequence: settings.fetchingSequence,
//   fetchingSequenceError: settings.fetchingSequenceError,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       //  addSequenceLeads,
//       getSequence,
//       addSequence,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(SequenceForm);




