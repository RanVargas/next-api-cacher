"use client";

import { useState, useEffect } from "react";
import { Hotel_Table } from "./components/Hotel/hotel_table";
import { Columns } from "./components/Hotel/table_columns";

export function HotelTableWrapper({ initialData }: any) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return <Hotel_Table columns={Columns} data={data} />;
}
