import "./ThemeScreen.css"
import {FunctionComponent, useState} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import TripPlannerLayout from "src/components/layout/TripPlannerLayout";
import {THEMES, ThemeType} from "src/utils/enums/theme";
import ThemeCard from "src/components/theme/ThemeCard/ThemeCard";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useNavigate} from "react-router-dom";

const ThemeScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tripPlanner = useStore(TripPlannerStore);

    const [theme, setTheme] = useState<ThemeType | undefined>(undefined);

    const handleNext = () => {
        if (theme) {
            setTripPlanner({
                ...tripPlanner.data,
                theme: theme,
            });
            navigate("/result")
        }
    }

    return (
        <TripPlannerLayout previousUrl="/dates">
            <>
                <Typography.Text className="trip-planner-screen--content-title">{t("common.budget")}</Typography.Text>
                <div className="theme--cards">
                    {THEMES.map(themeCard => {
                        return (
                            <ThemeCard theme={themeCard} onClickTheme={(clickedTheme) => setTheme(THEMES.find(theme => theme === clickedTheme))} isSelected={themeCard === theme}/>
                        )
                    })}
                    <Button type="primary" icon={<SendOutlined rotate={-45}/>} onClick={handleNext}
                            className="theme--card theme--next-button-card"/>
                </div>
            </>
        </TripPlannerLayout>
    )
}

export default ThemeScreen;
