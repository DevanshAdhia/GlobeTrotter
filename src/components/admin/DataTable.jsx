import { MoreHorizontal } from 'lucide-react';
import './DataTable.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = (s) => {
    switch (s.toLowerCase()) {
      case 'active':
      case 'published':
      case 'completed':
        return 'status-success';
      case 'pending':
      case 'draft':
        return 'status-warning';
      case 'suspended':
      case 'flagged':
      case 'inactive':
        return 'status-danger';
      default:
        return 'status-neutral';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

const DataTable = ({ title, columns, data, onActionClick, onViewAll }) => {
  return (
    <div className="card data-table-card">
      <div className="table-header">
        <h3 className="table-title">{title}</h3>
        {onViewAll && <button className="btn-secondary" onClick={onViewAll}>View All</button>}
      </div>
      
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
              <th className="action-col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.isStatus ? (
                      <StatusBadge status={row[col.accessor]} />
                    ) : col.render ? (
                      col.render(row)
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
                <td className="action-col">
                  <button 
                    className="action-btn" 
                    onClick={() => onActionClick && onActionClick(row)}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
