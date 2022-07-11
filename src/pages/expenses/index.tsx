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
          product_id: dto.productId,
          title: dto.title,
          description: dto.description,
          value: dto.value,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (raw.status !== 200) {
        throw new Error("Couldn't fetch POST expenses/");
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

  return (
    <>
      <div className="p-12">
        <h1 className="font-bold text-lg">See your expenses</h1>

        <div className="mt-4">
          {inventory.expenses.map((t) => (
            <Transaction
              icon={() => <MoneyCircle />}
              description={t.description}
              value={String(t.value)}
              timeAgo="30 minutes ago"
              productName="Keyboard"
            />
          ))}
        </div>
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
