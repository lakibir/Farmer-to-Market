import { Language, translations } from '../i18n/translations';
import { User, PlatformStats, PlatformConfig, SystemAuditLog, DeliveryZoneConfig, FeatureFlag, PayoutApprovalItem, GlobalBusinessRules, BlacklistEntry } from '../types';
import { api } from '../services/api';

export type SuperAdminTab =
  | 'users'
  | 'banners'
  | 'moderation'
  | 'permissions'
  | 'config'
  | 'financials'
  | 'audit'
  | 'zones'
  | 'feature_flags'
  | 'emergency'
  | 'rules'
  | 'db_ops';

export function renderSuperAdminView(
  lang: Language,
  activeTab: SuperAdminTab = 'users',
  userRoleFilter: string = 'all',
  auditCategoryFilter: string = 'all'
): string {
  const t = translations[lang];
  const users = api.getAllUsers();
  const banners = api.getBanners();
  const listings = api.getListings();
  const config = api.getPlatformConfig();
  const auditLogs = api.getSystemAuditLogs();
  const zones = api.getDeliveryZones();
  const featureFlags = api.getFeatureFlags();
  const payouts = api.getPendingPayoutApprovals();
  const rules = api.getGlobalBusinessRules();
  const blacklist = api.getBlacklist();

  // Filter users by role if selected
  const filteredUsers = userRoleFilter === 'all'
    ? users
    : users.filter(u => u.role.toLowerCase() === userRoleFilter.toLowerCase());

  // Filter audit logs by category if selected
  const filteredAuditLogs = auditCategoryFilter === 'all'
    ? auditLogs
    : auditLogs.filter(l => l.category.toLowerCase() === auditCategoryFilter.toLowerCase());

  const roleCount = {
    all: users.length,
    farmer: users.filter(u => u.role === 'farmer').length,
    buyer: users.filter(u => u.role === 'buyer').length,
    driver: users.filter(u => u.role === 'driver').length,
    agent: users.filter(u => u.role === 'agent').length,
    admin: users.filter(u => u.role === 'admin').length,
    superadmin: users.filter(u => u.role === 'superadmin').length
  };

  return `
    <div class="space-y-8 pb-24 animate-fadeIn">
      
      <!-- Top Super Admin Banner -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 rounded-3xl border border-rose-900/40 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
          <i class="fa-solid fa-crown"></i>
        </div>

        <div class="space-y-1 relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold mb-1">
            <i class="fa-solid fa-crown text-rose-400"></i> ${lang === 'am' ? 'የዋና አድሚን ቁጥጥር ማዕከል · ዶ/ር ዳዊት ኃይሌ' : 'Super Admin Root Governance · Dr. Dawit Haile'}
          </div>
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white ${lang === 'am' ? 'lang-am' : ''}">
            ${t.superAdminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
            ${t.superAdminSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 relative z-10">
          ${config.emergencyEscrowFrozen ? `
            <span class="px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-black text-xs border border-red-400 animate-pulse flex items-center gap-1.5">
              <i class="fa-solid fa-lock"></i> ESCROW FROZEN
            </span>
          ` : `
            <span class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-400"></i> Platform Active (90/5/5 Split)
            </span>
          `}
          <button onclick="window.triggerDbBackup()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs">
            <i class="fa-solid fa-database text-rose-400"></i> ${lang === 'am' ? 'ዳታቤዝ ምትክ' : 'Backup DB'}
          </button>
          <button onclick="window.exportPlatformData('json')" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md">
            <i class="fa-solid fa-file-export"></i> ${lang === 'am' ? 'መረጃ አውርድ' : 'Export JSON'}
          </button>
        </div>
      </div>

      <!-- Super Admin Navigation Pills (12 Governance Panels) -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar text-xs font-bold">
        <button onclick="window.setSuperAdminTab('users')" class="cat-pill ${activeTab === 'users' ? 'active' : ''}">
          <i class="fa-solid fa-users-gear text-rose-500"></i>
          <span>${t.tabUserMaster} (${users.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('banners')" class="cat-pill ${activeTab === 'banners' ? 'active' : ''}">
          <i class="fa-solid fa-panorama text-emerald-500"></i>
          <span>${t.tabBanners} (${banners.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('moderation')" class="cat-pill ${activeTab === 'moderation' ? 'active' : ''}">
          <i class="fa-solid fa-gavel text-purple-500"></i>
          <span>${t.tabModeration} (${listings.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('permissions')" class="cat-pill ${activeTab === 'permissions' ? 'active' : ''}">
          <i class="fa-solid fa-key text-purple-500"></i>
          <span>${t.tabPermissions}</span>
        </button>

        <button onclick="window.setSuperAdminTab('config')" class="cat-pill ${activeTab === 'config' ? 'active' : ''}">
          <i class="fa-solid fa-sliders text-emerald-500"></i>
          <span>${t.tabPlatformConfig}</span>
        </button>

        <button onclick="window.setSuperAdminTab('financials')" class="cat-pill ${activeTab === 'financials' ? 'active' : ''}">
          <i class="fa-solid fa-money-bill-transfer text-amber-500"></i>
          <span>${t.tabFinancialOversight} (${payouts.filter(p => p.status === 'Pending').length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('audit')" class="cat-pill ${activeTab === 'audit' ? 'active' : ''}">
          <i class="fa-solid fa-clipboard-list text-blue-500"></i>
          <span>${t.tabAuditLogs} (${auditLogs.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('zones')" class="cat-pill ${activeTab === 'zones' ? 'active' : ''}">
          <i class="fa-solid fa-map-location-dot text-teal-500"></i>
          <span>${t.tabZones} (${zones.length})</span>
        </button>

        <button onclick="window.setSuperAdminTab('feature_flags')" class="cat-pill ${activeTab === 'feature_flags' ? 'active' : ''}">
          <i class="fa-solid fa-toggle-on text-indigo-500"></i>
          <span>${t.tabFeatureFlags}</span>
        </button>

        <button onclick="window.setSuperAdminTab('emergency')" class="cat-pill ${activeTab === 'emergency' ? 'active' : ''}">
          <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
          <span>${t.tabEmergency}</span>
        </button>

        <button onclick="window.setSuperAdminTab('rules')" class="cat-pill ${activeTab === 'rules' ? 'active' : ''}">
          <i class="fa-solid fa-gavel text-amber-600"></i>
          <span>${t.tabBusinessRules}</span>
        </button>

        <button onclick="window.setSuperAdminTab('db_ops')" class="cat-pill ${activeTab === 'db_ops' ? 'active' : ''}">
          <i class="fa-solid fa-server text-slate-600"></i>
          <span>${t.tabDbOps}</span>
        </button>
      </div>

      <!-- Tab Content Panels -->
      ${renderActiveTabContent(lang, activeTab, filteredUsers, userRoleFilter, roleCount, config, filteredAuditLogs, auditCategoryFilter, zones, featureFlags, payouts, rules, blacklist)}

    </div>
  `;
}

