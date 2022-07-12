import { useCallback, useState } from "react";

import { ReactComponent as OkCircle } from "../../assets/ok-circle.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import { useInventory } from "../../contexts/InventoryContext";
import { WithSidebar } from "../../hoc/WithSidebar";
import { WithTopBar } from "../../hoc/WithTopBar";
import { Transaction } from "../../components/transaction";
import { CreateButtonAbsolute } from "../../components/create-button-absolute";
import {
  CreateTransactionModal,
  TransactionDTO,
} from "../../components/create-transaction-modal";

function _Transactions() {
  const { token } = useAuthContext();
  const { inventory, refetch } = useInventory();

  const [isModalShown, setIsModalShown] = useState(false);

  const fetchTransaction = useCallback(
    async (dto: TransactionDTO) => {
      if (!token) return;

      const raw = await fetch("http://localhost:8080/transactions", {
        method: "POST",
        body: JSON.stringify({
          product_id: dto.productId,
          description: dto.description,
          quantity: dto.quantity,
          value_paid: dto.valuePaid,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (raw.status !== 200) {
        throw new Error("Couldn't fetch POST transactions/");
      }
    },
    [token]
  );

  const handleOnSubmit = useCallback(
    async (dto: TransactionDTO) => {
      try {
        await fetchTransaction(dto);
        await refetch();
      } catch (err) {
        // TODO catch err
      }

      setIsModalShown(false);
    },
    [fetchTransaction, refetch]
  );

  return (
    <>
      <div className="p-12">
        <h1 className="font-bold text-lg">See your transactions</h1>

        <div className="mt-4">
          {inventory.transactions.map((t) => (
            <Transaction
              key={t.id}
              icon={() => <OkCircle />}
              description={t.description}
              value={String(t.value_paid)}
              timeAgo="30 minutes ago"
              productName="Keyboard"
            />
          ))}
        </div>
      </div>

      <CreateButtonAbsolute
        tooltipMsg="Create a transaction"
        onClick={() => setIsModalShown(true)}
      />

      <CreateTransactionModal
        isShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}

export const Transactions = WithSidebar(
  WithTopBar(_Transactions, "My transactions")
);
