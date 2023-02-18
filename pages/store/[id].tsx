import { productsData } from "@utils";
import { Title } from "@ui";
import { Divider } from "@helper";
import { Products } from "@components";

export default function StorePage() {
  return (
    <div>
      <Divider height={100} />
      <Title text={"Choose your products"} tag={"h2"} />
      <Divider height={100} />
      <Products items={productsData} />
      <Divider height={100} />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}