import React,{useState} from "react";
import { Switch} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddMaterialBuilder } from "../SuppliesAction";


function ProBuildSearchedToggle (props) {

    const [checked, setChecked] = useState(false);
    const handleToggle = () => {
      setChecked(prevChecked => !prevChecked);

      if (!checked) {
        props.AddMaterialBuilder(
                    {
                        hsn:props.item.hsn,
                        suppliesId:props.suppliesId,
                        attributeName:props.item.attributeName,
                        categoryName:props.item.categoryName,
                        suppliesName:props.item.name,
                        linkSuppliesId:props.linkSuppliesId,
                        subAttributeName:props.item.subAttributeName,
                        subCategoryName:props.item.subCategoryName,
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
            AddMaterialBuilder
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedToggle);
