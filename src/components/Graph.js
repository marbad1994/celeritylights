import React from "react";
import { AreaChart, XAxis, YAxis, Area, CartesianGrid, Tooltip } from 'recharts';



export default class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.dataPoints = []

        for (var key in this.props.data) {
            this.dataPoints.push({name: key, Seconds: this.props.data[key], pv: 1000})
        }
    }



    render() {
        console.log(this.dataPoints)
        

        return (
        <div>
            <AreaChart width={740} height={400} data={this.dataPoints}
   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
   <defs>
   <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="25%" stopColor="green" stopOpacity={0.9} />
        <stop offset="95%" stopColor="green" stopOpacity={0.1} />
    </linearGradient>
   </defs>
   <XAxis dataKey="name" stroke="#fff" />
   <YAxis stroke="#fff" />
    <CartesianGrid strokeDasharray="4 4"/>
   <Tooltip />
   <Area type="monotone" dataKey="Seconds"   stroke="#32383F"  fillOpacity={1} fill="url(#colorUv)"  />
 </AreaChart>
 

        </div>
        );
    }
}
