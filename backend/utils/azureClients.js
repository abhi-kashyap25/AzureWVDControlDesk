const { ComputeManagementClient } = require('@azure/arm-compute');
const { MonitorQueryClient } = require('@azure/monitor-query');
const { getCredential } = require('./auth');

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

/**
 * Initializes the Compute Management Client.
 * @returns {ComputeManagementClient} Compute client
 */
const getComputeClient = () => {
  const credential = getCredential();
  return new ComputeManagementClient(credential, subscriptionId);
};

/**
 * Initializes the Monitor Query Client.
 * @returns {MonitorQueryClient} Monitor client
 */
const getMonitorClient = () => {
  const credential = getCredential();
  return new MonitorQueryClient(credential);
};

module.exports = { getComputeClient, getMonitorClient };
