import React,{lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionHeader from "./Child/ProductionHeader";
import {handleCreateProduction,setProductionViewType} from "./ProductionAction";
import { BundleLoader } from "../../Components/Placeholder";
const CreateProductionDrawer =lazy(()=>import("./Child/CreateProductionDrawer"));
const ProductionCardView=lazy(()=>import("./Child/ProductionCardView"));

function Production (props) {

    return (
        <>
        <ProductionHeader 
         viewType={props.viewType}
          openProductiondrawer={props.openProductiondrawer}
          handleCreateProduction={props.handleCreateProduction}
          />
        <CreateProductionDrawer
          openProductiondrawer={props.openProductiondrawer}
          handleCreateProduction={props.handleCreateProduction}
        />

<Suspense fallback={<BundleLoader/>}>
<ProductionCardView
           viewType={props.viewType}
        />
  
</Suspense>
       
        </>
    )
};

const mapStateToProps = ({ production }) => ({
  openProductiondrawer:production.openProductiondrawer,
  viewType:production.viewType
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleCreateProduction,
        setProductionViewType
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Production);