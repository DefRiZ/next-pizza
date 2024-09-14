import { Container, PizzaImage, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1 justify-between">
        <PizzaImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <GroupVariants
            selectedValue="2"
            items={[
              { name: "Маленька", value: "1" },
              { name: "Середня", value: "2" },
              { name: "Велика", value: "3" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
