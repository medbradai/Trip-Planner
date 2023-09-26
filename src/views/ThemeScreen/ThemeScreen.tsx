import "./ThemeScreen.css"
import {FunctionComponent, useState} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import TripPlannerLayout, {stepsTitleStyle} from "src/components/layout/TripPlannerLayout";
import {THEMES} from "src/utils/enums/theme";
import ThemeCard from "src/components/theme/ThemeCard/ThemeCard";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useNavigate} from "react-router-dom";

const ThemeScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tripPlanner = useStore(TripPlannerStore);

    const [theme, setTheme] = useState<string | undefined>(undefined);

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
        </TripPlannerLayout>
    )
}

export default ThemeScreen;
