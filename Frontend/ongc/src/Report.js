import Chart from './Charts/Chart';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { generateTimestamps, getDataset, getOptionsets } from './Utility/utilites'
import Navbar2 from './Navbar/Navbar2';


const startTime = new Date('2024-01-19T00:00:00'); // Assuming YYYY-MM-DDTHH:mm:ss format
const endTime = new Date('2024-01-19T23:59:59');
const timestamps = generateTimestamps(startTime.getTime(), endTime.getTime(), 1);

function Report() {


  const [Data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/getdata')
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  const customBarColors = ["rgba(255, 0, 0, 0.7)"];
  const customBarColorss = ["rgba(255,255,0,0.7)"];
  const customBarColorsss = ["rgba(255,0,255,0.7)"];
  const customBarColorssss = ["rgba(255,136,0)"];
  const customBarColorsssss = ["rgba(0,0,0,0.7)"];
  const customBarColorssssss = ["rgba(0,0,255)"];



  const getRunningHour = () => {
    let runninghour = Data.find((obj, i) => {
      return obj.ParameterName === "Running_Hour"
    })
    return runninghour.ParameterValue
    // let runningHourInSeconds = Data.find((obj) => obj.ParameterName === "Running_Hour")?.ParameterValue || 0;

    // // Convert seconds to hh:mm:ss format
    // const hours = Math.floor(runningHourInSeconds / 3600);
    // const minutes = Math.floor((runningHourInSeconds % 3600) / 60);
    // const seconds = runningHourInSeconds % 60;

    // // Format the result
    // const formattedRunningHour = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // return formattedRunningHour;
  }
  const getRunningTime = () => {
    let runningtime = Data.find((obj, i) => {
      return obj.ParameterName === "Running_Minute"
    })
    return runningtime.ParameterValue
  }

  return (
    <div className='Backenddd'>
      <Navbar2 />
      <h1>hello sir iam doing something</h1>
      <div class="container">
        <div id="box1" class="box">
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['PT5'], Data, "Kg/cm2", 'bar', customBarColorssss)}
              options={getOptionsets(" PARAMETERS OF PT5", 250, 'x')}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['SFM_2'], Data, "Kg/hr", 'bar', customBarColors)}
              options={getOptionsets('PARAMETERS OF SFM_2', 9999)}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['WFM'], Data, "Kg/hr", 'bar', customBarColorsssss)}
              options={getOptionsets(" PARAMETERS OF WFM ", 9999)}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['TT8'], Data, "Deg.C", 'bar', customBarColorsss)}
              options={getOptionsets(" PARAMETERS OF TT8 ", 500)}
            />
          </div>


          {/* <!---------------------------------- verticle div end --> */}

        </div>
        <div id="box2" class="box">
          <div class="roz">

            <div class="and">

              <Chart
                chartType="pie"
                data={getDataset(['Boiler_Steam_Quality_Dryness'], Data, "%", 'pie', customBarColorss)}
                options={getOptionsets(" PARAMETERS OF Boiler Steam Quality Dryness ", 100)}
              />
            </div>
            <hr />
            <div className='roz'>
              <Chart
                chartType="bar"
                data={getDataset(['Totalizer_SFM_2'], Data, "Ton", 'bar', customBarColorssssss)}
                options={getOptionsets(" PARAMETERS of Totalizer SFM_2 ", 99999999)}
              />
            </div>
          </div>
          <hr />
          {Data && Data.length > 0 && <div class="roz">
            {/* <div className='Runn'> */}
            <div className='Runn1'>
              <p><b> RunningHour </b> : <input
                type="text"
                value={getRunningHour()}
                readOnly
              /></p>
            </div>
            <br />
            <div className='Runn2'>
              <p><b>RunningTime</b>: <input
                type="text"
                value={getRunningTime()}
                readOnly
              /></p>
            </div>
            {/* </div> */}
          </div>}
          <hr />
          <div className='roz'>
            <Chart
              chartType="line"
              data={getDataset(['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7'], Data, 'Deg.C', 'line', customBarColorss, 'timestamps')}
              options={getOptionsets('PARAMETERS OF TT1 to TT7', 500)}
            />
          </div>
        </div>

        {/* <!---------------------------------- verticle div end --> */}
      </div>

    </div>
  )

}

export default Report
