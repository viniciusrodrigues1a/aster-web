import { useEffect, useState } from "react";

import {
  convertBalanceToNumber,
  formatBalance,
} from "../../utils/formatBalance";
import { useInventory } from "../../contexts/InventoryContext";
import { CancelButton } from "../cancel-button";
import { ConfirmButton } from "../confirm-button";
import { Input } from "../input";
import { Modal } from "../modal";

export type TransactionDTO = {
  productId: string;
  description: string;
  quantity: number;
  valuePaid: number;
};

type CreateTransactionModalProps = {
  isShown: boolean;
  closeModal: () => void;
  onSubmit: (dto: TransactionDTO) => void;
};

export function CreateTransactionModal({
  isShown,
  closeModal,
  onSubmit,
}: CreateTransactionModalProps) {
  const { inventory } = useInventory();

  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [valuePaid, setValuePaid] = useState("$ 0.00");

  useEffect(() => {
    if (!isShown) {
      setProductId("");
      setDescription("");
      setValuePaid("$ 0.00");
      setQuantity("0");
    }
  }, [isShown]);

  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    onSubmit({
      productId,
      description,
      quantity: Number(quantity),
      valuePaid: convertBalanceToNumber(valuePaid),
    });
  }

  function handleValuePaidChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatBalance(e.target.value);
    if (formatted) {
      setValuePaid(formatted);
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
      title="Create a new transaction"
    >
      <form className="mt-10" onSubmit={handleOnSubmit}>
        <label
          htmlFor="product-id"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Select a product
        </label>
        <select
          name="product-id"
          id="product-id"
          className="border border-slate-400 rounded px-2 py-2.5 w-full bg-transparent"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value={""}>Select</option>
          {inventory.products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} - {formatBalance(String(p.sale_price))}
            </option>
          ))}
        </select>

        <div className="mt-4 flex justify-between items-center">
          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="quantity"
              id="quantity"
              label="Enter quantity"
              placeholder="$ 0.00"
              value={quantity}
              onChange={handleQuantityChange}
              required
            />
          </div>

          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="value_paid"
              id="value_paid"
              label="Enter value paid"
              placeholder="$ 0.00"
              value={valuePaid}
              onChange={handleValuePaidChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Enter description"
            placeholder="Sold 3 monitors"
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
