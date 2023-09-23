import React, { Component } from 'react';
import { Modal, Button, Icon } from 'antd'
import {
    EyeInvisibleOutlined, PhoneOutlined,
   
    
  } from '@ant-design/icons';
import { MultiAvatar } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";

class TwillioDialer extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {

        return (

            <div>
                {/* <Button type="primary" onClick={this.showModal}> Open Modal  </Button> */}
                <Modal
                    footer={null}
                    title="User Name"
                    visible={this.state.visible}
                    OnOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ color: '#0f0f0f', backgroundColor: '#333' }}
                    bodyStyle={{ color: '#0f0f0f', backgroundColor: '#333' }}
                >

                    <FlexContainer justifyContent='center' alignItems='center'>
                        <FlexContainer justifyContent='center' flexDirection='column' >
                            <MultiAvatar primaryTitle="A" large />
                            <br />
                            <PhoneOutlined type='phone' style={{ color: 'red', fontSize: 30 }} />
                        </FlexContainer>
                    </FlexContainer>
                </Modal>
            </div>


        );
    }
}
export default TwillioDialer;
