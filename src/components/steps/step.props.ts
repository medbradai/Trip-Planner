import {FormInstance} from "antd";

export interface StepPropsType {
    next: () => void;
    form: FormInstance,
}
