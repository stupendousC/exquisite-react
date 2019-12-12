import React from 'react';
import './RecentSubmission.css';
import PropTypes from 'prop-types';

const RecentSubmission = ({prevLine}) => {
  return (
    <div className="RecentSubmission">
      <h3>The Most Recent Submission</h3>
      <p className="RecentSubmission__submission">{ prevLine }</p>
    </div>
  );
}

RecentSubmission.propTypes = {
  prevLine: PropTypes.string.isRequired,
}

export default RecentSubmission;
