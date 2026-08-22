import { Language, translations } from '../i18n/translations';

export function renderAuthModal(
  lang: Language,
  mode: 'login' | 'register',
  otpStep: boolean,
  pendingPhone: string,
  lastSentCode: string = '',
  matchedUserName: string = '',
  matchedUserRole: string = '',
  errorMessage: string = ''
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
                  <i class="fa-solid fa-paper-plane mr-1.5"></i> ${lang === 'am' ? 'የኤስኤምኤስ ማረጋገጫ ኮድ ላክ' : 'Verify & Send SMS Code'}
                </button>

                <!-- Quick Test Accounts from Seed Database -->
                <div class="pt-3 border-t border-slate-100 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <i class="fa-solid fa-flask-vial text-emerald-600 mr-1"></i> Quick Test Accounts (Seeded in Database)
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-left">
                    <button type="button" onclick="window.quickFillPhone('911 223 344')" 
                      class="p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-emerald-950">🌾 Abebe Bekele</span>
                        <span class="text-[9px] font-black bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded">FARMER</span>
                      </div>
                      <span class="text-[10px] text-emerald-800 font-mono block mt-0.5">+251 911 223 344</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('955 667 788')" 
                      class="p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-blue-950">🛒 Bethlehem (FreshMart)</span>
                        <span class="text-[9px] font-black bg-blue-200/80 text-blue-900 px-1.5 py-0.5 rounded">BUYER</span>
                      </div>
                      <span class="text-[10px] text-blue-800 font-mono block mt-0.5">+251 955 667 788</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('977 889 900')" 
                      class="p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-amber-950">🚚 Dawit (Isuzu 5-Ton)</span>
                        <span class="text-[9px] font-black bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">DRIVER</span>
                      </div>
                      <span class="text-[10px] text-amber-800 font-mono block mt-0.5">+251 977 889 900</span>
                    </button>

                    <button type="button" onclick="window.quickFillPhone('900 112 233')" 
                      class="p-2 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 transition-all text-left cursor-pointer group">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] font-extrabold text-purple-950">🛡️ Sara Mengistu</span>
                        <span class="text-[9px] font-black bg-purple-200/80 text-purple-900 px-1.5 py-0.5 rounded">ADMIN</span>
                      </div>
                      <span class="text-[10px] text-purple-800 font-mono block mt-0.5">+251 900 112 233</span>
                    </button>
                  </div>
                </div>
              </form>
            ` : `
              <!-- OTP Verification Step -->
              <form onsubmit="window.handleVerifyOtp(event)" class="space-y-4 pt-1">
                
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      <i class="fa-solid fa-comment-sms"></i>
                    </div>
                    <div>
                      <span class="block font-bold">${matchedUserName ? `Account: <strong>${matchedUserName}</strong> (${matchedUserRole})` : 'SMS Dispatched via Twilio Gateway'}</span>
                      <span class="text-[11px] text-emerald-700 font-medium">Verified Phone: <strong>+251 ${pendingPhone}</strong></span>
                      ${lastSentCode ? `
                        <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-md border border-emerald-300 text-emerald-900 font-bold text-[10px]">
                          <span>SMS Code:</span> <code class="font-mono text-emerald-800 text-xs font-black">${lastSentCode}</code>
                        </div>
                      ` : ''}
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
                    <span>Didn't receive SMS?</span>
                    <button type="button" onclick="window.handleRequestOtp(event)" class="text-emerald-700 hover:underline font-bold cursor-pointer">
                      Resend SMS Code
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
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  <label class="role-radio-card active" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="farmer" checked class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Smallholder Farmer / Co-op 🌾</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Sell harvest directly to buyers with 90% payout.</span>
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
                      <span class="font-extrabold text-slate-900 block text-xs">Freight & Logistics Carrier 🚚</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Transport produce batches with 5% guaranteed trip cut.</span>
                    </div>
                  </label>

                  <label class="role-radio-card" onclick="document.querySelectorAll('.role-radio-card').forEach(el=>el.classList.remove('active')); this.classList.add('active');">
                    <input type="radio" name="regRole" value="admin" class="mt-1" />
                    <div>
                      <span class="font-extrabold text-slate-900 block text-xs">Market Officer / Co-op Lead 🛡️</span>
                      <span class="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">Verify farm IDs and arbitrate escrow claims.</span>
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

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
                <input type="checkbox" checked required class="mt-0.5 rounded text-emerald-600" />
                <span>I agree to the <strong>Farmer-to-Market Produce Exchange Terms</strong> and automated <strong>Telebirr Escrow terms</strong>.</span>
              </div>

              <button type="submit" id="registerSubmitBtn" class="btn-primary w-full py-3.5 text-sm font-bold shadow-md cursor-pointer mt-1">
                <i class="fa-solid fa-user-check mr-1.5"></i> ${lang === 'am' ? 'ይመዝገቡና ወደ መለያዎ ይግቡ' : 'Complete Registration & Sign In'}
              </button>
            </form>
          `}

        </div>
      </div>
    </div>
  `;
}
