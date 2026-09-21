"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, MapPin, Loader2, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle, ImageIcon, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/common/Button";

type KYCStatus = "Not Started" | "In Progress" | "Submitted" | "In Review" | "Verified" | "Action Required" | "Rejected" | "Expiring Soon" | "Restricted" | "Reverification Required";

const STEPS = [
  { id: 1, title: "Create Account" },
  { id: 2, title: "Hotel Profile" },
  { id: 3, title: "KYC & Payout" }
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ur", name: "Urdu" },
  { code: "id", name: "Indonesian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "mr", name: "Marathi" },
  { code: "te", name: "Telugu" },
  { code: "tr", name: "Turkish" },
  { code: "ta", name: "Tamil" },
  { code: "vi", name: "Vietnamese" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "pa", name: "Punjabi" },
  { code: "gu", name: "Gujarati" },
  { code: "th", name: "Thai" },
  { code: "nl", name: "Dutch" },
  { code: "el", name: "Greek" },
  { code: "pl", name: "Polish" },
  { code: "he", name: "Hebrew" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "no", name: "Norwegian" }
];

const TIMEZONES = [
  { value: "Pacific/Midway", label: "Midway Island (GMT-11:00)" },
  { value: "America/Honolulu", label: "Hawaii (GMT-10:00)" },
  { value: "America/Anchorage", label: "Alaska (GMT-09:00)" },
  { value: "America/Los_Angeles", label: "Pacific Time (GMT-08:00)" },
  { value: "America/Denver", label: "Mountain Time (GMT-07:00)" },
  { value: "America/Chicago", label: "Central Time (GMT-06:00)" },
  { value: "America/New_York", label: "Eastern Time (GMT-05:00)" },
  { value: "America/Caracas", label: "Caracas (GMT-04:00)" },
  { value: "America/Sao_Paulo", label: "Brasilia (GMT-03:00)" },
  { value: "Atlantic/South_Georgia", label: "Mid-Atlantic (GMT-02:00)" },
  { value: "Atlantic/Azores", label: "Azores (GMT-01:00)" },
  { value: "Europe/London", label: "London (GMT+00:00)" },
  { value: "Europe/Berlin", label: "Berlin (GMT+01:00)" },
  { value: "Europe/Athens", label: "Athens (GMT+02:00)" },
  { value: "Europe/Moscow", label: "Moscow (GMT+03:00)" },
  { value: "Asia/Dubai", label: "Dubai (GMT+04:00)" },
  { value: "Asia/Karachi", label: "Karachi (GMT+05:00)" },
  { value: "Asia/Kolkata", label: "New Delhi (IST, GMT+05:30)" },
  { value: "Asia/Dhaka", label: "Dhaka (GMT+06:00)" },
  { value: "Asia/Bangkok", label: "Bangkok (GMT+07:00)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (GMT+08:00)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+09:00)" },
  { value: "Australia/Sydney", label: "Sydney (GMT+10:00)" },
  { value: "Pacific/Noumea", label: "New Caledonia (GMT+11:00)" },
  { value: "Pacific/Auckland", label: "Auckland (GMT+12:00)" }
];

const COUNTRY_CODES = [
  { code: "+91", iso: "in", name: "India" },
  { code: "+1", iso: "us", name: "United States" },
  { code: "+44", iso: "gb", name: "United Kingdom" },
  { code: "+61", iso: "au", name: "Australia" },
  { code: "+81", iso: "jp", name: "Japan" },
  { code: "+86", iso: "cn", name: "China" },
  { code: "+49", iso: "de", name: "Germany" },
  { code: "+33", iso: "fr", name: "France" },
  { code: "+971", iso: "ae", name: "United Arab Emirates" },
  { code: "+65", iso: "sg", name: "Singapore" },
  { code: "+880", iso: "bd", name: "Bangladesh" },
  { code: "+977", iso: "np", name: "Nepal" },
  { code: "+94", iso: "lk", name: "Sri Lanka" },
  { code: "+975", iso: "bt", name: "Bhutan" },
  { code: "+960", iso: "mv", name: "Maldives" },
  { code: "+95", iso: "mm", name: "Myanmar" },
  { code: "+66", iso: "th", name: "Thailand" },
  { code: "+62", iso: "id", name: "Indonesia" },
  { code: "+60", iso: "my", name: "Malaysia" },
  { code: "+82", iso: "kr", name: "South Korea" },
  { code: "+7", iso: "ru", name: "Russia" },
  { code: "+39", iso: "it", name: "Italy" },
  { code: "+34", iso: "es", name: "Spain" },
  { code: "+55", iso: "br", name: "Brazil" },
  { code: "+27", iso: "za", name: "South Africa" },
  { code: "+52", iso: "mx", name: "Mexico" },
  { code: "+64", iso: "nz", name: "New Zealand" }
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Step 2 State
  const [hotelName, setHotelName] = useState("");
  const [propertyType, setPropertyType] = useState("Hotel");
  const [address, setAddress] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

  // Step 3 State
  const [kycStatus, setKycStatus] = useState<KYCStatus>("Not Started");
  const [kycType, setKycType] = useState<"pan" | "aadhaar">("aadhaar");
  const [kycNumber, setKycNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [showKycForm, setShowKycForm] = useState(false);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // OTP Validation for Step 1
    if (currentStep === 1) {
      if (otp !== generatedOtp) {
        alert("Invalid OTP! Please check the mock SMS popup and enter the correct code.");
        return;
      }
    }
    
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSendOtp = () => {
    if (mobile.length >= 6) {
      setOtpSent(true);
      // Generate a dynamic 4-digit OTP
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
    }
  };

  const checkSubdomain = (val: string) => {
    setSubdomain(val);
    if (val.length < 3) {
      setSubdomainStatus("idle");
      return;
    }
    setSubdomainStatus("checking");
    setTimeout(() => {
      setSubdomainStatus(val === "taken" ? "unavailable" : "available");
    }, 1000);
  };

  const handleSimulatedVerify = () => {
    setVerificationError("");
    setIsVerifying(true);
    setKycStatus("In Progress");
    
    setTimeout(() => {
      if (kycNumber.length < 10) {
        setVerificationError(`Invalid ${kycType === "pan" ? "PAN" : "Aadhaar"} number.`);
        setKycStatus("Action Required");
        setIsVerifying(false);
      } else {
        setKycStatus("In Review");
        setIsVerifying(false);
        setShowKycForm(false);
      }
    }, 2000);
  };

  const getStatusColor = (status: KYCStatus) => {
    switch (status) {
      case "Verified": return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
      case "Submitted":
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Action Required":
      case "Reverification Required":
      case "Expiring Soon": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected":
      case "Restricted": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden py-24 sm:py-32 bg-ivory" onClick={() => isCountryDropdownOpen && setIsCountryDropdownOpen(false)}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-brass/10 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[800px] w-[800px] rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className={`relative z-10 w-full ${currentStep === 2 ? 'max-w-6xl' : 'max-w-3xl'} px-6 lg:px-8 transition-all duration-500`}>
        <Reveal>
          <div className="rounded-3xl border border-linen bg-white/70 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
            
            {/* Header & Progress */}
            <div className="mb-10">
              <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl text-center">
                {currentStep === 1 && "Create your account"}
                {currentStep === 2 && "Setup your hotel profile"}
                {currentStep === 3 && "KYC & Payouts"}
              </h1>
              <p className="mt-2 text-center text-sm text-ink-70">
                {currentStep === 3 ? "Complete KYC now or later. Don't let it stop you from setting up." : "Join Atithideva in just a few simple steps."}
              </p>

              {/* Progress Bar */}
              <div className="mt-10 relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-linen -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-navy -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" 
                  style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                />
                
                <div className="relative z-10 flex justify-between">
                  {STEPS.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                          currentStep >= step.id 
                            ? "border-navy bg-navy text-white" 
                            : "border-linen bg-white text-ink-30"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-semibold">{step.id}</span>
                        )}
                      </div>
                      <span className={`mt-2 text-[0.7rem] uppercase tracking-wider font-semibold whitespace-nowrap ${
                        currentStep >= step.id ? "text-navy" : "text-ink-30"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Create Account */}
                {currentStep === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleNext}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl mx-auto"
                  >
                    <div>
                      <label className="block text-sm font-medium text-ink-70 mb-1">Full Name</label>
                      <input required className="form-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-70 mb-1">Work Email</label>
                      <input type="email" required className="form-input" placeholder="john@hotel.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-ink-70 mb-1">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="flex flex-1 rounded-xl shadow-sm relative" onClick={(e) => e.stopPropagation()}>
                          <button 
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="form-input rounded-r-none border-r-0 w-[96px] px-2.5 flex items-center justify-between bg-white focus:z-10 focus:ring-1 focus:ring-brass"
                          >
                            <div className="flex items-center gap-1.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.name} className="w-5 object-cover rounded-[2px]" />
                              <span className="text-sm font-medium text-ink-70">{selectedCountry.code}</span>
                            </div>
                            <ChevronDown className="h-3.5 w-3.5 text-ink-30 shrink-0 ml-1" />
                          </button>
                          
                          <AnimatePresence>
                            {isCountryDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute top-full left-0 z-50 mt-1 w-64 bg-white border border-linen rounded-xl shadow-lg max-h-60 overflow-y-auto"
                              >
                                {COUNTRY_CODES.map(c => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-linen-soft text-left transition-colors"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setIsCountryDropdownOpen(false);
                                    }}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.name} className="w-5 object-cover rounded-[2px]" />
                                    <span className="text-sm font-medium text-ink-70 w-10 shrink-0">{c.code}</span>
                                    <span className="text-sm text-ink-50 truncate">{c.name}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <input 
                            type="tel" 
                            required 
                            className="form-input rounded-l-none pl-3" 
                            placeholder="98765 43210" 
                            value={mobile} 
                            onChange={e => setMobile(e.target.value)} 
                          />
                        </div>
                        <Button type="button" variant="secondary" onClick={handleSendOtp} disabled={mobile.length < 6 || otpSent}>
                          {otpSent ? "Sent!" : "Send OTP"}
                        </Button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-ink-70 mb-1">Enter OTP</label>
                        <input required className="form-input tracking-widest text-center text-lg font-medium" placeholder="••••" maxLength={4} value={otp} onChange={e => setOtp(e.target.value)} />
                        
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-center justify-center">
                          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">📱 Mock SMS Received</span>
                          <span className="text-xl font-bold text-blue-900 tracking-[0.5em] ml-[0.5em]">{generatedOtp}</span>
                          <span className="text-[10px] text-blue-500 mt-1.5 text-center px-4">
                            Since you are building the frontend first and have no backend API yet, real SMS cannot be sent. Use this dynamic mock code for testing!
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-ink-70 mb-1">Preferred Language</label>
                      <select className="form-input" value={language} onChange={e => setLanguage(e.target.value)}>
                        {LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-70 mb-1">Timezone</label>
                      <select className="form-input" value={timezone} onChange={e => setTimezone(e.target.value)}>
                        {TIMEZONES.map(tz => (
                          <option key={tz.value} value={tz.value}>{tz.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="pt-6 md:col-span-2 flex justify-end">
                      <Button type="submit" disabled={!otpSent || otp.length < 4}>
                        Continue <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 2: Hotel Profile & Live Preview */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                  >
                    {/* Form Side */}
                    <form onSubmit={handleNext} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-ink-70 mb-1">Hotel / Property Name</label>
                        <input required className="form-input" placeholder="The Grand Palace" value={hotelName} onChange={e => setHotelName(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-70 mb-1">Property Type</label>
                        <select className="form-input" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                          <option value="Hotel">Hotel</option>
                          <option value="Resort">Resort</option>
                          <option value="Homestay">Homestay</option>
                          <option value="Hostel">Hostel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-70 mb-1">Property Address</label>
                        <textarea required rows={2} className="form-input resize-none" placeholder="123 Hotel Avenue, City, State" value={address} onChange={e => setAddress(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-70 mb-1">Contact Phone</label>
                        <input required type="tel" className="form-input" placeholder="Front Desk Number" value={contactDetails} onChange={e => setContactDetails(e.target.value)} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink-70 mb-1">Choose your Subdomain</label>
                        <div className="flex rounded-lg shadow-sm">
                          <input 
                            type="text" 
                            required 
                            className="form-input rounded-r-none border-r-0 focus:z-10 focus:ring-0" 
                            placeholder="myhotel" 
                            value={subdomain} 
                            onChange={e => checkSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          />
                          <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-linen bg-paper text-ink-50 sm:text-sm">
                            .atithideva.com
                          </span>
                        </div>
                        <div className="mt-2 text-sm h-5">
                          {subdomainStatus === "checking" && <span className="text-ink-50 flex items-center"><Loader2 className="h-3 w-3 animate-spin mr-1"/> Checking availability...</span>}
                          {subdomainStatus === "available" && <span className="text-green-600 flex items-center"><CheckCircle2 className="h-3 w-3 mr-1"/> Available!</span>}
                          {subdomainStatus === "unavailable" && <span className="text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/> Already taken.</span>}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <Button type="button" variant="ghost" onClick={handleBack}>
                          <ArrowLeft className="h-4 w-4 mr-1" /> Back
                        </Button>
                        <Button type="submit" disabled={subdomainStatus === "unavailable" || !hotelName}>
                          Next Step <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </form>

                    {/* Live Preview Side */}
                    <div className="hidden lg:flex flex-col bg-paper rounded-2xl border border-linen overflow-hidden shadow-sm h-full max-h-[500px]">
                      {/* Browser Chrome */}
                      <div className="bg-linen-soft border-b border-linen p-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-4 flex-1 bg-white/50 border border-linen/50 text-ink-50 text-xs py-1.5 px-3 rounded-md truncate font-mono text-center flex items-center justify-center">
                          <span className="opacity-60 mr-1">https://</span>{subdomain || "yourhotel"}.atithideva.com
                        </div>
                      </div>
                      
                      {/* Preview Content */}
                      <div className="flex-1 bg-white p-6 overflow-y-auto">
                        <div className="animate-in fade-in duration-500">
                          {/* Mock Header */}
                          <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <div className="font-display text-lg font-semibold text-navy flex items-center gap-2 truncate">
                              <Building2 className="h-4 w-4 shrink-0" />
                              <span className="truncate">{hotelName || "Your Hotel Name"}</span>
                            </div>
                            <div className="text-[10px] text-ink-50 flex gap-3 font-medium uppercase tracking-wider shrink-0">
                              <span>Rooms</span>
                              <span>Amenities</span>
                            </div>
                          </div>

                          {/* Mock Hero */}
                          <div className="h-40 bg-linen rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-navy/5"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                              <div className="text-white w-full">
                                <p className="text-[10px] font-medium uppercase tracking-widest text-brass opacity-90">{propertyType}</p>
                                <p className="text-xs opacity-90 flex items-center mt-1.5 line-clamp-1 w-full">
                                  <MapPin className="h-3 w-3 mr-1 shrink-0" /> {address || "Enter your full address in the form..."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Mock Booking Bar */}
                          <div className="bg-navy-wash rounded-lg p-2.5 flex gap-2 border border-linen shadow-sm">
                            <div className="flex-1 bg-white border border-linen rounded flex items-center px-2 text-[10px] text-ink-50">Check-in — Check-out</div>
                            <div className="w-16 bg-white border border-linen rounded flex items-center justify-center text-[10px] text-ink-50">2 Guests</div>
                            <div className="bg-navy text-white rounded text-[10px] px-3 py-2 flex items-center justify-center font-medium">Search</div>
                          </div>
                          
                          {/* Mock Content */}
                          <div className="mt-8 space-y-3">
                            <div className="h-3 w-1/3 bg-linen rounded"></div>
                            <div className="h-2 w-full bg-linen-soft rounded"></div>
                            <div className="h-2 w-5/6 bg-linen-soft rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: KYC & Payout */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-2xl mx-auto"
                  >
                    {!showKycForm ? (
                      <div className="space-y-6">
                        <div className="bg-paper border border-linen rounded-2xl p-6 shadow-sm relative overflow-hidden">
                          {/* Background Accents */}
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-navy/5 rounded-full blur-2xl"></div>
                          
                          <div className="relative flex items-start justify-between">
                            <div>
                              <h2 className="text-xl font-display font-medium text-ink flex items-center">
                                KYC Verification
                                <span className={`ml-3 px-2.5 py-1 rounded-full text-[0.65rem] uppercase tracking-wider font-bold border ${getStatusColor(kycStatus)}`}>
                                  {kycStatus}
                                </span>
                              </h2>
                              <p className="mt-3 text-sm leading-relaxed text-ink-70 max-w-md">
                                You need to complete KYC to accept online payouts. However, <strong className="text-ink">you can start setting up your rooms and website immediately!</strong>
                              </p>
                            </div>
                            <ShieldCheck className="h-12 w-12 text-brass/40 shrink-0" />
                          </div>

                          <div className="mt-8 pt-6 border-t border-linen flex gap-3 relative z-10">
                            {kycStatus === "Not Started" || kycStatus === "Action Required" || kycStatus === "Rejected" ? (
                              <Button onClick={() => setShowKycForm(true)} className="bg-navy hover:bg-navy-dark border-none">
                                {kycStatus === "Not Started" ? "Initiate KYC Now" : "Retry KYC"}
                              </Button>
                            ) : null}
                            <Button variant="secondary" onClick={() => alert("Redirecting to your Dashboard...")} className="bg-white hover:bg-linen-soft">
                              Skip to Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>

                        {/* Document Upload Hint */}
                        <div className="bg-linen-soft border border-linen rounded-xl p-4 text-sm text-ink-70 flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-ink-50 shrink-0 mt-0.5" />
                          <p>
                            Document uploads (PAN, GST, Cancelled Cheque) can be completed later from your dashboard under <strong className="font-medium text-ink">Settings {'>'} KYC</strong>.
                          </p>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="ghost" onClick={handleBack}>
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-paper border border-linen rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-display font-medium text-ink mb-1">Identity Verification via Digilocker</h2>
                        <p className="text-sm text-ink-70 mb-6">
                          Securely verify your identity to proceed.
                        </p>
                        
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-3">
                            <button 
                              type="button"
                              onClick={() => setKycType("aadhaar")}
                              className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                                kycType === "aadhaar" ? "bg-navy text-white border-navy shadow-sm" : "bg-white text-ink-70 border-linen hover:border-navy/30"
                              }`}
                            >
                              Aadhaar Card
                            </button>
                            <button 
                              type="button"
                              onClick={() => setKycType("pan")}
                              className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                                kycType === "pan" ? "bg-navy text-white border-navy shadow-sm" : "bg-white text-ink-70 border-linen hover:border-navy/30"
                              }`}
                            >
                              PAN Card
                            </button>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-ink-70 mb-1">
                              Enter your {kycType === "pan" ? "PAN" : "Aadhaar"} Number
                            </label>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder={kycType === "pan" ? "ABCDE1234F" : "1234 5678 9012"} 
                              value={kycNumber}
                              onChange={(e) => setKycNumber(e.target.value.toUpperCase())}
                            />
                          </div>
                          
                          {verificationError && (
                            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                              <p>{verificationError}</p>
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setShowKycForm(false)}>Cancel</Button>
                            <Button 
                              onClick={handleSimulatedVerify} 
                              disabled={isVerifying || !kycNumber}
                              className="flex-1 justify-center bg-[#286090] hover:bg-[#1a4b75] border-none" 
                            >
                              {isVerifying ? (
                                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Verifying...</>
                              ) : (
                                `Verify via Digilocker`
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Login Link */}
            {currentStep === 1 && (
              <div className="mt-8 text-center text-sm text-ink-70">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-brass transition-colors hover:text-brass-dark">
                  Log in
                </Link>
              </div>
            )}
            
          </div>
        </Reveal>
      </div>
      
      {/* Helper styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-linen);
          background-color: rgba(255, 255, 255, 0.8);
          padding: 0.625rem 1rem;
          color: var(--color-ink);
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: var(--color-brass);
          outline: none;
          box-shadow: 0 0 0 1px var(--color-brass);
        }
        .form-input::placeholder {
          color: var(--color-ink-30);
        }
      `}} />
    </main>
  );
}
