import React, { Component } from 'react'
import Chart from 'chart.js'
import '../App.css'

export default class LineGraph extends Component {
    chartRef = React.createRef()

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d')

        new Chart(myChartRef, {
            type: 'line',
            data: {
                //Bring in data
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [
                    {
                        label: 'Download',
                        data: [0, 1, 5, 10, 15, 20, 25, 30, 35, 40],
                        backgroundColor: 'rgb(0, 0, 255)',
                        fill:false,
                    },
                    {
                        label: 'Upload',
                        data: [0, 1, 3, 4, 5, 6, 7, 8, 9],
                        backgroundColor: 'rgb(60, 179, 113)',
                        fill:false,
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
                                labelString: 'Timestamp',
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
