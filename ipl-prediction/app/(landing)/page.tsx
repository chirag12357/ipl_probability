/* eslint-disable @next/next/no-img-element */
"use client";

import Schedule from "../../public/schedule.json";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PointsTable from "./_components/table";

export default function Home() {
  return (
    <>
      <div className=" grainy-light h-full">
        <div className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl pb-24 pt-10 sm:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-52">
            <div className="px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
                <h1
                  className={cn(
                    "relative tracking-tight sm:text-left mt-10 font-bold !leading-[4rem] text-gray-900 text-5xl md:text-7xl"
                  )}
                >
                  <span className="whitespace-nowrap">IPL Predictions</span>
                </h1>
                <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left text-balance md:text-wrap flex items-center">
                  Made to check if{" "}
                  <span className="mb-4 mx-1">
                    <img src="rcb.png" alt="logo" width={50} height={50} />
                  </span>{" "}
                  will win the{" "}
                  <span className="text-2xl font-bold mx-1 text-[#ecc86e]">
                    CUP
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="relative max-w-2xl w-full text-left p-5 bg-slate-200 rounded-xl shadow-xl scale-75">
              <PointsTable />
            </div>
          </div>
          {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" /> */}
        </div>
      </div>
    </>
  );
}