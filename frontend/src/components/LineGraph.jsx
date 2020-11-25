import React, { Component } from 'react'
import Chart from 'chart.js'
import '../App.css'
import moment from 'moment'

export default class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: undefined
        }
        this.formatAMPM = this.formatAMPM.bind(this)
    }
    chartRef = React.createRef()

    formatAMPM(date) {
        var hours = date.getHours()
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ' ' + ampm
        return strTime
    }
 
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d')
        this.setState({data: this.props.data})
        let currentDate = new Date()
        let dateArr = [currentDate]
        for (let i = 0; i < 14; i++) {
            let newHour = new Date(dateArr[i] - 1000 * 60 * 60)
            dateArr.push(newHour)
        }

        let labelArr = dateArr.map((date) => this.formatAMPM(date))
        labelArr.reverse()

        let downloadSpeedArr = this.props.data.map(d => ({x: moment(d.TestRunTime), y: d.DownloadSpeedInMegaBitsPerSecond}))
        let uploadSpeedArr = this.props.data.map(d => ({x: moment(d.TestRunTime), y: d.UploadSpeedInMegaBitsPerSecond}))

        new Chart(myChartRef, {
            type: 'scatter',
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
                                labelString: 'Timestamp',
                            },
                            ticks: {
                                userCallback: function(label, index, labels) {
                                    return moment(label).format("DD/MM/YY HH:mm:ss");
                                },
                              
                             }
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
