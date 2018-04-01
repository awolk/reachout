import React, {Component} from 'react';

export default props => {
  return (
    <a
      href={`mailto:${encodeURIComponent(props.email)}?subject=${encodeURIComponent(props.subject)}` +
            `&body=${encodeURIComponent(props.body)}`}
    >
      {props.email}
    </a>
  );
}