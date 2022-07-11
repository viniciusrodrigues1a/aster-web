import { useState, useEffect } from "react";

import { useInventory } from "../../contexts/InventoryContext";
import {
  convertBalanceToNumber,
  formatBalance,
} from "../../utils/formatBalance";
import { CancelButton } from "../cancel-button";
import { ConfirmButton } from "../confirm-button";
import { Input } from "../input";
import { Modal } from "../modal";

export type ExpenseDTO = {
  productId?: string;
  title: string;
  description: string;
  value: number;
};

type CreateExpenseModalProps = {
  isShown: boolean;
  closeModal: () => void;
  onSubmit: (dto: ExpenseDTO) => Promise<void>;
};

export function CreateExpenseModal({
  isShown,
  closeModal,
  onSubmit,
}: CreateExpenseModalProps) {
  const { inventory } = useInventory();

  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!isShown) {
      setProductId("");
      setTitle("");
      setDescription("");
      setValue("$ 0.00");
    }
  }, [isShown]);

  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    onSubmit({
      productId,
      title,
      description,
      value: convertBalanceToNumber(value),
    });
  }

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatBalance(e.target.value);
    if (formatted) {
      setValue(formatted);
    }
  }

  return (
    <Modal
      isShown={isShown}
      closeModal={closeModal}
      title="Create a new expense"
    >
      <form className="mt-10" onSubmit={handleOnSubmit}>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mt-4">
          <select
            name="product-id"
            id="product-id"
            className="border border-slate-400 rounded px-2 py-2.5 w-full bg-transparent"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {inventory.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} - {formatBalance(String(p.sale_price))}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4" style={{ width: "48%" }}>
          <Input
            type="text"
            name="value"
            id="value"
            placeholder="Enter value"
            value={value}
            onChange={handleValueChange}
          />
        </div>

        <div className="mt-4">
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
