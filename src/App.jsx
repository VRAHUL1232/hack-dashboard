import { ArrowLeft, ArrowRight, CarFront } from "lucide-react";
import { GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { FaBullhorn, FaCarBattery, FaEye } from "react-icons/fa";
import { PiHeadlights, PiSeatbelt } from "react-icons/pi";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase,onValue,ref } from "firebase/database";
function App() {
  const [leftInd,setLeftInd] = useState(true)
  const [rightInd,setRightInd] = useState(false)
  const [headLight,setHeadLight] = useState(true)
  const [seatbelt,setSeatbelt] = useState(false)
  const [Eye,setEye] = useState(true)
  const [sterring,setSterring] = useState(false)
  const [accn,setAccn] = useState(0)
  const [temperature,setTemperature] = useState(0)

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY ,
    authDomain: "car-dashboard-2c0d8.firebaseapp.com",
    databaseURL: import.meta.env.VITE_API_URL ,
    projectId: "car-dashboard-2c0d8",
    storageBucket: "car-dashboard-2c0d8.firebasestorage.app",
    messagingSenderId: "943251330569",
    appId: import.meta.env.VITE_API_ID
  }

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const setupRealtimeListeners = () => {
      const leftInd = ref(database, "leftInd");
      const unsubscribeLeftInd = onValue(
        leftInd,
        (snapshot) => {
          setLeftInd(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );
      const rightInd = ref(database, "rightInd");
      const unsubscribeRightInd = onValue(
        rightInd,
        (snapshot) => {
          setRightInd(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const headLight = ref(database, "headLight");
      const unsubscribeHeadLight = onValue(
        headLight,
        (snapshot) => {
          setHeadLight(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(headLight)

      const seatbelt = ref(database, "seatbelt");
      const unsubscribeSeatbelt = onValue(
        seatbelt,
        (snapshot) => {
          setSeatbelt(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const Eye = ref(database, "Eye");
      const unsubscribeEye = onValue(
        Eye,
        (snapshot) => {
          setEye(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const sterring = ref(database, "sterring");
      const unsubscribeSterring = onValue(
        sterring,
        (snapshot) => {
          setSterring(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const accn = ref(database, "accn");
      const unsubscribeAccn = onValue(
        accn,
        (snapshot) => {
          setAccn(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const temperature = ref(database, "temperature");
      const unsubscribeTemp = onValue(
        temperature,
        (snapshot) => {
          setTemperature(snapshot.val());
        },
        (error) => {
          console.log(error);
        }

      );

      return () => {
        unsubscribeRightInd();
        unsubscribeHeadLight();
        unsubscribeLeftInd();
        unsubscribeSeatbelt();
        unsubscribeEye();
        unsubscribeSterring();
        unsubscribeAccn();
        unsubscribeTemp();
      };
    };
    setupRealtimeListeners();
  }, []);


  return (
    <div className="h-screen w-screen bg-black py-16 px-32">
      <div className="flex flex-col justify-between items-center h-full w-full border-20 border-red-700 rounded-[20%] py-10">
        <div className="flex flex-row w-full h-auto justify-between px-16">
          <ArrowLeft className={`${leftInd==true ? `text-green-400`:`text-gray-600`} w-16 h-16`} />
          <PiHeadlights className={`${headLight==true ? `text-blue-400`:`text-gray-600`} w-16 h-16`} />
          <ArrowRight className={`${rightInd==true ? `text-green-400`:`text-gray-600`} w-16 h-16`} />
        </div>
        <div className="flex flex-row w-full h-auto justify-cetner items-center px-8">
          <div className="flex flex-col h-full w-auto justify-around items-center">
            <FaCarBattery className="text-green-700 w-10 h-10" />
            <FaBullhorn className="text-red-700 text-4xl" />
          </div>
          <div className=" h-full w-full flex flex-row items-center justify-around">
            <PiSeatbelt className={`${seatbelt==true ? `text-green-400`:`text-red-400`} w-36 h-36`} />
            <FaEye className={`${Eye==true ? `text-yellow-400`:`text-white`} w-24 h-24`} />
            <GiSteeringWheel className={`${sterring==true ? `text-green-400`:`text-red-400`} w-36 h-36`} />
          </div>
          <div className="h-full flex flex-col w-auto justify-around items-center">
            <CarFront className="text-green-500 w-10 h-10" />
            <GiCarWheel className="text-gray-500 text-4xl" />
          </div>
        </div>
        <div className="flex flex-row w-full h-auto justify-cetner items-center px-8">
          <div className=" h-full w-full flex flex-row items-center justify-center font-bold text-xl text-white">
            Acceleration: <div className="w-5"/>  {(accn==0) ? <span className="text-red-400">LOW</span> : (accn==1) ? <span className="text-yellow-400">MEDIUM</span> : <span className="text-green-400">HIGH</span>}
          </div>
          <div className=" h-full w-full flex flex-col items-center justify-between font-bold text-3xl text-white">
            GEAR
            <div className="h-4"/>
            <div className="flex flex-row justify-between text-gray-500 w-1/2 text-xl font-bold">
              <h1 className="text-3xl font-bold text-red-600">N</h1>
              <h1 className="text-3xl font-bold">P</h1>
              <h1 className="text-3xl font-bold">D</h1>
            </div>
          </div>
          <div className=" h-full w-full flex flex-row items-center justify-center text-white font-bold text-xl">
            Engine Temperature: <div className="w-5"/> {(temperature==0) ? <span className="text-red-400">LOW</span> : (temperature==1) ? <span className="text-yellow-400">MEDIUM</span> : <span className="text-green-400">HIGH</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
