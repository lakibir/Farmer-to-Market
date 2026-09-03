import { Language, translations } from '../i18n/translations';
import { Order } from '../types';

export interface RateModalState {
  isOpen: boolean;
  orderId: string;
  rating: number; // 1-5
  comment: string;
  selectedTags: string[];
}

export function renderRateReviewModal(
  lang: Language,
  order: Order | undefined,
  state: RateModalState
): string {
  if (!state.isOpen || !order) return '';

  const t = translations[lang];
  const isAm = lang === 'am';

  const defaultTags = [
    { en: '🌾 Fresh Harvest', am: '🌾 ትኩስ ምርት' },
    { en: '📦 Grade-1 Packaging', am: '📦 ምርጥ አሸጋገግ' },
    { en: '⏱️ Fast Farm Dispatch', am: '⏱️ ፈጣን አቅርቦት' },
    { en: '💰 Direct Farmer Price', am: '💰 ተመጣጣኝ ዋጋ' },
    { en: '🤝 Polite Communication', am: '🤝 ጥሩ ግንኙነት' },
    { en: '🌿 100% Organic & Clean', am: '🌿 ንፁህ ኦርጋኒክ' }
  ];

  const ratingDescriptions: Record<number, { en: string; am: string; color: string }> = {
    1: { en: '1 / 5 · Poor Quality', am: '1 / 5 · ደካማ ጥራት', color: 'text-rose-600' },
    2: { en: '2 / 5 · Fair / Needs Improvement', am: '2 / 5 · መሻሻል አለበት', color: 'text-amber-600' },
    3: { en: '3 / 5 · Good & Satisfactory', am: '3 / 5 · ጥሩ / አጥጋቢ', color: 'text-amber-500' },
    4: { en: '4 / 5 · Very Good Quality', am: '4 / 5 · በጣም ጥሩ ምርት', color: 'text-emerald-600' },
    5: { en: '5 / 5 · Outstanding Quality & Service!', am: '5 / 5 · እጅግ በጣም ምርጥ!', color: 'text-emerald-700' }
  };

  const currentDesc = ratingDescriptions[state.rating] || ratingDescriptions[5];

  return `
    <div class="modal-backdrop fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onclick="if(event.target === this) window.closeRateModal()">
      <div class="modal-content bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-scale-up">
        
        <!-- Header Banner -->
        <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white p-6 relative">
          <button onclick="window.closeRateModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl shadow-inner">
              <i class="fa-solid fa-star"></i>
            </div>
            <div>
              <span class="text-[11px] font-bold text-emerald-300 tracking-wider uppercase flex items-center gap-1.5">
                <i class="fa-solid fa-certificate text-xs"></i> Verified Escrow Purchase
              </span>
              <h3 class="text-xl font-black text-white ${isAm ? 'lang-am' : ''}">
                ${t.rateFarmerTitle}
              </h3>
            </div>
          </div>

          <p class="text-xs text-slate-300 mt-2 leading-relaxed ${isAm ? 'lang-am' : ''}">
            ${t.rateFarmerSubtitle}
          </p>
        </div>

        <!-- Order Summary Pill -->
        <div class="px-6 pt-5">
          <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                <i class="fa-solid fa-seedling"></i>
              </div>
              <div>
                <h4 class="font-extrabold text-slate-900 text-sm ${isAm && order.productNameAm ? 'lang-am' : ''}">
                  ${isAm && order.productNameAm ? order.productNameAm : order.productName}
                </h4>
                <p class="text-xs text-slate-500 font-medium">
                  Farmer: <strong class="text-slate-800">${order.farmerName}</strong> · ${order.qtyKg} kg
                </p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-black text-emerald-800">${order.totalEtb.toLocaleString()} ETB</div>
              <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <i class="fa-solid fa-circle-check text-[9px]"></i> Delivered
              </span>
            </div>
          </div>
        </div>

        <!-- Rating Interactive Form -->
        <form id="rateReviewForm" onsubmit="window.handleReviewFormSubmit(event)" class="p-6 space-y-5">
          
          <!-- 5-Star Interactive Selector -->
          <div class="space-y-2 text-center">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider ${isAm ? 'lang-am' : ''}">
              ${t.rateYourExperience}
            </label>

            <div class="flex items-center justify-center gap-2 py-2" id="starRatingGroup">
              ${[1, 2, 3, 4, 5].map(starNum => `
                <button
                  type="button"
                  onclick="window.setModalRating(${starNum})"
                  class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all transform hover:scale-110 cursor-pointer ${
                    starNum <= state.rating
                      ? 'bg-amber-50 text-amber-500 shadow-sm ring-2 ring-amber-300/60'
                      : 'bg-slate-100 text-slate-300 hover:text-amber-300'
                  }"
                  title="${starNum} Stars"
                >
                  <i class="fa-solid fa-star"></i>
                </button>
              `).join('')}
            </div>

            <!-- Dynamic Rating Label -->
            <div id="modalRatingDescText" class="font-extrabold text-sm ${currentDesc.color} transition-all">
              ${isAm ? currentDesc.am : currentDesc.en}
            </div>
          </div>

          <!-- Quick Feedback Tags -->
          <div class="space-y-2">
            <label class="block text-xs font-extrabold text-slate-700 ${isAm ? 'lang-am' : ''}">
              <i class="fa-solid fa-tags text-emerald-600 mr-1"></i> ${t.quickTagsLabel}
            </label>
            <div class="flex flex-wrap gap-1.5">
              ${defaultTags.map(tagObj => {
                const tagLabel = isAm ? tagObj.am : tagObj.en;
                const isSelected = state.selectedTags.includes(tagObj.en);
                return `
                  <button
                    type="button"
                    onclick="window.toggleModalReviewTag('${tagObj.en}')"
                    class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }"
                  >
                    ${isSelected ? '<i class="fa-solid fa-check mr-1 text-[10px]"></i>' : ''}${tagLabel}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Review Comment Textarea -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <label for="reviewCommentInput" class="${isAm ? 'lang-am' : ''}">
                <i class="fa-solid fa-comment-dots text-emerald-600 mr-1"></i> ${t.reviewCommentLabel}
              </label>
              <span class="text-[11px] text-slate-400 font-medium" id="reviewCommentCharCount">
                ${state.comment.length} / 500
              </span>
            </div>
            
            <textarea
              id="reviewCommentInput"
              rows="3"
              maxlength="500"
              oninput="window.updateModalReviewComment(this.value)"
              placeholder="${t.reviewCommentPlaceholder}"
              class="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none transition-all resize-none placeholder:text-slate-400 ${isAm ? 'lang-am' : ''}"
            >${state.comment}</textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 pt-2">
            <button
              type="button"
              onclick="window.closeRateModal()"
              class="btn-secondary flex-1 py-3 text-xs font-bold justify-center cursor-pointer text-slate-600 hover:text-slate-900"
            >
              Skip for Now
            </button>

            <button
              type="submit"
              class="btn-primary flex-2 py-3 text-xs font-extrabold justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            >
              <i class="fa-solid fa-paper-plane"></i>
              <span>${t.submitReviewBtn}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}
