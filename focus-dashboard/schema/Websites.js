cube(`Websites`, {
  sql: `SELECT * FROM focusdb.websites`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    }
  },
  
  dimensions: {
    site: {
      sql: `site`,
      type: `string`
    }
  }
});
