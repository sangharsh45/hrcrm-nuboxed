import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import AddEventModal from './Child/AddEventModal'
import EventHeader from "./Child/EventHeader";
import { handleEventModal } from "./EventAction";
const EventTable = lazy(() => import('./Child/EventTable/EventTable'))
const EventCardList = lazy(() => import('./Child/EventTable/EventCardList'))

function Event (props) {

        const { addEventModal, handleEventModal } = props;
        return (
            <React.Fragment>
                <EventHeader
                    handleEventModal={handleEventModal} />
                <AddEventModal
                    addEventModal={addEventModal}
                    handleEventModal={handleEventModal} />
                <Suspense fallback={<BundleLoader />}>
                    {/* <EventTable />
                     */}
                     <EventCardList/>
                </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ event }) => ({
    addEventModal: event.addEventModal,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleEventModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Event);