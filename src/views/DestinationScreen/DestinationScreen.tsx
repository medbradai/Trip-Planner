import "./DestinationScreen.css"
import {FunctionComponent} from "react";
import {Button, Form, Input, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import TripPlannerLayout from "src/components/layout/TripPlannerLayout";
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";
import {useNavigate} from "react-router-dom";

const DestinationScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const tripPlanner = useStore(TripPlannerStore);

    const handleNext = () => {
        form.validateFields().then(() => {
                const destination = form.getFieldValue("cityQuery")
                if (destination) {
                    setTripPlanner({
                        ...tripPlanner.data,
                        destination,
                    });
                    navigate("/participants");
                }
            }
        ).catch(() => null)
    }
    return (
        <TripPlannerLayout>
            <Form form={form} className="destination-screen--form">
                <Typography.Text className="trip-planner-screen--content-title">{t("common.city")}</Typography.Text>
                <Space.Compact style={{width: '100%'}}>
                    <Form.Item
                        name="cityQuery"
                        rules={[{required: true, message: t("common.empty")}]}
                        style={{width: '70%'}}
                    >
                        <Input style={{width: '100%'}}/>
                    </Form.Item>
                    <Button type="primary" className="destination-screen--submit-button"
                            icon={<SendOutlined rotate={-45}/>} onClick={handleNext}/>
                </Space.Compact>
            </Form>
        </TripPlannerLayout>
    )
}

export default DestinationScreen;
