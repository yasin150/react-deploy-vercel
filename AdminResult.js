




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';

// const AdminResult = () => {
//   const [partyData, setPartyData] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/votes')
//       .then((response) => {
//         setPartyData(response.data);
//       })
//       .catch((error) => console.error('Error fetching aggregated votes:', error.message));
//   }, []);

//   // Prepare data for the chart
//   const chartData = {
//     labels: partyData.map((party) => party.party_name), // Party names as labels
//     datasets: [
//       {
//         label: 'Total Votes',
//         data: partyData.map((party) => party.total_votes), // Votes as data
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colors for each bar
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div>
//       <h3>Party Voting Statistics (MPA)</h3>
//       {partyData.length > 0 ? (
//         <div>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>Party Name</th>
//                 <th>Total Votes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {partyData.map((party, index) => (
//                 <tr key={index}>
//                   <td>{party.party_name}</td>
//                   <td>{party.total_votes}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={{ width: '70%', margin: '20px auto' }}>
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//       ) : (
//         <p>No votes recorded yet</p>
//       )}
//     </div>
//   );
// };

// export default AdminResult;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ResultMna from './ResultMna';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { Link } from 'react-router-dom';


// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminResult = () => {
    const [partyData, setPartyData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/votes')
            .then((response) => {
                const data = response.data;
                setPartyData(data);

                const labels = data.map((party) => party.party_name);
                const votes = data.map((party) => party.total_votes);
                setChartData({
                    labels,
                    datasets: [
                        {
                            data: votes,
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40',
                            ],
                            hoverBackgroundColor: [
                                
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40',
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                            ],
                        },
                    ],
                });
            })
            .catch((error) => console.error('Error fetching votes:', error.message));
    }, []);

    return (
        <div className="result  w-100">
        <div className=" container p-5">
            <h3 className="text-center">Party Voting Results</h3>
            <div className="row">
                <div className="col-md-6">
                    <h4>Results Table(MPA)</h4>
                    {partyData.length > 0 ? (
                        <table className="table table-bordered">
                            <thead >
                                <tr >
                                    <th>Party Name</th>
                                    <th>Total Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partyData.map((party, index) => (
                                    <tr key={index}>
                                        <td>{party.party_name}</td>
                                        <td>{party.total_votes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No votes recorded yet</p>
                    )}
                </div> 
                <div className="col-md-6">
                    <h4>Pie Chart(MPA)</h4>
                    {chartData ? (
                        <div style={{ maxWidth: '400px', margin: 'auto' }}>
                            <Pie data={chartData} />
                        </div>
                    ) : (
                        <p>Loading chart...</p>
                    )}
                </div>
            </div>
            {/* <ResultMna /> */}
        </div>
        </div>
    );
};

export default AdminResult;





