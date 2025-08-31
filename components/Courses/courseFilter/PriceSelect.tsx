import PriceSelectClient from "./PriceSelectClient";

type Props = {
  price: { [key: string]: number };
  currentPriceFilters: { Free: boolean; Paid: boolean };
  searchParams: Promise<{
    query?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

const PriceSelect = async (props: Props) => {
  const searchParams = await props.searchParams;

  return (
    <PriceSelectClient
      price={props.price}
      currentPriceFilters={props.currentPriceFilters}
      searchParams={searchParams}
    />
  );
};

export default PriceSelect;
