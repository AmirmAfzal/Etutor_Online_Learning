import DurationClient from "./DurationClient";

interface Props {
  duration: number[];
  searchParams: {
    query?: string;
    duration?: string;
  };
}

const Duration = (props: Props) => {
  return (
    <DurationClient
      duration={props.duration}
      searchParams={props.searchParams}
    />
  );
};

export default Duration;
