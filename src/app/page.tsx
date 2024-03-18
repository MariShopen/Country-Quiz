import "./globals.css";
export default function Home() {
  return (
    <main className="flex min-w-full min-h-full h-screen items-center justify-center bg-graybg ">
      <div className="flex items-center justify-center w-[1280px] h-[720px] bg-purple1">
        <div className="flex items-center justify-around flex-col w-2/3 h-2/3 bg-purple2 rounded-xl">
          <div className="text-fontColor">Country Quiz</div>
          <div>
            <button className="w-10 h-10 rounded-full text-graybg bg-gradient-to-r from-gradientColor1 to-gradientColor2">
              1
            </button>
          </div>
          <div className="text-graybg">fetch is here</div>
          <div className="text-graybg">answers</div>
        </div>
      </div>
    </main>
  );
}
