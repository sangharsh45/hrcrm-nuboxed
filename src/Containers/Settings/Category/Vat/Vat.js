import React,{lazy} from 'react'
const VatTable = lazy(() =>
  import("./VatTable")
);

const Vat = () => {
    return (
        <div>
            <VatTable />
        </div>
    )
}

export default Vat
