cube(`UsageData`, {
  sql: `SELECT * FROM focusdb.usage_data`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [date]
    }
  },
  
  dimensions: {
    site: {
      sql: `site`,
      type: `string`
    },
    
    date: {
      sql: `date`,
      type: `time`
    }
  }
});
