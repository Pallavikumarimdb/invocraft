"use client";

import { useState } from "react";
import { CustomersContent } from "./components/CustomersContent";
import Navbar from "@/components/Navbar";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
  <Navbar />
  <CustomersContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </>
  );
}