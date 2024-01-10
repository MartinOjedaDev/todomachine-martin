import './styles/TodosLoading.css';
import { TailSpin } from "react-loader-spinner";

function TodosLoading() {

  return (
    <div className="spinner-container">
    <div className="loading-spinner"></div>
  </div>
  );
}

export { TodosLoading };