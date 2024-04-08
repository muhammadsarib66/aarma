/* eslint-disable @typescript-eslint/no-explicit-any */
import {Chart, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

function DoghnutChart({color}:any) {
    
Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = '60 of 100 Done';
Chart.defaults.plugins.legend.title.font = {
  family: 'Helvetica Neue'
};



    const data = {
        labels: [
          'processed',
          'pending'
        ],
        datasets: [{
          data: [60,40],
          backgroundColor: color,
          borderWidth: 0,
          radius: '80%'  ,
          cutout: '70%',
          
           
        }]
      };
  return (
    <div className='  h-80    bg-onSecondary rounded-lg p-4'>
        <h2 className='text-2xl font-bold text-onPrimary '>Total Users Data</h2>
            <div className='relative -top-16 h-96'>

        <Doughnut  data={data} />
            </div>
    </div>
  );
}

export default DoghnutChart;