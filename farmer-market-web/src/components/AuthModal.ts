import { Language, translations } from '../i18n/translations';
import { api } from '../services/api';

export function renderAuthModal(
  lang: Language,
  mode: 'login' | 'register',
  otpStep: boolean,
  pendingPhone: string,
  lastSentCode: string = '',
  matchedUserName: string = '',
  matchedUserRole: string = '',
  errorMessage: string = '',
  matchedUserEmail: string = ''
): string {
  const t = translations[lang];

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeAuthModal()">
      <div class="auth-modal-dialog">
        
        <!-- Header (Fixed at top of modal) -->
        <div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 p-5 sm:p-6 text-white relative shrink-0">
          <button onclick="window.closeAuthModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>

          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xl font-black shadow-inner">
              <i class="fa-solid fa-wheat-awn"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/90">Ethiopian Agricultural Exchange</span>
              <h3 class="text-lg sm:text-xl font-black tracking-tight text-white ${lang === 'am' ? 'lang-am' : ''}">
                ${mode === 'login'
      ? (lang === 'am' ? 'ወደ መለያዎ ይግቡ' : 'Sign In to Your Account')
      : (lang === 'am' ? 'አዲስ የጅምላ መለያ ይመዝገቡ' : 'Create a Wholesale Account')}
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-3 text-[11px] text-slate-300 font-medium pt-1">
            <span class="flex items-center gap-1 text-emerald-300"><i class="fa-solid fa-shield-halved"></i> 256-Bit SSL Secured</span>
            <span>·</span>
            <span class="flex items-center gap-1 text-blue-300"><i class="fa-solid fa-bolt"></i> Telebirr Escrow Automated</span>
          </div>
        </div>

        <!-- Scrollable Modal Body -->
        <div class="auth-modal-body space-y-5 bg-white">
          
          <!-- Mode Switcher Tabs (Sign In vs Register) -->
          <div class="flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-bold shrink-0">
            <button onclick="window.setAuthMode('login')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${mode === 'login' ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-900'}">
              <i class="fa-solid fa-right-to-bracket text-emerald-700"></i> ${lang === 'am' ? 'ግባ (Sign In)' : 'Sign In (መግቢያ)'}
            </button>
            <button onclick="window.setAuthMode('register')" 
              class="flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${mode === 'register' ? 'bg-white text-emerald-950 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-900'}">
              <i class="fa-solid fa-user-plus text-emerald-700"></i> ${lang === 'am' ? 'ተመዝገብ (Join Free)' : 'Join Free (አዲስ መመዝገቢያ)'}
            </button>
          </div>

          ${errorMessage ? `
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-fadeIn">
              <i class="fa-solid fa-circle-exclamation text-red-500 text-sm mt-0.5 shrink-0"></i>
              <div class="flex-1">
                <span class="font-bold block">${errorMessage}</span>
                ${mode === 'login' && errorMessage.toLowerCase().includes('register') ? `
                  <button type="button" onclick="window.switchToRegisterWithPhone('${pendingPhone}')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-user-plus"></i> Register This Phone Now
                  </button>
                ` : ''}
                ${mode === 'register' && (errorMessage.toLowerCase().includes('already exists') || errorMessage.toLowerCase().includes('sign in')) ? `
                  <button type="button" onclick="window.setAuthMode('login')" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer">
                    <i class="fa-solid fa-right-to-bracket"></i> Switch to Sign In (ግባ)
                  </button>
                ` : ''}
              </div>
            </div>
          ` : ''}

          ${mode === 'login' ? `
            <!-- Real Database Phone / OTP Login Flow -->
            ${!otpStep ? `
              <form onsubmit="window.handleRequestOtp(event)" class="space-y-4 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-800">
                      ${lang === 'am' ? 'የተመዘገበ የሞባይል ስልክ ቁጥር' : 'Registered Ethiopian Mobile Number'}
                    </label>
                    <span class="text-[10px] text-slate-400 font-semibold">Strict Database Verification</span>
                  </div>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-500 text-sm flex items-center gap-1.5 pointer-events-none">
                      <span class="text-base">🇪🇹</span> +251
                    </span>
                    <input type="tel" id="authPhoneInput" required placeholder="911 223 344" value="${pendingPhone || ''}"
                      class="w-full pl-24 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white transition-all tracking-wide" />
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-database text-emerald-600"></i> ${lang === 'am' ? 'በዳታቤዝ ውስጥ የተመዘገቡ ተጠቃሚዎች ብቻ መግባት ይችላሉ።' : 'Only existing registered accounts in the database can sign in.'}
                  </p>
                </div>

                <button type="submit" id="requestOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${lang === 'am' ? 'የኤስኤምኤስ እና የኢሜይል ማረጋገጫ ኮድ ላክ' : 'Verify & Send SMS/Email Code'}
                </button>

                <!-- Quick Test Numbers & Demo Accounts (Always visible on Vercel and local) -->
                <div class="pt-3 border-t border-slate-100 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <i class="fa-solid fa-key text-emerald-600"></i> Demo Credentials &amp; Test Numbers
                    </span>
                    <span class="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Click to Auto-fill</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    <!-- SUPER ADMIN -->
                    <button type="button" onclick="window.quickFillPhone('900 000 001')" 
                      class="p-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100/70 hover:from-rose-100 hover:to-rose-200/80 border border-rose-300 transition-all text-left cursor-pointer group sm:col-span-2 shadow-xs">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-black text-rose-950 flex items-center gap-1.5">
                          <span>👑</span> Dr. Dawit Haile
                        </span>
                        <span class="text-[9px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">SUPER ADMIN</span>
                      </div>
                      <div class="flex items-center justify-between mt-1">
                        <span class="text-[11px] text-rose-800 font-mono font-black tracking-wide">+251 900 000 001</span>
                        <span class="text-[10px] text-rose-700 font-bold group-hover:underline">Click to Fill &rarr;</span>
                      </div>
                    </button>

                    <!-- MARKET ADMIN -->
                    <button type="button" onclick="window.quickFillPhone('900 112 233')" 
                      class="p-2 rounded-xl bg-purple-50/80 hover:bg-purple-100/90 border border-purple-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-purple-950">🛡️ Sara Mengistu</span>
                        <span class="text-[9px] font-black bg-purple-600 text-white px-1.5 py-0.5 rounded">ADMIN</span>
                      </div>
                      <span class="text-[10px] text-purple-800 font-mono font-bold block mt-0.5">+251 900 112 233</span>
                    </button>

                    <!-- WHOLESALE BUYER -->
                    <button type="button" onclick="window.quickFillPhone('955 667 788')" 
                      class="p-2 rounded-xl bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-blue-950">🛒 Bethlehem (FreshMart)</span>
                        <span class="text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">BUYER</span>
                      </div>
                      <span class="text-[10px] text-blue-800 font-mono font-bold block mt-0.5">+251 955 667 788</span>
                    </button>

                    <!-- PRODUCE FARMER -->
                    <button type="button" onclick="window.quickFillPhone('911 223 344')" 
                      class="p-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-emerald-950">🌾 Abebe Bekele</span>
                        <span class="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded">FARMER</span>
                      </div>
                      <span class="text-[10px] text-emerald-800 font-mono font-bold block mt-0.5">+251 911 223 344</span>
                    </button>

                    <!-- COLD-CHAIN DRIVER -->
                    <button type="button" onclick="window.quickFillPhone('977 889 900')" 
                      class="p-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-amber-950">🚚 Dawit (Isuzu 5-Ton)</span>
                        <span class="text-[9px] font-black bg-amber-600 text-white px-1.5 py-0.5 rounded">DRIVER</span>
                      </div>
                      <span class="text-[10px] text-amber-800 font-mono font-bold block mt-0.5">+251 977 889 900</span>
                    </button>
                  </div>
                </div>
              </form>
            ` : `
              <!-- OTP Verification Step -->
              <form onsubmit="window.handleVerifyOtp(event)" class="space-y-4 pt-1">
                
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                      <i class="fa-solid fa-envelope-circle-check"></i>
                    </div>
                    <div>
                      <span class="block font-extrabold text-slate-900">${matchedUserName ? `Account: <strong>${matchedUserName}</strong> (${matchedUserRole})` : 'Multi-Channel Verification'}</span>
                      <span class="text-[11px] text-emerald-800 font-medium block">Phone: <strong>+251 ${pendingPhone}</strong></span>
                      ${matchedUserEmail ? `
                        <div class="text-[11px] text-emerald-950 font-bold flex items-center gap-1.5 mt-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                          <i class="fa-solid fa-envelope text-emerald-600"></i> Code sent to: <span class="underline text-emerald-800">${matchedUserEmail}</span>
                        </div>
                      ` : ''}
                      ${lastSentCode ? `
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100/90 rounded-md border border-emerald-300 text-emerald-950 font-bold text-[10px]">
                          <span>Demo OTP Code:</span> <code class="font-mono text-emerald-900 text-xs font-black">${lastSentCode}</code>
                        </div>
                      ` : `
                        <div class="text-[10px] text-slate-500 font-medium mt-1">
                          <i class="fa-solid fa-inbox text-emerald-600 mr-1"></i> Please check your email inbox for the 6-digit code.
                        </div>
                      `}
                    </div>
                  </div>
                  <button type="button" onclick="window.resetOtpStep()" class="text-xs text-emerald-800 hover:text-emerald-950 underline font-bold cursor-pointer shrink-0">
                    Change Phone
                  </button>
                </div>

                <div>
                  <label class="block mb-2 text-xs font-bold text-slate-800 text-center">
                    ${lang === 'am' ? 'የ6-ዲጂት ማረጋገጫ ኮዱን ያስገቡ' : 'Enter 6-Digit Verification Code'}
                  </label>
                  <input type="text" id="authOtpInput" maxlength="6" required placeholder="• • • • • •" autofocus
                    value="${lastSentCode || ''}"
                    class="w-full py-3.5 px-4 rounded-xl border border-slate-300 text-center text-3xl font-mono font-black tracking-widest focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 text-slate-900 shadow-inner" />
                  
                  <div class="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
                    <span>Didn't receive code?</span>
                    <button type="button" onclick="window.handleRequestOtp(event)" class="text-emerald-700 hover:underline font-bold cursor-pointer">
                      Resend Email / SMS Code
                    </button>
                  </div>
                </div>

                <button type="submit" id="verifyOtpBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer">
                  <i class="fa-solid fa-circle-check mr-1.5"></i> ${lang === 'am' ? 'አረጋግጥና ግባ' : 'Verify Code & Sign In'}
                </button>
              </form>
            `}

          ` : `
            <!-- Professional B2B Registration Flow (Creates Real DB User) -->
            <form onsubmit="window.handleRegisterUser(event)" class="space-y-4 text-xs pt-1">
              
              <div>
                <label class="block mb-2 font-bold text-slate-800 text-xs">
                  ${lang === 'am' ? 'የንግድ / የሥራ ዘርፍ ይምረጡ' : 'Select Your Business Role on the Exchange'}
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  <label class="role-radio-card active" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="farmer" checked class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Smallholder Farmer / Co-op 🌾</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Sell harvest directly to buyers with ${api.getPlatformConfig().farmerSharePercent}% payout.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="buyer" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Wholesale Buyer / Retail 🛒</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Source farm produce in bulk with Telebirr escrow.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="driver" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Freight Carrier 🚚</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Transport produce with 5% guaranteed escrow cut.</span>
                    </div>
                  </label>

                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-800">Full Legal Name (English)</label>
                  <input type="text" id="regName" required placeholder="e.g. Tariku Haile" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-800">ሙሉ ስም በአማርኛ (Amharic Name)</label>
                  <input type="text" id="regNameAm" placeholder="ለምሳሌ: ታሪኩ ኃይሌ" 
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium lang-am" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-800">Region / Agricultural Zone</label>
                  <select id="regRegion" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 font-medium">
                    <option value="Oromia (Bishoftu)">Oromia (Bishoftu / Ada'a)</option>
                    <option value="Addis Ababa (Bole)">Addis Ababa (Bole Commercial)</option>
                    <option value="Amhara (Debre Berhan)">Amhara (Debre Berhan / Shewa)</option>
                    <option value="Sidama (Hawassa)">Sidama (Hawassa Lake Region)</option>
                    <option value="Oromia (Awash Melkasa)">Oromia (Awash Melkasa)</option>
                    <option value="SNNPR (Ziway)">SNNPR (Ziway Horticulture)</option>
                  </select>
                </div>

                <div>
                  <label class="block mb-1 font-bold text-slate-800">Mobile Phone Number</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">+251</span>
                    <input type="tel" id="regPhone" required placeholder="911 000 111" value="${pendingPhone || ''}"
                      class="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-bold" />
                  </div>
                </div>
              </div>

              <!-- Optional Email Address Field -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <i class="fa-solid fa-envelope text-emerald-600"></i> ${lang === 'am' ? 'የኢሜይል አድራሻ (አማራጭ)' : 'Email Address (Optional)'}
                  </label>
                  <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                    ${lang === 'am' ? 'ለኦቲፒ እና የትዕዛዝ ማሳወቂያዎች' : 'For OTP & Email Alerts'}
                  </span>
                </div>
                <input type="email" id="regEmail" placeholder="e.g. tariku.haile@example.com (Optional)" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium" />
                <p class="text-[11px] text-slate-500 mt-1">
                  ${lang === 'am' ? 'ኢሜይል ካስገቡ የማረጋገጫ ኮድ (OTP) እና ሁሉም የትዕዛዝ መልዕክቶች በኢሜይልዎ ይደርሳሉ።' : 'If provided, OTP verification codes and order updates will also be sent to your email.'}
                </p>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" checked required class="mt-0.5 rounded text-emerald-600" />
                <span>I agree to the <strong>Farmer-to-Market Produce Exchange Terms</strong> and automated <strong>Telebirr Escrow terms</strong>.</span>
              </div>

              <button type="submit" id="registerSubmitBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mt-1">
                <i class="fa-solid fa-paper-plane mr-1.5"></i> ${lang === 'am' ? 'ይመዝገቡና የማረጋገጫ ኮድ (OTP) በSMS ይቀበሉ' : 'Register & Receive SMS OTP Code'}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `;
}
