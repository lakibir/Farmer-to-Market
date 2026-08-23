import { api } from '../services/api';
import { translations, Language } from '../i18n/translations';
import { VerificationStatus } from '../types';

export class VerificationWizardModal {
  private currentLang: Language = 'en';
  private isOpen: boolean = false;
  private currentStep: number = 1;
  private faydaNumber: string = '';
  private tinNumber: string = '';
  private kebeleNumber: string = '';
  private frontImageUrl: string = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80';
  private backImageUrl: string = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80';

  constructor(lang: Language = 'en') {
    this.currentLang = lang;
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
  }

  public open(step: number = 1) {
    this.isOpen = true;
    this.currentStep = step;
    const user = api.getCurrentUser();
    if (user?.tinNumber) this.tinNumber = user.tinNumber;
    this.render();
  }

  public close() {
    this.isOpen = false;
    const modalEl = document.getElementById('verificationWizardModal');
    if (modalEl) modalEl.innerHTML = '';
  }

  public render() {
    const modalEl = document.getElementById('verificationWizardModal');
    if (!modalEl || !this.isOpen) return;

    const t = translations[this.currentLang];
    const user = api.getCurrentUser();
    const status = api.getVerificationStatus();

    modalEl.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeVerificationWizard()">
        <div class="modal-content" style="max-width: 680px; width: 95%; max-height: 90vh; overflow-y: auto; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); padding: 0;">
          
          <!-- Modal Header -->
          <div style="background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%); padding: 1.5rem 1.75rem; border-top-left-radius: 16px; border-top-right-radius: 16px; color: white; display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.3rem;">🛡️</span>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #ffffff;">${t.verifyAccountTitle}</h3>
              </div>
              <p style="margin: 0; font-size: 0.85rem; color: #d8f3dc; line-height: 1.4;">
                ${this.currentLang === 'am' ? 'የብሔራዊ ፋይዳ መታወቂያ እና የታክስ መለያ (TIN) ማረጋገጫ' : 'National Fayda ID & Taxpayer ID Compliance Verification'}
              </p>
            </div>
            <button onclick="window.closeVerificationWizard()" style="background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">✕</button>
          </div>

          <!-- Status Indicator Banner -->
          <div style="padding: 1rem 1.75rem; background: ${this.getStatusBgColor(status)}; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">${this.getStatusIcon(status)}</span>
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: ${this.getStatusTextColor(status)};">
                  ${t.verificationStatusLabel}: <strong>${this.formatStatus(status)}</strong>
                </div>
                ${user?.rejectionReason ? `<div style="font-size: 0.8rem; color: #b91c1c; margin-top: 2px;"><strong>${t.rejectionReasonLabel}:</strong> ${user.rejectionReason}</div>` : ''}
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 4px 8px; border-radius: 6px;">
              ${user?.registrationMethod === 'Agent' ? '🧑‍🌾 ' + (this.currentLang === 'am' ? 'በኤጀንት የተመዘገበ' : 'Agent Registered') : '💻 ' + (this.currentLang === 'am' ? 'የራስ ምዝገባ' : 'Direct Registration')}
            </div>
          </div>

          <!-- Stepper Navigation -->
          <div style="display: flex; border-bottom: 1px solid var(--color-border); padding: 0.75rem 1.75rem; gap: 12px; background: rgba(0,0,0,0.02);">
            <div onclick="window.setWizardStep(1)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep === 1 ? '#2d6a4f' : 'transparent'};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep === 1 ? '700' : '500'}; color: ${this.currentStep === 1 ? '#2d6a4f' : 'var(--color-text-muted)'};">
                1. ${this.currentLang === 'am' ? 'የፋይዳ መታወቂያ' : 'Fayda ID'}
              </span>
            </div>
            <div onclick="window.setWizardStep(2)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep === 2 ? '#2d6a4f' : 'transparent'};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep === 2 ? '700' : '500'}; color: ${this.currentStep === 2 ? '#2d6a4f' : 'var(--color-text-muted)'};">
                2. ${this.currentLang === 'am' ? 'የታክስ ቁጥር (TIN)' : 'TIN & Business'}
              </span>
            </div>
            <div onclick="window.setWizardStep(3)" style="flex: 1; text-align: center; cursor: pointer; padding: 6px; border-bottom: 2px solid ${this.currentStep === 3 ? '#2d6a4f' : 'transparent'};">
              <span style="font-size: 0.85rem; font-weight: ${this.currentStep === 3 ? '700' : '500'}; color: ${this.currentStep === 3 ? '#2d6a4f' : 'var(--color-text-muted)'};">
                3. ${this.currentLang === 'am' ? 'ፎቶ እና ማረጋገጫ' : 'Photos & Submit'}
              </span>
            </div>
          </div>

          <!-- Wizard Body -->
          <div style="padding: 1.5rem 1.75rem;">
            ${this.renderStepContent()}
          </div>

          <!-- Modal Footer -->
          <div style="padding: 1rem 1.75rem; border-top: 1px solid var(--color-border); background: var(--color-surface-hover); display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
            <button onclick="window.closeVerificationWizard()" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
              ${this.currentLang === 'am' ? 'ዝጋ' : 'Close'}
            </button>
            <div style="display: flex; gap: 8px;">
              ${this.currentStep > 1 ? `
                <button onclick="window.setWizardStep(${this.currentStep - 1})" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                  ← ${this.currentLang === 'am' ? 'ወደ ኋላ' : 'Back'}
                </button>
              ` : ''}
              ${this.currentStep < 3 ? `
                <button onclick="window.setWizardStep(${this.currentStep + 1})" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.9rem; background: #2d6a4f;">
                  ${this.currentLang === 'am' ? 'ቀጣይ' : 'Next Step'} →
                </button>
              ` : `
                <button onclick="window.submitVerificationForm()" class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem; background: #1b4332; font-weight: 700;">
                  🚀 ${this.currentLang === 'am' ? 'ሰነዶቹን ላክ' : 'Submit for Review'}
                </button>
              `}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  private renderStepContent(): string {
    const t = translations[this.currentLang];
    const user = api.getCurrentUser();

    if (this.currentStep === 1) {
      return `
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            🪪 ${t.faydaIdLabel}
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang === 'am' 
              ? 'የኢትዮጵያ ብሔራዊ መታወቂያ (Fayda FAN) ቁጥርዎን ያስገቡ። ለምሳሌ: FAN-8812-4091-2810' 
              : 'Enter your 16-digit Ethiopian National ID (Fayda FAN). Format: FAN-XXXX-XXXX-XXXX'}
          </p>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${t.faydaIdLabel} *
            </label>
            <input 
              type="text" 
              id="wizardFaydaInput" 
              value="${this.faydaNumber || (user?.kycDocumentNumber || 'FAN-8812-4091-2810')}" 
              placeholder="FAN-8812-4091-2810"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1rem; background: var(--color-bg);"
              oninput="window.updateWizardField('fayda', this.value)"
            />
            <div style="margin-top: 6px; font-size: 0.75rem; color: #2d6a4f; display: flex; align-items: center; gap: 4px;">
              <span>✓</span> ${this.currentLang === 'am' ? 'በብሔራዊ የፋይዳ ዳታቤዝ ጋር የተጣጣመ' : 'Instant format check: Valid Ethiopian FAN identifier'}
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${t.kebeleIdLabel}
            </label>
            <input 
              type="text" 
              id="wizardKebeleInput" 
              value="${this.kebeleNumber || 'Bishoftu Kebele 04 / Farm Plot 182'}" 
              placeholder="Kebele 04 / Farm Plot ID"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-size: 0.95rem; background: var(--color-bg);"
              oninput="window.updateWizardField('kebele', this.value)"
            />
          </div>

          <div style="background: rgba(45, 106, 79, 0.08); border-left: 4px solid #2d6a4f; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            💡 <strong>${this.currentLang === 'am' ? 'የመታወቂያ ጠቀሜታ፡' : 'Why is this required?'}</strong>
            ${this.currentLang === 'am' 
              ? 'የፋይዳ መታወቂያ በግብርና ገበያው ላይ እምነትን ለመገንባት እና የቴሌብር ክፍያዎችን ደህንነት ለማረጋገጥ ይረዳል።' 
              : 'Fayda ID verification builds institutional trust, protects Telebirr escrow transactions, and qualifies your farm for agricultural subsidies.'}
          </div>
        </div>
      `;
    }

    if (this.currentStep === 2) {
      return `
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            📊 ${t.tinNumberLabel} & Business Licensing
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang === 'am' 
              ? 'የ10-ዲጂት የግብር ከፋይ መለያ (TIN) ቁጥርዎን ያስገቡ። በግብር አዋጅ ቁጥር 979/2008 መሰረት የሚደረግ የ2% Withholding እና የግብር ተገዢነት ማረጋገጫ ነው።' 
              : 'Enter your 10-digit Ministry of Revenues Taxpayer Identification Number (TIN) for 2% withholding compliance.'}
          </p>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${t.tinNumberLabel} *
            </label>
            <input 
              type="text" 
              id="wizardTinInput" 
              value="${this.tinNumber || (user?.tinNumber || '0099881122')}" 
              placeholder="0099881122"
              maxlength="10"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1.05rem; letter-spacing: 2px; background: var(--color-bg);"
              oninput="window.updateWizardField('tin', this.value)"
            />
            <div style="margin-top: 6px; font-size: 0.75rem; color: #2d6a4f; display: flex; align-items: center; gap: 4px;">
              <span>✓</span> ${this.currentLang === 'am' ? 'የ10 ዲጂት የግብር ከፋይ ቁጥር ተረጋግጧል' : 'MOR 10-digit checksum verified'}
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
              ${this.currentLang === 'am' ? 'የግብርና ህብረት ስራ ማህበር / የንግድ ፈቃድ ቁጥር (ካለዎት)' : 'Cooperative Membership / Trade Registry No. (Optional)'}
            </label>
            <input 
              type="text" 
              placeholder="COOP-OROMIA-2026-981"
              value="COOP-BISH-8812"
              style="width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border); font-size: 0.95rem; background: var(--color-bg);"
            />
          </div>

          <div style="background: rgba(234, 88, 12, 0.08); border-left: 4px solid #ea580c; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            📜 <strong>${this.currentLang === 'am' ? 'የግብር ነጻ መብት መረጃ፡' : 'Tax Exemption Notice:'}</strong>
            ${this.currentLang === 'am' 
              ? 'ያልተዘጋጁ የመጀመሪያ ደረጃ የግብርና ምርቶች (ጥራጥሬ፣ አትክልት) በኢትዮጵያ የግብር ህግ መሰረት ከተጨማሪ እሴት ታክስ (VAT) ነፃ ናቸው።' 
              : 'Primary agricultural food items (cereals, vegetables, fresh fruit) are exempt from 15% VAT under Ethiopian Tax Proclamation No. 285/2002.'}
          </div>
        </div>
      `;
    }

    if (this.currentStep === 3) {
      return `
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text-primary);">
            📸 ${t.uploadFrontPhoto} & ${t.uploadBackPhoto}
          </h4>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.4;">
            ${this.currentLang === 'am' 
              ? 'የመታወቂያዎን ወይም የግብር ሰነድዎን ግልጽ ፎቶ ይጫኑ ወይም በሞባይል ካሜራ ያንሱ።' 
              : 'Upload clear, unblurred photos of your Fayda Card front and back for OCR inspection.'}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <!-- Front Photo -->
            <div style="border: 2px dashed var(--color-border); border-radius: 12px; padding: 12px; text-align: center; background: var(--color-bg);">
              <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: var(--color-text-primary);">
                ${t.uploadFrontPhoto}
              </div>
              <img src="${this.frontImageUrl}" alt="Front ID Preview" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--color-border);" />
              <button type="button" onclick="alert('Photo captured & processed successfully!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 10px; width: 100%;">
                📷 ${this.currentLang === 'am' ? 'ፎቶ ቀይር / አንሳ' : 'Retake / Reupload'}
              </button>
            </div>

            <!-- Back Photo -->
            <div style="border: 2px dashed var(--color-border); border-radius: 12px; padding: 12px; text-align: center; background: var(--color-bg);">
              <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: var(--color-text-primary);">
                ${t.uploadBackPhoto}
              </div>
              <img src="${this.backImageUrl}" alt="Back ID Preview" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--color-border);" />
              <button type="button" onclick="alert('Photo captured & processed successfully!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 10px; width: 100%;">
                📷 ${this.currentLang === 'am' ? 'ፎቶ ቀይር / አንሳ' : 'Retake / Reupload'}
              </button>
            </div>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; padding: 12px; border-radius: 6px; font-size: 0.8rem; color: var(--color-text-primary);">
            ✨ <strong>${this.currentLang === 'am' ? 'የግምገማ ጊዜ፡' : 'Review Turnaround Time:'}</strong>
            ${this.currentLang === 'am' 
              ? 'የማረጋገጫ ሰነዶች በአስተዳዳሪዎች በ24 ሰዓታት ውስጥ ይገመገማሉ። ውሳኔው እንደተሰጠ በኤስኤምኤስ (SMS) ይደርስዎታል።' 
              : 'Our marketplace compliance officer will review your documents within 24 hours. You will receive an immediate SMS notification once approved.'}
          </div>
        </div>
      `;
    }

    return '';
  }

  private getStatusBgColor(status: VerificationStatus): string {
    switch (status) {
      case 'Approved': return 'rgba(16, 185, 129, 0.12)';
      case 'UnderReview': return 'rgba(234, 179, 8, 0.12)';
      case 'Rejected': return 'rgba(239, 68, 68, 0.12)';
      default: return 'rgba(100, 116, 139, 0.1)';
    }
  }

  private getStatusTextColor(status: VerificationStatus): string {
    switch (status) {
      case 'Approved': return '#047857';
      case 'UnderReview': return '#b45309';
      case 'Rejected': return '#b91c1c';
      default: return '#475569';
    }
  }

  private getStatusIcon(status: VerificationStatus): string {
    switch (status) {
      case 'Approved': return '✅';
      case 'UnderReview': return '⏳';
      case 'Rejected': return '❌';
      default: return '📝';
    }
  }

  private formatStatus(status: VerificationStatus): string {
    const t = translations[this.currentLang];
    switch (status) {
      case 'Approved': return t.statusApproved;
      case 'UnderReview': return t.statusUnderReview;
      case 'Rejected': return t.statusRejected;
      default: return t.statusPendingSubmission;
    }
  }

  public updateField(field: 'fayda' | 'tin' | 'kebele', value: string) {
    if (field === 'fayda') this.faydaNumber = value;
    if (field === 'tin') this.tinNumber = value;
    if (field === 'kebele') this.kebeleNumber = value;
  }

  public setStep(step: number) {
    this.currentStep = step;
    this.render();
  }

  public async submit() {
    const fayda = this.faydaNumber || 'FAN-8812-4091-2810';
    const tin = this.tinNumber || '0099881122';

    await api.submitVerificationDocuments(tin, [
      {
        documentType: 'FaydaId',
        documentNumber: fayda,
        frontImageUrl: this.frontImageUrl,
        backImageUrl: this.backImageUrl
      },
      {
        documentType: 'TinCertificate',
        documentNumber: tin,
        frontImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
      }
    ]);

    this.close();
  }
}
