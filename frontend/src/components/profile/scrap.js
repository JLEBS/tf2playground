//OLD PIE CHARTS
const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "100%"
    }
   
  };
  class NewChart extends React.Component {
    state = {
      chartImageURI: ""
    };
    render() {
      return (
        <div className="App">
          <Chart
            chartType="PieChart"
            data={[["Age", "Weight"], ["Pocket Scout", 12], ["Flank Scout", 5.5], ['Pocket Soldier', 6], ['Roamer', 7], ['Demoman', 10], ['Medic', 12]]}
            options={pieOptions}
            graph_id="PieChart"
            width={"100%"}
            height={"400px"}
            legend_toggle
          />
        </div>
      );
    }
  }

  const ClassContainerTest = () => {
    return (
        <>
            <Trail
                items={CLASS_STATS}
                keys={stat => stat.id}
                from={{ marginLeft: -20, opacity: 0}}
                to={{ marginLeft: 0, opacity: 1 }}
            >
            {stat => props => (
            <ClassWrapper style={props}>
                    <ClassInstance icon imageUrl={stat.image}/>
                    <UserContent>{stat.name}</UserContent>
                    <Percentage percentage> <CountUp useEasing={false} duration={3} start={0} end={stat.testData}/> </Percentage>
            </ClassWrapper>
            )}
        </Trail>
       </>
    );
}


class SimplePieChart extends React.Component {
	render () {
  	return (
    	<PieChart className='modify' width={300} height={300} onMouseEnter={this.onPieEnter}>
            <Pie
            data={CLASS_STATS} 
            labelLine={true}
            label
            outerRadius={100} 
            fill="#009eff"
            legendType={'circle'}
            
            >
        	{
          	// data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip/>
      </PieChart>
    );
  }
}


const PercentageContainer = ({allWinStats}) => {

    return (
        <>
            {allWinStats.map((win, Colors, i) => (
                <ClassWrapper percentage column key={i}>
                    <YetAgainAnotherFlex>
                        <Rectangle width={win.winData} color={'0993ff'}/>
                        <Percentage> <CountUp useEasing={false} duration={3} end={win.winData}/>%</Percentage>
                        <UserContent>{win.name}</UserContent>
                    </YetAgainAnotherFlex>
                </ClassWrapper>
            ))}
            <TwoLevelPieChart/>

        </>
    );
};