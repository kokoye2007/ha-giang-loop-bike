# Research & Plan Agent — Accountability Review

## Scope and verdict

Reviewer: Dewey (Research & Plan agent). Local records and source were audited; external claims were not freshly verified. The provisional route is internally coherent, but transfers, a complete budget and claim-level evidence remain unfinished.

## Findings

### R1 · P1 · Transfers are the critical dependency

Evidence: the 7 November plan requires early Hanoi arrival and a Ha Giang overnight before briefing. Flight/pickup times are absent. The 11 November Hanoi arrival is conditional, while the calculator assumes three Hanoi room nights.

Action: record confirmed flight times, pickup, transfer windows and fallback accommodation before treating the schedule as bookable.

### R2 · P1 · Day 3 has no complete time budget

Evidence: Ma Pi Leng and the optional boat allowances total 270 minutes, alongside 107km travel and a 09:30 departure. Riding, meals, access and delay buffers are not quantified. Lung Cu also appears in Day 2 despite confirmation-needed status.

Action: separate core/optional activities and record operator-confirmed timing plus weather/transfer contingencies.

### R3 · P1 · Partial budget lacks one quantity model

Evidence: legacy JSON quantities and calculator totals diverge; nights, food days and airport transfers are hardcoded in JavaScript. Flights, insurance, VAT, fees, boat and upgrades remain unknown. Friend-passenger and self-rider counts are not paired; member choices do not seed the calculator.

Action: reconcile quantities and add explicit coverage gaps and contingency allowances. Obtain written charging units for upgrades and transfers.

### R4 · P2 · Source lists do not establish individual claims

Evidence: source records contain URLs/dates but no saved supporting extracts. Checkpoints reuse the same three source IDs without linking inclusion, duration or coordinate claims individually.

Action: record claim, supporting source, checked date, evidence summary and confidence. Distinguish operator statements from planning estimates.

### R5 · P2 · Independent document evidence is missing

Evidence: current advice delegates licence/insurance confirmation to Valor; no dedicated independent licensing, entry or insurance-policy trail is recorded.

Action: research applicable official requirements and the actual traveller policy when details are available. This finding does not establish anyone's riding eligibility.

## Ordered next plan

1. Confirm dates, group size, ride choices and flight times.
2. Obtain the written operator quote and transfer/accommodation terms.
3. Check Day 3 and transfer-day feasibility with fallback options.
4. Reconcile budget rules and unknown costs in canonical data.
5. Add claim-level evidence and supersession labels to old reports.
6. Extend source-reference, itinerary and budget validation.

## Verification

The agent ran `npm test`: data validation and six weather tests passed. Four legs total 424km; loop dates align with the eight-day itinerary; 9 November 2026 is Monday. These checks establish internal consistency, not booking confirmation.
