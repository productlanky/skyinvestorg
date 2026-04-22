"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";
import { ShieldCheck, FileSearch, UploadCloud, Fingerprint, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression"; 
 
import { uploadToCloudinary } from "@/lib/cloudinary"; 

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

type KYCStatus = "pending" | "reviewing" | "approved" | "rejected";

export default function KYCUpload() {
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [backFile, setBackFile] = useState<File | null>(null);
    const [frontUrl, setFrontUrl] = useState<string | null>(null);
    const [backUrl, setBackUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [kycStatus, setKycStatus] = useState<KYCStatus>('pending');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) return;
            setUserId(user.uid);

            const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
                if (docSnap.exists()) {
                    setKycStatus(docSnap.data().kycStatus || 'pending');
                }
            });
            return () => unsubProfile();
        });
        return () => unsubscribeAuth();
    }, []);

    // --- SECURE COMPRESSION & RELAY WRAPPER ---
    const handleSecureUpload = async (file: File) => {
        // --- STEP 1: COMPRESSION PROTOCOL ---
        const options = {
            maxSizeMB: 1,            // Target size under 1MB
            maxWidthOrHeight: 1920, // Max resolution
            useWebWorker: true,
        };

        let fileToUpload = file;

        try {
            const compressedFile = await imageCompression(file, options);
            console.log(`Original: ${(file.size / 1024 / 1024).toFixed(2)}MB | Compressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
            fileToUpload = compressedFile;
        } catch (error) {
            console.error("Compression Error:", error);
            // If compression fails, gracefully fallback to the original file
        }

        // --- STEP 2: EXTERNAL CLOUDINARY RELAY ---
        // Pass the optimized file to your dedicated utility function
        return await uploadToCloudinary(fileToUpload);
    };

    const handleSubmit = async () => {
        if (!frontFile || !backFile) {
            toast.error("DATA_ERR: Dual-side identification required.");
            return;
        }

        setUploading(true);
        toast.info("Initializing secure transmission...");

        // Execute uploads
        const frontImageUrl = await handleSecureUpload(frontFile);
        const backImageUrl = await handleSecureUpload(backFile);

        if (frontImageUrl && backImageUrl && userId) {
            try {
                // Save Cloudinary URLs to Firestore
                await updateDoc(doc(db, "profiles", userId), {
                    kycStatus: 'reviewing',
                    kycFront: frontImageUrl,
                    kycBack: backImageUrl,
                    kycSubmittedAt: new Date().toISOString()
                });

                toast.success("PROTOCOL_INITIALIZED: KYC data in review.");
                setFrontFile(null);
                setBackFile(null);
                setFrontUrl(null);
                setBackUrl(null);
            } catch (err) {
                toast.error("SYS_ERR: Failed to update identity node.");
            }
        } else {
            toast.error("UPL_ERR: Cloudinary relay failed. Check network logs.");
        }
        setUploading(false);
    };

    const DropInput = ({ label, previewUrl, onFileSelect, side }: any) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { "image/*": [] },
            maxFiles: 1,
            onDrop: (files) => {
                const file = files[0];
                if (file) onFileSelect(file);
            },
        });

        return (
            <div className="flex flex-col h-full">
                <div
                    {...getRootProps()}
                    className={`flex-1 border-2 border-dashed transition-all p-6 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden
                        ${isDragActive ? "border-brand-500 bg-brand-500/5" : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] hover:border-brand-500/40"}`}
                >
                    <input {...getInputProps()} />
                    <div className="absolute top-0 left-0 p-1 bg-slate-200 dark:bg-white/10 text-[8px] font-mono uppercase tracking-widest text-slate-500">
                        {side}_SCANNER
                    </div>

                    <UploadCloud className={`mb-3 ${isDragActive ? "text-brand-500" : "text-slate-400"}`} size={24} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-1">
                        {isDragActive ? "Drop Identity Token" : `Upload ${label}`}
                    </h4>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">External Cloud Relay</p>
                </div>

                {previewUrl && (
                    <div className="mt-3 relative border border-brand-500/30 p-1 bg-black group">
                        <Image src={previewUrl} alt="Preview" width={400} height={250} className="w-full grayscale group-hover:grayscale-0 transition-all opacity-80" />
                        <div className="absolute inset-0 pointer-events-none border border-brand-500/20 opacity-40 shadow-[inset_0_0_20px_rgba(31,149,201,0.2)]"></div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {kycStatus === "reviewing" && (
                <div className="flex items-center gap-4 p-4 border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400">
                    <FileSearch size={20} className="animate-pulse" />
                    <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest">Protocol Status: In_Review</p>
                        <p className="text-[9px] font-mono uppercase opacity-70">Identity verification is being processed by the sovereign compliance node.</p>
                    </div>
                </div>
            )}

            {kycStatus === "approved" && (
                <div className="flex items-center gap-4 p-4 border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={20} />
                    <div>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest">Protocol Status: Verified</p>
                        <p className="text-[9px] font-mono uppercase opacity-70">Identification verified. Account fully authorized for high-volume execution.</p>
                    </div>
                </div>
            )}

            {(!kycStatus || kycStatus === "pending" || kycStatus === "rejected") && (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <DropInput
                            label="ID Front"
                            side="FRONT"
                            previewUrl={frontUrl}
                            onFileSelect={(file: File) => {
                                setFrontFile(file);
                                setFrontUrl(URL.createObjectURL(file));
                            }}
                        />
                        <DropInput
                            label="ID Back"
                            side="BACK"
                            previewUrl={backUrl}
                            onFileSelect={(file: File) => {
                                setBackFile(file);
                                setBackUrl(URL.createObjectURL(file));
                            }}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        {uploading ? (
                            <><Loader2 size={16} className="animate-spin" /> Relay in progress...</>
                        ) : (
                            <><Fingerprint size={16} /> Execute Identity Update</>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}