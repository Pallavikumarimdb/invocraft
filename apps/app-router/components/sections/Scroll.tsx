"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { Floating } from "./Floating";

export function Scroll() {
  return (
    <div className=" w-full bg-slate-300 bg-dot-black/[0.4] relative items-center justify-center">
    <div className=" overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
          </>
        }
      >
        <Floating/>
        <Image
          src="/home.png"
          alt="hero"
          height={800}
          width={1200}
          className="object-cover rounded-2xl h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </div>
  );
}
