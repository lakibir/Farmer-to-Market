import { Language } from '../i18n/translations';
import { NotificationItem } from '../types';

export function renderNotificationsModal(lang: Language, notifications: NotificationItem[]): string {
  const unreadCount = notifications.filter(n => !n.read).length;

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4 animate-scale-up">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <i class="fa-solid fa-bell text-sm"></i>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                ${lang === 'am' ? 'የኤስኤምኤስ (SMS) እና የስርዓት ማሳወቂያዎች' : 'SMS & Order Notifications'}
              </h3>
              <span class="text-[11px] text-slate-500 font-medium">
                ${unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${unreadCount > 0 ? `
              <button onclick="window.markAllNotificationsRead()" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer">
                Mark read
              </button>
            ` : ''}
            <button onclick="window.closeNotificationsModal()" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        ${notifications.length === 0 ? `
          <div class="py-12 text-center text-slate-400 text-xs space-y-2">
            <i class="fa-regular fa-bell-slash text-3xl text-slate-300"></i>
            <p class="font-medium">${lang === 'am' ? 'ምንም አዲስ ማሳወቂያ የለም።' : 'No notifications yet.'}</p>
          </div>
        ` : `
          <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            ${notifications.map(n => {
              const isRefund = n.type === 'refund';
              return `
                <div class="p-3.5 rounded-2xl border transition-all ${
                  isRefund 
                    ? 'bg-gradient-to-r from-amber-50/80 via-emerald-50/60 to-white border-amber-300/80 shadow-xs' 
                    : n.read 
                      ? 'bg-slate-50/80 border-slate-200/80 text-slate-600' 
                      : 'bg-white border-emerald-300 shadow-2xs text-slate-900 ring-1 ring-emerald-200/50'
                }">
                  <div class="flex items-center justify-between font-bold text-[10px] pb-1.5">
                    <div class="flex items-center gap-1.5">
                      ${isRefund ? `
                        <span class="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                          <i class="fa-solid fa-money-bill-transfer"></i> Telebirr Refund
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 rounded-full ${n.channel === 'sms' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'} uppercase font-extrabold">
                          <i class="fa-solid ${n.channel === 'sms' ? 'fa-comment-sms' : 'fa-bell'} mr-0.5"></i> ${n.channel === 'sms' ? 'Twilio SMS' : 'Push'}
                        </span>
                      `}
                      ${!n.read ? `
                        <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      ` : ''}
                    </div>
                    <span class="text-slate-400 font-medium">
                      ${new Date(n.sentAt || n.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p class="text-xs ${isRefund ? 'font-bold text-slate-900' : 'font-medium text-slate-800'} leading-relaxed ${lang === 'am' ? 'lang-am' : ''}">
                    ${lang === 'am' && n.messageAm ? n.messageAm : n.messageEn}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    </div>
  `;
}
