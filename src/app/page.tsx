"use client";

import { Dialog, Transition, Tab } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { fetchData, settingTimeItems } from "@/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Items = {
  work: number;
  shortBreak: number;
  longBreak: number;
};

export default function Home() {
  const [dataTime, setDataTime] = useState<Items>({
    work: 25,
    shortBreak: 5,
    longBreak: 30,
  });

  useEffect(() => {
    const existingTimeItems = fetchData("TimeItmes");
    setDataTime(existingTimeItems.timeItem);
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-300">
      <div className="grid place-items-center h-full">
        <div className="flex flex-col items-center">
          <span className="font-bold text-4xl text-gray-800">POMODORO TIME</span>
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
                {dataTime &&
                  Object.values(dataTime).map((data, index) => (
                    <Tab.Panel className={"rounded-xl bg-white p-3"} key={index}>
                      <div className="flex justify-center items-center h-64">
                        <Timer time={data} />
                      </div>
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>
            <MyModal />
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}

export function Timer({ time }: { time: number }) {
  const [timeStatus, setTimeStatus] = useState(time * 60);
  const [statusBar, setStatusBar] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive && timeStatus > 0) {
      const timeout = setInterval(() => {
        setTimeStatus((time) => time - 1);
        setStatusBar(timeStatus - 1);
      }, 1000);

      return () => clearInterval(timeout);
    }
    if (timeStatus === 0) {
      setIsActive(false);
      setTimeStatus(time * 60);
    }
  }, [timeStatus, isActive]);

  const getTime = (time: number) => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="flex flex-col items-center text-gray-700">
      <span className="font-bold text-6xl">{getTime(timeStatus)}</span>
      <span className="w-12 h-6 mt-4 mb-10 flex justify-center" onClick={() => setIsActive((current) => !current)}>
        {!isActive ? <PlayIcon width={64} height={64} /> : <PauseIcon width={64} height={64} />}
      </span>
    </div>
  );
}

export function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeItems, setTimeItems] = useState<Items>({
    work: 0,
    shortBreak: 0,
    longBreak: 0,
  });

  useEffect(() => {
    const existingTimeItems = fetchData("TimeItmes");
    if (existingTimeItems.timeItem) {
      setTimeItems(existingTimeItems.timeItem);
    }
  }, []);

  const handelChange = (e: any) => {
    setTimeItems({
      ...timeItems,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = () => {
    try {
      settingTimeItems(timeItems);
      setIsOpen(false);
      return toast.success("Berhasil merubah settings");
    } catch (e) {
      throw new Error(`${e}Terdapat masalah dalam perubahan settings waktu.`);
    }
  };

  return (
    <>
      <button type="button" className="flex justify-center w-96 bg-teal-400 rounded mt-2 py-3 text-white" onClick={() => setIsOpen((e) => !e)}>
        <span className="flex flex-row gap-4">
          <SettingsIcon width={24} height={24} />
          <span>Settings</span>
        </span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen((e) => !e)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Payment successful
                  </Dialog.Title>
                  <form>
                    <div className="flex gap-2">
                      <div>
                        <label htmlFor="work" className="block text-sm font-medium leading-6 text-gray-900">
                          Work
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="work"
                            id="work"
                            onChange={handelChange}
                            value={timeItems.work}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="shortBreak" className="block text-sm font-medium leading-6 text-gray-900">
                          Short Break
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="shortBreak"
                            id="shortBreak"
                            onChange={handelChange}
                            value={timeItems.shortBreak}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="longBreak" className="block text-sm font-medium leading-6 text-gray-900">
                          Long Break
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="longBreak"
                            id="longBreak"
                            onChange={handelChange}
                            value={timeItems.longBreak}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 mt-2"
                    >
                      Send
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
