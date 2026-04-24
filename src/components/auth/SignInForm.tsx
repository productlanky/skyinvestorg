"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "@/lib/validations/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Terminal, 
  Lock, 
  Activity,
  WifiOff
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase/config"; // Added db here
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence,
  signOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Added Firestore methods

import Input from "../form/input/InputField";

export default function SignInForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // --- FORM INITIALIZATION ---
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      keepMeLoggedIn: false,
    },
  });

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

  // --- AUTO-FOCUS ON MOUNT ---
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  // --- DYNAMIC FIREBASE SESSION ROUTER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Only run this routing logic if they are on a public auth page
      if (user && pathname !== "/dashboard" && pathname !== "/controlPanel" && pathname !== "/suspended") {
        
        if (!navigator.onLine) {
            toast.error("NETWORK_ERR: Cannot verify cached credentials while offline.");
            return;
        }

        try {
            await user.getIdTokenResult(true); // Force server validation
            
            // Fetch Profile to determine routing
            const profileSnap = await getDoc(doc(db, "profiles", user.uid));
            
            if (profileSnap.exists()) {
                const data = profileSnap.data();
                
                // Bulletproof Suspension & Role Check
                const isSuspended = 
                    data.suspended === true || 
                    String(data.suspended).toLowerCase() === "true" || 
                    data.status?.toLowerCase() === "suspended";
                    
                const isAdmin = data.role === "admin" || data.role === "super_admin";

                // Route accordingly
                if (isSuspended) {
                    router.replace("/suspended");
                } else if (isAdmin) {
                    router.replace("/controlPanel");
                } else {
                    router.replace("/dashboard");
                }
            } else {
                // Failsafe if profile is missing
                router.replace('/dashboard');
            }
        } catch (error) {
            console.error("Session Validation Failed:", error);
            await signOut(auth); // Purge the invalid cache
        }
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  // --- AUTH EXECUTION ---
  const onSubmit = async (data: SignInSchema) => {
    if (isOffline || !navigator.onLine) {
        toast.error("UPLINK_SEVERED: Cannot authenticate without network connection.");
        return;
    }

    const { email, password, keepMeLoggedIn } = data;
    setLoading(true);

    try {
      // 1. Set Persistence Logic
      const persistenceType = keepMeLoggedIn ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);

      // 2. Handshake with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Fetch Profile for Routing
      const profileSnap = await getDoc(doc(db, "profiles", user.uid));
      
      toast.success("IDENTITY_VERIFIED: Access Granted.");

      if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          
          const isSuspended = 
              profileData.suspended === true || 
              String(profileData.suspended).toLowerCase() === "true" || 
              profileData.status?.toLowerCase() === "suspended";
              
          const isAdmin = profileData.role === "admin" || profileData.role === "super_admin";

          // 4. Route Execution
          if (isSuspended) {
              router.push("/suspended");
          } else if (isAdmin) {
              router.push("/controlPanel");
          } else {
              router.push("/dashboard");
          }
      } else {
          // Failsafe
          router.push("/dashboard");
      }

    } catch (err: any) {
      console.error(err);
      let errorMessage = "ACCESS_DENIED: Protocol Failure.";
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        errorMessage = "CREDENTIAL_ERR: Verify Alias/Key.";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "RATE_LIMIT: System locked due to excess attempts.";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = "NETWORK_ERR: Backend timeout. Check uplink.";
      }
      
      toast.error(errorMessage);
      await signOut(auth); // Ensure bad states are cleared
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full pb-10 transition-colors duration-300">
      
      {/* Return to System Root */}
      <div className="w-full sm:pt-10 mx-auto mb-10 flex justify-between items-center">
        <Link
          href="/"
          className="group inline-flex items-center space-x-2 text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest hover:text-brand-500 dark:hover:text-brand-400 transition-all"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to SYS_ROOT</span>
        </Link>

        {/* Offline Warning Indicator */}
        {isOffline && (
            <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-mono font-bold uppercase tracking-widest animate-pulse">
                <WifiOff size={10} /> Uplink_Severed
            </div>
        )}
      </div>

      <div className="flex flex-col justify-center flex-1 w-full mx-auto">
        
        {/* Terminal Header */}
        <div className="mb-8 border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Lock className="w-4 h-4 text-brand-600 dark:text-brand-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400">Security Protocol</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600 dark:from-brand-400 dark:to-brand-600 italic">Session.</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-gray-500 font-mono leading-relaxed max-w-sm uppercase tracking-tight">
            Provide cryptographic credentials for node access.
          </p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Email Node */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest flex items-center justify-between">
              <span>Primary Alias (Email)</span>
              {errors.email && <span className="text-red-500 font-bold tracking-tight uppercase">{errors.email.message}</span>}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
              </div>
              <Input
                type="email"
                placeholder="USER@DOMAIN.COM"
                spellCheck="false"
                {...register("email")}
                className="w-full bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm py-4 pl-10 pr-4 focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-brand-500/5 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-700"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/30 dark:border-brand-500/50"></div>
            </div>
          </div>

          {/* Password Node */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest flex items-center justify-between">
              <span>Encryption Key (Password)</span>
              {errors.password && <span className="text-red-500 font-bold tracking-tight uppercase">{errors.password.message}</span>}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="text-brand-500 font-mono font-bold animate-pulse">{'>'}</span>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password")}
                className="w-full bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm py-4 pl-10 pr-12 focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-brand-500/5 transition-all placeholder:text-slate-300 dark:placeholder:text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-brand-500 dark:text-gray-500 dark:hover:text-brand-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-500/30 dark:border-brand-500/50"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 border border-slate-300 dark:border-white/20 bg-white dark:bg-[#0D1117] group-hover:border-brand-500 transition-colors">
                <input 
                  type="checkbox" 
                  {...register("keepMeLoggedIn")}
                  className="peer absolute opacity-0 w-full h-full cursor-pointer"
                />
                <div className="w-2 h-2 bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors">
                Persist Session
              </span>
            </label>
            
            <Link
              href="/reset-password"
              className="text-[10px] font-mono text-brand-600 dark:text-brand-500 hover:text-brand-500 dark:hover:text-brand-400 uppercase tracking-widest transition-colors"
            >
              Lost Key?
            </Link>
          </div>

          {/* Execution Button */}
          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading || isOffline}
              className="group relative flex items-center justify-center h-14 w-full bg-brand-600 text-white overflow-hidden hover:bg-brand-500 transition-all shadow-[0_0_20px_rgba(31,149,201,0.1)] dark:shadow-[0_0_30px_rgba(31,149,201,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
            >
              {loading ? (
                <span className="relative z-10 flex items-center text-xs font-black uppercase tracking-widest">
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </span>
              ) : isOffline ? (
                <span className="relative z-10 flex items-center text-xs font-black uppercase tracking-widest text-red-100">
                  <WifiOff className="w-4 h-4 mr-2" />
                  Network Unreachable
                </span>
              ) : (
                <span className="relative z-10 flex items-center text-xs font-black uppercase tracking-widest">
                  Execute Login <Terminal className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-200 dark:border-white/5 pt-6 text-center">
          <p className="text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">
            Unregistered Entity? {" "}
            <Link
              href="/register"
              className="text-brand-600 dark:text-brand-500 font-bold hover:underline transition-colors ml-1"
            >
              Establish Profile
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}