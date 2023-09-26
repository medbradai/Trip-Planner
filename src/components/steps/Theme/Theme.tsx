import "./Theme.css"
import {FunctionComponent, useState} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "src/components/steps/step.props";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";
import {THEMES} from "src/utils/enums/theme";
import ThemeCard from "src/components/steps/Theme/ThemeCard/ThemeCard";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../../store/TripPlannerStore";
import {setTripPlanner} from "../../../store/TripPlannerEvents";

const Theme: FunctionComponent<StepPropsType> = ({next, form}) => {
    const {t} = useTranslation();
    const tripPlanner = useStore(TripPlannerStore);

    const [theme, setTheme] = useState<string | undefined>(undefined);

    const handleNext = () => {
        if (theme) {
            setTripPlanner({
                ...tripPlanner.data,
                theme: theme,
            });
            next();
        }
    }

    return (
        <>
            <Typography.Text style={stepsTitleStyle}>{t("common.budget")}</Typography.Text>
            <div className="theme--cards">
                {THEMES.map(theme => {
                    return (
                        <ThemeCard theme={theme} onClickTheme={(value) => setTheme(value)}/>
                    )
                })}
                <Button type="primary" icon={<SendOutlined rotate={-45}/>} onClick={handleNext}
                        className="theme--card theme--next-button-card"/>
            </div>
        </>
    )
}

export default Theme;
