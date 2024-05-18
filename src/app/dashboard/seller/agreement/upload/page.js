"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function DialogDemo() {
  const [pdfs, setPdfs] = useState([]);
  const [pdfError, setPdfError] = useState(false); // State to track PDF selection
  const [url, setUrl] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userInfo = userData.user ? userData.user : "";
  console.log(userInfo);

  const handlePdfChange = (event) => {
    const selectedPdfs = Array.from(event.target.files);
    setPdfs((prevPdfs) => [...prevPdfs, ...selectedPdfs]);
    setPdfError(false);
  };

  useEffect(() => {
    if (userInfo) {
      const fetchUserList = async () => {
        console.log(userInfo);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/docs/send-envelope`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const res = await response.json();
          console.log(res);
          setUrl(res.url);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };

      fetchUserList();
    }
  }, [userInfo]);

  return (
    <div className="flex justify-center flex-col items-center mt-20">
      {url ? (
        <div>
          <p className="font-semibold mb-2">
            Agreement Document is Available Sign Now
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="login">Sign Now</Button>
          </a>
        </div>
      ) : (
        <p className="text-1xl font-bold mb-2">
          No Agreement Document is Available
        </p>
      )}
    </div>
  );
}
