import "./TripPlannerLayout.css"
import React, {FunctionComponent, ReactElement} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Image, Layout, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const stepsTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontFamily: "Open Sans",
    color: '#2816C0',
    fontWeight: 600
}

interface TripPlannerLayoutProps {
    children: ReactElement;
    ellipseSource?: string
    previousUrl?: string;
}

const TripPlannerLayout: FunctionComponent<TripPlannerLayoutProps> = ({
                                                                          children,
                                                                          ellipseSource = "/img/ellipse.svg",
                                                                          previousUrl
                                                                      }) => {
    const {t} = useTranslation();

    return (
        <Layout className="layout">
            <Header className="trip-planner-screen--header">
                <Typography.Title className="trip-planner-screen--header-subtitle"
                                  level={2}>{t("common.title2")}</Typography.Title>
                <Typography.Title className="trip-planner-screen--header-title"
                                  level={1}>{t("common.title1")}</Typography.Title>

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
                            src={ellipseSource}
                        />
                    </div>
                    <div className="trip-planner-screen--route-content">
                        {previousUrl &&
                            <div className="trip-planner-screen--last-step">
                                <Link to={previousUrl}><ArrowLeftOutlined/>{t("common.previous")}</Link>
                            </div>
                        }
                        {children}
                    </div>
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerLayout;
