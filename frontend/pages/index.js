const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/ui/button"; 

export default function Dashboard() {
  const router = useRouter();

  // Google Sheets data
  const [sheetData, setSheetData] = useState([]);

  // Dynamic columns from MongoDB
  const [tables,setTables]=useState([]);

  // For "create table" form
  const [showCreateTableForm, setShowCreateTableForm] = useState(false);
  const [numColumns, setNumColumns] = useState(0);
  const [columnDefs, setColumnDefs] = useState([]); // array of { header, type }

  // For adding a single new column
  const [newHeader, setNewHeader] = useState("");
  const [newType, setNewType] = useState("text");
  const [tableNumber,setTableNumber]=useState("");




  // Configure Axios to send cookies (for JWT auth)
  axios.defaults.withCredentials = true;




  

 



  // 1. Check auth + fetch initial data
  useEffect(() => {
    // We can check auth by calling a protected endpoint or just do a direct fetch
    const checkAuthAndFetchData = async () => {
      try {
       

        // 1. Attempt to fetch Google Sheets data
        const sheetsRes = await axios.get(`${BACKEND_URL}/sheets`, {
          withCredentials: true,
        });
        setSheetData(sheetsRes.data.data);

        // 2. Fetch dynamic columns
        const columnsRes = await axios.get(`${BACKEND_URL}/table/columns`, {
          withCredentials: true,
        });
        setTables(columnsRes.data.tables||[]);

      } catch (err) {
        console.error(err);

        // If token is missing or expired, server should return 401
        if (err.response && err.response.status === 401) {
          router.push("/dashboard");
        }
      } 
    };

    checkAuthAndFetchData();

    // Optional: poll every 30s for real-time updates
    const interval = setInterval(checkAuthAndFetchData, 10000);
    return () => clearInterval(interval);
  }, [router]);

  // 2. "Create Table" form submission
  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/table`, {
        numColumns,
        columns: columnDefs,
       
      });
      
    
      //Refresh dynamic columns
      const res = await axios.get(`${BACKEND_URL}/table/columns`);
      setTables(res.data.tables||[]);

      // Reset form
      setNumColumns(0);
      setColumnDefs([]);
      setShowCreateTableForm(false);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        router.push("/dashboard");
      } else {
        alert("Failed to create table");
      }
    }
  };

  // 3. Generate column fields
  const generateColumnFields = () => {
    const arr = [];
    for (let i = 0; i < numColumns; i++) {
      arr.push({ header: "", type: "text" });
    }
    setColumnDefs(arr);
  };

  // 4. Add a single new column
  const handleAddColumn = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/table/column`, {
        header: newHeader,
        type: newType,
        tableNumber:tableNumber,
      });
      
      
      setNewHeader("");
      setNewType("text");
      setTableNumber("");
      const res = await axios.get(`${BACKEND_URL}/table/columns`);
      setTables(res.data.tables||[]);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        router.push("/dashboard");
      } else {
        alert("Failed to add column");
      }
    }
  };

  // 5. Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/logout`, {},
        { withCredentials: true} );
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };


  
   
  
  // Normal dashboard UI if cookies are not blocked or user accepted the popup
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </div>

      {/* Create Table Button */}
      <div className="mb-6">
        <Button onClick={() => setShowCreateTableForm(!showCreateTableForm)}>
          {showCreateTableForm ? "Close Create Table Form" : "Create Table"}
        </Button>
      </div>

      {/* Create Table Form */}
      {showCreateTableForm && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Table</h2>
          <form onSubmit={handleCreateTable} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Number of Columns</label>
              <input
                type="number"
                value={numColumns}
                onChange={(e) => setNumColumns(e.target.value)}
                className="border rounded px-3 py-2 w-32"
              />
             
              <Button
                type="button"
                onClick={generateColumnFields}
                className="ml-4 bg-blue-500 hover:bg-blue-600"
              >
                Generate
              </Button>
             
            </div>
           

            {/* Column Fields */}
            {columnDefs.map((col, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Header"
                  value={col.header}
                  onChange={(e) => {
                    const newArr = [...columnDefs];
                    newArr[i].header = e.target.value;
                    setColumnDefs(newArr);
                  }}
                  className="border rounded px-3 py-2"
                />
                <select
                  value={col.type}
                  onChange={(e) => {
                    const newArr = [...columnDefs];
                    newArr[i].type = e.target.value;
                    setColumnDefs(newArr);
                  }}
                  className="border rounded px-2 py-2"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                </select>
              </div>
              
            ))}
             <div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Create Table
            </Button>
            </div>
          </form>
        </div>
      )}

      {/* Display Google Sheets + Dynamic Columns */}
     {/* Display multiple tables separately */}
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

  {tables.length > 0 ? (
    tables.map((table, tableIndex) => (
      <div key={`table-${tableIndex}`} className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Table {tableIndex + 1}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {/* Render Dynamic Columns for THIS table */}
                {table.tables.length > 0 ? (
                  table.tables.map((col, i) => (
                    <th key={`dynamic-${tableIndex}-${i}`} className="border p-2 font-semibold text-left">
                      {col.header}
                    </th>
                  ))
                ) : (
                  <th className="border p-2 font-semibold text-left">No Dynamic Columns</th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Render Table Rows */}
              {sheetData.length > 1 ? (
                sheetData.slice(1).map((row, rowIndex) => (
                  <tr key={`row-${tableIndex}-${rowIndex}`} className="border">
                    {/* Google Sheets Data */}
                    {row.map((cell, cellIndex) => (
                      <td key={`cell-${tableIndex}-${rowIndex}-${cellIndex}`} className="border p-2">
                        {cell}
                      </td>
                    ))}

                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={sheetData[0]?.length + table.dynamicColumns.length}
                    className="border p-2 text-center"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No tables available</p>
  )}
</div>

  

      {/* Add Single Column */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Add a New Column</h2>
        <form onSubmit={handleAddColumn} className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Column Header"
              value={newHeader}
              onChange={(e) => setNewHeader(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
             <input
              type="text"
              placeholder="Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="border rounded px-2 py-2"
            >
              <option value="text">Text</option>
              <option value="date">Date</option>
            </select>
          </div>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Add Column
          </Button>
        </form>
      </div>
    </div>
  );
}
