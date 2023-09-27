"use client";
import { Fragment } from "react";
import { fetchData } from "../helpers";
import { Tab } from "@headlessui/react";
import TimerSettings from "./TimerSettings";
import Timer from "./Timer";
import { useTimerStore } from "@/store";
import useStore from "@/useStore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TimerComp() {
  const dataTimer = useStore(useTimerStore, (state) => state.dataTimer);

  return (
    <div className="w-96 mt-12">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab as={Fragment}>
            {({ selected }: { selected: boolean }) => (
              <button
                className={classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
                  selected ? "bg-white shadow text-blue-400" : "hover:bg-white/[0.12] hover:text-white"
                )}
              >
                Work
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }: { selected: boolean }) => (
              <button
                className={classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
                  selected ? "bg-white shadow text-blue-400" : "hover:bg-white/[0.12] hover:text-white"
                )}
              >
                Short Break
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }: { selected: boolean }) => (
              <button
                className={classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
                  selected ? "bg-white shadow text-blue-400" : "hover:bg-white/[0.12] hover:text-white"
                )}
              >
                Long Break
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          {dataTimer &&
            Object.values(dataTimer).map((data, index) => (
              <Tab.Panel className={"rounded-xl bg-white p-3"} key={index}>
                <div className="flex justify-center items-center h-64">
                  <Timer time={data} />
                </div>
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
      <TimerSettings />
    </div>
  );
}
