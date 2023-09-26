import { createStore } from "effector";
import { TripPlannerData } from "src/store/trip.planer";
import {setTripPlanner, setTripPlannerQuery} from "./TripPlannerEvents";

interface TripPlanner {
  data: TripPlannerData;
  query?: string;
}
export const TripPlannerStore = createStore<TripPlanner>({data: {}})
  .on<TripPlannerData>(
      setTripPlanner,
    (state: TripPlanner, payload: TripPlannerData) => {
        return {
          data: payload,
          query: undefined
        }
    },
  ).on<string>(
        setTripPlannerQuery,
        (state: TripPlanner, payload: string) => {
          return {
            data: state.data,
            query: payload
          }
        },
    );
