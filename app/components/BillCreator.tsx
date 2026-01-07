"use client";

import { useState } from "react";
import { BillData } from "../types";
import { Plus, Trash2, Download, Eye, Layout, FileText, ShoppingBag } from "lucide-react";

interface BillCreatorProps {
  data: BillData;
  onChange: (data: BillData) => void;
  onDownload: () => void;
}

export default function BillCreator({ data, onChange, onDownload }: BillCreatorProps) {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const handleChange = (field: keyof BillData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleSettingsChange = (field: keyof BillData["settings"], value: any) => {
    onChange({ ...data, settings: { ...data.settings, [field]: value } });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    onChange({ ...data, items: [...data.items, { productName: "", description: "", quantity: 1, price: 0 }] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };

  return (
    <div>
      <div className="tab-nav">
        <button className={`tab-nav-btn ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>
          <div className="flex items-center justify-center gap-2">
            <FileText size={18} />
            Edit Bill
          </div>
        </button>
        <button className={`tab-nav-btn ${activeTab === "preview" ? "active" : ""}`} onClick={() => setActiveTab("preview")}>
          <div className="flex items-center justify-center gap-2">
            <Eye size={18} />
            Preview
          </div>
        </button>
      </div>

      <div className="content-grid">
        <div className={`form-wrapper glass-card ${activeTab === "form" ? "block" : "hidden lg:block"}`}>
          <div className="section-title">
            <FileText size={20} />
            <h2>Bill Details</h2>
          </div>
          
          <div className="form-container">
            <section className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>Bill No</label>
                  <input type="text" value={data.billNo} onChange={(e) => handleChange("billNo", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={data.date} onChange={(e) => handleChange("date", e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label>Template Style</label>
                  <select value={data.settings.template} onChange={(e) => handleSettingsChange("template", e.target.value)}>
                    <option value="jewellery">Classic Jewellery</option>
                    <option value="ecommerce">Modern E-commerce</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" style={{ width: 'auto' }} checked={data.settings.twoInOne} onChange={(e) => handleSettingsChange("twoInOne", e.target.checked)} />
                    2 Bills per page
                  </label>
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Customer Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={data.customerName} onChange={(e) => handleChange("customerName", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" value={data.customerPhone} onChange={(e) => handleChange("customerPhone", e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input type="text" value={data.customerAddress} onChange={(e) => handleChange("customerAddress", e.target.value)} />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Products</h3>
              {data.items.map((item, index) => (
                <div key={index} className="space-y-3 p-4 bg-black/20 rounded-xl mb-4 border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary">Item #{index + 1}</span>
                    <button onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group col-span-2">
                      <label>Product Name</label>
                      <input type="text" value={item.productName} onChange={(e) => handleItemChange(index, "productName", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Qty</label>
                      <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" value={item.price} onChange={(e) => handleItemChange(index, "price", parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="form-group col-span-2">
                      <label>Description</label>
                      <input type="text" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} />
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

        <div className={`preview-wrapper glass-card ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
          <div className="section-title">
            <Eye size={20} />
            <h2>Live Preview</h2>
          </div>
          <div className="bill-preview bg-white rounded-lg p-8 text-black shadow-2xl overflow-hidden relative" style={{ minHeight: '800px', fontFamily: data.settings.template === 'ecommerce' ? 'sans-serif' : 'serif' }}>
            {data.settings.template === 'ecommerce' ? (
              <div className="ecommerce-template">
                <div className="flex justify-between border-b-2 border-slate-800 pb-4">
                  <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">INVOICE</h1>
                    <p className="text-slate-500 font-bold">#{data.billNo}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold">{data.shopDetails.name}</h2>
                    <p className="text-xs text-slate-500">{data.shopDetails.address}</p>
                    <p className="text-xs text-slate-500">{data.shopDetails.phones.join(', ')}</p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase">Bill To</h3>
                    <p className="font-bold text-lg">{data.customerName || 'Customer Name'}</p>
                    <p className="text-sm text-slate-600">{data.customerAddress || 'Address details'}</p>
                    <p className="text-sm text-slate-600">{data.customerPhone}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xs font-bold text-slate-400 uppercase">Date</h3>
                    <p className="font-bold">{data.date}</p>
                  </div>
                </div>
                <table className="w-full mt-10 text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-100 text-xs font-bold uppercase text-slate-400">
                      <th className="pb-2">Product</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Price</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {data.items.map((item, i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="py-4">
                          <p className="font-bold">{item.productName || 'Product Name'}</p>
                          <p className="text-xs text-slate-400">{item.description}</p>
                        </td>
                        <td className="py-4 text-center">{item.quantity}</td>
                        <td className="py-4 text-right">₹{item.price.toLocaleString()}</td>
                        <td className="py-4 text-right font-bold">₹{(item.quantity * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-8 flex justify-end">
                  <div className="w-1/2 bg-slate-50 p-6 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-xs">Grand Total</span>
                      <span className="text-2xl font-black text-slate-800">₹{data.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="jewellery-template text-[#c00]">
                <div className="flex justify-between text-xs font-bold">
                  <span>Mo. {data.shopDetails.phones[0]}</span>
                  <span>Mo. {data.shopDetails.phones[1]}</span>
                </div>
                <div className="text-center border-b-2 border-[#c00] pb-4 mb-4">
                  <div className="text-[10px] font-bold">JAI SHREE SHYAM</div>
                  <h1 className="text-4xl font-black tracking-tight">{data.shopDetails.name}</h1>
                  <div className="bg-[#c00] text-white px-4 py-1 inline-block rounded-full text-xs font-bold mt-2">
                    All Type Gold & Silver Jewellery Seller
                  </div>
                  <div className="mt-2 text-sm italic font-medium">Add: {data.shopDetails.address}</div>
                </div>
                <div className="flex justify-between font-bold mb-4">
                  <span>Bill No. {data.billNo}</span>
                  <span>Date: {data.date}</span>
                </div>
                <div className="space-y-4 text-lg">
                  <div className="flex gap-2">
                    <span>Mr./Ms.</span>
                    <span className="border-b-2 border-dotted border-[#c00] flex-1">{data.customerName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Add.</span>
                    <span className="border-b-2 border-dotted border-[#c00] flex-1">{data.customerAddress}</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-black opacity-[0.03] pointer-events-none">JW</div>
                <div className="mt-auto absolute bottom-12 right-12 text-center">
                  <div className="text-xl font-bold">Jewellery Wala</div>
                  <div className="text-sm border-t border-[#c00] pt-1">Signature</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
