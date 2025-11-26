"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import KycDocumentCard from "./KycDocumentCard";
import Link from "next/link";
import {
  databases,
  DB_ID,
  PROFILE_COLLECTION_ID,
  STOCKLOG_COLLECTION_ID,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";
import Loading from "../ui/Loading";
import { fetchTeslaPrice } from "@/lib/appwrite/auth";

type ProfileField =
  | "first_name"
  | "last_name"
  | "email"
  | "gender"
  | "phone"
  | "country"
  | "state"
  | "city"
  | "zip"
  | "profit"
  | "address"
  | "balance"
  | "dob"
  | "withdrawal_limit"
  | "suspended";

interface ProfileType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  address: string;
  balance: number;
  dob: string;
  created_at: string;
  kyc_status: string;
  profit: number;
  withdrawal_limit: number;
  updated_at: string;
  // store as "true" | "false" (string), to match your DB and TS
  suspended?: string;
}

type EditableField = Exclude<ProfileField, "suspended">;

const profileFields: EditableField[] = [
  "first_name",
  "last_name",
  "email",
  "gender",
  "phone",
  "country",
  "state",
  "city",
  "zip",
  "profit",
  "address",
  "balance",
  "dob",
  "withdrawal_limit",
];

const displayFields: (
  | EditableField
  | "suspended"
  | "created_at"
  | "kyc_status"
  | "updated_at"
)[] = [...profileFields, "suspended", "created_at", "kyc_status", "updated_at"];

const kycStatusOptions = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "In Review", value: "reviewing" },
];

const suspendedOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export default function AdminUserProfileCard({ id }: { id: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [form, setForm] = useState<Partial<ProfileType>>({});
  const [kycStatus, setKycStatus] = useState<string>("");
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharePrice, setSharePrice] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const priceStr = await fetchTeslaPrice();
        const price = parseFloat(priceStr);
        setSharePrice(price);
        await fetchUser(price);
      } catch (error) {
        console.error("Error initializing profile:", error);
        setLoading(false);
      }
    };

    init();
  }, [id]);

  const fetchUser = async (teslaPrice: number) => {
    setLoading(true);
    try {
      const res = await databases.listDocuments(
        DB_ID,
        PROFILE_COLLECTION_ID,
        [Query.equal("$id", id)]
      );

      if (!res.documents.length) {
        setProfile(null);
        return;
      }

      const doc = res.documents[0];

      const ress = await databases.listDocuments(
        DB_ID,
        STOCKLOG_COLLECTION_ID,
        [Query.equal("userId", doc.userId), Query.orderDesc("$createdAt")]
      );

      const totalShare =
        ress.documents.reduce(
          (sum: number, tx: any) => sum + (tx.shares || 0),
          0
        ) || 0;

      setProfile({
        id: doc.userId,
        first_name: doc.firstName,
        last_name: doc.lastName,
        email: doc.email,
        gender: doc.gender,
        phone: doc.phone,
        country: doc.country,
        state: doc.state,
        city: doc.city,
        zip: doc.zip,
        address: doc.address,
        balance:
          (parseFloat(doc.totalDeposit) || 0) + 10 +
          (parseFloat(doc.profit) || 0) +
          totalShare * teslaPrice,
        dob: doc.dob,
        created_at: doc.$createdAt,
        updated_at: doc.$updatedAt,
        kyc_status: doc.kycStatus,
        profit: parseFloat(doc.profit) || 0,
        withdrawal_limit: doc.withdrawalLimit || 0,
        // doc.suspended might be boolean or string in Appwrite, normalize to string
        suspended: doc.suspended === true || doc.suspended === "true" ? "true" : "false",
      });

      setBackImageUrl(doc.kycBack);
      setFrontImageUrl(doc.kycFront);
      setKycStatus(doc.kycStatus || "");
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof ProfileType;

    if (key === "suspended") {
      // handled via Select
      return;
    }

    const newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm((prev) => ({ ...prev, [key]: newValue as any }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const updatedFields: Partial<Record<EditableField, string | number>> = {};

    // detect changed fields for editable string/number fields
    for (const key of profileFields) {
      const current = profile[key as keyof ProfileType];
      const edited = form[key as keyof ProfileType];

      const changed =
        key === "dob"
          ? edited !== undefined &&
          new Date(current as string).toISOString().split("T")[0] !==
          new Date(edited as string).toISOString().split("T")[0]
          : edited !== undefined && current !== edited;

      if (changed && edited !== undefined) {
        updatedFields[key] = edited as string | number;
      }
    }

    // handle suspended separately (string "true"/"false")
    const suspendedChanged =
      form.suspended !== undefined && form.suspended !== profile.suspended;

    try {
      const payload: Record<string, string | number | undefined> = {
        firstName: updatedFields.first_name,
        lastName: updatedFields.last_name,
        email: updatedFields.email,
        gender: updatedFields.gender,
        phone: updatedFields.phone,
        country: updatedFields.country,
        state: updatedFields.state,
        city: updatedFields.city,
        zip: updatedFields.zip,
        address: updatedFields.address,
        dob: updatedFields.dob,
        kycStatus: kycStatus,
        profit:
          updatedFields.profit !== undefined
            ? Number(updatedFields.profit)
            : undefined,
        withdrawalLimit:
          updatedFields.withdrawal_limit !== undefined
            ? Number(updatedFields.withdrawal_limit)
            : undefined,
        // store as "true" | "false" string
        suspended: suspendedChanged ? form.suspended : undefined,
      };

      // remove undefined keys
      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      if (Object.keys(payload).length > 0) {
        await databases.updateDocument(
          DB_ID,
          PROFILE_COLLECTION_ID,
          id,
          payload
        );
      }

      toast.success("User updated successfully");
      closeModal();

      // update local profile state
      setProfile((prev) => {
        if (!prev) return prev;

        const numericKeys = ["balance", "zip", "profit", "withdrawal_limit"];

        const merged: ProfileType = {
          ...prev,
          ...Object.fromEntries(
            Object.entries(updatedFields).map(([key, value]) => {
              if (numericKeys.includes(key)) {
                return [key, Number(value)];
              }
              return [key, String(value)];
            })
          ),
          kyc_status: kycStatus || prev.kyc_status,
          suspended:
            suspendedChanged && form.suspended !== undefined
              ? form.suspended
              : prev.suspended,
        };

        return merged;
      });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update user");
    }
  };

  if (loading) return <Loading />;
  if (!profile)
    return (
      <div className="p-6 text-center text-red-500">User not found.</div>
    );

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Profile Details
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              {displayFields.map((field) => (
                <div key={field}>
                  <p className="mb-1 text-xs text-gray-500 capitalize dark:text-gray-400">
                    {field.replace("_", " ")}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90 capitalize">
                    {field === "created_at" ||
                      field === "dob" ||
                      field === "updated_at"
                      ? profile[field as keyof ProfileType]
                        ? new Date(
                          profile[field as keyof ProfileType] as string
                        ).toLocaleDateString()
                        : "-"
                      : field === "kyc_status"
                        ? kycStatus ?? "-"
                        : field === "balance"
                          ? (
                            Number(
                              profile[field as keyof ProfileType]
                            ) || 0
                          ).toFixed(2)
                          : field === "suspended"
                            ? profile.suspended === "true"
                              ? "Yes"
                              : "No"
                            : (profile[field as keyof ProfileType] ?? "-")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={openModal} className="btn-edit">
            Edit
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-3 lg:items-end">
        <Link
          href={`/profiles/${id}/investments/${profile.id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          View Investments
        </Link>
        <Link
          href={`/profiles/${id}/transactions/${profile.id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg.white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg.white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          View Transactions
        </Link>
        <Link
          href={`/profiles/${id}/shares/${profile.id}`}
          className="mt-2 flex w.full items-center justify-center gap-2 rounded-full border border-gray-300 bg.white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg.gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg.gray-800 dark:text-gray-400 dark:hover:bg.white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          View Share
        </Link>
      </div>

      <KycDocumentCard
        frontImageUrl={frontImageUrl}
        backImageUrl={backImageUrl}
      />

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="modal-body p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update user details
            </p>
          </div>

          <form onSubmit={handleSave} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {profileFields.map((field) => (
                  <div
                    key={field}
                    className={field === "address" ? "lg:col-span-2" : ""}
                  >
                    <Label>{field.replace("_", " ").toUpperCase()}</Label>
                    <Input
                      type={
                        field === "balance" ||
                          field === "zip" ||
                          field === "profit"
                          ? "number"
                          : field === "dob"
                            ? "date"
                            : "text"
                      }
                      name={field}
                      readonly={field === "balance"}
                      disabled={field === "balance"}
                      placeholder={
                        field === "balance" && profile.balance !== undefined
                          ? profile.balance.toString()
                          : field === "profit" && profile.profit !== undefined
                            ? profile.profit.toString()
                            : ""
                      }
                      value={form[field as keyof ProfileType] ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="lg:col-span-2">
                  <Label>KYC STATUS</Label>
                  <Select
                    options={kycStatusOptions}
                    placeholder="Select status"
                    className="dark:bg-dark-900"
                    value={kycStatus}
                    onValueChange={setKycStatus}
                  />
                </div>

                <div className="lg:col-span-2">
                  <Label>SUSPENDED</Label>
                  <Select
                    options={suspendedOptions}
                    placeholder="Select option"
                    className="dark:bg-dark-900"
                    value={
                      form.suspended !== undefined
                        ? form.suspended
                        : profile.suspended === "true"
                          ? "true"
                          : "false"
                    }
                    onValueChange={(val) =>
                      setForm((prev) => ({
                        ...prev,
                        suspended: val, // keep as string "true"/"false"
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
