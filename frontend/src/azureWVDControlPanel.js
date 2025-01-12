// src/azureWVDControlPanel.js
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { ComputeManagementClient } from "@azure/arm-compute";
import msalInstance, { initializeMsal } from "./msalConfig";

const subscriptionId = "ab9f50ac-b80e-4acd-bbae-5f560fcbe17b";

export async function listVirtualMachines() {
  await initializeMsal();

  const account = msalInstance.getActiveAccount();
  if (!account) {
    await msalInstance.loginPopup({
      scopes: ["https://management.azure.com/.default"],
    });
  }

  const tokenRequest = {
    scopes: ["https://management.azure.com/.default"],
  };

  const response = await msalInstance.acquireTokenSilent(tokenRequest);
  const credential = {
    getToken: async () => ({ token: response.accessToken }),
  };

  const computeClient = new ComputeManagementClient(credential, subscriptionId);
  const vmList = await computeClient.virtualMachines.listAll();
  return vmList;
}

export async function startVirtualMachine(resourceGroupName, vmName) {
  await initializeMsal();
  const account = msalInstance.getActiveAccount();
  if (!account) {
    await msalInstance.loginPopup({
      scopes: ["https://management.azure.com/.default"],
    });
  }

  const tokenRequest = {
    scopes: ["https://management.azure.com/.default"],
  };

  const response = await msalInstance.acquireTokenSilent(tokenRequest);
  const credential = {
    getToken: async () => ({ token: response.accessToken }),
  };

  const computeClient = new ComputeManagementClient(credential, subscriptionId);
  await computeClient.virtualMachines.beginStartAndWait(resourceGroupName, vmName);
  console.log(`Virtual machine ${vmName} started successfully.`);
}

export async function stopVirtualMachine(resourceGroupName, vmName) {
  await initializeMsal();
  const account = msalInstance.getActiveAccount();
  if (!account) {
    await msalInstance.loginPopup({
      scopes: ["https://management.azure.com/.default"],
    });
  }

  const tokenRequest = {
    scopes: ["https://management.azure.com/.default"],
  };

  const response = await msalInstance.acquireTokenSilent(tokenRequest);
  const credential = {
    getToken: async () => ({ token: response.accessToken }),
  };

  const computeClient = new ComputeManagementClient(credential, subscriptionId);
  await computeClient.virtualMachines.beginDeallocateAndWait(resourceGroupName, vmName);
  console.log(`Virtual machine ${vmName} stopped successfully.`);
}