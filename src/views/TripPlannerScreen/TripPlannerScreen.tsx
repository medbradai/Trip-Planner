import "./TripPlannerScreen.css"
import React, {FunctionComponent, useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Alert, Form, FormInstance, Image, Layout, message, Spin, Steps, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {apiKey, modelApiUrl} from "src/utils/constants";
import Destination from "src/components/steps/Destination";
import Participants from "src/components/steps/Participants/Participants";
import Date from "src/components/steps/Date";
import Result from "src/components/steps/Result/Result";
import Theme from "src/components/steps/Theme/Theme";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";

const steps = (
    next: () => void,
    form: FormInstance,
) => [
    {
        title: "",
        content: <Destination next={next} form={form} />
    },
    {
        title: "",
        content: <Participants next={next} form={form} />,
    },
    {
        title: "",
        content: <Date next={next} form={form} />,
    },
    {
        title: "",
        content: <Theme next={next} form={form} />,
    },
    {
        title: "",
        content: <Result />,
        disabled: true
    },
];



export const stepsTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontFamily: "Open Sans",
    color: '#2816C0',
    fontWeight: 600
}


const TripPlannerScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const tripPlanner = useStore(TripPlannerStore);

    const [messageApi, contextHolder] = message.useMessage();

    const [result, setResult] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);

    const handleSubmit = () => {
        setLoading(true);
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'X-Api-Key': apiKey},
            body:  JSON.stringify({
                destination: tripPlanner.query,
                persons: 1,
                budget: 100,
                days: 2
            })

        }).then((response) => {
            return response.text().then((text) => {
                setResult(text);
                setLoading(false);
                messageApi.success(t("common.success"))
            });
        });

    }
    const onStepperChange = (value: number) => {
        setCurrent(value);
    };

    const next =  () => {
        setCurrent(current + 1);
    }

    return (
        <Layout className="layout">
            {contextHolder}
            <Header className="trip-planner-screen--header">
                <Typography.Title className="trip-planner-screen--header-subtitle" level={2}>{t("common.title2")}</Typography.Title>
                <Typography.Title className="trip-planner-screen--header-title" level={1}>{t("common.title1")}</Typography.Title>

            </Header>
            <Content className="trip-planner-screen--content">
                <>
                    <div className="trip-planner-screen--city-container">
                        <Image
                            preview={false}
                            height={212}
                            src="/img/image 1.svg"
                        />
                        <Image
                            preview={false}
                            src="/img/ellipse.svg"
                        />
                    </div>
                    <Spin tip="Loading..." spinning={isLoading}>
                        <Form layout={"vertical"} className="trip-planner-screen--form" onFinish={handleSubmit} form={form}>
                            <Steps current={current} items={steps(next, form)} onChange={onStepperChange}/>
                            <div className="trip-planner-screen--content">{steps(next, form)[current].content}</div>
                        </Form>
                    </Spin>

                    {result &&
                        <div className="trip-planner-screen--result">
                            <Typography.Text style={stepsTitleStyle}>{t("common.result.result")}</Typography.Text>
                            <div>
                                <Alert style={{whiteSpace: 'pre-line'}} message={result} type="warning"/>
                            </div>
                        </div>}
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerScreen;
