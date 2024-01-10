import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoterBallotStatus() {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState({
    voter_id: '',
    ballot_id: '',
    has_voted: false,
    extra_col_1: null,
    extra_col_2: '',
    is_deleted: false,
  });

  // Fetch Voter_Ballot_Status data from the server
  useEffect(() => {
    axios.get('http://localhost:8003/api/voter-ballot-status')
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to create a new Voter_Ballot_Status record
    axios.post('http://localhost:8003/api/voter-ballot-status', newStatus)
      .then((response) => {
        // Add the newly created status to the list
        setStatuses([...statuses, response.data]);

        // Reset the form
        setNewStatus({
          voter_id: '',
          ballot_id: '',
          has_voted: false,
          extra_col_1: null,
          extra_col_2: '',
          is_deleted: false,
        });
      })
      .catch((error) => {
        console.error('Error creating new status:', error);
      });
  };

  return (
    <div>
      <h2>Voter Ballot Status</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Voter ID:
          <input
            type="number"
            name="voter_id"
            value={newStatus.voter_id}
            onChange={(e) => setNewStatus({ ...newStatus, voter_id: e.target.value })}
          />
        </label>
        <label>
          Ballot ID:
          <input
            type="number"
            name="ballot_id"
            value={newStatus.ballot_id}
            onChange={(e) => setNewStatus({ ...newStatus, ballot_id: e.target.value })}
          />
        </label>
        <label>
          Has Voted:
          <input
            type="checkbox"
            name="has_voted"
            checked={newStatus.has_voted}
            onChange={(e) => setNewStatus({ ...newStatus, has_voted: e.target.checked })}
          />
        </label>
        <label>
          Extra Column 1:
          <input
            type="number"
            name="extra_col_1"
            value={newStatus.extra_col_1 || ''}
            onChange={(e) => setNewStatus({ ...newStatus, extra_col_1: e.target.value })}
          />
        </label>
        <label>
          Extra Column 2:
          <input
            type="text"
            name="extra_col_2"
            value={newStatus.extra_col_2}
            onChange={(e) => setNewStatus({ ...newStatus, extra_col_2: e.target.value })}
          />
        </label>
        <label>
          Is Deleted:
          <input
            type="checkbox"
            name="is_deleted"
            checked={newStatus.is_deleted}
            onChange={(e) => setNewStatus({ ...newStatus, is_deleted: e.target.checked })}
          />
        </label>
        <button type="submit">Add Status</button>
      </form>

      <h3>Voter Ballot Status List</h3>
      <table>
        <thead>
          <tr>
            <th>Voter ID</th>
            <th>Ballot ID</th>
            <th>Has Voted</th>
            <th>Extra Column 1</th>
            <th>Extra Column 2</th>
            <th>Is Deleted</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status.id}>
              <td>{status.voter_id}</td>
              <td>{status.ballot_id}</td>
              <td>{status.has_voted ? 'Yes' : 'No'}</td>
              <td>{status.extra_col_1}</td>
              <td>{status.extra_col_2}</td>
              <td>{status.is_deleted ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VoterBallotStatus;
