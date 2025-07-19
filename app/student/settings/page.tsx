"use client";
import React, { useEffect, useState } from "react";

import Loading from "../loading";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-base-content/60 flex h-64 w-full items-center justify-center text-xl font-semibold">
      Settings Page
    </div>
  );
}
