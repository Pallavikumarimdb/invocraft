"use client";

import { useState } from "react";
import { InvoicesContent } from "./components/InvoicesContent";

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return <InvoicesContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
}