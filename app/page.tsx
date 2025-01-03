import { CalendarCheck } from "lucide-react";
/*import Image from "next/image";*/
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

            <h2 className="py-4 md:py-6 text-xl md:text-4xl font-semibold">
              Gerez la réservation de vos <span className="text-secondary">salles de réunion</span>{" "}
              simplement.
            </h2>

            <ul className="steps steps-vertical md:steps-horizontal">
              <li className="step step-secondary text-sm">
                <div className="badge">Creez un compte</div>
              </li>
              <li className="step step-secondary text-sm">
                <div className="badge">Réservez votre salle</div>
              </li>
              <li className="step step-secondary text-sm">
                <div className="badge">Gérez vos réservations</div>
              </li>
            </ul>
            {/* Boutton d'action */}
            <div>
              <button className="btn btn-secondary">Se connecter</button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
