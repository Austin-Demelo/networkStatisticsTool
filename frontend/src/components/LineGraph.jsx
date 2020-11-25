import React, { Component } from 'react'
import Chart from 'chart.js'
import '../App.css'

export default class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.formatAMPM = this.formatAMPM.bind(this)
    }
    chartRef = React.createRef()

    formatAMPM(date) {
        var hours = date.getHours()
        var ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        var strTime = hours + ' ' + ampm
        return strTime
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d')
        let currentDate = new Date()
        let dateArr = [currentDate]

        for (let i = 0; i < 11; i++) {
            let newHour = new Date(dateArr[i]  - 1000 * 60 * 60)
            dateArr.push(newHour)
        }
        
        let labelArr = dateArr.map(date => this.formatAMPM(date))
        labelArr.reverse()

        let downloadSpeedArr = this.props.data.map(data => data.DownloadSpeedInMegaBitsPerSecond)
        let uploadSpeedArr = this.props.data.map(data => data.UploadSpeedInMegaBitsPerSecond)

        new Chart(myChartRef, {
            type: 'line',
            data: {
                //Bring in data
                labels: labelArr,
                datasets: [
                    {
                        label: 'Download',
                        data: downloadSpeedArr,
                        backgroundColor: 'rgb(0, 0, 255)',
                        fill: false,
                    },
                    {
                        label: 'Upload',
                        data: uploadSpeedArr,
                        backgroundColor: 'rgb(60, 179, 113)',
                        fill: false,
                    },
                    // {
                    //     label: 'Latency',
                    //     data: [0, 1, 3, 4, 5, 6, 7, 8, 9],
                    //     backgroundColor: 'rgb(60, 179, 113)',
                    //     fill:false,
                    // },
                    // {
                    //     label: 'Packet Loss',
                    //     data: [0, 1, 3, 4, 5, 6, 7, 8, 9],
                    //     backgroundColor: 'rgb(60, 179, 113)',
                    //     fill:false,
                    // },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'MB/s',
                            },
                        },
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Timestamp (hour)',
                            },
                        },
                    ],
                },
            },
        })
    }
    render() {
        return (
            <div>
                <canvas className="myChart" ref={this.chartRef} />
            </div>
        )
    }
}
