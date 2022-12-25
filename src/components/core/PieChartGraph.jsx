import { Category } from '@mui/icons-material'
import React from 'react'
import { Chart } from "react-google-charts"

const options = {
  is3D: true,
}

const PieChartGraph = (props) => {
  const { categoriesPieChart } = props
  const pieChartHeader = [['Category Name', 'Expenses']]
  const pieChartData = pieChartHeader.concat(categoriesPieChart)

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={pieChartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />      
    </div>
  )
}

export default PieChartGraph