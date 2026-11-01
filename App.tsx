import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useExchangeRates } from "./hooks/useExchangeRates";
import { Converter } from "./components/Converter/Converter";
import { RatesTable } from "./components/RatesTable/RatesTable";
import { Caption, Page, Title } from "./components/Page/Page.styles";

const queryClient = new QueryClient();

function Rates() {
  const { data, isPending, isError } = useExchangeRates();

  if (isPending) return <Caption>Loading exchange rates…</Caption>;
  if (isError) return <Caption>Could not load exchange rates.</Caption>;

  return (
    <>
      <Converter rates={data.rates} />
      <RatesTable rates={data.rates} date={data.date} />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Title>Czech koruna converter</Title>
        <Rates />
      </Page>
    </QueryClientProvider>
  );
}
