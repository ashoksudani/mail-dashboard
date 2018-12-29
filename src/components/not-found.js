import React from 'react';

export default function NotFound({ location }) {
  return <div>No page found for: {location.pathname}</div>;
}
