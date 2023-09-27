import "./ThemeCard.css"
import {FunctionComponent} from "react";
import {Button, Image} from "antd";
import {ThemeType} from "@utils/enums/theme";
import {useTranslation} from "react-i18next";

interface ThemeCardPropsType {
    theme: ThemeType,
    onClickTheme: (theme: ThemeType) => void;
    isSelected?: boolean;
}

const ThemeCard: FunctionComponent<ThemeCardPropsType> = ({theme, onClickTheme, isSelected = false}) => {

    const {t} = useTranslation();

    return (
        <Button type="default" onClick={() => onClickTheme(theme)}
                className={`theme--card ${isSelected ? 'theme--card-selected' : ''}`}>
            <Image
                preview={false}
                src={theme.imageSource}
            />
            <h2 className="participants--card-title">{t(theme.label)}</h2>
        </Button>
    )
}

export default ThemeCard;
