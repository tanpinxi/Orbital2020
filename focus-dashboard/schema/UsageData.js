cube(`UsageData`, {
  sql: `SELECT * FROM focusdb.usage_data`,
  
  joins: {
    
  },
  
  measures: {
    usage: {
      sql: `usage`,
      type: `number`
    },
    totalusage: {
      sql: `sum(${CUBE}.usage)`,
      type: `number`
    },
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
