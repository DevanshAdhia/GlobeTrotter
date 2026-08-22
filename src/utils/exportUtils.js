/**
 * Converts an array of objects to a CSV string and triggers a download.
 * @param {Array} data - Array of objects to export.
 * @param {String} filename - Name of the downloaded file.
 */
export const downloadCSV = (data, filename) => {
  if (!data || !data.length) {
    alert("No data available to export. Please add some data first.");
    console.warn("No data to export.");
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Construct CSV string
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      const strVal = val !== null && val !== undefined ? String(val) : '';
      const escaped = strVal.replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up to avoid memory leaks
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
