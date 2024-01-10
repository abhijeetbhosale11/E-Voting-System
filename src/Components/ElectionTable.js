import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ElectionTable() {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch elections data from the server
  useEffect(() => {
    axios.get('http://localhost:8003/elections')
      .then((response) => {
        setElections(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching elections:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Election Table</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Election ID</th>
              <th>Election Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Is Active</th>
              <th>Extra Column 1</th>
              <th>Extra Column 2</th>
              <th>Is Deleted</th>
            </tr>
          </thead>
          <tbody>
            {elections.map((election) => (
              <tr key={election.election_id}>
                <td>{election.election_id}</td>
                <td>{election.election_name}</td>
                <td>{election.start_date}</td>
                <td>{election.end_date}</td>
                <td>{election.is_active ? 'Yes' : 'No'}</td>
                <td>{election.extra_col_1}</td>
                <td>{election.extra_col_2}</td>
                <td>{election.is_deleted ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ElectionTable;
