import { CalendarCheck } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="relative">
      <section className="w-full">
        <div className="relative hero-content text-center mx-4 lg:mx-[15%] py-20">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-7xl flex justify-center items-center">
              <div className="bg-secondary p-1 mr-1 rounded-md text-white">
              <CalendarCheck className="w-8 h-8 md:w-16 md:h-16" />
              </div>
              <span>
                Book<span>It</span>
              </span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
