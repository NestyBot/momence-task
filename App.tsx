import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useExchangeRates } from "./hooks/useExchangeRates";
import { Converter } from "./components/Converter/Converter";
import { Caption, Page } from "./components/Page/Page.styles";

const queryClient = new QueryClient();

function Rates() {
  const { data, isPending, isError } = useExchangeRates();

  if (isPending) return <Caption>Loading exchange rates…</Caption>;
  if (isError) return <Caption>Could not load exchange rates.</Caption>;

  return (
    <>
      <Converter rates={data.rates} />
      <Caption>CNB exchange rates from {data.date}</Caption>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Rates />
      </Page>
    </QueryClientProvider>
  );
}
