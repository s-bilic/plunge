import { Title } from "@ui";
export default function StorePage() {
  return (
    <div>
      <Title text={"Choose your products"} tag={"h2"} />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
