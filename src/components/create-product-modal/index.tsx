import { useEffect, useState } from "react";

import {
  convertBalanceToNumber,
  formatBalance,
} from "../../utils/formatBalance";

import { CancelButton } from "../cancel-button";
import { ConfirmButton } from "../confirm-button";
import { Input } from "../input";
import { Modal } from "../modal";

export type ProductDTO = {
  title: string;
  description: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
};

type CreateProductModalProps = {
  isShown: boolean;
  closeModal: () => void;
  onSubmit: (dto: ProductDTO) => void;
};

export function CreateProductModal({
  isShown,
  closeModal,
  onSubmit,
}: CreateProductModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salePrice, setSalePrice] = useState("$ 0.00");
  const [purchasePrice, setPurchasePrice] = useState("$ 0.00");
  const [quantity, setQuantity] = useState("0");

  useEffect(() => {
    if (!isShown) {
      setTitle("");
      setDescription("");
      setSalePrice("$ 0.00");
      setPurchasePrice("$ 0.00");
      setQuantity("0");
    }
  }, [isShown]);

  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    onSubmit({
      title,
      description,
      quantity: Number(quantity),
      purchasePrice: convertBalanceToNumber(purchasePrice),
      salePrice: convertBalanceToNumber(salePrice),
    });
  }

  function handleSalePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatBalance(e.target.value);
    if (formatted) {
      setSalePrice(formatted);
    }
  }

  function handlePurchasePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatBalance(e.target.value);
    if (formatted) {
      setPurchasePrice(formatted);
    }
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (/[0-9]/.test(e.target.value) || e.target.value.length === 0) {
      setQuantity(String(Number(e.target.value)));
    }
  }

  return (
    <Modal
      isShown={isShown}
      closeModal={closeModal}
      title={"Create a new product"}
    >
      <form className="mt-10" onSubmit={handleOnSubmit}>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />

        <div className="mt-4 flex justify-between items-center">
          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="sale-price"
              id="sale-price"
              placeholder="Enter sale price"
              value={salePrice}
              onChange={handleSalePriceChange}
            />
          </div>

          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="purchase-price"
              id="purchase-price"
              placeholder="Enter purchase price"
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <div style={{ width: "48%" }}>
            <Input
              type="number"
              min={0}
              value={quantity}
              onChange={handleQuantityChange}
              name="quantity"
              id="quantity"
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="w-full flex justify-end items-center mt-10">
          <CancelButton onClick={closeModal} />
          <div className="ml-6">
            <ConfirmButton
              title="CREATE"
              type="submit"
              onClick={handleOnSubmit}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
