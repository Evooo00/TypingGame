import React, { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";

function Ranking() {
  const [rankingData, setRankingData] = useState<any>([]);
  const fetchRankingData = async () => {
    const { data, error } = await supabase.from("Ranking").select();

    if (error) {
      console.log(error);
      return [];
    }
    if (data) {
      return data;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRankingData();
      setRankingData(data || []);
    };
    getData();
  }, []);
  return (
    <div className="container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
      <ul>
        {rankingData.map((record: any, index: any) => (
          <li key={index}>
            {record.name} {record.writeTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
