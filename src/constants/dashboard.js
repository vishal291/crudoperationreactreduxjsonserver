import { Button } from "@mui/material";

export const userTableConfig = {
  currentPage: 1,
  size: 10,
};

export const dashboardHeader = [
  {
    label: "Name",
    datakey: "name",
    width: "5%",
  },
  {
    label: "Email",
    datakey: "email",
    width: "10%",
  },
  {
    label: "Phone",
    datakey: "phone",
    width: "10%",
  },
  {
    label: "Website",
    datakey: "website",
    width: "10%",
  },
  {
    label: "Status",
    datakey: "status",
    width: "10%",
  },
  {
    label: "Actions",
    dataKey: "actions",
    width: "10%",
    cellData: (row, handleAction) => {
      //   console.log("row", row, "handleAction", handleAction);
      return (
        <div>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="success"
            onClick={() => handleAction({ actionType: "editAction", row })}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => handleAction({ actionType: "deleteAction", row })}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
