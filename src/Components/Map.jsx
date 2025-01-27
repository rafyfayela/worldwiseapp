import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [SearchParams, setSearchParams] = useSearchParams();
  const lat = SearchParams.get("lat");
  const lng = SearchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        position : {lat},{lng}
      </h2>
    </div>
  );
}

export default Map;
