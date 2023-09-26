import {FunctionComponent} from "react";
import {Button, Form, FormInstance, Input, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";

export interface PropsType {
    next: () => void;
    form: FormInstance,
}
const Destination: FunctionComponent<PropsType> = ( { next, form }) => {
    const {t} = useTranslation();

    const tripPlanner = useStore(TripPlannerStore);

    const handleNext = () => {
        form.validateFields().then(() => {
                const destination = form.getFieldValue("cityQuery")
                if (destination) {
                    setTripPlanner({
                        ...tripPlanner.data,
                        destination,
                    });
                    next();
                }
            }
        ).catch(() => null)
    }
    return (
        <>
            <Typography.Text style={stepsTitleStyle}>{t("common.city")}</Typography.Text>
            <Space.Compact style={{width: '100%'}}>
                <Form.Item
                    name="cityQuery"
                    rules={[{required: true, message: t("common.empty")}]}
                    style={{width: '70%'}}
                >
                    <Input style={{width: '100%'}}/>
                </Form.Item>
                <Button type="primary" icon={<SendOutlined/>} onClick={handleNext}/>
            </Space.Compact>
        </>
    )
}

export default Destination;
