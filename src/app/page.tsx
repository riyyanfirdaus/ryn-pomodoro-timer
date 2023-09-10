import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimerComp from "./components/TimerComp";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-300">
      <div className="grid place-items-center h-full">
        <div className="flex flex-col items-center">
          <span className="font-bold text-4xl text-gray-800">POMODORO TIME</span>
          <TimerComp />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
