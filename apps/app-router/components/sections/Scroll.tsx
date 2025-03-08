"use client";
import React, { useState } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { Floating } from "./Floating";


export function Scroll() {
  const [imageSrc, setImageSrc] = useState("/customer.png");
  return (
    <div className=" w-full bg-slate-300 pt-16 bg-dot-black/[0.4] relative items-center justify-center">
       <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-slate-950">
        Packed with Features, Powerful, and Incredibly Easy to Use.
        </h4>

        <p className="text-lg lg:text-base  max-w-2xl  my-4 mx-auto text-slate-900 text-center font-semibold">
        Managing invoices should be effortless. With InvoCraft, freelancers can create professional invoices, track payments, and organize clients seamlessly—all in one platform.
        </p>
      </div>
      <div className=" overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
            </>
          }
        >
          <Floating setImageSrc={setImageSrc} />
          <Image
            src={imageSrc}
            alt="hero"
            height={800}
            width={1200}
            className="object-contain rounded-2xl w-full h-full"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}
