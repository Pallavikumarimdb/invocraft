"use client";

import { useState } from "react";
import { CustomersContent } from "./components/CustomersContent";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return <CustomersContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
}