function renderActiveTabContent(
  lang: Language,
  activeTab: SuperAdminTab,
  filteredUsers: User[],
  userRoleFilter: string,
  roleCount: Record<string, number>,
  config: PlatformConfig,
  auditLogs: SystemAuditLog[],
  auditCategoryFilter: string,
  zones: DeliveryZoneConfig[],
  featureFlags: FeatureFlag[],
  payouts: PayoutApprovalItem[],
  rules: GlobalBusinessRules,
  blacklist: BlacklistEntry[]
): string {
  const t = translations[lang];

  switch (activeTab) {
    case 'users':
      return renderUserMasterTab(lang, filteredUsers, userRoleFilter, roleCount);
    case 'banners':
      return renderBannersTab(lang);
    case 'moderation':
      return renderModerationTab(lang);
    case 'permissions':
      return renderPermissionsTab(lang);
    case 'config':
      return renderConfigTab(lang, config);
    case 'financials':
      return renderFinancialsTab(lang, payouts);
    case 'audit':
      return renderAuditTab(lang, auditLogs, auditCategoryFilter);
    case 'zones':
      return renderZonesTab(lang, zones);
    case 'feature_flags':
      return renderFeatureFlagsTab(lang, featureFlags);
    case 'emergency':
      return renderEmergencyTab(lang, config, blacklist);
    case 'rules':
      return renderBusinessRulesTab(lang, rules);
    case 'db_ops':
      return renderDbOpsTab(lang);
    default:
      return renderUserMasterTab(lang, filteredUsers, userRoleFilter, roleCount);
  }
}

