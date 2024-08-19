import { Container, SortPopup, Title, TopBar } from "@/components/shared";
import { Categories } from "@/components/shared/";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піцци" size="lg" className="font-extrabold" />

        {/* <Categories />
        <SortPopup /> */}
      </Container>
      <TopBar />
    </>
  );
}
