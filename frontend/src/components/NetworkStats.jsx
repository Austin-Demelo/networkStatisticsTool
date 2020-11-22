import React from 'react'
import { connect } from 'react-redux'
import { getAllNetworkStats } from '../redux/modules/networkStatsModule'
import LineGraph from './LineGraph'

export class NetworkStats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
        // this.props.getAllNetworkStats(this.props.location.state.device.Id)
    }

    render() {
        const { data, labels } = this.state

        return (
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: '500px',
                    margin: 'auto',
                    padding:'10px'
                }}
            >
                <h1>
                    Network Stats for device:{' '}
                    {this.props.location.state.device.DeviceName}
                </h1>
                <div >
                    
                    <LineGraph data={data} labels={labels} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworkStats: (deviceId) =>
            dispatch(getAllNetworkStats(deviceId)),
    }
}

export default connect(null, mapDispatchToProps)(NetworkStats)
