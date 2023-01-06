import Image from "next/image";
import { Inter } from "@next/font/google";
import Login from "./Login/page";
import Dashboard from "./dash/page";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  // console.log(token)
  return (
    <>
      <Login/>
      {/* <Dashboard /> */}
    </>
  );
}
