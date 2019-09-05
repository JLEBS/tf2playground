
import React from 'react';
import styled, {css} from 'styled-components';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import Colors from '../../../../misc/colors';

const ChartContainer = styled.div`
    height:300px;
    padding-top:30px;

    ${props => props.graph && css`
        margin-left:-20px;
        cursor: pointer !important;
    `}

    ${props => props.piechart && css`
        @media (max-width: 510px){
            display: none;
        }
    `}

    .recharts-wrapper{
        width: 100% !important;
    }

    .recharts-sector{
        cursor: pointer;
    }

    .chartInnerLabel{
        ${props => `fill: ${props.fill}  !important;`};
        font-size: 18px;
        font-weight: 600;
        text-transform: capitalize;
    }

    .chartOuterLabel{
        ${props => `fill: ${props.fill}  !important;`};
        font-size: 16px;
        font-weight: 400;
    }

    .chartOuterLabelTwo{
        fill: ${Colors.standard.darkGrey};
        font-size: 14px;
        font-weight: 100;
    }
`

const renderActiveShape = (props) => {
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
            <text className='chartInnerLabel' x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.color}>
                {payload.shortname}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.color}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.color}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none"/>
            <text className='chartOuterLabel' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={payload.color}>
                {`${value} Wins`}
            </text>
            <text className='chartOuterLabelTwo' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
    
class TwoLevelPieChart extends React.Component{
 
    constructor(props){
        super(props);
        this.state = {activeIndex: 0}
    }
  
    onPieEnter = (data, index) => {
        this.setState({
        activeIndex: index,
    });}

        render () {
            return (
                
            <ChartContainer piechart>
                <PieChart className='modify' width={450} height={270} >
                    <Pie 
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape} 
                        data={this.props.data} 
                        cx={220} 
                        cy={130} 
                        innerRadius={65}
                        outerRadius={90} 
                        onMouseEnter={this.onPieEnter}
                        dataKey="value"
                    >
                    {this.props.data.map((stat, i) => (
                        <Cell className={'segment-' + i} fill={stat.color}  key={i}/>
                    ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
         );
    }
}

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

export default TwoLevelPieChart;