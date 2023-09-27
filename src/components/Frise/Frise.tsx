import React, {FC, useState} from "react";
import "./Frise.css";
import gsap from "gsap";
import {buildFriseFromAIResponse} from "src/utils/helpers/query-ai-helper";
import {FriseItem} from "../../lib/tripplanner/frise.item";
import {message} from "antd";

interface FriseProps {
    result: string;
}


const Frise: FC<FriseProps> = ({result}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [friseItems, setFriseItems] = useState<FriseItem[]>([])

    React.useEffect(() => {
        const timeline = gsap.timeline({defaults: {duration: 0.3}});

        try {
            setFriseItems(buildFriseFromAIResponse(result));
            friseItems.forEach((_, index) => {
                timeline
                    .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Elements__Dot`, {
                        width: "31px",
                        height: "31px"
                    })
                    .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Elements__Content`, {
                        opacity: 1,
                        rotateX: '0deg'
                    }, "-=0.2")
                    .to(`.Frise__Elements:nth-child(${index + 1}) .Frise__Line`, {width: "100%"}, "-=0.2")
                    .to(`.Frise__Elements:nth-child(${index + 2}) .Frise__Elements__Dot`, {
                        width: "31px",
                        height: "31px"
                    }, "-=0.2")

            });
        } catch (e) {
            console.log(`Erreur lors du parsing de la réponse ${result}`)
            messageApi.error("Erreur lors du parsing de la réponse")
        }


    }, [result, friseItems, messageApi]);


    return (
        <>
            {contextHolder}
            {friseItems.length > 0 &&
                <div className="Frise__Wrapper">
                    <div className="Frise__Container">
                        {friseItems.map((dayDetail, index) => (
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
            }
        </>
    );
};

export default Frise;
