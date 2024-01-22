import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const ExpenseActionLeft=lazy(()=>import("./ExpenseActionLeft"));
const ExpenseActionRight=lazy(()=> import("./ExpenseActionRight"));

class ExpenseHeader extends Component {
  render() {
    const {
        
        viewType,
        setExpenseViewType,
    } = this.props;
    return (
      <div 
      // class="sticky top-[3.35rem] z-[998] "
      >
        <ActionHeader
            leftComponent={

                <ExpenseActionLeft
                    viewType={viewType}
                    setExpenseViewType={setExpenseViewType}
                />

            }
          rightComponent={
            <ExpenseActionRight
            //   handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default ExpenseHeader;
