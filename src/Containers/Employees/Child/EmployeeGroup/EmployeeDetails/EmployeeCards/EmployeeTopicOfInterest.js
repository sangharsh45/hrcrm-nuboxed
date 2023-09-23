
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, Icon } from "antd";
import {
  getLibrarys,
} from "../../../../../Settings/Library/LibraryAction";
import { ViewEditCard, Title } from "../../../../../../Components/UI/Elements";
import {
  addTopicByUserId,
  getTopicsByUserId,
  deleteTopicByUserId,
} from "../../../../../Employees/EmployeeAction";
import {
  EyeInvisibleOutlined, PlusOutlined,
  
  
} from '@ant-design/icons';
import EmployeeSelect from "./EmployeeSelect";
class EmployeeTopicOfInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      singleEmployee: { employeeId },

      addTopicByUserId,
    } = this.props;
    if (inputValue) {
      addTopicByUserId(
        {
          employeeId: employeeId,
          keySkillsName: inputValue,
        },
        employeeId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };

  handleSelectConfirm = () => {
    const { selectValue } = this.state;
    const {
      singleEmployee: { employeeId },

      addTopicByUserId,
    } = this.props;
    // if (selectValue) {
      addTopicByUserId(
        {
          employeeId: employeeId,
          skillName:"",
        },
        employeeId
      );
    
    // this.setState({
    //   inputVisible: false,
    //   selectValue: "",
    // });
  };
  handleTopicDelete = ({ keySkillsId, employeeId }) => {
    const { deleteTopicByUserId } = this.props;
    deleteTopicByUserId(keySkillsId, employeeId);
  };

  saveInputRef = (input) => (this.input = input);

  componentDidMount = () => {
    console.log(this.props.singleEmployee.employeeId);
    this.props.getTopicsByUserId(this.props.singleEmployee.employeeId);
    this.props.getLibrarys(this.props.organizationId);
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByUserId,
      fetchingTopicsByUserIdError,
      topicsByUserId,
    } = this.props;
    console.log(topicsByUserId);
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "11em"}}>
              <div style={{display:"flex"}}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills{" "}
              </Title>
              <div>
                      <EmployeeSelect
                      employeeId={this.props.singleEmployee.employeeId}
                      />
                      </div>
                      </div>
              {fetchingTopicsByUserId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByUserId &&
                topicsByUserId.map((topic, index) => {
                  console.log(topic);
                  const isLongTopic = topic.keySkillsName===null?[]:topic.keySkillsName.length >= 30;
                  // const isLongTopic = topic.keySkillsName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.keySkillsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                      ? `${topic.keySkillsName===null?[]:topic.keySkillsName.slice(0, 30)}...`
                        : topic.keySkillsName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.keySkillsName}
                      key={topic.keySkillsId}
                    >
                      {topicElem}
                    </Tooltip>
                  ) : (
                    topicElem
                  );
                })
              )}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  visible={this.props.topicsByUserId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <PlusOutlined type="plus" /> Skill
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ employee,auth,librarys, profile }) => ({
  singleEmployee: employee.singleEmployee,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  fetchingTopicsByUserId: employee.fetchingTopicsByUserId,
  fetchingTopicsByUserIdError: employee.fetchingTopicsByUserIdError,
  topicsByUserId: employee.topicsByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
      addTopicByUserId,
      deleteTopicByUserId,
      getLibrarys
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeTopicOfInterest);
