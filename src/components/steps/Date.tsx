import {FunctionComponent} from "react";
import {Button, DatePicker, Form, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "src/components/steps/step.props";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/fr_FR';

import 'dayjs/locale/fr';
import {setTripPlanner} from "../../store/TripPlannerEvents";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";

const { RangePicker } = DatePicker;
const Destination: FunctionComponent<StepPropsType> = ({ next, form }) => {
    const {t} = useTranslation();

    const tripPlanner = useStore(TripPlannerStore);
    const handleNext = () => {
        form.validateFields().then(() => {
                const startDate = dayjs(form.getFieldValue("date")[0]);
                const endDate = dayjs(form.getFieldValue("date")[1]);
                const days = endDate.diff(startDate,'day');
                if (days) {
                    setTripPlanner({
                        ...tripPlanner.data,
                        days,
                    });
                    next();
                }
            }
        ).catch(() => null)
    }

    return (
        <>
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
        </>
    )
}

export default Destination;
