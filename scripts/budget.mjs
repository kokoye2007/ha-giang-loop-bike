export function normaliseCount(value, minimum = 0, maximum = 100) {
    return Math.max(minimum, Math.min(maximum, Math.floor(Number(value) || minimum)));
}

export function calculateBudget(data, scenario) {
    const counts = Object.fromEntries(data.package.pricing.rides.map(ride => [ride.id, normaliseCount(scenario.rides?.[ride.id])]));
    const people = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const tour = data.package.pricing.rides.reduce((sum, ride) => sum + counts[ride.id] * ride.amount, 0);
    const rules = data.budgetRules;
    const busPrice = data.package.pricing.extras.find(extra => extra.id === 'hanoi-bus').amount;
    const bus = scenario.bus ? people * rules.busDirections * busPrice : 0;
    const quantities = {
        people,
        roomNights: Math.ceil(people / normaliseCount(scenario.roomSharing, 1, 10)) * normaliseCount(scenario.hanoiNights ?? rules.hanoiNights, 0, 8),
        vehicleTransfers: Math.ceil(people / normaliseCount(scenario.vehicleSharing, 1, 20)) * rules.airportTransfers,
        foodDays: people * rules.foodDays,
        booking: people ? 1 : 0
    };
    const allowances = data.budget.map(item => ({...item, quantity: quantities[item.scale]}));
    const known = allowances.reduce((sum, item) => sum + (item.amount ?? 0) * item.quantity, 0);
    const warnings = [];
    if (people > 6) warnings.push('Ask Valor to confirm capacity or split/private groups for more than six.');
    if (counts.jeep === 1) warnings.push('Jeep requires at least two people.');
    if (counts.friend > counts.self) warnings.push('Friend passengers outnumber self-riders: confirm one eligible rider per passenger.');
    if (counts.self || counts.friend) warnings.push('Riding eligibility and insurance remain unconfirmed; operator approval alone is insufficient.');
    return {counts, people, tour, bus, allowances, known, warnings};
}
