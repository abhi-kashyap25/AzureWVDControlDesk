// src/App.js
import React, { useEffect, useState } from "react";
import { listVirtualMachines, startVirtualMachine, stopVirtualMachine } from "./azureWVDControlPanel";

function App() {
  const [vmList, setVmList] = useState([]);

  useEffect(() => {
    async function fetchVMs() {
      const vms = await listVirtualMachines();
      setVmList(vms);
    }
    fetchVMs();
  }, []);

  return (
    <div className="container">
      <h1>Azure WVD Control Panel</h1>
      {vmList.map(vm => (
        <div key={vm.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{vm.name}</h5>
            <p className="card-text">Resource Group: {vm.resourceGroup}</p>
            <p className="card-text">Location: {vm.location}</p>
            <button className="btn btn-success" onClick={() => startVirtualMachine(vm.resourceGroup, vm.name)}>Start</button>
            <button className="btn btn-danger" onClick={() => stopVirtualMachine(vm.resourceGroup, vm.name)}>Stop</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;