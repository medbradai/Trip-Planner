import { createEvent } from "effector";
import {TripPlannerData} from "./trip.planer";

export const setTripPlanner = createEvent<TripPlannerData>("SET_TRIP_PLANNER");

export const setTripPlannerQuery = createEvent<string>("SET_TRIP_PLANNER_QUERY");

