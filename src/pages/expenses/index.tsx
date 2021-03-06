import { useCallback, useState } from "react";

import { ReactComponent as MoneyCircle } from "../../assets/money-circle.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import { useInventory } from "../../contexts/InventoryContext";
import { WithSidebar } from "../../hoc/WithSidebar";
import { WithTopBar } from "../../hoc/WithTopBar";
import { Transaction } from "../../components/transaction";
import { CreateButtonAbsolute } from "../../components/create-button-absolute";
import {
  CreateExpenseModal,
  ExpenseDTO,
} from "../../components/create-expense-modal";
import { EmptyList } from "../../components/empty-list";
import { toast } from "react-toastify";

function _Expenses() {
  const { token } = useAuthContext();
  const { inventory, refetch } = useInventory();

  const [isModalShown, setIsModalShown] = useState(false);

  const fetchExpense = useCallback(
    async (dto: ExpenseDTO) => {
      if (!token) return;

      const raw = await fetch("http://localhost:8080/expenses", {
        method: "POST",
        body: JSON.stringify({
          product_id: dto.productId || undefined,
          title: dto.title,
          description: dto.description,
          value: dto.value,
        }),
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
    async (dto: ExpenseDTO) => {
      try {
        await fetchExpense(dto);
        await refetch();
      } catch (err) {
        // TODO catch err
      }

      setIsModalShown(false);
    },
    [fetchExpense, refetch]
  );

  let expenses = (
    <>
      {inventory.expenses.map((e) => (
        <Transaction
          key={e.id}
          icon={() => <MoneyCircle />}
          description={e.description}
          value={String(e.value)}
          timeAgo="30 minutes ago"
          productName="Keyboard"
        />
      ))}
    </>
  );
  if (inventory.expenses.length === 0) {
    expenses = (
      <EmptyList
        message="No expenses have been created yet"
        buttonTitle="Create an expense"
        onClick={() => setIsModalShown(true)}
      />
    );
  }

  return (
    <>
      <div className="p-12">
        <h1 className="font-bold text-lg">See your expenses</h1>

        <div className="mt-4">{expenses}</div>
      </div>

      <CreateButtonAbsolute
        tooltipMsg="Create an expense"
        onClick={() => setIsModalShown(true)}
      />

      <CreateExpenseModal
        isShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}

export const Expenses = WithSidebar(WithTopBar(_Expenses, "My expenses"));
