/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { forwardRef, useRef } from "react";
import TeamList from "@/components/team-list/teams.json";
import Ripple from "@/components/magicui/ripple";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rrRef = useRef<HTMLDivElement>(null);
  const kkrRef = useRef<HTMLDivElement>(null);
  const cskRef = useRef<HTMLDivElement>(null);
  const srhRef = useRef<HTMLDivElement>(null);
  const lsgRef = useRef<HTMLDivElement>(null);
  const dcRef = useRef<HTMLDivElement>(null);
  const gtRef = useRef<HTMLDivElement>(null);
  const pksRef = useRef<HTMLDivElement>(null);
  const miRef = useRef<HTMLDivElement>(null);
  const rcbRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  const teamIcons = {
    rcb: TeamList.find((t) => t.team === "RCB")?.logo,
    csk: TeamList.find((t) => t.team === "CSK")?.logo,
    dc: TeamList.find((t) => t.team === "DC")?.logo,
    kkr: TeamList.find((t) => t.team === "KKR")?.logo,
    mi: TeamList.find((t) => t.team === "MI")?.logo,
    pks: TeamList.find((t) => t.team === "PKS")?.logo,
    rr: TeamList.find((t) => t.team === "RR")?.logo,
    srh: TeamList.find((t) => t.team === "SRH")?.logo,
    lsg: TeamList.find((t) => t.team === "LSG")?.logo,
    gt: TeamList.find((t) => t.team === "GT")?.logo,
  };

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center  rounded-lg  bg-transparent p-10"
      ref={containerRef}
    >
      {/* <Ripple /> */}
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={rrRef}>
            <img className="h-6 w-6" src={teamIcons["rr"]} alt="RCB" />
          </Circle>
          <Circle ref={dcRef}>
            <img className="h-6 w-6" src={teamIcons["dc"]} alt="RCB" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={kkrRef}>
            <img className="h-6 w-6" src={teamIcons["kkr"]} alt="RCB" />
          </Circle>
          <Circle ref={gtRef}>
            <img className="h-6 w-6" src={teamIcons["gt"]} alt="RCB" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={cskRef}>
            <img className="h-6 w-6" src={teamIcons["csk"]} alt="RCB" />
          </Circle>
          <Circle ref={cupRef}>
            <img className="h-6 w-6" src="/cup.png" alt="RCB" />
          </Circle>
          <Circle ref={pksRef}>
            <img className="h-6 w-6" src={teamIcons["pks"]} alt="RCB" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={srhRef}>
            <img className="h-6 w-6" src={teamIcons["srh"]} alt="RCB" />
          </Circle>
          <Circle ref={miRef}>
            <img className="h-6 w-6" src={teamIcons["mi"]} alt="RCB" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={lsgRef}>
            <img className="h-6 w-6" src={teamIcons["lsg"]} alt="RCB" />
          </Circle>
          <Circle ref={rcbRef}>
            <img className="h-6 w-6" src={teamIcons["rcb"]} alt="RCB" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rrRef}
        toRef={cupRef}
        // curvature={-75}
        // endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={kkrRef}
        toRef={cupRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={cskRef}
        toRef={cupRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={srhRef}
        toRef={cupRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={lsgRef}
        toRef={cupRef}
        // curvature={75}
        // endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dcRef}
        toRef={cupRef}
        reverse
        // curvature={-75}
        // endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gtRef}
        toRef={cupRef}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pksRef}
        toRef={cupRef}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={miRef}
        toRef={cupRef}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rcbRef}
        toRef={cupRef}
        reverse
        // curvature={75}
        // endYOffset={10}
      />
    </div>
  );
}
