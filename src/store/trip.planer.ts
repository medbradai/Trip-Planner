import {ThemeType} from "@utils/enums/theme";

export interface TripPlannerData {
    destination?: string;
    personsCount?: PersonsCount;
    theme?: ThemeType;
    days?: number;
}

export interface PersonsCount {
    adultsCount: number;
    childrenCount: number;
    babiesCount: number;
}