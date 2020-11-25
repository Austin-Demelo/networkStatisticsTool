import LineGraph from './LineGraph'
import React from 'react'
import { connect } from 'react-redux'
import { getAllNetworkStats } from '../redux/modules/networkStatsModule'

export class NetworkStats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    async componentDidMount() {
        console.log(this.props.location.state.device.Id)
        this.props.getAllNetworkStats(this.props.location.state.device.Id)
    }

    render() {
        const { data, labels } = this.state
        return (
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: '500px',
                    margin: 'auto',
                    padding: '10px',
                }}
            >
                <h1>
                    Network Stats for device:{' '}
                    {this.props.location.state.device.DeviceName}
                </h1>
                <div>
                    <LineGraph data={this.props.networkStatsList} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        networkStatsList: state.networkStats.networkStats,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNetworkStats: (deviceId) =>
            dispatch(getAllNetworkStats(deviceId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkStats)
