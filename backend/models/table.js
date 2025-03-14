const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  dynamicColumns: [
    {
      header: { type: String, required: true },
      type: { type: String, enum: ["text", "date"], default: "text" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  tableNumber:{
    type:Number,
    required:true,
    
  }
});

const Table=mongoose.model("tables", tableSchema);
module.exports = Table;
