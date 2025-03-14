const express = require("express");
const router = express.Router();
const Table = require("../models/table.js");
const mongoose=require("mongoose")

/*
  POST /table/column
  Adds a new dynamic column to the user's table config
 */
async function createNewColumn(req,res) {
  const { header, type,tableNumber } = req.body;
  try {
    // 1. Find or create a Table document for this user
    let tableConfig = await Table.findOne({ user: req.user._id,tableNumber:tableNumber });
    if (!tableConfig) {
      return res.status(500).json({ message:"Table does not exist, first create a table" });
    }

    // 2. Push the new column data
    tableConfig.dynamicColumns.push({ header, type });
    await tableConfig.save();

    // 3. Return the updated list of columns
    res.status(201).json({ dynamicColumns: tableConfig.dynamicColumns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add column" });
  }
}

/**
 * GET /table/columns
 * Fetches the user's dynamic columns
 */
async function fetchColumns(req,res) {
  try {
    // 1. Find all table configurations for this user
    const tableConfig = await Table.find({ user: req.user._id });

    // 2. If no tables exist, return an empty array
    if (!tableConfig.length) {
      return res.json({ dynamicColumns: [] });
    }

    // 3. Extract all dynamic columns from each table
    const tables = tableConfig.map((table) => ({
      tableName: table.name, 
      tables: table.dynamicColumns, // Array of columns
    }));
    // 4. Return all tables and their dynamic columns
    return res.json({ tables });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch columns" });
  }
};



/* POST request /table
create a new table
*/
async function createNewTable(req,res) {
    try {
      const { numColumns, columns } = req.body; 
     
      // Create a new doc in MongoDB
      if(numColumns===0||columns.length===0){
        return res.status(500).json({ message: "Error creating table config" });
      }
      const count = await Table.countDocuments();
      const tableNumber=count+1;
      const t=await Table.create({ dynamicColumns: columns,user:req.user._id,tableNumber:tableNumber });
      await t.save();
     

      return res.status(201).json({message:"Table created successfully"});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating table config" });
    }
  };


  

module.exports = {createNewColumn,createNewTable,fetchColumns}
