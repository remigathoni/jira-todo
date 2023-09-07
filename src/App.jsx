import { useCallback, useEffect, useState } from "react";

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
    <h1 style={{textAlign: "center", fontSize:"1.6rem", marginTop:"1rem"}}>What&apos;s on my list today?</h1>
    <section style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"2rem"}}>
      {data && data.map(issue => {
      return <div style={{display: "flex", minWidth:"350px", justifyContent:"space-between", padding:"1rem", backgroundColor:"#eee", marginBottom:"1rem"}} key={issue.id}>
        <div style={{}}>
          <div>{issue.summary}</div>
          <small style={{color: "gray"}}>{issue.deadline}</small>
        </div>
        <div>
          <div style={{padding:"4px", border:"1px solid #000", borderRadius:"5px"}}>{issue.status}</div>
        </div>
      </div>
    })}
    </section>
  </div>
);
}

export default App;
