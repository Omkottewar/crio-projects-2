import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      alert("failed to fetch data")
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(data.length / 10) && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="text-3xl">
      {data.length > 0 ? (
        <div>
          <table className="w-full table-auto">
            <thead className="bg-[#009879]">
              <tr className="text-left">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="border">
              {data.slice(page * 10 - 10, page * 10).map((item) => {
                return (
                  <tr className="border-2" key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available</p>
      )}

      <div className="flex justify-center gap-10 mt-10">
        <button
          onClick={() => selectPageHandler(page - 1)}
          disabled={page === 1}
          className="bg-[#009879] rounded-lg text-white  px-3 py-1 border"
        >
          Previous
        </button>
<button className="bg-[#009879] rounded-lg text-white  px-3 py-1 border">{page}</button>
        <button
          onClick={() => selectPageHandler(page + 1)}
          disabled={page === Math.ceil(data.length / 10)}
          className="bg-[#009879] rounded-lg text-white  px-3 py-1 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
