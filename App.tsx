import { exchangeRates } from "./mockData";
import { Converter } from "./components/Converter/Converter";
import { Page } from "./components/Page/Page.styles";

export default function App() {
  return (
    <Page>
      <Converter rates={exchangeRates} />
    </Page>
  );
}
