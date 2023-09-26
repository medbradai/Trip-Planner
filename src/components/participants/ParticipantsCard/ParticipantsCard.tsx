import "./ParticipantsCard.css"
import {FunctionComponent, useCallback} from "react";
import {Button} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

interface ParticipantsCardPropsType {
    countText: string;
    countValue: number;
    minusThanOneIsAllow?: boolean;
    handlePlusOne: (countValue: number) => void;
    onMinusOne: (countValue: number) => void;
}

const ParticipantsCard: FunctionComponent<ParticipantsCardPropsType> = ({
                                                                            countText,
                                                                            countValue,
                                                                            minusThanOneIsAllow = false,
                                                                            handlePlusOne,
                                                                            onMinusOne
                                                                        }) => {

    const handleMinusOne = useCallback(() => {
        if (countValue > 1) {
            onMinusOne(countValue - 1)
        } else if (countValue > 0 && minusThanOneIsAllow) {
            onMinusOne(countValue - 1)
        }
    }, [onMinusOne, countValue, minusThanOneIsAllow])

    return (
        <div className="participants--card">
            <div className="participants--card-container">
                <h2 className="participants--card-title">{countText}</h2>
                <div className="participants--card-buttons-container">
                    <Button onClick={() => handlePlusOne(countValue + 1)} icon={<PlusOutlined/>}
                            color="#EE31A414" className="participants--card-button"/>
                    <span>{countValue}</span>
                    <Button onClick={handleMinusOne} icon={<MinusOutlined color="#EE31A414"/>}
                            className="participants--card-button"/>
                </div>
            </div>
        </div>
    )
}

export default ParticipantsCard;
