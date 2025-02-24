"use client";

import { useState } from "react";
import { InvoicesContent } from "./components/InvoicesContent";
import Navbar from "@/components/Navbar";

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
  <Navbar />
  <InvoicesContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </>
  );
}