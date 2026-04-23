"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/validations/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { 
  ChevronLeft, Eye, EyeOff, Activity, UserPlus, Globe, 
  Database, Phone, ShieldCheck, UserCircle, Loader2, WifiOff
} from "lucide-react";
import { nanoid } from 'nanoid';
import { Country, State, City } from "country-state-city";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp, writeBatch } from "firebase/firestore";

// --- CUSTOM UI COMPONENTS ---
import Select from "../form/Select";
import DatePicker from "../form/date-picker";
import PhoneInput from "../form/group-input/PhoneInput";
import Input from "../form/input/InputField"; 

export default function SignUpForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  // Location States
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' }
  ];

  const {
    control,
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SignUpSchema>({
    defaultValues: {
      phone: "",
      referred_by: refCode || "",
    },
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => { setFocus("fname"); }, [setFocus]);

  // --- NETWORK LISTENER ---
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // --- STRICT FIREBASE SESSION LISTENER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && pathname !== "/dashboard") {
        if (!navigator.onLine) return; // Block offline routing
        try {
            await user.getIdTokenResult(true); // Force server validation
            router.replace('/dashboard');
        } catch (error) {
            await signOut(auth); // Clear invalid cache
        }
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  // Location Handlers
  const handleCountryChange = (isoCode: string) => {
    setSelectedCountry(isoCode);
    const countryObj = Country.getCountryByCode(isoCode);
    if (countryObj) setCountryCode("+" + countryObj.phonecode);
    
    const countryStates = State.getStatesOfCountry(isoCode).map((s) => ({ value: s.isoCode, label: s.name }));
    setStates(countryStates);
    setCities([]); 
  };

  const handleStateChange = (isoCode: string) => {
    const stateCities = City.getCitiesOfState(selectedCountry, isoCode).map((c) => ({ value: c.name, label: c.name }));
    setCities(stateCities);
  };

  // --- EXECUTION PAYLOAD ---
  const onSubmit = async (data: SignUpSchema) => {
    if (isOffline || !navigator.onLine) {
        toast.error("UPLINK_SEVERED: Cannot register without network connection.");
        return;
    }

    setLoading(true);
    const referral_id = `${data.fname.toLowerCase()}${nanoid(6)}`;
    
    try {
      // 1. Auth Creation
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${data.fname} ${data.lname}` });

      // 2. Batch Database Setup (Guarantees all docs write or none do)
      const batch = writeBatch(db);

      // 2a. Profile Generation (Synced to new Financial Schema)
      const profileRef = doc(db, "profiles", user.uid);
      batch.set(profileRef, {
        uid: user.uid,
        email: data.email,
        password: data.password, // Be cautious storing raw passwords in production
        firstName: data.fname,
        lastName: data.lname,
        gender: data.gender,
        dob: data.date_of_birth,
        country: Country.getCountryByCode(data.country)?.name || data.country,
        state: State.getStateByCodeAndCountry(data.state, data.country)?.name || data.state,
        city: data.city,
        zip: data.zip,
        address: data.address,
        phone: data.phone,
        referredBy: data.referred_by || "direct",
        refereeId: referral_id,
        tierLevel: 1, 
        totalDeposit: 10.00, // Placed here so trades/investments can immediately use the bonus
        profit: 0.00,
        lockedCapital: 0.00,
        kycStatus: "pending",
        role: "user",
        createdAt: serverTimestamp(),
      });

      // 2b. Welcome Notification
      const notifRef = doc(collection(db, "notifications"));
      batch.set(notifRef, {
        userId: user.uid, 
        title: "Protocol Success", 
        message: "Account initialized with $10.00 welcome bonus.", 
        type: "success", 
        read: false, 
        createdAt: serverTimestamp(),
      });

      // 2c. Transaction Ledger Entry
      const txRef = doc(collection(db, "transactions"));
      batch.set(txRef, {
        userId: user.uid,
        amount: 10.00,
        status: "approved",
        type: "welcome_bonus",
        category: "bonus", // Crucial for transaction filtering later
        createdAt: serverTimestamp(),
        metadata: {
            note: "System Initialization Bonus"
        }
      });

      await batch.commit();

      toast.success("PROFILE_ESTABLISHED: Registration successful.");
      setTimeout(() => router.push("/dashboard"), 1500);

    } catch (error: any) {
      console.error("Sign-up error:", error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("CONFLICT_ERR: Alias already exists in registry.");
      } else if (error.code === 'auth/network-request-failed') {
        toast.error("NETWORK_ERR: Backend timeout. Check uplink.");
      } else {
        toast.error("SYS_ERR: Initialization Failure.");
      }
    } finally { 
      setLoading(false); 
    }
  };

  const CustomLabel = ({ title, sub }: { title: string, sub: string }) => (
    <label className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">{title}</span>
      <span className="text-[9px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest">{sub}</span>
    </label>
  );

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar pb-10 scroll-smooth">
      
      <div className="w-full py-6 mb-4 flex justify-between items-center px-4 max-w-xl mx-auto">
        <Link href="/" className="group inline-flex items-center space-x-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest hover:text-brand-500 transition-all">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to SYS_ROOT</span>
        </Link>

        {isOffline && (
            <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-mono font-bold uppercase tracking-widest animate-pulse">
                <WifiOff size={10} /> Uplink_Severed
            </div>
        )}
      </div>

      <div className="max-w-xl mx-auto w-full px-4 sm:px-0">
        
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 mb-4">
            <UserPlus size={14} className="text-brand-600 dark:text-brand-400" />
            <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.2em]">New_Entity_Registration</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
            Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600 dark:from-brand-400 dark:to-indigo-500 italic">Profile.</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 font-light">Complete the protocol to initialize your sovereign trading node.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          {/* SECTION 1: IDENTITY */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-2">
              <UserCircle size={16} className="text-brand-500" />
              <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Identity_Node</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CustomLabel title="First Name" sub="Legal_First" />
                <Input {...register("fname")} placeholder="First name" error={!!errors.fname} hint={errors.fname?.message} />
              </div>
              <div>
                <CustomLabel title="Last Name" sub="Legal_Last" />
                <Input {...register("lname")} placeholder="Last name" error={!!errors.lname} hint={errors.lname?.message} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CustomLabel title="Gender" sub="Bio_ID" />
                <Controller name="gender" control={control} render={({ field }) => (
                  <Select {...field} options={genders} placeholder="Select Gender" />
                )} />
              </div>
              <div>
                <CustomLabel title="Date of Birth" sub="Origin_Date" />
                <Controller name="date_of_birth" control={control} render={({ field }) => (
                  <DatePicker label="" {...field} placeholder="YYYY-MM-DD" />
                )} />
              </div>
            </div>
          </section>

          {/* SECTION 2: SECURITY */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-2">
              <ShieldCheck size={16} className="text-brand-500" />
              <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Security_Protocol</h2>
            </div>

            <div>
              <CustomLabel title="Email Address" sub="Primary_Alias" />
              <Input {...register("email")} type="email" placeholder="email@domain.com" error={!!errors.email} hint={errors.email?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <CustomLabel title="Account Password" sub="Access_Key" />
                <Input {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••" error={!!errors.password} hint={errors.password?.message} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-400 z-20">
                  {showPassword ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
              <div className="relative group">
                <CustomLabel title="Confirm Password" sub="Verify_Key" />
                <Input {...register("confirm_password")} type={showPassword ? "text" : "password"} placeholder="••••••••" error={!!errors.confirm_password} hint={errors.confirm_password?.message} />
              </div>
            </div>
          </section>

          {/* SECTION 3: LOCALIZATION */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-2">
              <Globe size={16} className="text-brand-500" />
              <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Geographic_Localization</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <CustomLabel title="Country" sub="Jurisdiction" />
                <Controller name="country" control={control} render={({ field }) => (
                  <Select {...field} options={countries} onValueChange={(v) => { field.onChange(v); handleCountryChange(v); }} />
                )} />
              </div>
              <div>
                <CustomLabel title="State / Region" sub="Sector" />
                <Controller name="state" control={control} render={({ field }) => (
                  <Select {...field} options={states} disabled={states.length === 0} onValueChange={(v) => { field.onChange(v); handleStateChange(v); }} />
                )} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <CustomLabel title="City" sub="Sub_Sector" />
                <Controller name="city" control={control} render={({ field }) => (
                  <Select {...field} options={cities} disabled={cities.length === 0} onValueChange={field.onChange} />
                )} />
              </div>
              <div>
                <CustomLabel title="ZIP Code" sub="Postal_ID" />
                <Input {...register("zip")} placeholder="ZIP Code" />
              </div>
            </div>

            <div>
              <CustomLabel title="Residential Address" sub="Physical_Node" />
              <Input {...register("address")} placeholder="Full street address..." />
            </div>
          </section>

          {/* SECTION 4: NETWORK */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-2">
              <Phone size={16} className="text-brand-500" />
              <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Network_Connect</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <CustomLabel title="Phone Number" sub="Comm_Link" />
                <Controller name="phone" control={control} render={({ field }) => (
                  <PhoneInput countries={[{ code: countryCode, label: countryCode }]} placeholder="Phone Number" onChange={field.onChange} />
                )} />
                {errors.phone && <p className="text-[10px] text-red-500 font-mono mt-1 italic">{errors.phone.message}</p>}
              </div>
              <div className="relative group">
                <CustomLabel title="Referral Code" sub="Origin_Node" />
                <Input {...register("referred_by")} placeholder="Optional Code" readOnly={!!refCode} />
                <Database size={14} className="absolute right-3 top-[38px] text-slate-300 dark:text-slate-700 z-20 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <div className="relative flex items-center justify-center w-5 h-5 mt-1 border border-slate-300 dark:border-white/20 bg-white dark:bg-[#0D1117]">
                <input type="checkbox" {...register("terms")} className="peer absolute opacity-0 w-full h-full cursor-pointer z-10" />
                <div className="w-2.5 h-2.5 bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-gray-500 leading-relaxed uppercase font-mono">
                By initializing this profile, I authorize the <span className="text-brand-600">SkyInvestOrg Protocols</span> and agree to the <Link href="/terms" className="underline hover:text-brand-500">Legal Directives</Link>.
              </div>
            </div>
            {errors.terms && <p className="text-[10px] text-red-500 font-mono mt-1 italic">{errors.terms.message}</p>}
          </section>

          {/* SUBMISSION */}
          <div className="pt-10">
            <button 
              type="submit" 
              disabled={loading || isOffline} 
              className="group relative flex items-center justify-center h-16 w-full bg-brand-600 text-white overflow-hidden hover:bg-brand-500 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
            >
              {loading ? (
                <div className="flex items-center text-xs font-black uppercase tracking-widest">
                  <Loader2 className="animate-spin mr-3" size={18}/> Synchronizing Profile...
                </div>
              ) : isOffline ? (
                <span className="flex items-center text-xs font-black uppercase tracking-widest text-red-100">
                  <WifiOff className="w-4 h-4 mr-2" /> Network Unreachable
                </span>
              ) : (
                <div className="flex items-center text-xs font-black uppercase tracking-widest group-hover:scale-105 transition-transform">
                  Establish Sovereignty <Activity className="ml-4" size={18}/>
                </div>
              )}
            </button>
            <div className="mt-8 text-center">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Established Entity? <Link href="/login" className="text-brand-600 dark:text-brand-500 font-bold hover:underline ml-2">Login</Link>
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}