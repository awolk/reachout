import React from 'react';

export default props => {
  let address = `mailto:${encodeURIComponent(props.email)}?subject=${encodeURIComponent(props.subject)}` +
    `&body=${encodeURIComponent(props.body)}`;
  return (
    <a
      href={address.replace(/%5BName%5D/g, props.name).replace(/%5BOffice%5D/g, props.office).replace(/%5BAddress%5D/g, props.address)}
    >
      {props.email}
    </a>
  );
}