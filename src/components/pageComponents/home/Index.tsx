import { Link } from "react-router-dom";
import logo from "../../../assets/rccglogos.png";
import TypewriterText from "../animate/Typewriter";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-start items-center chat h-screen overflow-y-auto nobar">
      <img className="lg:w-[280px] w-[120px] mt-10" data-aos="zoom-in" src={logo} />
      <h2 className="text-white font-semibold text-lg lg:text-4xl text-center mt-4">
        <TypewriterText />
      </h2>

      <div className="grid grid-cols-1  lg:grid-cols-3 mt-8 gap-5 px-4  ">
        <Link to="/">
          <div data-aos="fade-up" data-aos-duration="1000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-base lg:text-xl">Open heavens</h2>
            <p className="text-sm mt-2">
              Read your open heavens today and earn your completed badge
            </p>
          </div>
        </Link>

        <Link to="/">
          <div data-aos="fade-up" data-aos-duration="2000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-base lg:text-xl">Bible</h2>
            <p className="text-sm mt-2">
              Access bible, chat with Ai to ask for reference of scripture
            </p>
          </div>
        </Link>

        <Link to="/chat-bot">
          <div data-aos="fade-up" data-aos-duration="3000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-base lg:text-xl">AI Chat</h2>
            <p className="text-sm mt-2">
              Converse with ai for deep spiritual knowledge and understanding
            </p>
          </div>
        </Link>

        <Link to="/memory-verse">
          <div data-aos="fade-up" data-aos-duration="1000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-2xl">Memorise</h2>
            <p className="text-sm mt-2">
              Access memory verses and ensure that they are memorized before completion
            </p>
          </div>
        </Link>

        <Link to="/bible-reading">
          <div data-aos="fade-up" data-aos-duration="2000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-base lg:text-xl">Bible reading</h2>
            <p className="text-sm mt-2">
              Follow the bible reading for the year and keep track of your daily progress
            </p>
          </div>
        </Link>

        <Link to="/notes">
          <div data-aos="fade-up" data-aos-duration="3000" className="glass-card w-full p-4 lg:p-8  lg:w-[320px] ">
            <h2 className="font-bold text-base lg:text-xl">Notes</h2>
            <p className="text-sm mt-2">
              Add notes on your daily devotional, favorite scriptures, or chats
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
