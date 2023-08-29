import React from 'react'
import { connect } from "react-redux"

import AdminLayout from '../../Hoc/AdminLayout';


function Dashboard(props) {
    // console.log("Das", props.loginState.multiFactor.user.email);
    // const a = props.loginState.multiFactor.user.email;
    return (
        <AdminLayout title="Dashboard">
            <div className='user_dashboard'>
                <div>This is your dashboard</div>
            </div>
        </AdminLayout>
    )
}

export default connect(
    state => ({ loginState: state }),
)(Dashboard);
