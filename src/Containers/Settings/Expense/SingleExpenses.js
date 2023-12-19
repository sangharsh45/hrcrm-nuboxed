import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, Tooltip } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { TextInput } from "../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            expenseType: "",

        }
    }
    render() {
        const { expense: { expenseType, expenseTypeId }, handleChange, name, value, linkedExpenses,
            updatingExpenses, handleUpdateExpense, handleDeleteExpense } = this.props;
        console.log(linkedExpenses)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <ExpenseWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <FlexContainer justifyContent='space-between'>
                                <ExpenseName style={{ flexBasis: '85%' }}>
                                    {expenseType}
                                </ExpenseName>
                                <div>
                                    {this.props.expense.editInd?
                         <BorderColorIcon 
                            tooltipTitle="Edit"
                                 iconType="edit"
                            onClick={toggleViewType}
                            style={{fontSize:"1rem"}}
                               />:null}
                                &nbsp;
                                <Tooltip title="Delete">
                    <DeleteIcon

                      onClick={() => handleDeleteExpense(expenseTypeId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </Tooltip>
                                {/* <ActionIcon
                                  tooltipTitle="Delete"
                                 iconType="delete"
                                  handleIconClick={() => handleDeleteSector(typeId)}
                                  size="0.75em"
                                theme="filled"
                               style={{ color: "#666" }}
                                 /> */}
                                    
                                  
                                </div>
                            </FlexContainer>
                            :
                            <FlexContainer >
                                <TextInput
                                    name={name}
                                    // value={value || expenseType}
                                    defaultValue={expenseType}
                                    onChange={handleChange}
                                    style={{ width: '60%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingExpenses}
                                    disabled={!value}
                                    onClick={() => handleUpdateExpense(expenseTypeId, value, toggleViewType())}
                                >
                                    {/* Save */}
                                    <FormattedMessage
                                       id="app.update"
                                       defaultMessage="Update"
                                    />
                                </Button>&nbsp;
                                <Button
                                    type='primary'
                                    ghost
                                    onClick={() => toggleViewType()}
                                >
                                    {/* Cancel */}
                                    <FormattedMessage
                                        id="app.cancel"
                                        defaultMessage="Cancel"
                                    />
                                </Button>
                                </div>
                            </FlexContainer>
                    )}
                </ViewEditCard>
            </ExpenseWrapper>
        )
    }
}

export default SingleExpenses;

const ExpenseWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const ExpenseName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const ExpenseValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
