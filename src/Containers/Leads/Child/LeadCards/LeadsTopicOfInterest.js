import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, } from "antd";
import { PlusOutlined, 
} from '@ant-design/icons';
import { ViewEditCard, Title } from "../../../../Components/UI/Elements";
import {
  addLeadsSkill,
  getLeadsSkill,
  deleteLeadsSkill,
} from "../../LeadsAction";
class LeadsTopicOfInterest extends React.Component {
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
        customerId,

        addLeadsSkill,
    } = this.props;
    if (inputValue) {
      addLeadsSkill(
        {
          leadsId: this.props.lead.leadsId,
          skillName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
        },
        this.props.lead.leadsId
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
      leadsId,

      addLeadsSkill,
    } = this.props;
    // if (selectValue) {
      addLeadsSkill(
        {
          leadsId: this.props.lead.leadsId,
          skillName:"",
        },
        this.props.lead.leadsId
      );
    
  };
  handleTopicDelete = ({ leadsSkillLinkId, leadsId }) => {
    const { deleteLeadsSkill } = this.props;
    deleteLeadsSkill(leadsSkillLinkId, leadsId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getLeadsSkill(this.props.lead.leadsId);
  };

  render() {
    console.log("follow",this.props.length)

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingLeadsSkill,
      fetchingLeadsSkillError,
      leadsSkill,
      length,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "8em" }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills{" "}
              </Title>
              {fetchingLeadsSkill ? (
                <p>fetching Skills ...</p>
              ) : (
                leadsSkill &&
                leadsSkill.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.skillName===null?[]:topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.leadsSkillLinkId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.skillName===null?[]:topic.skillName.slice(0, 30)}...`
                        : topic.skillName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.skillName}
                      key={topic.leadsSkillLinkId}
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
                  style={{ width: 78,textTransform: "capitalize" }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                   visible={this.props.leadsSkill.length===null?[]:this.props.leadsSkill.length !== 30}
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

const mapStateToProps = ({ leads, auth }) => ({
  user: auth.userDetails,
  fetchingLeadsSkill: leads.fetchingLeadsSkill,
  fetchingLeadsSkillError: leads.fetchingLeadsSkillError,
  leadsSkill: leads.leadsSkill,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getLeadsSkill,
       addLeadsSkill,
       deleteLeadsSkill,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadsTopicOfInterest);

