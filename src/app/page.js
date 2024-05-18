import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Featured from "@/components/Featured/Featured";
import Trending from "@/components/Trending/Trending";
import Listings from "@/components/Listings/Listings";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f7f8f9" }}>
      <Hero />
      <Featured />
      <Trending />
      <Listings />
    </div>
  );
}
