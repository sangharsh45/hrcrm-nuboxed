import React,{useState} from "react";
import { Switch,  Popconfirm,message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProductBuilder } from "../../ProductAction";
import axios from "axios";

function ProBuildSearchedToggle (props) {
    // const [paymentCollection, setPaymentCollection] = React.useState(false)

    // function handleToggleCollection(item) {
    //     props.addProductBuilder(
    //         {
    //             hsn:props.item.hsn,
    //             productId:props.productId
    //             // attributeName:selectedObject.attributeName,
    //             // categoryName:selectedObject.categoryName,
    //             // suppliesName:selectedObject. name,
    //             // subAttributeName:selectedObject.subAttributeName,
    //             // subCategoryName:selectedObject.subCategoryName,
    //             // suppliesId:selectedObject.suppliesId,
    //             // productId:props.particularDiscountData.productId,
    //             // quantity:selectedObject.quantity,
    //         },
        
    //     );
    // }

    // return (
    //     <>
    //         <div>
    //             <Popconfirm
    //                 title="Confirm received"
    //                 onConfirm={() => handleToggleCollection()}
    //                 onCancel={null}
    //                 okText="Ok"
    //                 cancelText="Cancel"
    //             >
    //                 <Switch
    //                     checked={paymentCollection}
    //                     isLoading={true}
    //                     checkedChildren="Yes"
    //                     unCheckedChildren="No"
    //                 />
    //             </Popconfirm>
    //         </div>
    //     </>
    // );

    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
      setChecked(prevChecked => !prevChecked);

      if (!checked) {
        props.addProductBuilder(
                    {
                        hsn:props.item.hsn,
                        productId:props.productId,
                        attributeName:props.item.attributeName,
                        categoryName:props.item.categoryName,
                        suppliesName:props.item. name,
                        subAttributeName:props.item.subAttributeName,
                        subCategoryName:props.item.subCategoryName,
                        suppliesId:props.item.suppliesId,
                        productId:props.particularDiscountData.productId,
                        quantity:props.item.quantity,
                    },);
      }
    };
  
    return (
      <div>
        <Switch checked={checked} onChange={handleToggle} />
      </div>
    );

}

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addProductBuilder
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedToggle);
