import { Language } from '../i18n/translations';
import { NotificationItem } from '../types';

export function renderNotificationsModal(lang: Language, notifications: NotificationItem[]): string {
  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.closeNotificationsModal()">
      <div class="modal-content max-w-md p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-envelope-open-text text-emerald-700 text-lg"></i>
            <h3 class="text-base font-bold text-slate-900">
              ${lang === 'am' ? 'የኤስኤምኤስ (SMS) እና የስርዓት መልእክቶች' : 'SMS & Push Notifications'}
            </h3>
          </div>
          <button onclick="window.closeNotificationsModal()" class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        ${notifications.length === 0 ? `
          <div class="py-8 text-center text-slate-400 text-xs">
            No new messages.
          </div>
        ` : `
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
            ${notifications.map(n => `
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div class="flex items-center justify-between font-bold text-[10px]">
                  <span class="px-2 py-0.5 rounded-full ${n.channel === 'sms' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'} uppercase">
                    ${n.channel === 'sms' ? 'Twilio SMS' : 'Push Notification'}
                  </span>
                  <span class="text-slate-400">${new Date(n.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p class="text-slate-800 font-medium leading-relaxed ${lang === 'am' ? 'lang-am' : ''}">
                  ${lang === 'am' && n.messageAm ? n.messageAm : n.messageEn}
                </p>
              </div>
            `).join('')}
          </div>
        `}

      </div>
    </div>
  `;
}
