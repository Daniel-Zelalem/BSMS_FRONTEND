"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "@/components/propertyList/Card";
import Autoplay from "embla-carousel-autoplay";
import { PacmanLoader } from "react-spinners";

function Trending() {
  const [featuredProperties, setFeaturedProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const worker = new Worker(new URL("./filterWorker.js", import.meta.url));

    worker.onmessage = function (e) {
      setFeaturedProperties(e.data);
      setLoading(false);
    };

    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Allproperty/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        worker.postMessage(data.data);
        const beforePostMessage = performance.now();

        worker.postMessage(properties);
        worker.onmessage = function (e) {
          const endTime = performance.now();
          console.log(
            "Filtering took " + (endTime - beforePostMessage) + " milliseconds."
          );
          setFeaturedProperties(e.data);
          setLoading(false);
        };
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchTrending();

    return () => {
      worker.terminate();
    };
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin mx-auto w-12 h-12"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <h4 className="mx-auto items-center text-2xl pl-2">Loading...</h4>
      </div>
    );
  }

  return (
    <section className="text-center " style={{ width: "95%" }}>
      <h4 className="text-black text-3xl mt-10 font-light">Latest Listings</h4>
      <Carousel
        className="ml-16"
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {featuredProperties.map((property, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
                <Card property={property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
export default Trending;
