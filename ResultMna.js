// import React from 'react'

// const ResultMna = () => {
//   return (
//     <div>
//       yes
//     </div>
//   )
// }

// export default ResultMna



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';


// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultMna = () => {
    const [partyData, setPartyData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/votess')
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
        <div className="container p-5">
            <h3 className="text-center">Party Voting Results</h3>
            <div className="row">
                <div className="col-md-6">
                    <h4>Results Table(MNA)</h4>
                    {partyData.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
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
                    <h4>Pie Chart(MNA)</h4>
                    {chartData ? (
                        <div style={{ maxWidth: '400px', margin: 'auto' }}>
                            <Pie data={chartData} />
                        </div>
                    ) : (
                        <p>Loading chart...</p>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default ResultMna;