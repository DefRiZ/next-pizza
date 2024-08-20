import {
  Container,
  Filter,
  SortPopup,
  Title,
  TopBar,
} from "@/components/shared";
import { Categories } from "@/components/shared/";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піцци" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* Filtration */}
          <div className="w-[250px]">
            <Filter />
          </div>
          {/* Products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Products</div>
          </div>
        </div>
      </Container>
    </>
  );
}
