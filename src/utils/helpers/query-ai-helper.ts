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
    const filteredResponse = response.split("Day 1")[1]
    const days = filteredResponse.split("Day");
    days.forEach((oneDay, dayNumber) => {
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Morning",
            description: oneDay.substring(oneDay.lastIndexOf("Morning:"), oneDay.indexOf("Lunch:"))
        })

        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Lunch",
            description: oneDay.substring(oneDay.lastIndexOf("Lunch:"), oneDay.indexOf("Afternoon:"))
        })
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Afternoon",
            description: oneDay.substring(oneDay.lastIndexOf("Afternoon:"), oneDay.indexOf("Evening:"))
        })
        const nightOrEveningIndex = oneDay.indexOf("Night:") !== - 1 ? oneDay.indexOf("Night:") : oneDay.indexOf("Diner:");
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Evening",
            description: oneDay.substring(oneDay.lastIndexOf("Evening:"), nightOrEveningIndex)
        })
        result.push({
            day: `Day ${dayNumber + 1}`,
            moment: "Night",
            description: oneDay.substring(nightOrEveningIndex, oneDay.length)
        })

    })
    return result;
}

