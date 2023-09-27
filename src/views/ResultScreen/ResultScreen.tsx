import "./ResultScreen.css"
import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {Alert, Button, Form, message, Spin, Typography} from "antd";
import {useTranslation} from "react-i18next";
import TripPlannerLayout from "src/components/layout/TripPlannerLayout";
import {useStore} from "effector-react";
import {TripPlannerStore} from "../../store/TripPlannerStore";
import {setTripPlannerQuery} from "../../store/TripPlannerEvents";
import {apiKey, modelApiUrl} from "src/utils/constants";
import Frise from "src/components/Frise/Frise";
import {useNavigate} from "react-router-dom";
import {buildAIQuery, buildFrenchQuery} from "src/utils/helpers/query-ai-helper";


const ResultScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const tripPlanner = useStore(TripPlannerStore);

    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [result, setResult] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmit = () => {
        setLoading(true);
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'X-Api-Key': apiKey},
            body: JSON.stringify({
                query: tripPlanner.englishQuery
            })

        }).then((response) => {
            return response.text().then((text) => {
                setResult(text);
                setLoading(false);
                messageApi.success(t("common.success"))
            });
        });

    }

    const buildTripPlannerQueryFromData = useCallback((): string[] => {
       return [buildAIQuery(tripPlanner.data), buildFrenchQuery(tripPlanner.data)]
    }, [tripPlanner.data]);

    useEffect(() => {
        setTripPlannerQuery(buildTripPlannerQueryFromData())
    }, [buildTripPlannerQueryFromData]);


    return (
        <TripPlannerLayout ellipseSource={"/img/ellipse-result.svg"} previousUrl="/theme">
            <Spin tip="Loading..." spinning={isLoading}>
                <Form layout={"vertical"} className="trip-planner-screen--form" onFinish={handleSubmit} form={form}>
                    {contextHolder}
                    <div className="result--item-container">
                        <Typography.Text
                            className="trip-planner-screen--content-title">{t("common.result.title")}</Typography.Text>
                    </div>
                    <div className="result--item-container">
                        <Typography.Text>{tripPlanner.frenchQuery}</Typography.Text>
                    </div>
                    <div className="result--item-container">
                        <Typography.Text
                            className="trip-planner-screen--content-title">{t("common.result.confirm")}</Typography.Text>
                    </div>
                    <div className="result--item-container result--buttons-container">
                        <Button type="primary" htmlType="submit"
                                className="result--confirm-button">{t("common.yes")}</Button>
                        <Button type="text" onClick={() => navigate("/")}>{t("common.no")}</Button>
                    </div>
                </Form>
                {result &&
                    <>
                        <div className="result-screen--result-title">
                            <Typography.Text
                                className="trip-planner-screen--content-title">{t("common.result.result")}</Typography.Text>
                        </div>
                        <Frise result={result}/>
                        <div className="trip-planner-screen--result">
                            <div>
                                <Alert style={{whiteSpace: 'pre-line'}} message={result} type="warning"/>
                            </div>
                        </div>
                    </>
                }
            </Spin>
        </TripPlannerLayout>
    )
}

export default ResultScreen;
