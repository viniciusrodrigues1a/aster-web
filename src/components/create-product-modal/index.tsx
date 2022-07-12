import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import UploadCloud from "../../assets/upload-cloud.svg";

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
  image?: File;
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
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isShown) {
      setTitle("");
      setDescription("");
      setSalePrice("$ 0.00");
      setPurchasePrice("$ 0.00");
      setQuantity("0");
      setImagePreview("");
      setImageFile(null);
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
      image: imageFile || undefined,
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setImageFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
  }

  function handleOnImgError(e: any) {
    e.target.src = null;
  }

  return (
    <Modal
      isShown={isShown}
      closeModal={closeModal}
      title={"Create a new product"}
    >
      <form className="mt-10" onSubmit={handleOnSubmit}>
        <div className="w-full mb-10 relative">
          <div
            className={`w-48 h-48 m-auto bg-blue-200 rounded-full ${
              !imagePreview ? styles.imageInputContainer : ""
            }`}
          >
            {!!imagePreview && (
              <img
                className="w-48 h-48 m-auto rounded-full border-2 border-blue-600"
                src={imagePreview}
                onError={handleOnImgError}
                alt="Product"
              />
            )}
            {!imagePreview && (
              <div className="h-full flex justify-center items-center">
                <img className="w-10 h-10" src={UploadCloud} alt="Upload" />
              </div>
            )}
            <input
              className="w-48 h-full absolute top-0 left-1/2 -translate-x-1/2 rounded-full opacity-0 cursor-pointer"
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              name="product-image"
              id="product-image"
              alt="Product"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Enter title"
          placeholder="Monitor"
          required
        />

        <div className="mt-4 flex justify-between items-center">
          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="sale-price"
              id="sale-price"
              label="Enter sale price"
              placeholder="$ 0.00"
              value={salePrice}
              onChange={handleSalePriceChange}
              required
            />
          </div>

          <div style={{ width: "48%" }}>
            <Input
              type="text"
              name="purchase-price"
              id="purchase-price"
              label="Enter purchase price"
              placeholder="$ 0.00"
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
              required
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
              label="Enter quantity"
              required
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <Input
            type="text"
            name="description"
            id="description"
            label="Enter description"
            placeholder="Full HD Monitor"
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
