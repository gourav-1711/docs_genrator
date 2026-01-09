"use client";

import { useState } from "react";
import { BillData } from "../types";
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Layout,
  FileText,
  ShoppingBag,
} from "lucide-react";

interface BillCreatorProps {
  data: BillData;
  onChange: (data: BillData) => void;
  onDownload: () => void;
}

export default function BillCreator({
  data,
  onChange,
  onDownload,
}: BillCreatorProps) {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [activeBillTab, setActiveBillTab] = useState<"bill1" | "bill2">(
    "bill1"
  );

  const currentBill =
    activeBillTab === "bill1" ? data : data.secondBill || data;

  const handleBillChange = (field: keyof BillData, value: any) => {
    if (activeBillTab === "bill1") {
      onChange({ ...data, [field]: value });
    } else {
      onChange({
        ...data,
        secondBill: { ...data.secondBill!, [field]: value },
      });
    }
  };

  const handleSettingsChange = (
    field: keyof BillData["settings"],
    value: any
  ) => {
    onChange({ ...data, settings: { ...data.settings, [field]: value } });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...currentBill.items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleBillChange("items", newItems);
  };

  const addItem = () => {
    handleBillChange("items", [
      ...currentBill.items,
      { productName: "", description: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    const newItems = currentBill.items.filter((_, i) => i !== index);
    handleBillChange("items", newItems);
  };

  return (
    <div>
      <div className="tab-nav">
        <button
          className={`tab-nav-btn ${activeTab === "form" ? "active" : ""}`}
          onClick={() => setActiveTab("form")}
        >
          <div className="flex items-center justify-center gap-2">
            <FileText size={18} />
            Edit Bill
          </div>
        </button>
        <button
          className={`tab-nav-btn ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          <div className="flex items-center justify-center gap-2">
            <Eye size={18} />
            Preview
          </div>
        </button>
      </div>

      <div className="content-grid">
        <div
          className={`form-wrapper glass-card ${
            activeTab === "form" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="section-title">
            <FileText size={20} />
            <h2>Bill Details</h2>
          </div>

          <div className="form-container">
            <section className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>Bill No</label>
                  <input
                    type="text"
                    value={currentBill.billNo}
                    onChange={(e) => handleBillChange("billNo", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={currentBill.date}
                    onChange={(e) => handleBillChange("date", e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Template Style</label>
                  <select
                    value={data.settings.template}
                    onChange={(e) =>
                      handleSettingsChange("template", e.target.value)
                    }
                  >
                    <option value="jewellery">Classic Jewellery</option>
                    <option value="ecommerce">Modern E-commerce</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      style={{ width: "auto" }}
                      checked={data.settings.twoInOne}
                      onChange={(e) =>
                        handleSettingsChange("twoInOne", e.target.checked)
                      }
                    />
                    2 Bills per page
                  </label>
                </div>
                {data.settings.twoInOne && (
                  <div className="form-group full-width">
                    <label className="mb-2 block">Mode</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mode"
                          style={{ width: "auto" }}
                          checked={
                            data.settings.mode === "duplicate" ||
                            !data.settings.mode
                          }
                          onChange={() =>
                            handleSettingsChange("mode", "duplicate")
                          }
                        />
                        Duplicate Copy
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mode"
                          style={{ width: "auto" }}
                          checked={data.settings.mode === "distinct"}
                          onChange={() =>
                            handleSettingsChange("mode", "distinct")
                          }
                        />
                        Separate Bill
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {data.settings.twoInOne && data.settings.mode === "distinct" && (
              <div className="flex gap-2 mb-6 px-1">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeBillTab === "bill1"
                      ? "bg-amber-500 text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setActiveBillTab("bill1")}
                >
                  Bill 1
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeBillTab === "bill2"
                      ? "bg-amber-500 text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setActiveBillTab("bill2")}
                >
                  Bill 2
                </button>
              </div>
            )}

            <section className="form-section">
              <h3 className="section-title">Customer Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={currentBill.customerName}
                    onChange={(e) =>
                      handleBillChange("customerName", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={currentBill.customerPhone}
                    onChange={(e) =>
                      handleBillChange("customerPhone", e.target.value)
                    }
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={currentBill.customerAddress}
                    onChange={(e) =>
                      handleBillChange("customerAddress", e.target.value)
                    }
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Products</h3>
              {currentBill.items.map((item, index) => (
                <div
                  key={index}
                  className="space-y-3 p-4 bg-black/20 rounded-xl mb-4 border border-white/5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary">
                      Item #{index + 1}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group col-span-2">
                      <label>Product Name</label>
                      <input
                        type="text"
                        value={item.productName}
                        onChange={(e) =>
                          handleItemChange(index, "productName", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Qty</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="form-group col-span-2">
                      <label>Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary w-full" onClick={addItem}>
                <Plus size={18} /> Add Product
              </button>
            </section>
          </div>
          <div className="mt-8">
            <button className="btn btn-primary w-full" onClick={onDownload}>
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        <div
          className={`preview-wrapper glass-card ${
            activeTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="section-title">
            <Eye size={20} />
            <h2>Live Preview</h2>
          </div>
          <div
            className="bill-preview bg-white rounded-lg p-10 text-black shadow-2xl overflow-hidden relative"
            style={{
              minHeight: "842px",
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
              fontFamily:
                data.settings.template === "ecommerce" ? "sans-serif" : "serif",
            }}
          >
            {data.settings.template === "ecommerce" ? (
              <div className="ecommerce-template">
                <div className="flex justify-between border-b-4 border-slate-900 pb-8">
                  <div>
                    <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
                      INVOICE
                    </h1>
                    <p className="text-slate-500 font-bold text-lg mt-2">
                      No. {currentBill.billNo}
                    </p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-900">
                      {data.shopDetails.name}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {data.shopDetails.address}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      Ph: {data.shopDetails.phones.join(", ")}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      {data.shopDetails.email}
                    </p>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-12">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                      Customer Details
                    </h3>
                    <p className="font-black text-xl text-slate-900">
                      {currentBill.customerName || "Customer Name"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 font-medium">
                      {currentBill.customerAddress || "Customer Address"}
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      <p className="text-sm font-bold text-slate-700">
                        {currentBill.customerPhone}
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {currentBill.customerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      Invoice Date
                    </h3>
                    <p className="font-black text-xl text-slate-900">
                      {currentBill.date}
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-slate-900 text-xs font-black uppercase text-slate-900 tracking-wider">
                        <th className="pb-4 px-2">Item Description</th>
                        <th className="pb-4 text-center w-24">Qty</th>
                        <th className="pb-4 text-right w-32">Price</th>
                        <th className="pb-4 text-right w-32">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-base">
                      {currentBill.items.map((item, i) => (
                        <tr key={i} className="border-b border-slate-100 group">
                          <td className="py-6 px-2">
                            <p className="font-black text-slate-900 text-lg">
                              {item.productName || "Product Name"}
                            </p>
                            <p className="text-sm text-slate-500 font-medium mt-1">
                              {item.description || "No description provided"}
                            </p>
                          </td>
                          <td className="py-6 text-center font-bold text-slate-700">
                            {item.quantity}
                          </td>
                          <td className="py-6 text-right font-bold text-slate-700">
                            ₹{item.price.toLocaleString()}
                          </td>
                          <td className="py-6 text-right font-black text-slate-900">
                            ₹{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 flex justify-end">
                  <div className="w-full max-w-[300px]">
                    <div className="flex justify-between items-center py-2 text-slate-500 font-bold border-b border-slate-100">
                      <span>Subtotal</span>
                      <span>
                        ₹
                        {currentBill.items
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-6">
                      <span className="text-slate-400 font-black uppercase text-xs tracking-widest">
                        Amount Due
                      </span>
                      <span className="text-4xl font-black text-slate-900">
                        ₹
                        {currentBill.items
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-24 pt-12 border-t border-slate-100">
                  <div className="flex justify-between items-end">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <p>Thank you for your business</p>
                    </div>
                    <div className="text-right">
                      <div className="h-16 w-48 border-b-2 border-slate-900 mb-2 ml-auto"></div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                        Authorized Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="jewellery-template text-[#c00]">
                <div className="flex justify-between text-sm font-bold">
                  <span>Mo. {data.shopDetails.phones[0]}</span>
                  <span>Mo. {data.shopDetails.phones[1]}</span>
                </div>
                <div className="text-center border-b-2 border-[#c00] pb-6 mb-8 mt-4">
                  <div className="text-xs font-black tracking-widest mb-1">
                    JAI SHREE SHYAM
                  </div>
                  <h1 className="text-6xl font-black tracking-tighter uppercase">
                    {data.shopDetails.name}
                  </h1>
                  <div className="bg-[#c00] text-white px-6 py-2 inline-block rounded-full text-sm font-black mt-4 uppercase tracking-wider">
                    All Type Gold & Silver Jewellery Seller
                  </div>
                  <div className="mt-4 text-lg italic font-bold">
                    Add: {data.shopDetails.address}
                  </div>
                </div>

                <div className="flex justify-between font-black text-xl mb-8 border-b border-[#c00]/20 pb-4">
                  <span>
                    Bill No.{" "}
                    <span className="text-black">{currentBill.billNo}</span>
                  </span>
                  <span>
                    Date: <span className="text-black">{currentBill.date}</span>
                  </span>
                </div>

                <div className="space-y-8 text-2xl font-bold">
                  <div className="flex items-end gap-4">
                    <span className="shrink-0 mb-1">Mr./Ms.</span>
                    <span className="border-b-2 border-dotted border-[#c00] flex-1 pb-1 text-black min-h-[40px] px-2">
                      {currentBill.customerName}
                    </span>
                  </div>
                  <div className="flex items-end gap-4">
                    <span className="shrink-0 mb-1">Add.</span>
                    <span className="border-b-2 border-dotted border-[#c00] flex-1 pb-1 text-black min-h-[40px] px-2">
                      {currentBill.customerAddress}
                    </span>
                  </div>
                </div>

                <div className="mt-12">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-y-2 border-[#c00] bg-[#c00]/5 text-sm font-black">
                        <th className="py-3 px-2 text-left">Description</th>
                        <th className="py-3 px-2 text-center w-24">Qty</th>
                        <th className="py-3 px-2 text-right w-40">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl">
                      {currentBill.items.map((item, i) => (
                        <tr key={i} className="border-b border-[#c00]/10">
                          <td className="py-6 px-2">
                            <p className="font-black text-black">
                              {item.productName}
                            </p>
                            <p className="text-sm italic font-bold">
                              {item.description}
                            </p>
                          </td>
                          <td className="py-6 px-2 text-center text-black font-bold">
                            {item.quantity}
                          </td>
                          <td className="py-6 px-2 text-right text-black font-black">
                            ₹{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-[#c00]">
                        <td
                          colSpan={2}
                          className="py-6 text-right font-black uppercase text-sm px-4"
                        >
                          Grand Total
                        </td>
                        <td className="py-6 text-right font-black text-3xl px-2">
                          ₹
                          {currentBill.items
                            .reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                            )
                            .toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] font-black opacity-[0.05] pointer-events-none select-none">
                  JW
                </div>

                <div className="mt-32 flex justify-end">
                  <div className="text-center">
                    <p className="text-2xl font-black mb-12 uppercase">
                      {data.shopDetails.name}
                    </p>
                    <div className="w-64 border-t-2 border-[#c00] mx-auto"></div>
                    <p className="text-xs font-black mt-2 uppercase tracking-widest">
                      Authorized Signature
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
