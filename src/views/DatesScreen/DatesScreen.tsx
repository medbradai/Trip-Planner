import {FunctionComponent} from "react";
import {Button, DatePicker, Form, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import TripPlannerLayout, {stepsTitleStyle} from "src/components/layout/TripPlannerLayout";
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/fr_FR';
import 'dayjs/locale/fr';
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
            <Form form={form}>
                <Typography.Text style={stepsTitleStyle}>{t("common.date")}</Typography.Text>
                <Space.Compact style={{width: '100%'}}>
                    <Form.Item
                        name="date"
                        rules={[{required: true, message: t("common.empty")}]}
                        style={{width: '70%'}}
                    >
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Button type="primary" icon={<SendOutlined/>} onClick={handleNext}/>
                </Space.Compact>
            </Form>
        </TripPlannerLayout>
    )
}

export default DatesScreen;
