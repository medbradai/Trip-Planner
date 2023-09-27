import React, { FC } from "react";
import "./Frise.css";
import gsap  from "gsap";
interface FriseProps {
  result: string;
}


const Frise: FC<FriseProps> = ({ result }) => {

    React.useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 0.3 } });
    
        fakeData.forEach((_, index) => {
            timeline
                .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Elements__Dot`, { width: "31px", height: "31px" })
                .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Elements__Content`, { opacity: 1, rotateX: '0deg' }, "-=0.2")
                .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Line`, { width: "100%" }, "-=0.2")
                .to(`.Frise__Elements:nth-child(${index + 2}) .Frise__Elements__Dot`, { width: "31px", height: "31px" }, "-=0.2")
               
        });
    
    }, []);
    
    
  return (
    <div className="Frise__Wrapper">
      <div className="Frise__Container">
       
        {fakeData.map((dayDetail, index) => (
          <div key={index} className={`Frise__Elements`}>
            <div className="Frise_Timeline">
             <div className="Frise__Line"></div>
            <div className="Frise__Elements__Dot">
                <div className="Frise__Elements__Dot__Inner"></div>
            </div>
            </div>
            <div
              className={`Frise__Elements__Content__Container Frise__Elements--${
                index % 2 === 0 ? "Top" : "Bottom"
              }`}
            >
            <div className="Frise__Elements__Content">
              <span className="Day">{dayDetail.day}</span>
              <span className="Moment">{dayDetail.moment}</span>
              <p>{dayDetail.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frise;

const fakeData = [
  {
    day: "Day 1",
    moment: "Morning",
    description:
      "Visit Casa Amatller, a neo-Gothic building designed by Josep Puig i Cadafalch in 1900.",
  },
  {
    day: "Day 1",
    moment: "Lunch",
    description:
      "Eat at El Nacional, a restaurant located in a former palace with four different areas where you can eat.",
  },
  {
    day: "Day 1",
    moment: "Afternoon",
    description:
      "Visit Casa Batlló, a modernist building designed by Antoni Gaudí in 1904.",
  },
  {
    day: "Day 1",
    moment: "Evening",
    description:
      "Have dinner at Cerveseria Catalana, a well-known tapas bar that offers high-quality food at affordable prices.",
  },
  {
    day: "Day 1",
    moment: "Night",
    description: "Stay at hotel Generator Madrid",
  },
  {
    day: "Day 1",
    moment: "Morning",
    description:
      "Visit Casa Amatller, a neo-Gothic building designed by Josep Puig i Cadafalch in 1900.",
  },
  {
    day: "Day 1",
    moment: "Lunch",
    description:
      "Eat at El Nacional, a restaurant located in a former palace with four different areas where you can eat.",
  },
  {
    day: "Day 1",
    moment: "Afternoon",
    description:
      "Visit Casa Batlló, a modernist building designed by Antoni Gaudí in 1904.",
  },
  {
    day: "Day 1",
    moment: "Evening",
    description:
      "Have dinner at Cerveseria Catalana, a well-known tapas bar that offers high-quality food at affordable prices.",
  },
  {
    day: "Day 1",
    moment: "Night",
    description: "Stay at hotel Generator Madrid",
  },
  {
    day: "Day 1",
    moment: "Morning",
    description:
      "Visit Casa Amatller, a neo-Gothic building designed by Josep Puig i Cadafalch in 1900.",
  },
  {
    day: "Day 1",
    moment: "Lunch",
    description:
      "Eat at El Nacional, a restaurant located in a former palace with four different areas where you can eat.",
  },
  {
    day: "Day 1",
    moment: "Afternoon",
    description:
      "Visit Casa Batlló, a modernist building designed by Antoni Gaudí in 1904.",
  },
  {
    day: "Day 1",
    moment: "Evening",
    description:
      "Have dinner at Cerveseria Catalana, a well-known tapas bar that offers high-quality food at affordable prices.",
  },
  {
    day: "Day 1",
    moment: "Night",
    description: "Stay at hotel Generator Madrid",
  },
];
