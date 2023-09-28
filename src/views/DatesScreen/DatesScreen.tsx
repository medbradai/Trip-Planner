import "./DatesScreen.css";
import {FunctionComponent, useState} from "react";
import {Button, DatePicker, Form, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import TripPlannerLayout from "src/components/layout/TripPlannerLayout";
import dayjs from 'dayjs';
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";
import {useNavigate} from "react-router-dom";

const {RangePicker} = DatePicker;
const DatesScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tripPlanner = useStore(TripPlannerStore);
    const [form] = Form.useForm();

    const [days, setDays] = useState<number | undefined>(undefined);
    const handleNext = () => {
        form.validateFields().then(() => {
                const startDate = dayjs(form.getFieldValue("date")[0]);
                const endDate = dayjs(form.getFieldValue("date")[1]);
                const days = endDate.diff(startDate, 'day');
                if (days) {
                    setTripPlanner({
                        ...tripPlanner.data,
                        days,
                    });
                    navigate("/theme");
                }
            }
        ).catch(() => null)
    }

    return (
        <TripPlannerLayout previousUrl="/participants">
            <>
                <Typography.Text
                    className="trip-planner-screen--content-title">{t("common.date.title")}</Typography.Text>
                <Form form={form} className="dates-screen--form">
                    <Form.Item
                        name="date"
                        rules={[{required: true, message: t("common.empty")}]}
                    >
                        <RangePicker onChange={(values) => {
                            const startDate = values && values[0];
                            const endDate = values && values[1];
                            startDate && endDate && setDays(endDate.diff(startDate, 'day'))
                        }}/>
                    </Form.Item>
                    <Button className="dates-screen--button" type="primary" icon={<SendOutlined rotate={-45}/>}
                            onClick={handleNext}/>
                </Form>
                {days && <Typography.Text>{t("common.date.days", {days})}</Typography.Text>}
                <div className="dates-screen--button-container">
                </div>
            </>
        </TripPlannerLayout>
    )
}

export default DatesScreen;
