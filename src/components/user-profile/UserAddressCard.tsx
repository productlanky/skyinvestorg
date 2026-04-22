"use client";

import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { MapPin, Globe, Navigation, Edit3, X, Save } from "lucide-react";
import { ProfileType } from "./ProfilePage";
import { toast } from "sonner"; 

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export default function UserAddressCard({ country, city, state, zip, address, refresh }: ProfileType) {
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    country: country ?? "",
    city: city ?? "",
    state: state ?? "",
    zip: zip ?? "",
    address: address ?? "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("AUTH_NODE_OFFLINE");

      // Update the profile document directly by user UID
      const profileRef = doc(db, "profiles", user.uid);
      
      // Map form fields to the keys expected in your Firestore document
      await updateDoc(profileRef, {
        country: form.country,
        city: form.city,
        state: form.state,
        zip: form.zip,
        address: form.address,
        updatedAt: new Date()
      });

      toast.success("COORDINATES_UPDATED: Geographic node sync complete.");
      closeModal();
      refresh?.();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("SYNC_FAILURE: Geographic node update aborted.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* --- DISPLAY CARD --- */}
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 p-6 relative group overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[9px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">
            GEOGRAPHIC_NODE
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <MapPin size={16} className="text-brand-500" /> Physical Coordinates
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <DataNode label="Registry_Country" value={form.country} />
              <DataNode label="City_State_Region" value={`${form.city}, ${form.state}`} />
              <DataNode label="Postal_Index" value={form.zip} />
              <DataNode label="Street_Address" value={form.address} />
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:bg-brand-500/10 hover:border-brand-500/50 hover:text-brand-500 transition-all"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            <Edit3 size={14} /> Reconfigure
          </button>
        </div>
      </div>

      {/* --- RECONFIGURE MODAL --- */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl m-4">
        <div className="relative w-full bg-white dark:bg-[#0D1117] border border-brand-500/20 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-2 bg-brand-500/5 text-[8px] font-mono text-brand-500 border-l border-b border-white/5 uppercase tracking-widest">INPUT_COORD_SYS</div>
          
          <div className="p-8 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
            <h4 className="text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3">
              <Navigation size={20} className="text-brand-500" /> Geographic Node Config
            </h4>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">
              Update physical registry details for compliance and verification.
            </p>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["country", "city", "state", "zip"].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {field}_PROTOCOL
                  </label>
                  <input
                    type={field === "zip" ? "number" : "text"}
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors uppercase"
                    placeholder={`INPUT_${field.toUpperCase()}...`}
                  />
                </div>
              ))}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">STREET_LEVEL_ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-brand-500 transition-colors uppercase"
                  placeholder="INPUT_STREET_ADDRESS..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
              <button 
                type="button" 
                onClick={closeModal}
                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Abort
              </button>
              <button 
                type="submit" 
                disabled={isSaving}
                className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-brand-500/20"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              >
                {isSaving ? "Syncing..." : "Execute_Update"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

// --- SUB-COMPONENT FOR DATA DISPLAY ---
function DataNode({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Globe size={10} className="opacity-50" /> {label}
            </p>
            <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                {value || "NOT_ASSIGNED"}
            </p>
        </div>
    );
}