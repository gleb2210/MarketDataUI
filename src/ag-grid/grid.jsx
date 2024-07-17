import { useCallback, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useSelector } from "react-redux";

const AgGridComponent = () => {
  const { cacheItems } = useSelector((state) => state.data);

  const gridRef = useRef(null);

  const pagination = true;
  const paginationPageSize = 25;
  const paginationPageSizeSelector = [25, 200, 500];

  const [colDefs, setColDefs] = useState([
    { field: "name", filter: "agTextColumnFilter" },
    { field: "description", filter: "agTextColumnFilter" },
    { field: "updated", filter: "agDateColumnFilter" },
    { field: "bestBidPrice", filter: "agNumberColumnFilter" },
    { field: "bestBidQuantity", filter: "agNumberColumnFilter" },
    { field: "bestOfferPrice", filter: "agNumberColumnFilter" },
    { field: "bestOfferQuantity", filter: "agNumberColumnFilter" },
  ]);

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };

  const getRowId = useCallback((params) => {
    return String(params.data.id);
  }, []);

  return (
    <div className="grid-wrapper">
      <div className="ag-theme-quartz" style={{ height: 900, width: 1200 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={colDefs}
          rowData={cacheItems}
          autoSizeStrategy={autoSizeStrategy}
          getRowId={getRowId}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          deltaRowDataMode={true}
        />
      </div>
    </div>
  );
};

export default AgGridComponent;
