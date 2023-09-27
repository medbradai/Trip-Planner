import {createStore} from "effector";
import {TripPlannerData} from "src/store/trip.planer";
import {setTripPlanner, setTripPlannerQuery} from "./TripPlannerEvents";

interface TripPlanner {
    data: TripPlannerData;
    englishQuery?: string;
    frenchQuery?: string;
}

export const TripPlannerStore = createStore<TripPlanner>({data: {}})
    .on<TripPlannerData>(
        setTripPlanner,
        (state: TripPlanner, payload: TripPlannerData) => {
            return {
                data: payload,
                englishQuery: undefined,
                frenchQuery: undefined
            }
        },
    ).on<string[]>(
        setTripPlannerQuery,
        (state: TripPlanner, payload: string[]) => {
            return {
                data: state.data,
                englishQuery: payload[0],
                frenchQuery: payload[1]
            }
        },
    );

