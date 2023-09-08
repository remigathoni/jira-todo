import { useCallback, useEffect, useState } from "react";
import "./App.css";
function App() {
  const SERVER_BASE_URL=import.meta.env.VITE_SERVER_BASE_URL
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/issues/all`);
      const data = await response.json();
      setData(data.issues);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [SERVER_BASE_URL]);
  console.log(data)

    useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [fetchData]);
return (
  <div>
    <h1>What&apos;s on my list today?</h1>
    <section>
      {data && data.map(issue => {
      return <div className="issues" key={issue.id}>
        <div>
          <div>{issue.summary}</div>
          <small>{issue.deadline}</small>
        </div>
        <div>
          <div className="status">{issue.status}</div>
        </div>
      </div>
    })}
    </section>
  </div>
);
}

export default App;
