import {TripPlannerData} from "../../store/trip.planer";
import i18n from "i18next";
import {FriseItem} from "../../lib/tripplanner/frise.item";

export const buildAIQuery = (tripPlannerData: TripPlannerData): string => {
    return `destination  ${tripPlannerData.destination} with ${tripPlannerData.personsCount?.adultsCount && `${tripPlannerData.personsCount.adultsCount}  adult(s)`}${tripPlannerData.personsCount?.childrenCount ? `, ${tripPlannerData.personsCount.childrenCount} children` : ''}${tripPlannerData.personsCount?.babiesCount ? ` and ${tripPlannerData.personsCount.babiesCount}  babies` : ''} for ${tripPlannerData.days} days for a moment ${tripPlannerData.theme && i18n.t(tripPlannerData.theme.label).toLocaleLowerCase()}`;

};

export const buildFrenchQuery = (tripPlannerData: TripPlannerData): string => {
    return `à ${tripPlannerData.destination} avec 
        ${tripPlannerData.personsCount?.adultsCount && `${tripPlannerData.personsCount.adultsCount}  adulte(s)`}
         ${tripPlannerData.personsCount?.childrenCount ? `, ${tripPlannerData.personsCount.childrenCount}  enfant(s)` : ''}
             ${tripPlannerData.personsCount?.babiesCount ? `et ${tripPlannerData.personsCount.babiesCount}  bébé(s)` : ''}
         pendant ${tripPlannerData.days} jours pour un moment ${tripPlannerData.theme && i18n.t(tripPlannerData.theme.label).toLocaleLowerCase()}`
};

export const buildFriseFromAIResponse = (response: string): FriseItem[] => {
    const result: FriseItem[] = [];
    let filteredResponse = ""
    if(response.indexOf("Day 1") !== -1) {
        filteredResponse = response.split("Day 1")[1]
    } else {
        filteredResponse = response.split("Day number")[1]
    }

    const days = filteredResponse.split("\nDay");
    days.forEach((oneDay, dayNumber) => {
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Morning",
            description: oneDay.substring(oneDay.indexOf("Morning:") + 8, oneDay.indexOf("Lunch:"))
        })

        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Lunch",
            description: oneDay.substring(oneDay.indexOf("Lunch:") + 7, oneDay.indexOf("Afternoon:"))
        })
        const firstAfternoonIndex = oneDay.lastIndexOf("Afternoon:") + 10
        const lastAfternoonIndex = oneDay.indexOf("Evening:") !== -1 ? oneDay.indexOf("Evening:") : undefined;
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Afternoon",
            description: oneDay.substring(firstAfternoonIndex, lastAfternoonIndex || oneDay.lastIndexOf("\n") > firstAfternoonIndex ? oneDay.lastIndexOf("\n") : oneDay.length)
        })
        if(lastAfternoonIndex) {
            const firstEveningIndex = oneDay.indexOf("Evening:") + 8;
            const lastEveningIndex = oneDay.indexOf("Night:") !== - 1 ? oneDay.indexOf("Night:") : undefined;
            result.push({
                day: `Day ${dayNumber + 1}`,
                moment: "Evening",
                description: oneDay.substring(firstEveningIndex, lastEveningIndex || oneDay.lastIndexOf("\n") > firstEveningIndex ? oneDay.lastIndexOf("\n") : oneDay.length)
            })
            if(lastEveningIndex) {
                const lastNightIndex = oneDay.lastIndexOf("\n") > oneDay.indexOf("Night:") ? oneDay.lastIndexOf("\n") : undefined
                result.push({
                    day: `Day ${dayNumber + 1}`,
                    moment: "Night",
                    description: oneDay.substring(oneDay.indexOf("Night:") + 6, lastNightIndex || oneDay.length)
                })
            }
        }
    })
    return result;
}

