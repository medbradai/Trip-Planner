import "./ThemeCard.css"
import {FunctionComponent} from "react";
import {Button, Image} from "antd";
import {ThemeType} from "@utils/enums/theme";
import {useTranslation} from "react-i18next";

interface ThemeCardPropsType {
    theme: ThemeType,
    onClickTheme: (value: string) => void;
}

const ThemeCard: FunctionComponent<ThemeCardPropsType> = ({theme, onClickTheme}) => {

    const {t} = useTranslation();

    return (
        <Button type="default" onClick={() => onClickTheme(t(theme.label))}
                className="theme--card">
            <Image
                preview={false}
                src={theme.imageSource}
            />
            <h2 className="participants--card-title">{t(theme.label)}</h2>
        </Button>
    )
}

export default ThemeCard;
