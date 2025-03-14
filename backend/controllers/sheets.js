
const express = require("express");
const { google } = require("googleapis");



async function getSheetsClient() {
    // We'll read environment variables from .env
    
  
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
     
     process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
  
    
    await auth.authorize();
  
    
    return google.sheets({ version: "v4", auth });
  }
  

async function getSheetData(req,res) {
    try {
        
        if(!req.user){
           return res.status(401).json({ error: "User not logged in" });
        }
      
        const sheets = await getSheetsClient();
    
        
        const response = await sheets.spreadsheets.values.get({
       
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!A:Z",
        });
    
        // response.data.values is a 2D array of rows
        const rows = response.data.values || [];
        // Example: rows[0] is the header row, rows[1..] are the data
        
        res.json({ data: rows, });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data from Google Sheets" });
      }
    
}




module.exports={getSheetData}
