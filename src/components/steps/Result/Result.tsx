import "./Result.css"
import {FunctionComponent, useCallback, useEffect} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../../store/TripPlannerStore";
import {setTripPlannerQuery} from "../../../store/TripPlannerEvents";


const Result: FunctionComponent = () => {
    const {t} = useTranslation();
    const tripPlanner = useStore(TripPlannerStore);

    const buildTripPlannerQueryFromData = useCallback((): string => {
        return `à ${tripPlanner.data.destination} avec 
        ${tripPlanner.data.personsCount?.adultsCount && `${tripPlanner.data.personsCount.adultsCount}  adulte(s)`}
         ${tripPlanner.data.personsCount?.childrenCount ? `${tripPlanner.data.personsCount.childrenCount}  enfant(s)` : ''}
             ${tripPlanner.data.personsCount?.babiesCount ? `${tripPlanner.data.personsCount.babiesCount}  bébé(s)` : ''}
         pendant ${tripPlanner.data.days} jours pour un moment ${tripPlanner.data.theme}`
    }, [tripPlanner.data]);

    useEffect(() => {
        setTripPlannerQuery(buildTripPlannerQueryFromData())
    }, [buildTripPlannerQueryFromData]);


    return (
        <>
            <div>
                <Typography.Text style={stepsTitleStyle}>{t("common.result.title")}</Typography.Text>
            </div>
            <div>
                <Typography.Text>{tripPlanner.query}</Typography.Text>
            </div>
            <div>
                <Typography.Text style={stepsTitleStyle}>{t("common.result.confirm")}</Typography.Text>
            </div>
            <div className="result--buttons-container">
                <Button type="primary" htmlType="submit" className="result--confirm-button">{t("common.yes")}</Button>
                <Button type="text">{t("common.no")}</Button>
            </div>
        </>
    )
}

export default Result;
