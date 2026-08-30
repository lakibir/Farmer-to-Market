import { Language, translations } from '../i18n/translations';
import { User, UserRole } from '../types';
import { api } from '../services/api';

export function renderSuperAdminModals(
  lang: Language,
  isCreateUserModalOpen: boolean = false,
  isEditUserModalOpen: boolean = false,
  editTargetUserId: string | null = null,
  isAddZoneModalOpen: boolean = false,
  isAddBlacklistModalOpen: boolean = false,
  isBannerModalOpen: boolean = false,
  editTargetBannerId: string | null = null,
  isListingEditModalOpen: boolean = false,
  editTargetListingId: string | null = null
): string {
  const t = translations[lang];

  return `
    <!-- Create User Modal -->
    ${isCreateUserModalOpen ? `
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-400 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-rose-400/90">Super Admin Manual Onboarding</span>
                <h3 class="text-lg font-black text-white">Create New Account (Direct Onboarding)</h3>
              </div>
            </div>
          </div>

          <form onsubmit="window.handleCreateUserSubmit(event)" class="p-6 space-y-4 text-xs">
            <div>
              <label class="block mb-1.5 font-bold text-slate-800">Assigned Account Role</label>
              <select id="newRoleSelect" required onchange="window.handleRoleChangeInModal(this.value)" class="input-field text-xs font-bold bg-slate-50">
                <option value="farmer">🌾 Smallholder Farmer / Producer</option>
                <option value="buyer">🛒 Wholesale Buyer / Supermarket</option>
                <option value="driver">🚚 Freight Logistics Driver</option>
                <option value="agent">👥 Field Extension Agent</option>
                <option value="admin">🛡️ Platform Admin</option>
                <option value="superadmin">👑 Super Admin (Root Access)</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Full Name (English)</label>
                <input type="text" id="newNameInput" required placeholder="e.g. Abebe Kebede" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Full Name (Amharic / Optional)</label>
                <input type="text" id="newNameAmInput" placeholder="አበበ ከበደ" class="input-field text-xs font-bold" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Ethiopian Mobile Number</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">+251</span>
                  <input type="tel" id="newPhoneInput" required placeholder="911 223 344" class="input-field pl-12 text-xs font-bold font-mono" />
                </div>
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda</label>
                <input type="text" id="newRegionInput" required placeholder="e.g. Oromia (Bishoftu / Ada'a)" class="input-field text-xs font-bold" />
              </div>
            </div>

            <!-- Dynamic Role-Specific Fields Container -->
            <div id="roleSpecificFields" class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <!-- Farmer Defaults -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Primary Produce / Crop</label>
                  <input type="text" id="newPrimaryCropInput" placeholder="e.g. Magna Teff, Fresh Tomatoes" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Kebele / Farm Location</label>
                  <input type="text" id="newKebeleInput" placeholder="e.g. Kebele 03 Farm Cluster" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">National ID (Fayda FAN)</label>
                  <input type="text" id="newFaydaInput" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN Number)</label>
                  <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input type="checkbox" id="newVerifiedCheck" checked class="rounded text-emerald-600" />
                <span>Mark as Pre-Verified (Bypass Document Queue)</span>
              </label>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="btn-primary py-2.5 px-5 font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                <i class="fa-solid fa-user-plus"></i> Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : ''}

    <!-- Edit User Modal -->
    ${isEditUserModalOpen && editTargetUserId ? (() => {
      const user = api.getUserById(editTargetUserId);
      if (!user) return '';
      return `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
            <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-5 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <h3 class="text-base font-black text-white">Edit User Profile: ${user.name}</h3>
              <p class="text-[11px] text-slate-400 font-mono">${user.id}</p>
            </div>

            <form onsubmit="window.handleEditUserSubmit(event, '${user.id}')" class="p-6 space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Full Name</label>
                  <input type="text" id="editNameInput" required value="${user.name}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Mobile Phone</label>
                  <input type="tel" id="editPhoneInput" required value="${user.phone}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Role</label>
                  <select id="editRoleSelect" class="input-field text-xs font-bold">
                    <option value="farmer" ${user.role === 'farmer' ? 'selected' : ''}>Farmer</option>
                    <option value="buyer" ${user.role === 'buyer' ? 'selected' : ''}>Buyer</option>
                    <option value="driver" ${user.role === 'driver' ? 'selected' : ''}>Driver</option>
                    <option value="agent" ${user.role === 'agent' ? 'selected' : ''}>Agent</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="superadmin" ${user.role === 'superadmin' ? 'selected' : ''}>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Status</label>
                  <select id="editStatusSelect" class="input-field text-xs font-bold">
                    <option value="active" ${user.status !== 'suspended' ? 'selected' : ''}>Active</option>
                    <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region</label>
                <input type="text" id="editRegionInput" required value="${user.region}" class="input-field text-xs font-bold" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Fayda National ID</label>
                  <input type="text" id="editFaydaInput" value="${user.faydaId || ''}" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-mono font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">TIN Number</label>
                  <input type="text" id="editTinInput" value="${user.tinNumber || ''}" placeholder="0011223344" class="input-field text-xs font-mono font-bold" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-4 font-bold shadow-md cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
    })() : ''}

    <!-- Add Delivery Zone Modal -->
    ${isAddZoneModalOpen ? `
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 to-teal-950 p-5 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <h3 class="text-base font-black text-white">Add Regional Delivery Zone</h3>
          </div>

          <form onsubmit="window.handleAddZoneSubmit(event)" class="p-6 space-y-3.5 text-xs">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Zone Name (English)</label>
              <input type="text" id="zoneNameInput" required placeholder="e.g. Afar Awash Agricultural Corridor" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Terminal Hub Name</label>
              <input type="text" id="zoneHubInput" required placeholder="e.g. Semera Wholesale Transit Terminal" class="input-field text-xs font-bold" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Center Latitude</label>
                <input type="number" step="0.0001" id="zoneLatInput" required value="11.7934" class="input-field text-xs font-mono font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Center Longitude</label>
                <input type="number" step="0.0001" id="zoneLngInput" required value="41.0094" class="input-field text-xs font-mono font-bold" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block mb-1 font-bold text-slate-700">Base Radius (km)</label>
                <input type="number" id="zoneRadiusInput" required value="50" class="input-field text-xs font-bold" />
              </div>
              <div>
                <label class="block mb-1 font-bold text-slate-700">Rural Bonus (ETB)</label>
                <input type="number" id="zoneBonusInput" required value="300" class="input-field text-xs font-bold" />
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="btn-primary py-2 px-4 font-bold shadow-md cursor-pointer">
                Save Zone
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : ''}

    <!-- Add Blacklist Modal -->
    ${isAddBlacklistModalOpen ? `
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
        <div class="glass-card max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn">
          <div class="bg-gradient-to-r from-slate-950 to-red-950 p-5 text-white relative">
            <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <h3 class="text-base font-black text-white">Add Entity to Global Blacklist</h3>
          </div>

          <form onsubmit="window.handleAddBlacklistSubmit(event)" class="p-6 space-y-3.5 text-xs">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Entity Type</label>
              <select id="blTypeSelect" class="input-field text-xs font-bold">
                <option value="Phone">Mobile Phone Number</option>
                <option value="NationalId">Fayda National ID (FAN)</option>
                <option value="TinNumber">Taxpayer ID (TIN)</option>
                <option value="IpAddress">IP Address / Subnet</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Value to Blacklist</label>
              <input type="text" id="blValueInput" required placeholder="e.g. +251911000000 OR FAN-9999-..." class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Reason / Infraction Details</label>
              <textarea id="blReasonInput" required rows="3" placeholder="Describe the reason for blacklisting..." class="input-field text-xs"></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md cursor-pointer">
                Blacklist Entity
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : ''}

    <!-- Create / Edit Banner Modal -->
    ${isBannerModalOpen ? (() => {
      const banner = editTargetBannerId ? api.getBannerById(editTargetBannerId) : null;
      return `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn max-h-[90vh] flex flex-col">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-panorama"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/90">Promotions & Bulletins</span>
                  <h3 class="text-lg font-black text-white">${banner ? 'Edit Promotional Banner' : 'Create Promotional Banner'}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleSaveBannerSubmit(event, '${editTargetBannerId || ''}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (English) *</label>
                  <input type="text" id="bannerTitleInput" required value="${banner ? banner.title : ''}" placeholder="e.g. Fresh Harvest Direct From Bishoftu" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Banner Title (Amharic)</label>
                  <input type="text" id="bannerTitleAmInput" value="${banner?.titleAm || ''}" placeholder="የቢሾፍቱ አዳዲስ ምርቶች በቀጥታ ከእርሻ" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (English)</label>
                  <textarea id="bannerSubtitleInput" rows="2" placeholder="Brief announcement details..." class="input-field text-xs">${banner?.subtitle || ''}</textarea>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Subtitle / Description (Amharic)</label>
                  <textarea id="bannerSubtitleAmInput" rows="2" placeholder="የማስታወቂያው ዝርዝር..." class="input-field text-xs">${banner?.subtitleAm || ''}</textarea>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Audience</label>
                  <select id="bannerAudienceSelect" class="input-field text-xs font-bold">
                    <option value="All" ${banner?.targetAudience === 'All' ? 'selected' : ''}>🌐 All Portals</option>
                    <option value="Buyer" ${banner?.targetAudience === 'Buyer' ? 'selected' : ''}>🛒 Wholesale Buyers</option>
                    <option value="Farmer" ${banner?.targetAudience === 'Farmer' ? 'selected' : ''}>🌾 Farmers & Producers</option>
                    <option value="Driver" ${banner?.targetAudience === 'Driver' ? 'selected' : ''}>🚚 Logistics Drivers</option>
                    <option value="Agent" ${banner?.targetAudience === 'Agent' ? 'selected' : ''}>👥 Extension Agents</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Target Region</label>
                  <select id="bannerRegionSelect" class="input-field text-xs font-bold">
                    <option value="All" ${banner?.targetRegion === 'All' ? 'selected' : ''}>All Regions</option>
                    <option value="Addis Ababa" ${banner?.targetRegion === 'Addis Ababa' ? 'selected' : ''}>Addis Ababa</option>
                    <option value="Oromia" ${banner?.targetRegion === 'Oromia' ? 'selected' : ''}>Oromia</option>
                    <option value="Amhara" ${banner?.targetRegion === 'Amhara' ? 'selected' : ''}>Amhara</option>
                    <option value="Sidama" ${banner?.targetRegion === 'Sidama' ? 'selected' : ''}>Sidama</option>
                    <option value="SNNPR" ${banner?.targetRegion === 'SNNPR' ? 'selected' : ''}>SNNPR</option>
                    <option value="Tigray" ${banner?.targetRegion === 'Tigray' ? 'selected' : ''}>Tigray</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Display Priority (1-10)</label>
                  <input type="number" id="bannerPriorityInput" min="1" max="10" value="${banner ? banner.priority : 5}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (e.g. Harvest 2026)</label>
                  <input type="text" id="bannerBadgeInput" value="${banner?.badgeText || ''}" placeholder="e.g. Special Promotion" class="input-field text-xs" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Badge Text (Amharic)</label>
                  <input type="text" id="bannerBadgeAmInput" value="${banner?.badgeTextAm || ''}" placeholder="e.g. ልዩ ቅናሽ" class="input-field text-xs" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Button Text</label>
                  <input type="text" id="bannerCtaTextInput" value="${banner?.ctaText || 'Browse Marketplace'}" placeholder="e.g. Order Now" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">CTA Target Action / Tab</label>
                  <select id="bannerCtaLinkSelect" class="input-field text-xs font-bold">
                    <option value="marketplace" ${banner?.ctaLink === 'marketplace' ? 'selected' : ''}>🛒 Marketplace (Buyer)</option>
                    <option value="farmer" ${banner?.ctaLink === 'farmer' ? 'selected' : ''}>🌾 Farmer Portal</option>
                    <option value="driver" ${banner?.ctaLink === 'driver' ? 'selected' : ''}>🚚 Driver Logistics</option>
                    <option value="agent" ${banner?.ctaLink === 'agent' ? 'selected' : ''}>👥 Agent Directory</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Banner Background Image URL</label>
                <input type="url" id="bannerImageUrlInput" value="${banner?.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'}" class="input-field text-xs font-mono" />
                <div class="flex flex-wrap gap-2 pt-1.5">
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🌾 Fresh Harvest</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🛡️ Fayda & ID</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🚚 Cold Chain Logistics</button>
                  <button type="button" onclick="document.getElementById('bannerImageUrlInput').value='https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1200'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer">🏪 Wholesale Market</button>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Theme Gradient Style</label>
                <select id="bannerGradientSelect" class="input-field text-xs font-bold">
                  <option value="from-emerald-900 via-teal-900 to-slate-900" ${banner?.themeGradient?.includes('emerald') ? 'selected' : ''}>🍃 Emerald & Teal (Agriculture/Harvest)</option>
                  <option value="from-blue-900 via-indigo-950 to-slate-900" ${banner?.themeGradient?.includes('blue') ? 'selected' : ''}>🔷 Royal Blue & Indigo (Legal/Fayda)</option>
                  <option value="from-amber-900 via-orange-950 to-slate-900" ${banner?.themeGradient?.includes('amber') ? 'selected' : ''}>🔶 Amber & Orange (Freight Logistics)</option>
                  <option value="from-rose-950 via-slate-900 to-purple-950" ${banner?.themeGradient?.includes('rose') ? 'selected' : ''}>👑 Rose & Purple (Super Admin Spotlight)</option>
                </select>
              </div>

              <div class="flex items-center gap-2 pt-2">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="bannerIsActiveCheck" ${banner ? (banner.isActive ? 'checked' : '') : 'checked'} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Activate Banner Immediately Upon Saving</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                  ${banner ? 'Save Changes' : 'Publish Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
    })() : ''}

    <!-- Moderate / Edit Produce Listing Modal -->
    ${isListingEditModalOpen && editTargetListingId ? (() => {
      const listing = api.getListings().find(l => l.id === editTargetListingId);
      if (!listing) return '';
      return `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeSuperAdminModal()">
          <div class="glass-card max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleIn max-h-[90vh] flex flex-col">
            <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 p-6 text-white relative">
              <button onclick="window.closeSuperAdminModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center text-xl font-black">
                  <i class="fa-solid fa-gavel"></i>
                </div>
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-purple-400/90">Post & Listing Governance</span>
                  <h3 class="text-lg font-black text-white">Moderate Listing: ${listing.productName}</h3>
                </div>
              </div>
            </div>

            <form onsubmit="window.handleAdminEditListingSubmit(event, '${listing.id}')" class="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <!-- Farmer Info Card -->
              <div class="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                <div>
                  <p class="font-bold text-slate-800">${listing.farmerName} <span class="text-slate-400 font-normal">(${listing.farmerPhone})</span></p>
                  <p class="text-[11px] text-slate-500">${listing.region}</p>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-white text-purple-800 border border-purple-200 text-[10px] font-bold">
                  Listing ID: ${listing.id.slice(0, 8)}...
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (English) *</label>
                  <input type="text" id="listingNameInput" required value="${listing.productName}" class="input-field text-xs font-bold" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Product Name (Amharic)</label>
                  <input type="text" id="listingNameAmInput" value="${listing.nameAm || ''}" class="input-field text-xs font-bold" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Produce Category</label>
                  <select id="listingCategorySelect" class="input-field text-xs font-bold">
                    <option value="Vegetables" ${listing.category === 'Vegetables' ? 'selected' : ''}>Vegetables</option>
                    <option value="Cereals" ${listing.category === 'Cereals' ? 'selected' : ''}>Cereals / Grains</option>
                    <option value="Fruits" ${listing.category === 'Fruits' ? 'selected' : ''}>Fruits</option>
                    <option value="Pulses" ${listing.category === 'Pulses' ? 'selected' : ''}>Pulses</option>
                    <option value="Spices" ${listing.category === 'Spices' ? 'selected' : ''}>Spices</option>
                    <option value="Oilseeds" ${listing.category === 'Oilseeds' ? 'selected' : ''}>Oilseeds</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Grade / Quality</label>
                  <select id="listingGradeSelect" class="input-field text-xs font-bold">
                    <option value="Grade 1 (Premium / Export)" ${listing.grade?.includes('1') ? 'selected' : ''}>Grade 1 (Premium / Export)</option>
                    <option value="Grade 2 (Standard Wholesale)" ${listing.grade?.includes('2') || !listing.grade ? 'selected' : ''}>Grade 2 (Standard Wholesale)</option>
                    <option value="Grade 3 (Processing / Bulk)" ${listing.grade?.includes('3') ? 'selected' : ''}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Moderation Status</label>
                  <select id="listingModerationStatusSelect" class="input-field text-xs font-bold ${listing.moderationStatus === 'Flagged' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}">
                    <option value="Approved" ${listing.moderationStatus === 'Approved' || !listing.moderationStatus ? 'selected' : ''}>✅ Approved (Live on Marketplace)</option>
                    <option value="PendingReview" ${listing.moderationStatus === 'PendingReview' ? 'selected' : ''}>⏳ Pending Review (Hidden)</option>
                    <option value="Flagged" ${listing.moderationStatus === 'Flagged' ? 'selected' : ''}>⚠️ Flagged (Price Anomaly / Review)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Price per Kg (ETB) *</label>
                  <input type="number" step="0.5" id="listingPriceInput" required value="${listing.pricePerKg}" class="input-field text-xs font-bold font-mono" />
                  <span class="text-[10px] text-slate-400">Benchmark: ${listing.marketBenchmarkPrice || 50} ETB/kg</span>
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Total Available Stock (Kg) *</label>
                  <input type="number" id="listingQtyInput" required value="${listing.qtyKg}" class="input-field text-xs font-bold font-mono" />
                </div>
                <div>
                  <label class="block mb-1 font-bold text-slate-700">Minimum Order Quantity (Kg)</label>
                  <input type="number" id="listingMinOrderInput" value="${listing.minOrderKg || 50}" class="input-field text-xs font-bold font-mono" />
                </div>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Region / Woreda Farm Location</label>
                <input type="text" id="listingRegionInput" value="${listing.region}" class="input-field text-xs font-bold" />
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">Listing Description</label>
                <textarea id="listingDescInput" rows="3" placeholder="Produce harvest details, packaging, shelf life..." class="input-field text-xs">${listing.description || ''}</textarea>
              </div>

              <div class="flex items-center gap-4 pt-1">
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingOrganicCheck" ${listing.isOrganic ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>Certified Organic Produce</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input type="checkbox" id="listingAdvanceHarvestCheck" ${listing.isAdvanceHarvest ? 'checked' : ''} class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" />
                  <span>Advance / Pre-Harvest Contract</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button type="button" onclick="window.adminDeleteListing('${listing.id}')" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 flex items-center gap-1.5 cursor-pointer">
                  <i class="fa-solid fa-trash"></i> Delete Post
                </button>
                <div class="flex items-center gap-2.5">
                  <button type="button" onclick="window.closeSuperAdminModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" class="btn-primary py-2 px-5 font-bold shadow-md cursor-pointer">
                    Save Moderation Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;
    })() : ''}
  `;
}

