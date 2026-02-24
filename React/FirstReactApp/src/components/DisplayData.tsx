import React, { useState, type ChangeEvent } from 'react'

const DisplayData = () => {
    const [data, setData] = useState<string[][]>([]);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onload = (event) =>{
            const text = event.target?.result as string;
            const rows = text.split('\n').map((row) => row.split(','));
            setData(rows.filter(row => row.length > 1));
        }
        reader.readAsText(file);
    }
  return (
    <div>
      <h1>Upload CSV File</h1>
      <input type="file" onChange={handleFileChange} />
      {data.length > 0 && ( // <--- Add this check!
  <table>
    <thead>
      <tr>
        {data[0].map((header, i) => <th key={i}>{header}</th>)}
      </tr>
    </thead>
    <tbody>
      {/* Remove the extra <tr> that was wrapping your map */}
      {data.slice(1).map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  )
}

export default DisplayData
