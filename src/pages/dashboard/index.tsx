import { useInventory } from "../../contexts/InventoryContext";
import { WithSidebar } from "../../hoc/WithSidebar";
import { WithTopBar } from "../../hoc/WithTopBar";

import { CreateButtonAbsolute } from "../../components/create-button-absolute";
import {
  CreateProductModal,
  ProductDTO,
} from "../../components/create-product-modal";
import { useCallback, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { EmptyList } from "../../components/empty-list";
import { toast } from "react-toastify";

function _Dashboard() {
  const { token } = useAuthContext();
  const { inventory, refetch } = useInventory();

  const [isModalShown, setIsModalShown] = useState(false);

  const fetchProduct = useCallback(
    async (dto: ProductDTO) => {
      if (!token) return;

      const formData = new FormData();

      formData.append("title", dto.title);
      formData.append("description", dto.description);
      formData.append("quantity", dto.quantity.toString());
      formData.append("purchase_price", dto.purchasePrice.toString());
      formData.append("sale_price", dto.salePrice.toString());
      if (dto.image) {
        formData.append("image", dto.image);
      }

      const raw = await fetch("http://localhost:8080/products", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isStatus5xx = raw.status.toString().startsWith("5");
      if (isStatus5xx) {
        toast("Unexpected error when logging in", { type: "error" });
        return;
      }

      const isStatus2xx = raw.status.toString().startsWith("2");
      if (!isStatus2xx) {
        const message = await raw.text();
        toast(message, { type: "error" });
        return;
      }
    },
    [token]
  );

  const handleOnSubmit = useCallback(
    async (dto: ProductDTO) => {
      try {
        await fetchProduct(dto);
        await refetch();
      } catch (err) {
        // TODO catch err
      }

      setIsModalShown(false);
    },
    [fetchProduct, refetch]
  );

  let products = (
    <div className="px-16 py-16 xl:px-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-20 justify-items-center">
      {inventory.products.map((p) => (
        <div key={p.id}>
          <div className="w-64 h-64 relative">
            <img
              className="w-full h-full absolute top-0 left-0 border-2 border-slate-300 rounded"
              src={
                p.image
                  ? `data:${p.image.mimeType};base64,${p.image.base64}`
                  : "https://www.cnet.com/a/img/resize/7470426f9352b09baa3ae8d6a9829448c6abbd66/2021/08/20/453e37bf-61cb-4e16-ad90-fd822bdc390a/keychron-k3-mechanical-keyboard.jpg?auto=webp&fit=crop&height=630&width=1200"
              }
              alt=""
            />
            <div
              className="absolute right-3 bottom-3 bg-zinc-700 w-8 h-8 flex justify-center items-center rounded"
              style={{ boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)" }}
            >
              <p className="text-neutral-50 font-bold">{p.quantity}</p>
            </div>
          </div>

          <p className="text-gray-900 mt-2 text-lg">{p.title}</p>
        </div>
      ))}
    </div>
  );
  if (inventory.products.length === 0) {
    products = (
      <EmptyList
        message="No products have been created yet"
        buttonTitle="Create a product"
        onClick={() => setIsModalShown(true)}
      />
    );
  }

  return (
    <>
      <div className="pl-12 pt-12">
        <h1 className="font-bold text-lg">See your products</h1>
      </div>

      {products}

      <CreateButtonAbsolute
        tooltipMsg="Create a product"
        onClick={() => setIsModalShown(true)}
      />

      <CreateProductModal
        isShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}

export const Dashboard = WithSidebar(WithTopBar(_Dashboard, "My inventory"));
