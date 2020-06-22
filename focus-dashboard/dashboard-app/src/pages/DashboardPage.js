import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
const DashboardItems = [
  {
    id: 0,
    name: "New Chart",
    vizState: {
      query: {
        measures: ["UsageData.totalusage"],
        timeDimensions: [
          {
            dimension: "UsageData.date"
          }
        ],
        order: {
          "UsageData.date": "asc"
        },
        dimensions: ["UsageData.site"],
        filters: []
      },
      chartType: "pie"
    }
  },
  {
    id: 1,
    name: "New Chart",
    vizState: {
      query: {
        measures: ["UsageData.totalusage"],
        timeDimensions: [
          {
            dimension: "UsageData.date",
            granularity: "day"
          }
        ],
        order: {
          "UsageData.date": "asc"
        },
        dimensions: ["UsageData.site"],
        filters: []
      },
      chartType: "line"
    }
  },
  {
    id: 2,
    name: "New Chart",
    vizState: {
      query: {
        measures: ["UsageData.totalusage"],
        timeDimensions: [
          {
            dimension: "UsageData.date",
            granularity: "day"
          }
        ],
        order: {
          "UsageData.totalusage": "desc"
        },
        dimensions: ["UsageData.site"],
        filters: []
      },
      chartType: "line"
    }
  }
];

const DashboardPage = () => {
  const dashboardItem = item => (
    <Grid item xs={12} lg={6} key={item.id}>
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Grid>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <Typography variant="h5" color="inherit">
        There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
