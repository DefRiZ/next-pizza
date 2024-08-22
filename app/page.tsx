import {
  Container,
  Filter,
  SortPopup,
  Title,
  TopBar,
} from "@/components/shared";
import { Categories } from "@/components/shared/";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGroupList } from "@/components/shared/products-group-list";

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
            <div className="flex flex-col gap-16">
              <ProductGroupList
                title="Піца"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 2,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 3,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 4,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                ]}
              />
              <ProductGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 2,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 3,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 4,
                    name: "Піца",
                    imageUrl:
                      "https://cdn.dodostorage.net/inspirations/ru/5b/5b5c5d9a-7e9d-4b2f-8e2a-d7b4c8a5e5d3.png",
                    items: [{ price: 10 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