// 1. USER MASTER CRUD TAB
function renderUserMasterTab(lang: Language, users: User[], activeFilter: string, counts: Record<string, number>): string {
  const t = translations[lang];

  return `
    <div class="space-y-6">
      
      <!-- User Summary & Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${lang === 'am' ? 'የተጠቃሚዎች ሙሉ አስተዳደር እና አዲስ መመዝገቢያ' : 'User Master Directory & Role Management'}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${lang === 'am' ? 'ሁሉንም አርሶ አደሮች፣ ገዢዎች፣ ሹፌሮች እና አድሚኖች በቀጥታ ይመዝግቡ፣ ያርትዑ ወይም በእነርሱ ስም ይግቡ።' : 'Direct manual onboarding, full CRUD mutations, and 1-click live user impersonation.'}
          </p>
        </div>

        <button onclick="window.openCreateUserModal()" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-user-plus"></i>
          <span>${t.createUserBtn}</span>
        </button>
      </div>

      <!-- Role Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button onclick="window.setUserRoleFilter('all')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'}">
          All Users (${counts.all})
        </button>
        <button onclick="window.setUserRoleFilter('farmer')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'farmer' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'}">
          🌾 Farmers (${counts.farmer})
        </button>
        <button onclick="window.setUserRoleFilter('buyer')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'buyer' ? 'bg-blue-700 text-white border-blue-700' : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200'}">
          🛒 Wholesale Buyers (${counts.buyer})
        </button>
        <button onclick="window.setUserRoleFilter('driver')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'driver' ? 'bg-amber-700 text-white border-amber-700' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200'}">
          🚚 Freight Drivers (${counts.driver})
        </button>
        <button onclick="window.setUserRoleFilter('agent')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'agent' ? 'bg-teal-700 text-white border-teal-700' : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border-teal-200'}">
          👥 Extension Agents (${counts.agent})
        </button>
        <button onclick="window.setUserRoleFilter('admin')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'admin' ? 'bg-purple-700 text-white border-purple-700' : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-200'}">
          🛡️ Admins (${counts.admin})
        </button>
        <button onclick="window.setUserRoleFilter('superadmin')" class="px-3 py-1.5 rounded-xl border transition-all ${activeFilter === 'superadmin' ? 'bg-rose-700 text-white border-rose-700' : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border-rose-200'}">
          👑 Super Admins (${counts.superadmin})
        </button>
      </div>

      <!-- Users Table -->
      <div class="glass-card overflow-hidden border border-slate-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th class="p-3.5">User / Contact</th>
                <th class="p-3.5">Assigned Role</th>
                <th class="p-3.5">Region / Location</th>
                <th class="p-3.5">Verification & KYC</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5 text-right">Actions & Impersonation</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${users.map(u => `
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full ${getUserAvatarBg(u.role)} flex items-center justify-center font-bold text-xs shrink-0">
                        ${u.name.charAt(0)}
                      </div>
                      <div>
                        <span class="font-bold text-slate-900 block leading-tight">${u.name}</span>
                        <span class="text-[11px] text-slate-500 font-mono">${u.phone}</span>
                        ${u.primaryCrop ? `<span class="text-[10px] text-emerald-700 font-semibold block">🌾 ${u.primaryCrop}</span>` : ''}
                        ${u.vehicleType ? `<span class="text-[10px] text-amber-700 font-semibold block">🚚 ${u.vehicleType}</span>` : ''}
                      </div>
                    </div>
                  </td>

                  <td class="p-3.5">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${getRoleBadgeClass(u.role)}">
                      ${getRoleIcon(u.role)} ${u.role.toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-slate-600">
                    <span>${u.region}</span>
                    ${u.kebele ? `<span class="text-[10px] text-slate-400 block">${u.kebele}</span>` : ''}
                  </td>

                  <td class="p-3.5">
                    ${u.verificationStatus === 'Approved' || u.verified ? `
                      <span class="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <i class="fa-solid fa-circle-check"></i> Fayda Verified
                      </span>
                    ` : u.verificationStatus === 'UnderReview' ? `
                      <span class="inline-flex items-center gap-1 text-amber-700 font-bold text-[11px]">
                        <i class="fa-solid fa-clock"></i> Under Review
                      </span>
                    ` : `
                      <span class="inline-flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                        <i class="fa-solid fa-circle-xmark"></i> Unverified
                      </span>
                    `}
                    ${u.faydaId ? `<span class="text-[10px] font-mono text-slate-500 block">${u.faydaId}</span>` : ''}
                    ${u.tinNumber ? `<span class="text-[10px] font-mono text-slate-500 block">TIN: ${u.tinNumber}</span>` : ''}
                  </td>

                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-black ${u.status === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}">
                      ${(u.status || 'active').toUpperCase()}
                    </span>
                  </td>

                  <td class="p-3.5 text-right space-x-1 whitespace-nowrap">
                    ${u.role !== 'superadmin' ? `
                      <button onclick="window.startSuperAdminImpersonation('${u.id}')" title="Login As User" class="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer border border-rose-200">
                        <i class="fa-solid fa-user-secret mr-1"></i> Login As
                      </button>
                    ` : ''}

                    <button onclick="window.openEditUserModal('${u.id}')" title="Edit User" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    ${u.role !== 'superadmin' ? `
                      <button onclick="window.toggleUserSuspension('${u.id}')" title="${u.status === 'suspended' ? 'Reinstate' : 'Suspend'}" class="p-1.5 rounded-lg ${u.status === 'suspended' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'} font-bold text-xs transition-colors cursor-pointer">
                        <i class="fa-solid ${u.status === 'suspended' ? 'fa-user-check' : 'fa-user-slash'}"></i>
                      </button>

                      <button onclick="window.deleteUserAccount('${u.id}')" title="Delete User" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors cursor-pointer">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 2. RBAC & PERMISSIONS TAB
function renderPermissionsTab(lang: Language): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'የሚናዎች እና ፈቃዶች ማትሪክስ (RBAC Matrix)' : 'Role-Based Access Control & Permission Matrix'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'ለእያንዳንዱ አድሚን እና ኤጀንት የሚሰጡ ልዩ ፈቃዶችን ያስተካክሉ።' : 'Define and grant granular capabilities for Marketplace Admins, Field Extension Agents, and Financial Auditors.'}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- Marketplace Admin Card -->
        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-slate-900 text-base">
              <i class="fa-solid fa-shield-halved text-purple-600"></i> Marketplace Admin
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded">Standard Admin</span>
          </div>

          <div class="space-y-2.5 text-xs text-slate-700">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Resolve & Arbitrate Produce Disputes</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Review & Approve Farmer/Driver KYC</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>Broadcast Twilio SMS Bulletins</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-purple-600" />
              <span>View Financial Volume & MOR VAT</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Modify Escrow Split Percentages (Super Admin Only)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Emergency Platform Escrow Freeze (Super Admin Only)</span>
            </label>
          </div>
          <button onclick="window.showToast('Admin permissions updated in security vault.')" class="btn-secondary w-full py-2 text-xs font-bold cursor-pointer">
            Save Admin Permissions
          </button>
        </div>

        <!-- Field Extension Agent Card -->
        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-slate-900 text-base">
              <i class="fa-solid fa-users-gear text-teal-600"></i> Field Extension Agent
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded">Rural Extension</span>
          </div>

          <div class="space-y-2.5 text-xs text-slate-700">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Onboard Farmers via Mobile Camera</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Scan & Capture Kebele ID & Fayda National ID</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Submit Produce Listings on Behalf of Farmer</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-teal-600" />
              <span>Earn Extension Agent Commission per Verified Farmer</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-slate-400">
              <input type="checkbox" disabled class="rounded" />
              <span>Approve KYC (Requires Marketplace Admin)</span>
            </label>
          </div>
          <button onclick="window.showToast('Field Agent permissions updated.')" class="btn-secondary w-full py-2 text-xs font-bold cursor-pointer">
            Save Agent Permissions
          </button>
        </div>

        <!-- Super Admin Card -->
        <div class="glass-card p-5 border-l-4 border-rose-600 bg-rose-50/30 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-rose-950 text-base">
              <i class="fa-solid fa-crown text-rose-600"></i> Super Admin
            </div>
            <span class="text-[10px] font-black px-2 py-0.5 bg-rose-200 text-rose-900 rounded">Root Level</span>
          </div>

          <div class="space-y-2.5 text-xs text-rose-950 font-medium">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Full System Access & Unrestricted CRUD
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Create & Revoke Admin Roles
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Live User Impersonation Session Engine
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Telebirr 90/5/5 Split Configuration
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Emergency Platform-Wide Escrow Freeze
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-check text-rose-600"></i> Database Snapshot Backups & Exports
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-white border border-rose-200 text-[11px] text-rose-800 font-semibold">
            Root access is protected with 2FA and multi-sig security.
          </div>
        </div>

      </div>
    </div>
  `;
}

// 3. PLATFORM CONFIG & ESCROW SPLITS TAB
function renderConfigTab(lang: Language, config: PlatformConfig): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'የሲስተም ውቅር እና የቴሌብር ክፍያ ዋስትና ክፍፍል (Escrow 90/5/5)' : 'Platform Configuration & Escrow Split Governance'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'የገበሬው፣ የአጓጓዡ እና የሲስተሙን የክፍያ መቶኛ እና የቴሌብር ኤፒአይ ቁልፎችን ያስተካክሉ።' : 'Control escrow splits, Telebirr merchant credentials, Twilio SMS keys, and geocoding settings.'}
        </p>
      </div>

      <form onsubmit="window.handleSaveSuperAdminConfig(event)" class="space-y-6">
        
        <!-- Escrow Split Percentage Sliders -->
        <div class="glass-card p-6 border-slate-200 space-y-5">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-percent text-emerald-600"></i> Wholesale Escrow Revenue Split Architecture
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>🌾 Farmer Direct Payout</span>
                <span id="farmerShareDisplay" class="text-lg font-black text-emerald-700">${config.farmerSharePercent}%</span>
              </div>
              <input type="range" id="farmerShareInput" min="70" max="95" value="${config.farmerSharePercent}"
                oninput="window.updateEscrowSliders('farmer')" class="w-full accent-emerald-600 cursor-pointer" />
              <p class="text-[10px] text-emerald-800 font-medium">Smallholder receives 90% direct payout into Telebirr upon buyer inspection.</p>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-amber-950">
                <span>🚚 Driver Freight Cut</span>
                <span id="driverShareDisplay" class="text-lg font-black text-amber-700">${config.driverSharePercent}%</span>
              </div>
              <input type="range" id="driverShareInput" min="2" max="15" value="${config.driverSharePercent}"
                oninput="window.updateEscrowSliders('driver')" class="w-full accent-amber-600 cursor-pointer" />
              <p class="text-[10px] text-amber-800 font-medium">Freight carrier receives 5% transit cut + rural route bonuses.</p>
            </div>

            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-purple-950">
                <span>🛡️ Platform Commission</span>
                <span id="platformShareDisplay" class="text-lg font-black text-purple-700">${config.platformFeePercent}%</span>
              </div>
              <input type="range" id="platformShareInput" min="2" max="15" value="${config.platformFeePercent}"
                oninput="window.updateEscrowSliders('platform')" class="w-full accent-purple-600 cursor-pointer" />
              <p class="text-[10px] text-purple-800 font-medium">Platform maintenance, dispute arbitration, and 15% MOR VAT collection.</p>
            </div>

          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">MOR Withholding Tax on Produce Goods (%)</label>
              <input type="number" id="cfgWithholdingTax" value="${config.withholdingTaxPercent}" min="0" max="10" step="0.5" class="input-field text-xs font-bold" />
              <p class="text-[10px] text-slate-400 mt-1">Standard 2% commercial withholding declared to Ministry of Revenues.</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">High-Value Payout Approval Threshold (ETB)</label>
              <input type="number" id="cfgHighValueThreshold" value="${config.highValuePayoutThresholdEtb}" min="10000" max="500000" step="5000" class="input-field text-xs font-bold" />
              <p class="text-[10px] text-slate-400 mt-1">Payouts exceeding this value require Super Admin dual authorization.</p>
            </div>
          </div>
        </div>

        <!-- Telebirr & Twilio API Credentials -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <!-- Telebirr Gateway Credentials -->
          <div class="glass-card p-5 border-slate-200 space-y-3.5">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-mobile-screen text-blue-600"></i> Telebirr Merchant Escrow API Credentials
            </h3>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Telebirr App ID</label>
              <input type="text" id="cfgTelebirrAppId" value="${config.telebirrAppId}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Telebirr Merchant Short Code</label>
              <input type="text" id="cfgTelebirrShortCode" value="${config.telebirrShortCode}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">API Key / Secret</label>
              <input type="password" id="cfgTelebirrApiKey" value="${config.telebirrApiKey}" class="input-field text-xs font-mono font-bold" />
            </div>
          </div>

          <!-- Twilio SMS & Geocoding Credentials -->
          <div class="glass-card p-5 border-slate-200 space-y-3.5">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-comment-sms text-emerald-600"></i> Twilio SMS & Geocoding Integrations
            </h3>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio Account SID</label>
              <input type="text" id="cfgTwilioSid" value="${config.twilioAccountSid}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio Auth Token</label>
              <input type="password" id="cfgTwilioToken" value="${config.twilioAuthToken}" class="input-field text-xs font-mono font-bold" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Twilio From Number (Alphanumeric / Shortcode)</label>
              <input type="text" id="cfgTwilioFrom" value="${config.twilioFromNumber}" class="input-field text-xs font-mono font-bold" />
            </div>
          </div>

        </div>

        <button type="submit" class="btn-primary py-3 px-6 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-floppy-disk"></i>
          <span>Save Platform Configuration</span>
        </button>

      </form>
    </div>
  `;
}

// 4. FINANCIALS & HIGH-VALUE PAYOUTS TAB
function renderFinancialsTab(lang: Language, payouts: PayoutApprovalItem[]): string {
  const pendingPayouts = payouts.filter(p => p.status === 'Pending');

  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'የፋይናንስ ቁጥጥር እና ከፍተኛ ክፍያዎች ማረጋገጫ' : 'Financial Oversight & High-Value Payout Authorizations'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'ከ50,000 ብር በላይ የሆኑ የጅምላ ክፍያዎች በዋና አድሚን ይፈቀዳሉ።' : 'Multi-sig authorization queue for high-volume transactions, commission reconciliation, and tax summaries.'}
        </p>
      </div>

      <!-- High-Value Payout Approval Cards -->
      <div class="space-y-3">
        <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
          <i class="fa-solid fa-stamp text-amber-600"></i> Pending Payout Authorizations (${pendingPayouts.length})
        </h3>

        ${pendingPayouts.length === 0 ? `
          <div class="p-8 text-center glass-card border-slate-200">
            <i class="fa-solid fa-circle-check text-emerald-500 text-3xl mb-2"></i>
            <p class="text-xs font-bold text-slate-700">All high-value payouts are currently reviewed and authorized.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${pendingPayouts.map(p => `
              <div class="glass-card p-5 border-l-4 ${p.riskScore === 'High' ? 'border-red-600' : p.riskScore === 'Medium' ? 'border-amber-600' : 'border-emerald-600'} space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-bold text-slate-900 block">${p.recipientName}</span>
                    <span class="text-[11px] text-slate-500 font-mono">${p.recipientPhone} · ${p.recipientRole.toUpperCase()}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-black ${p.riskScore === 'High' ? 'bg-red-100 text-red-800' : p.riskScore === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                    ${p.riskScore.toUpperCase()} RISK
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 font-medium">Requested Withdrawal:</span>
                    <span class="text-base font-black text-emerald-700">${p.amountEtb.toLocaleString()} ETB</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 font-semibold">Trigger: ${p.triggerReason}</p>
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <button onclick="window.approveHighValuePayout('${p.id}')" class="btn-primary flex-1 py-2 text-xs font-bold cursor-pointer">
                    <i class="fa-solid fa-check mr-1"></i> Authorize Telebirr Payout
                  </button>
                  <button onclick="window.rejectHighValuePayout('${p.id}')" class="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer border border-red-200">
                    <i class="fa-solid fa-ban mr-1"></i> Decline
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

    </div>
  `;
}

// 5. SYSTEM AUDIT LOGS TAB
function renderAuditTab(lang: Language, logs: SystemAuditLog[], activeCategory: string): string {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${lang === 'am' ? 'የሲስተም ኦዲት መዝገብ እና የደህንነት ክትትል' : 'System-Wide Immutable Audit Trail & Security Monitor'}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${lang === 'am' ? 'የአድሚን፣ የዋና አድሚን እና የሲስተም እንቅስቃሴዎችን በሙሉ በዝርዝር ይመልከቱ።' : 'Real-time tamper-evident logs of administrative actions, user mutations, escrow adjustments, and logins.'}
          </p>
        </div>

        <button onclick="window.exportPlatformData('csv')" class="btn-secondary py-2 px-3.5 text-xs font-bold cursor-pointer flex items-center gap-1.5">
          <i class="fa-solid fa-file-csv text-emerald-700"></i> Export Audit CSV
        </button>
      </div>

      <!-- Audit Categories Filter -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button onclick="window.setAuditCategoryFilter('all')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}">
          All Logs (${logs.length})
        </button>
        <button onclick="window.setAuditCategoryFilter('user_crud')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'user_crud' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800'}">
          User CRUD
        </button>
        <button onclick="window.setAuditCategoryFilter('config')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'config' ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-800'}">
          Configuration
        </button>
        <button onclick="window.setAuditCategoryFilter('finance')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'finance' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800'}">
          Financials
        </button>
        <button onclick="window.setAuditCategoryFilter('dispute')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'dispute' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-800'}">
          Disputes
        </button>
        <button onclick="window.setAuditCategoryFilter('impersonation')" class="px-3 py-1.5 rounded-xl border transition-all ${activeCategory === 'impersonation' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-800'}">
          Impersonation
        </button>
      </div>

      <!-- Audit Stream Table -->
      <div class="glass-card overflow-hidden border border-slate-200">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th class="p-3.5">Timestamp</th>
                <th class="p-3.5">Actor</th>
                <th class="p-3.5">Action & Category</th>
                <th class="p-3.5">Target Resource</th>
                <th class="p-3.5">IP & User Agent</th>
                <th class="p-3.5">Audit Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
              ${logs.map(l => `
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3.5 text-[11px] text-slate-500 font-mono whitespace-nowrap">${l.timestamp}</td>
                  <td class="p-3.5">
                    <span class="font-bold text-slate-900 block leading-tight">${l.actorName}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${l.actorRole.toUpperCase()}</span>
                  </td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black ${getAuditCategoryBadge(l.category)}">
                      ${l.category}
                    </span>
                    <span class="text-[11px] font-bold text-slate-800 block mt-0.5">${l.action}</span>
                  </td>
                  <td class="p-3.5 text-[11px] font-mono text-slate-600">
                    ${l.targetResource}
                    ${l.targetId ? `<span class="block text-[10px] text-slate-400">${l.targetId}</span>` : ''}
                  </td>
                  <td class="p-3.5 text-[11px] text-slate-500">
                    <span class="font-mono text-slate-700 font-bold block">${l.ipAddress}</span>
                    <span class="text-[10px] truncate max-w-[140px] block text-slate-400">${l.userAgent}</span>
                  </td>
                  <td class="p-3.5 text-xs font-normal text-slate-800 max-w-xs">
                    ${l.details}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 6. MULTI-REGION DELIVERY ZONES TAB
function renderZonesTab(lang: Language, zones: DeliveryZoneConfig[]): string {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">
            ${lang === 'am' ? 'የማድረሻ ዞኖች እና የፖስትጂአይኤስ (PostGIS) ድንበሮች' : 'Multi-Region Delivery Clusters & PostGIS Spatial Geofencing'}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            ${lang === 'am' ? 'የገጠር አርሶ አደሮች ማበረታቻ ክፍያ እና የማድረሻ ራዲየስን ያስተካክሉ።' : 'Configure regional delivery radius, PostGIS GPS bounds, and rural route subsidy incentives.'}
          </p>
        </div>

        <button onclick="window.openAddZoneModal()" class="btn-primary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-plus-circle"></i> Add Delivery Zone
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${zones.map(z => `
          <div class="glass-card p-5 border-slate-200 space-y-3">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-black text-slate-900 text-sm">${z.name}</h3>
                <span class="text-[11px] text-slate-500 font-medium">${z.nameAm || ''}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-black ${z.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
                ${z.active ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            <div class="space-y-1.5 text-xs text-slate-600">
              <div class="flex justify-between">
                <span class="text-slate-400">Terminal Hub:</span>
                <span class="font-bold text-slate-800">${z.clusterHubName}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Base / Max Radius:</span>
                <span class="font-bold text-slate-800">${z.baseRadiusKm} km / ${z.maxRadiusKm} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Rural Route Bonus:</span>
                <span class="font-bold text-emerald-700">+${z.ruralSubsidyEtb} ETB / trip</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Active Smallholders:</span>
                <span class="font-bold text-slate-800">${z.smallholdersCount.toLocaleString()} farmers</span>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span class="font-mono text-slate-400">${z.centerLatitude.toFixed(4)}, ${z.centerLongitude.toFixed(4)}</span>
              <button onclick="window.deleteZone('${z.id}')" class="text-red-600 hover:text-red-800 font-bold cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. FEATURE FLAGS TAB
function renderFeatureFlagsTab(lang: Language, flags: FeatureFlag[]): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'የባህሪያት ማብሪያ/ማጥፊያ እና የክልላዊ ሙከራዎች' : 'Feature Flags & Regional Rollout Management'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'አዳዲስ የሲስተም አገልግሎቶችን በቅድሚያ ለተመረጡ ክልሎች ወይም ተጠቃሚዎች ይልቀቁ።' : 'Instantly toggle platform capabilities in real time without redeploying code.'}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${flags.map(f => `
          <div class="glass-card p-5 border-slate-200 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-black text-slate-900 text-sm">${f.name}</h3>
                <code class="text-[10px] font-mono text-slate-500 block">${f.key}</code>
              </div>

              <!-- Toggle Switch -->
              <label class="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" ${f.enabled ? 'checked' : ''} onchange="window.toggleFeatureFlag('${f.key}')" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <p class="text-xs text-slate-600 font-medium">${f.description}</p>

            <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Rollout: <strong>${f.rolloutPercentage}%</strong></span>
              <span>Target: <strong>${f.targetRoles.join(', ')}</strong></span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 8. EMERGENCY CONTROLS & BLACKLIST TAB
function renderEmergencyTab(lang: Language, config: PlatformConfig, blacklist: BlacklistEntry[]): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-red-950">
          ${lang === 'am' ? 'የአደጋ ጊዜ መቆጣጠሪያ እና ዓለም አቀፍ እገዳ (Killswitch)' : 'Emergency Killswitches & Global Blacklist'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'የአደጋ ጊዜ የክፍያ ዋስትና እገዳ እና አጠራጣሪ ተጠቃሚዎችን የማገድ እርምጃዎች።' : 'Immediate emergency transaction freeze and global blacklisting of fraudulent phone numbers or National IDs.'}
        </p>
      </div>

      <!-- Emergency Escrow Freeze Card -->
      <div class="p-6 rounded-3xl ${config.emergencyEscrowFrozen ? 'bg-red-600 text-white border-2 border-red-400' : 'bg-red-50/80 border border-red-200 text-red-950'} space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl ${config.emergencyEscrowFrozen ? 'bg-white text-red-600' : 'bg-red-600 text-white'} flex items-center justify-center text-xl font-black shadow-md">
              <i class="fa-solid fa-lock"></i>
            </div>
            <div>
              <h3 class="text-base font-black">
                ${config.emergencyEscrowFrozen ? 'PLATFORM ESCROW CURRENTLY FROZEN' : 'Emergency Platform-Wide Escrow Killswitch'}
              </h3>
              <p class="text-xs opacity-90">
                ${config.emergencyEscrowFrozen ? 'All automatic Telebirr payouts and order completions are halted globally.' : 'Instantly halt all automatic Telebirr payouts across all orders in case of security threat or system anomaly.'}
              </p>
            </div>
          </div>

          <button onclick="window.toggleEmergencyEscrowFreeze()" class="px-5 py-2.5 rounded-xl ${config.emergencyEscrowFrozen ? 'bg-white text-red-700 font-black hover:bg-slate-100' : 'bg-red-600 text-white font-bold hover:bg-red-700'} text-xs transition-all shadow-md cursor-pointer">
            ${config.emergencyEscrowFrozen ? 'UNFREEZE PLATFORM ESCROW' : 'FREEZE ALL ESCROW'}
          </button>
        </div>
      </div>

      <!-- Global Blacklist Table -->
      <div class="glass-card p-5 border-slate-200 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-ban text-red-600"></i> Global Platform Blacklist (${blacklist.length})
          </h3>
          <button onclick="window.openAddBlacklistModal()" class="btn-secondary py-1.5 px-3 text-xs font-bold cursor-pointer">
            + Add to Blacklist
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th class="p-3">Type</th>
                <th class="p-3">Blacklisted Value</th>
                <th class="p-3">Reason</th>
                <th class="p-3">Date</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
              ${blacklist.map(b => `
                <tr>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800">${b.type}</span>
                  </td>
                  <td class="p-3 font-mono font-bold text-slate-900">${b.value}</td>
                  <td class="p-3 text-slate-600">${b.reason}</td>
                  <td class="p-3 font-mono text-[11px] text-slate-500">${b.blacklistedAt}</td>
                  <td class="p-3 text-right">
                    <button onclick="window.removeFromBlacklist('${b.id}')" class="text-red-600 hover:text-red-800 font-bold cursor-pointer">
                      Remove
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 9. GLOBAL BUSINESS RULES TAB
function renderBusinessRulesTab(lang: Language, rules: GlobalBusinessRules): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'አጠቃላይ የግብይት እና የዋጋ ደንቦች' : 'Global Marketplace Trading Rules & Pricing Caps'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'አነስተኛ እና ከፍተኛ የትዕዛዝ መጠን እና የዋጋ ገደቦችን ያስተካክሉ።' : 'Establish wholesale order size thresholds, dynamic price floor/ceiling variances, and delivery radius constraints.'}
        </p>
      </div>

      <form onsubmit="window.handleSaveBusinessRules(event)" class="glass-card p-6 border-slate-200 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Minimum Wholesale Order (kg)</label>
            <input type="number" id="ruleMinOrderKg" value="${rules.minOrderKg}" min="1" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Maximum Bulk Order (kg)</label>
            <input type="number" id="ruleMaxOrderKg" value="${rules.maxOrderKg}" min="1000" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Maximum Transit Delivery Radius (km)</label>
            <input type="number" id="ruleMaxDistanceKm" value="${rules.maxDistanceKm}" min="50" class="input-field text-xs font-bold" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Produce Price Ceiling Variance Cap (%)</label>
            <input type="number" id="rulePriceCeiling" value="${rules.priceCeilingVariancePercent}" min="50" max="500" class="input-field text-xs font-bold" />
          </div>
        </div>

        <button type="submit" class="btn-primary py-2.5 px-5 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-check"></i> Save Business Rules
        </button>
      </form>
    </div>
  `;
}

// 10. DATABASE & HEALTH TAB
function renderDbOpsTab(lang: Language): string {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">
          ${lang === 'am' ? 'የዳታቤዝ ክዋኔዎች እና የሲስተም ጤና' : 'PostgreSQL 16 Database Operations & Infrastructure Health'}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          ${lang === 'am' ? 'የዳታቤዝ ግንኙነቶችን፣ የትራንዛክሽን ቅጂዎችን እና የሲስተም ፍጥነትን ይቆጣጠሩ።' : 'Database connection pool metrics, automated snapshots, and live telemetry.'}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">PostgreSQL Engine</span>
          <div class="text-xl font-black text-slate-900">v16.3-PostGIS</div>
          <p class="text-[11px] text-blue-700 font-semibold">Spatial Index Enabled</p>
        </div>
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">Active Connection Pool</span>
          <div class="text-xl font-black text-slate-900">18 / 100</div>
          <p class="text-[11px] text-emerald-700 font-semibold">Latency: 1.8ms</p>
        </div>
        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">EF Core Migration</span>
          <div class="text-xl font-black text-purple-900">v20260823_Init</div>
          <p class="text-[11px] text-purple-700 font-semibold">Schema Synced</p>
        </div>
      </div>

      <div class="glass-card p-6 border-slate-200 space-y-4">
        <h3 class="text-sm font-black text-slate-900">Database Snapshot & Disaster Recovery</h3>
        <p class="text-xs text-slate-600">Trigger an encrypted point-in-time snapshot backup of all tables, spatial geometries, escrow ledgers, and audit logs.</p>
        <div class="flex items-center gap-3">
          <button onclick="window.triggerDbBackup()" class="btn-primary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
            <i class="fa-solid fa-database"></i> Trigger Backup Snapshot Now
          </button>
          <button onclick="window.exportPlatformData('json')" class="btn-secondary py-2.5 px-4 text-xs font-bold cursor-pointer flex items-center gap-2">
            <i class="fa-solid fa-download"></i> Download Full JSON Dump
          </button>
        </div>
      </div>
    </div>
  `;
}

// Helpers
function getUserAvatarBg(role: string): string {
  switch (role) {
    case 'superadmin': return 'bg-rose-100 text-rose-800';
    case 'admin': return 'bg-purple-100 text-purple-800';
    case 'farmer': return 'bg-emerald-100 text-emerald-800';
    case 'buyer': return 'bg-blue-100 text-blue-800';
    case 'driver': return 'bg-amber-100 text-amber-800';
    case 'agent': return 'bg-teal-100 text-teal-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'superadmin': return 'bg-rose-100 text-rose-900 border border-rose-300';
    case 'admin': return 'bg-purple-100 text-purple-900 border border-purple-300';
    case 'farmer': return 'bg-emerald-100 text-emerald-900 border border-emerald-300';
    case 'buyer': return 'bg-blue-100 text-blue-900 border border-blue-300';
    case 'driver': return 'bg-amber-100 text-amber-900 border border-amber-300';
    case 'agent': return 'bg-teal-100 text-teal-900 border border-teal-300';
    default: return 'bg-slate-100 text-slate-800';
  }
}

function getRoleIcon(role: string): string {
  switch (role) {
    case 'superadmin': return '<i class="fa-solid fa-crown text-rose-600"></i>';
    case 'admin': return '<i class="fa-solid fa-shield-halved text-purple-600"></i>';
    case 'farmer': return '<i class="fa-solid fa-seedling text-emerald-600"></i>';
    case 'buyer': return '<i class="fa-solid fa-shopping-basket text-blue-600"></i>';
    case 'driver': return '<i class="fa-solid fa-truck-fast text-amber-600"></i>';
    case 'agent': return '<i class="fa-solid fa-users-gear text-teal-600"></i>';
    default: return '<i class="fa-solid fa-user"></i>';
  }
}

function getAuditCategoryBadge(category: string): string {
  switch (category) {
    case 'USER_CRUD': return 'bg-rose-100 text-rose-800';
    case 'CONFIG': return 'bg-purple-100 text-purple-800';
    case 'FINANCE': return 'bg-emerald-100 text-emerald-800';
    case 'DISPUTE': return 'bg-amber-100 text-amber-800';
    case 'EMERGENCY': return 'bg-red-100 text-red-800';
    case 'IMPERSONATION': return 'bg-blue-100 text-blue-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

export function renderBannersTab(lang: Language): string {
  const t = translations[lang];
  const banners = api.getBanners();

  return `
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-panorama text-emerald-600 mr-2"></i> ${t.tabBanners}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              ${banners.length} Total (${banners.filter(b => b.isActive).length} Active)
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Publish dynamic marketing announcements, harvest updates, cold chain incentives, and legal notices across Buyer, Farmer, and Driver portals.
          </p>
        </div>

        <button onclick="window.openCreateBannerModal()" class="btn-primary py-2.5 px-4 text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          <i class="fa-solid fa-plus"></i> ${t.createBannerBtn}
        </button>
      </div>

      <!-- Banners Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${banners.length === 0 ? `
          <div class="col-span-full glass-card p-12 text-center text-slate-400 space-y-3">
            <i class="fa-solid fa-panorama text-4xl text-slate-300"></i>
            <p class="text-xs font-bold text-slate-600">No promotional banners configured yet.</p>
            <button onclick="window.openCreateBannerModal()" class="btn-primary py-2 px-4 text-xs font-bold cursor-pointer">
              Create First Banner
            </button>
          </div>
        ` : banners.map(b => `
          <div class="glass-card rounded-3xl overflow-hidden border ${b.isActive ? 'border-emerald-200 ring-1 ring-emerald-500/20' : 'border-slate-200 opacity-75'} flex flex-col justify-between transition-all hover:shadow-lg">
            <!-- Visual Thumbnail Preview -->
            <div class="relative h-44 bg-gradient-to-r ${b.themeGradient || 'from-emerald-900 via-teal-900 to-slate-900'} p-4 text-white flex flex-col justify-between overflow-hidden">
              <img src="${b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'}" class="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div class="relative z-10 flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                  ${b.badgeText || 'Promotion'}
                </span>
                <span class="px-2 py-0.5 rounded-md ${b.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'} text-[10px] font-bold">
                  ${b.isActive ? 'LIVE / ACTIVE' : 'PAUSED'}
                </span>
              </div>

              <div class="relative z-10 space-y-1">
                <h4 class="text-sm font-black text-white leading-snug line-clamp-2">${lang === 'am' && b.titleAm ? b.titleAm : b.title}</h4>
                <p class="text-[11px] text-white/80 line-clamp-2 font-medium">${lang === 'am' && b.subtitleAm ? b.subtitleAm : (b.subtitle || '')}</p>
              </div>
            </div>

            <!-- Details & Actions -->
            <div class="p-4 space-y-3.5 text-xs">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold">
                  <i class="fa-solid fa-users mr-1"></i> Audience: ${b.targetAudience}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold">
                  <i class="fa-solid fa-location-dot mr-1"></i> Region: ${b.targetRegion || 'All'}
                </span>
                <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-mono">
                  Priority: ${b.priority}
                </span>
              </div>

              <div class="text-[11px] text-slate-500 flex items-center justify-between">
                <span>CTA: <strong>${b.ctaText || 'Browse'}</strong> &rarr; <span class="font-mono text-emerald-700 font-bold">${b.ctaLink || 'marketplace'}</span></span>
                <span>${b.createdAt ? b.createdAt.split('T')[0] : ''}</span>
              </div>

              <!-- Action Bar -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onclick="window.toggleBannerStatus('${b.id}')" class="px-3 py-1.5 rounded-xl ${b.isActive ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'} text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <i class="fa-solid ${b.isActive ? 'fa-pause' : 'fa-play'}"></i> ${b.isActive ? 'Pause' : 'Activate'}
                </button>

                <div class="flex items-center gap-1.5">
                  <button onclick="window.openEditBannerModal('${b.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer" title="Edit Banner">
                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                  </button>
                  <button onclick="window.deleteBanner('${b.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Banner">
                    <i class="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

export function renderModerationTab(lang: Language): string {
  const t = translations[lang];
  const listings = api.getListings();

  return `
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-black text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-gavel text-purple-600 mr-2"></i> ${t.tabModeration}
            </h2>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold font-mono">
              ${listings.length} Produce Posts
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Real-time listing moderation: Inspect price variance against regional benchmarks, edit crop specifications, manage stock, and delete non-compliant posts.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
            <i class="fa-solid fa-shield-check text-purple-600"></i> AI Price Anomaly Guard Active
          </span>
        </div>
      </div>

      <!-- Listings Table -->
      <div class="glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <tr>
                <th class="py-3.5 px-4">Produce Details</th>
                <th class="py-3.5 px-4">Farmer / Origin</th>
                <th class="py-3.5 px-4">Price / Kg</th>
                <th class="py-3.5 px-4">Stock (Kg)</th>
                <th class="py-3.5 px-4">Moderation</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              ${listings.length === 0 ? `
                <tr>
                  <td colspan="6" class="py-8 text-center text-slate-400">No active produce listings found.</td>
                </tr>
              ` : listings.map(l => {
                const isFlagged = l.moderationStatus === 'Flagged';
                const benchmark = l.marketBenchmarkPrice || 50;
                const variance = Math.round(((l.pricePerKg - benchmark) / benchmark) * 100);

                return `
                  <tr class="hover:bg-slate-50/60 transition-colors ${isFlagged ? 'bg-red-50/30' : ''}">
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${l.photos && l.photos[0] ? l.photos[0] : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <div>
                          <p class="font-bold text-slate-900 text-xs">${lang === 'am' && l.nameAm ? l.nameAm : l.productName}</p>
                          <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">${l.category}</span>
                            <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">${l.grade || 'Grade 2'}</span>
                            ${l.isOrganic ? '<span class="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">Organic</span>' : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <p class="font-bold text-slate-800 text-xs">${l.farmerName}</p>
                        <p class="text-[11px] text-slate-500 font-mono">${l.farmerPhone}</p>
                        <p class="text-[10px] text-slate-400">${l.region}</p>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <div>
                        <span class="font-black text-slate-900 text-xs font-mono">${l.pricePerKg} ETB</span>
                        <div class="text-[10px] ${Math.abs(variance) > 30 ? 'text-amber-700 font-bold' : 'text-slate-400'}">
                          ${variance > 0 ? `+${variance}%` : `${variance}%`} vs Avg (${benchmark} ETB)
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4 font-mono font-bold text-slate-800 text-xs">
                      ${l.qtyKg.toLocaleString()} kg
                      <span class="block text-[10px] text-slate-400 font-normal">Min: ${l.minOrderKg || 50} kg</span>
                    </td>

                    <td class="py-3.5 px-4">
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${isFlagged ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
                        <i class="fa-solid ${isFlagged ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
                        ${l.moderationStatus || 'Approved'}
                      </span>
                    </td>

                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.openAdminEditListingModal('${l.id}')" class="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1" title="Moderate Listing">
                          <i class="fa-solid fa-pen-to-square"></i> Moderate
                        </button>
                        <button onclick="window.flagListingAnomaly('${l.id}')" class="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-colors cursor-pointer" title="Flag Price Anomaly">
                          <i class="fa-solid fa-flag text-xs"></i>
                        </button>
                        <button onclick="window.adminDeleteListing('${l.id}')" class="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer" title="Delete Listing">
                          <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}
