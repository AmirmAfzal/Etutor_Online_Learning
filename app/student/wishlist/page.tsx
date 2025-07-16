"use client";
import Loading from "../loading";
import { useEffect, useState } from "react";

export default function WishlistPage() {
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
      Wishlist Page
    </div>
  );
}
