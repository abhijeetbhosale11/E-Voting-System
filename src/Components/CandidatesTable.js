import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CandidatesTable() {
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Fetch candidates data from the backend API
      axios.get('http://localhost:8003/candidates')
        .then(response => {
          setCandidates(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching candidates:', error);
          setIsLoading(false);
        });
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Candidates Table</h2>
        <table>
          <thead>
            <tr>
              <th>Candidate ID</th>
              <th>Ballot ID</th>
              <th>Candidate Name</th>
              <th>Candidate Info</th>
              <th>Party</th>
              <th>Votes Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.candidate_id}>
                <td>{candidate.candidate_id}</td>
                <td>{candidate.ballot_id}</td>
                <td>{candidate.candidate_name}</td>
                <td>{candidate.candidate_info}</td>
                <td>{candidate.party}</td>
                <td>{candidate.votes_received}</td>
                <td>
                  {/* Add buttons for editing and deleting candidates */}
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default CandidatesTable;
  