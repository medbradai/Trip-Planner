export interface TripPlannerData {
    destination?: string;
    personsCount?: PersonsCount;
    theme?: string;
    days?: number;
}

export interface PersonsCount {
    adultsCount: number;
    childrenCount: number;
    babiesCount: number;
}