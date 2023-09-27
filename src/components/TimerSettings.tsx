"use client";
import { useEffect, useState, Fragment } from "react";
import { fetchData, settingTimeItems } from "../helpers";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import SettingsIcon from "../Icons/SettingsIcon";
import { useTimerStore } from "@/store";

type Items = {
  work: number;
  shortBreak: number;
  longBreak: number;
};

export default function TimerSettings() {
  const { dataTimer, updateTimer } = useTimerStore();
  const [isOpen, setIsOpen] = useState(false);
  const [timeItems, setTimeItems] = useState<Items>({
    work: 25,
    shortBreak: 5,
    longBreak: 30,
  });

  useEffect(() => {
    console.log(timeItems);
  }, []);

  const handelChange = (e: any) => {
    setTimeItems({
      ...timeItems,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = () => {
    try {
      // settingTimeItems(timeItems);
      updateTimer(timeItems);
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
