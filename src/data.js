export const columns = [
  { id: "caseNumber", label: "Case Id", minWidth: 120 },
  { id: "serviceProvider", label: "Service Provider", minWidth: 120 },
  { id: "workReferenceId", label: "Work Id", minWidth: 100 },
  {
    id: "assignedTo",
    label: "Assigned To",
    minWidth: 120,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 60,
  },
  {
    id: "dueDate",
    label: "Due Date",
    minWidth: 80,
  },
  ,
  {
    id: "status",
    label: "Status",
    minWidth: 60,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 120,
  },
];

export const userPermissionColums = [
  {
    id: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 180,
  },
  {
    id: "accessType",
    label: "Access Type",
    minWidth: 100,
  },
  {
    id: "accessEnabled",
    label: "Access Enabled",
    minWidth: 100,
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 120,
  },
];

export const reportsColumns = [
  {
    id: "caseNumber",
    label: "Case ID",
    minWidth: 120,
  },
  {
    id: "serviceProviderName",
    label: "Service Provider",
    minWidth: 180,
  },
  {
    id: "agentName",
    label: "Agent",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 80,
  },
  {
    id: "transactionId",
    label: "Transaction ID",
    minWidth: 100,
  },
  {
    id: "createdAt",
    label: "Created Date",
    minWidth: 90,
  },
  {
    id: "paymentDate",
    label: "Payment Date",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
];

export const logsColumns = [
  {
    id: "userId",
    label: "User ID",
    minWidth: 130,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "accessType",
    label: "Access Type",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 220,
  },
  {
    id: "ipAddress",
    label: "IP Address",
    minWidth: 120,
  },
  {
    id: "created",
    label: "Created At (UTC+0)",
    minWidth: 120,
  },
];
