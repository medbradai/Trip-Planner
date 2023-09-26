import "./Participants.css"
import {FunctionComponent, useState} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "src/components/steps/step.props";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";
import ParticipantsCard from "src/components/steps/Participants/ParticipantsCard/ParticipantsCard";
import {setTripPlanner} from "../../../store/TripPlannerEvents";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../../store/TripPlannerStore";
import {PersonsCount} from "../../../store/trip.planer";

const Participants: FunctionComponent<StepPropsType> = ({next, form}) => {
    const {t} = useTranslation();
    const tripPlanner = useStore(TripPlannerStore);

    const [participantsCount, setParticipantsCount] = useState<PersonsCount>({
        adultsCount: 1,
        childrenCount: 0,
        babiesCount: 0
    });

    const handleNext = () => {
        setTripPlanner({
            ...tripPlanner.data,
            personsCount: participantsCount,
        });
        next();
    }


    return (
        <>
            <Typography.Text style={stepsTitleStyle}>{t("common.participants.title")}</Typography.Text>
            <div className="participants--cards">
                <ParticipantsCard countText={t("common.participants.count.adults")}
                                  countValue={participantsCount.adultsCount}
                                  onMinusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      adultsCount: newValue
                                  })}
                                  handlePlusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      adultsCount: newValue
                                  })}/>
                <ParticipantsCard countText={t("common.participants.count.children")}
                                  countValue={participantsCount.childrenCount}
                                  onMinusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      childrenCount: newValue
                                  })}
                                  handlePlusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      childrenCount: newValue
                                  })}/>
                <ParticipantsCard countText={t("common.participants.count.babies")}
                                  countValue={participantsCount.babiesCount}
                                  onMinusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      babiesCount: newValue
                                  })}
                                  handlePlusOne={(newValue) => setParticipantsCount({
                                      ...participantsCount,
                                      babiesCount: newValue
                                  })}/>
                <Button type="primary" icon={<SendOutlined  rotate={-45}/>} onClick={handleNext}
                        className="participants--card participants--card-next-button"/>
            </div>
        </>
    )
}

export default Participants;
