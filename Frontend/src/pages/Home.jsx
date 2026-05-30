import React from "react";
import Header from "../components/Header"; // Path check karein (.. ka matlab ek folder piche)

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Aapka baaki content yahan aayega */}
        <h2 className="text-center mt-10 text-white">Welcome to RoomCraft</h2>
      </main>
    </>
  );
}
