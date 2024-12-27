const express = require('express');
const { ComputeManagementClient } = require('@azure/arm-compute');
const { DefaultAzureCredential } = require('@azure/identity');

const router = express.Router();

// Get Azure subscription ID from environment variables
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

// Create compute client
const getComputeClient = () => {
  const credential = new DefaultAzureCredential();
  return new ComputeManagementClient(credential, subscriptionId);
};

// Route to get all virtual machines
router.get('/vms', async (req, res) => {
  try {
    const computeClient = getComputeClient();
    const vms = [];
    
    // List all VMs using pagination
    for await (const vm of computeClient.virtualMachines.listAll()) {
      vms.push(vm);
    }
    
    res.status(200).json(vms);
  } catch (error) {
    console.error('Error fetching VMs:', error);
    res.status(500).json({
      error: 'Error fetching virtual machines',
      message: error.message
    });
  }
});

// Route to get VM by resource group and name
router.get('/vms/:resourceGroup/:name', async (req, res) => {
  try {
    const { resourceGroup, name } = req.params;
    const computeClient = getComputeClient();
    
    const vm = await computeClient.virtualMachines.get(resourceGroup, name);
    res.status(200).json(vm);
  } catch (error) {
    console.error('Error fetching VM:', error);
    res.status(500).json({
      error: 'Error fetching virtual machine',
      message: error.message
    });
  }
});

module.exports = router;