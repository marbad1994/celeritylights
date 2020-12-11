import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Sector, Tooltip, PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';

export default class PieChart2 extends React.Component {

constructor(props){
    super(props)
    this.state = {
        activeIndex: 0
    }
}

  renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text style={{textTransform: "capitalize"}} x={cx} y={cy} dy={8} textAnchor="middle" stroke="#fff" fill={"#fff"}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#1E1E20"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"#1E1E20"}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#1E1E20"} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={"#1E1E20"} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} stroke="#fff" fill="#fff">{`Runs: ${value}`}</text>
        {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    })
  }

	render () {
  	return (
    	<PieChart width={460} height={550} style={{marginTop: 20, marginLeft: -100}} >
        <Pie 
        	activeIndex={this.state.activeIndex}
          activeShape={this.renderActiveShape} 
          data={this.props.data} 
          cx={300} 
          cy={200} 
          innerRadius={80}
          outerRadius={110} 
          fill="#252526"
          onMouseEnter={this.onPieEnter}

        />
       </PieChart>
    );
  }
}

