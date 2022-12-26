import { Category } from '@mui/icons-material'
import React from 'react'
import { Chart } from "react-google-charts"

const options = {
  is3D: true,
}

const PieChartGraph = (props) => {
  const { categoriesPieChart, totalExpense } = props
  const pieChartHeader = [['Category Name', 'Expenses']]
  const pieChartData = pieChartHeader.concat(categoriesPieChart)

  return (
    <div>
        {
          categoriesPieChart.length && totalExpense
            ? (<Chart
                chartType="PieChart"
                data={pieChartData}
                options={options}
                // width={"100%"}
                // height={"400px"}
              />)
            : (
                <div className='category-view-no-data'>
                  {"No data to display..."}
                  <br />
                  {"Please add categories in the Settings page!"}
                </div>)
        }
    </div>
  )
}

export default PieChartGraph