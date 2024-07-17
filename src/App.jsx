import "./App.css";
import Connector from "./signalR/connector";
import AgGridComponent from "./ag-grid/grid";

function App() {
  return (
    <>
      <Connector />
      <AgGridComponent />
    </>
  );
}

export default App;
