"use client";
import Link from "next/link";
import { React, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DialogDemo() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [docAvailable, setDocAvailable] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData || {});
  }, []);

  const userInfo = userData.user ? userData.user : "";

  const base64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  useEffect(() => {
    if (userInfo) {
      const fetchPaymentData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/payment/pay`,
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
          const responseData = await response.json();
          console.log(responseData);
          if (responseData.docAvailable) {
            setDocAvailable(true);
            if (responseData.paymentStatus === "Not Paid") {
              if (responseData.Doc.sellerEmail === userInfo.Email) {
                setDocAvailable(false);
              }
              setPaymentStatus("Not Paid");
              setRedirectUrl(responseData.url);
            } else if (responseData.paymentStatus === "Paid") {
              setPaymentStatus("Paid");
              const pdfBlob = base64toBlob(responseData.pdfBase64Data);
              const pdfUrl = URL.createObjectURL(pdfBlob);
              setRedirectUrl(pdfUrl);
            }
          } else {
            setDocAvailable(false);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchPaymentData();
    }
  }, [userInfo]);

  return (
    <div className="flex justify-center flex-col items-center mt-20">
      {docAvailable ? (
        paymentStatus === "Paid" ? (
          <>
            <p className="text-1xl font-bold mb-2">
              Agreement Document is Available
            </p>
            <a href={redirectUrl} download="certificate.pdf">
              <Button className="bg-green text-white">Download Now</Button>
            </a>
          </>
        ) : (
          <>
            <p className="text-1xl font-bold mb-2">
              Payment Must be Done First in order to Download the Agreement
              Document
            </p>
            <Link href={redirectUrl}>
              <Button className="bg-green text-white">Pay Now</Button>
            </Link>
          </>
        )
      ) : (
        <p className="text-1xl font-bold mb-2">
          No Document Available to Download
        </p>
      )}
    </div>
  );
}
