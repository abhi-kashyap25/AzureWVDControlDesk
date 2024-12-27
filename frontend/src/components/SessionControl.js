import React from 'react';

function SessionControl() {
  return (
    <div className="mb-3">
      <h3>Session Control</h3>
      <button className="btn btn-warning me-2">Disconnect User</button>
      <button className="btn btn-danger me-2">Logoff User</button>
      <button className="btn btn-success">Send Message</button>
    </div>
  );
}

export default SessionControl;
