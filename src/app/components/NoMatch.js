import React, { memo } from 'react';
import ReactLink from '../../utils/Link';
import {Link as RLink} from 'react-router-dom';
const Link = ReactLink(RLink);

export default memo((props) => {

  return (
    <>
      <div className="nomatch">
        <img src="/photos/stumps_nomatch.svg" />
        <h3>Stay Tuned! Scorecard is coming soon</h3>
      </div>

    </>
  );
});
