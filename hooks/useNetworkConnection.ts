import { useState, useEffect } from 'react';

function getConnection() {
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
}

export function useNetworkStatus() {
  let [connection, updateNetworkConnection] = useState(getConnection());

  useEffect(() => {
    function updateConnectionStatus() {
      updateNetworkConnection(getConnection());
    }

    connection.addEventListener("change", updateConnectionStatus);
    return () => {
      connection.removeEventListener("change", updateConnectionStatus);
    };
  }, [connection]);

  return connection;
}
