import { useId, useRef } from "react";
import { useScrollEdges } from "../../hooks/useScrollEdges";
import type { ExchangeRate } from "../../utils/exchangeRates";
import {
  BodyRow,
  Cell,
  Chevron,
  Code,
  Count,
  HeaderCell,
  HintBadge,
  NoWrap,
  Scroll,
  ScrollArea,
  ScrollHint,
  Summary,
  Table,
  Wrapper,
} from "./RatesTable.styles";

// CNB publishes rates with 3 decimal places
const rateFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const arrowProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function RatesTable({ rates, date }: { rates: ExchangeRate[]; date: string }) {
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(scrollRef);

  return (
    <Wrapper open>
      <Summary>
        <Chevron viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
        <span id={titleId}>CNB exchange rates from <NoWrap>{date}</NoWrap></span>
        <Count>
          {rates.length} {rates.length === 1 ? "currency" : "currencies"}
        </Count>
      </Summary>
      <ScrollArea>
        <Scroll ref={scrollRef}>
          <Table aria-labelledby={titleId}>
            <thead>
              <tr>
                <HeaderCell scope="col">Country</HeaderCell>
                <HeaderCell scope="col">Currency</HeaderCell>
                <HeaderCell scope="col">Code</HeaderCell>
                <HeaderCell scope="col" $numeric>Amount</HeaderCell>
                <HeaderCell scope="col" $numeric>Rate (CZK)</HeaderCell>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <BodyRow key={rate.code}>
                  <Cell>{rate.country}</Cell>
                  <Cell>{rate.currency}</Cell>
                  <Cell translate="no"><Code>{rate.code}</Code></Cell>
                  <Cell $numeric translate="no">{rate.amount}</Cell>
                  <Cell $numeric translate="no">{rateFormat.format(rate.rate)}</Cell>
                </BodyRow>
              ))}
            </tbody>
          </Table>
        </Scroll>
        <ScrollHint $side="left" $visible={edges.left} aria-hidden="true">
          <HintBadge viewBox="0 0 24 24">
            <path d="M15 6l-6 6 6 6" {...arrowProps} />
          </HintBadge>
        </ScrollHint>
        <ScrollHint $side="right" $visible={edges.right} aria-hidden="true">
          <HintBadge viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" {...arrowProps} />
          </HintBadge>
        </ScrollHint>
      </ScrollArea>
    </Wrapper>
  );
}
