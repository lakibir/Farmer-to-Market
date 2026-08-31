import { api } from '../services/api';
import { translations, Language } from '../i18n/translations';
import { AgentRegisteredFarmer } from '../types';

export class AgentView {
  private currentLang: Language = 'en';
  private activeTab: 'register' | 'roster' | 'ussd_sim' = 'register';
  private ussdPhone: string = '+251944556677';
  private ussdInput: string = '*990#';
  private ussdScreenText: string = 'Welcome to Farmer-to-Market USSD\n1. Register as Farmer\n2. Submit Fayda ID\n3. Check Escrow Balance\n4. Request Extension Agent Visit';

  constructor(lang: Language = 'en') {
    this.currentLang = lang;
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
  }

  public render(): string {
    const t = translations[this.currentLang];
    const user = api.getCurrentUser();
    const farmers = api.getAgentRegisteredFarmers();
    const approvedCount = farmers.filter(f => f.status === 'Approved').length;
    const totalCommissions = farmers.length * 250; // 250 ETB per onboarded farmer

    return `
      <div class="agent-view" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%); border-radius: 16px; padding: 1.75rem 2rem; color: white; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(27, 67, 50, 0.3); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-bottom: 8px;">
              <span>🌾</span> ${this.currentLang === 'am' ? 'የማህበረሰብ ግብርና ድጋፍ ኤጀንት' : 'Community Agricultural Extension Officer'}
            </div>
            <h1 style="margin: 0 0 6px 0; font-size: 1.6rem; font-weight: 800; color: #ffffff;">
              ${t.agentPortalTitle}
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: #d8f3dc; max-width: 600px; line-height: 1.4;">
              ${this.currentLang === 'am'
                ? 'ስማርት ፎን ለሌላቸው አነስተኛ አርሶ አደሮች መታወቂያቸውን እና ሰነዳቸውን በመመዝገብ በቀጥታ ወደ ገበያው እንዲገቡ ያግዙ።'
                : 'Assist offline smallholder farmers in your Woreda by verifying physical Fayda IDs and onboarding their crops to national buyers.'}
            </p>
          </div>

          <div style="display: flex; gap: 16px; background: rgba(0,0,0,0.2); padding: 12px 18px; border-radius: 12px; backdrop-filter: blur(8px);">
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.2); padding-right: 16px;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #52b788;">${farmers.length}</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${this.currentLang === 'am' ? 'የተመዘገቡ አርሶ አደሮች' : 'Farmers Enrolled'}</div>
            </div>
            <div style="text-align: center; border-right: 1px solid rgba(255,255,255,0.2); padding-right: 16px;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #74c69d;">${approvedCount}</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${this.currentLang === 'am' ? 'የጸደቁ መለያዎች' : 'Approved & Active'}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: #ffd166;">${totalCommissions.toLocaleString()} ETB</div>
              <div style="font-size: 0.75rem; color: #d8f3dc;">${t.agentCommissionEarned}</div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 10px; border-bottom: 2px solid var(--color-border); margin-bottom: 1.75rem; padding-bottom: 2px;">
          <button 
            onclick="window.switchAgentTab('register')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab === 'register' ? '#2d6a4f' : 'transparent'}; color: ${this.activeTab === 'register' ? 'white' : 'var(--color-text-secondary)'};"
          >
            ✍️ ${this.currentLang === 'am' ? 'አዲስ አርሶ አደር መዝግብ' : 'Register Smallholder'}
          </button>
          <button 
            onclick="window.switchAgentTab('roster')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab === 'roster' ? '#2d6a4f' : 'transparent'}; color: ${this.activeTab === 'roster' ? 'white' : 'var(--color-text-secondary)'};"
          >
            📋 ${t.agentRosterTitle} (${farmers.length})
          </button>
          <button 
            onclick="window.switchAgentTab('ussd_sim')" 
            class="btn" 
            style="border-radius: 8px 8px 0 0; font-weight: 600; padding: 0.6rem 1.2rem; background: ${this.activeTab === 'ussd_sim' ? '#2d6a4f' : 'transparent'}; color: ${this.activeTab === 'ussd_sim' ? 'white' : 'var(--color-text-secondary)'};"
          >
            📱 ${this.currentLang === 'am' ? 'የUSSD / ከመስመር ውጭ (Offline) ማስመሰያ' : 'USSD / Offline Simulation'}
          </button>
        </div>

        <!-- Tab Contents with RBAC Checks -->
        ${this.activeTab === 'register' ? (api.hasEffectivePermission('FIELD_AGENT_ONBOARDING', 'agent') ? this.renderRegisterTab() : `
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang === 'am' ? 'የአርሶ አደር ምዝገባ ፈቃድ ተገድቧል' : 'Agent Onboarding Restricted'}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'FIELD_AGENT_ONBOARDING' permission. Please contact a Super Administrator.</p>
          </div>
        `) : ''}
        ${this.activeTab === 'roster' ? this.renderRosterTab(farmers) : ''}
        ${this.activeTab === 'ussd_sim' ? (api.hasEffectivePermission('EXECUTE_USSD', 'agent') ? this.renderUssdTab() : `
          <div style="background: var(--color-surface); border: 1px solid #fca5a5; border-radius: 16px; padding: 2.5rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
            <h3 style="margin: 0 0 0.5rem 0; color: #b91c1c;">${this.currentLang === 'am' ? 'የUSSD ክዋኔ ፈቃድ ተገድቧል' : 'USSD Execution Restricted'}</h3>
            <p style="margin: 0; font-size: 0.85rem; color: #6b7280;">Your account role currently lacks the 'EXECUTE_USSD' permission. Please contact a Super Administrator.</p>
          </div>
        `) : ''}

      </div>
    `;
  }

  private renderRegisterTab(): string {
    const t = translations[this.currentLang];

    return `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--color-text-primary);">
              🧑‍🌾 ${this.currentLang === 'am' ? 'የገበሬው መረጃ እና የሰነድ ምዝገባ (On-Behalf Registration)' : 'Assisted Smallholder Farmer Onboarding'}
            </h3>
            <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: var(--color-text-secondary);">
              ${this.currentLang === 'am' 
                ? 'የአርሶ አደሩን ሙሉ ስም፣ ስልክ ቁጥር እና የፋይዳ መታወቂያ ፎቶ አንስተው ያስገቡ።' 
                : 'Enter the farmer profile details and capture photos of their physical Fayda / Kebele documents.'}
            </p>
          </div>
          <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
            📍 Oromia / East Shewa Zone
          </span>
        </div>

        <form id="agentFarmerForm" onsubmit="window.handleAgentRegisterSubmit(event)">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
            
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'የአርሶ አደሩ ሙሉ ስም (እንግሊዝኛ)' : 'Farmer Full Name (English)'} *
              </label>
              <input type="text" id="agFarmerName" required placeholder="e.g. Girma Wondimu" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'ሙሉ ስም (በአማርኛ / አፋን ኦሮሞ)' : 'Farmer Name (Amharic / Afaan Oromo)'}
              </label>
              <input type="text" id="agFarmerNameAm" placeholder="ለምሳሌ: ግርማ ወንዲሙ" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'ሞባይል ስልክ ቁጥር' : 'Mobile Phone Number'} *
              </label>
              <input type="tel" id="agFarmerPhone" required placeholder="+251 944 556 677" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">
                ${this.currentLang === 'am' ? 'የማረጋገጫ እና የትዕዛዝ ኤስኤምኤስ (SMS) የሚላክበት' : 'Receives SMS order alerts & Twilio notifications'}
              </div>
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'ክልል እና ወረዳ' : 'Region & Woreda'} *
              </label>
              <select id="agFarmerRegion" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);">
                <option value="Oromia (Bishoftu / Ada'a)">Oromia (Bishoftu / Ada'a)</option>
                <option value="Oromia (Mojo / Lume)">Oromia (Mojo / Lume)</option>
                <option value="Amhara (Debre Berhan)">Amhara (Debre Berhan)</option>
                <option value="Amhara (Bahar Dar / Gojjam)">Amhara (Bahar Dar / Gojjam)</option>
                <option value="Sidama (Hawassa)">Sidama (Hawassa)</option>
                <option value="SNNPR (Gedeo)">SNNPR (Gedeo)</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'ቀበሌ / መንደር' : 'Kebele / Village'}
              </label>
              <input type="text" id="agFarmerKebele" placeholder="e.g. Ada'a Kebele 04" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${this.currentLang === 'am' ? 'ዋና ዋና ሰብሎች' : 'Primary Crops Produced'}
              </label>
              <input type="text" id="agFarmerCrop" placeholder="e.g. Magna Teff, Tomatoes, Onions" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${t.faydaIdLabel} *
              </label>
              <input type="text" id="agFarmerFayda" placeholder="FAN-8812-4091-2810" value="FAN-8812-4091-2810" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
            </div>

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">
                ${t.tinNumberLabel} (${this.currentLang === 'am' ? 'ካላቸው' : 'Optional'})
              </label>
              <input type="text" id="agFarmerTin" placeholder="0099881122" value="0099881122" maxlength="10" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
            </div>

          </div>

          <!-- Document Capture Section -->
          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.25rem; margin-bottom: 20px;">
            <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
              <span>📸</span> ${this.currentLang === 'am' ? 'የሰነዶች ፎቶ ማንሻ (Physical Document Scanner)' : 'Field Camera Physical Document Scanner'}
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="border: 2px dashed #2d6a4f; border-radius: 10px; padding: 12px; text-align: center; background: rgba(45, 106, 79, 0.03);">
                <div style="font-size: 0.8rem; font-weight: 600; margin-bottom: 6px;">
                  🪪 ${this.currentLang === 'am' ? 'የፋይዳ ካርድ የፊት ገጽ' : 'Fayda ID Front'}
                </div>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80" alt="Fayda Front" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
                <button type="button" onclick="alert('Camera triggered: Document scanned & cropped with auto-OCR!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px; width: 100%;">
                  📷 ${this.currentLang === 'am' ? 'ካሜራ ክፈት' : 'Capture Photo'}
                </button>
              </div>

              <div style="border: 2px dashed #2d6a4f; border-radius: 10px; padding: 12px; text-align: center; background: rgba(45, 106, 79, 0.03);">
                <div style="font-size: 0.8rem; font-weight: 600; margin-bottom: 6px;">
                  📜 ${this.currentLang === 'am' ? 'የቀበሌ / የይዞታ ማረጋገጫ' : 'Kebele / Land Certificate'}
                </div>
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80" alt="Kebele Doc" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
                <button type="button" onclick="alert('Camera triggered: Kebele certificate uploaded!')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px; width: 100%;">
                  📷 ${this.currentLang === 'am' ? 'ካሜራ ክፈት' : 'Capture Photo'}
                </button>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button type="button" onclick="document.getElementById('agentFarmerForm').reset()" class="btn btn-secondary" style="padding: 0.75rem 1.5rem;">
              ${this.currentLang === 'am' ? 'አጽዳ' : 'Reset Form'}
            </button>
            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem; background: #1b4332; font-weight: 700; font-size: 1rem;">
              🚀 ${this.currentLang === 'am' ? 'ገበሬውን መዝግብ እና ሰነድ ላክ' : 'Enroll Farmer & Submit for Verification'}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  private renderRosterTab(farmers: AgentRegisteredFarmer[]): string {
    const t = translations[this.currentLang];

    return `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            📋 ${t.agentRosterTitle}
          </h3>
          <button onclick="window.switchAgentTab('register')" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.4rem 1rem; background: #2d6a4f;">
            + ${t.agentOnboardFarmerBtn}
          </button>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <thead>
              <tr style="background: var(--color-bg); border-bottom: 2px solid var(--color-border); text-align: left;">
                <th style="padding: 10px 12px;">${this.currentLang === 'am' ? 'አርሶ አደር' : 'Farmer'}</th>
                <th style="padding: 10px 12px;">${this.currentLang === 'am' ? 'ስልክ' : 'Phone'}</th>
                <th style="padding: 10px 12px;">${this.currentLang === 'am' ? 'አካባቢ / ቀበሌ' : 'Location'}</th>
                <th style="padding: 10px 12px;">${this.currentLang === 'am' ? 'ዋና ሰብል' : 'Crops'}</th>
                <th style="padding: 10px 12px;">${this.currentLang === 'am' ? 'የፋይዳ መለያ' : 'Fayda ID'}</th>
                <th style="padding: 10px 12px;">${t.verificationStatusLabel}</th>
                <th style="padding: 10px 12px; text-align: right;">${this.currentLang === 'am' ? 'ድርጊት' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              ${farmers.map(f => `
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 12px; font-weight: 600; color: var(--color-text-primary);">
                    <div>${f.name}</div>
                    ${f.nameAm ? `<div style="font-size: 0.75rem; color: var(--color-text-muted);">${f.nameAm}</div>` : ''}
                  </td>
                  <td style="padding: 12px; font-family: monospace; color: var(--color-text-secondary);">${f.phone}</td>
                  <td style="padding: 12px; color: var(--color-text-secondary);">
                    <div>${f.region}</div>
                    ${f.kebele ? `<div style="font-size: 0.75rem; color: var(--color-text-muted);">${f.kebele}</div>` : ''}
                  </td>
                  <td style="padding: 12px;">
                    <span style="background: rgba(45, 106, 79, 0.1); color: #2d6a4f; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">
                      ${f.primaryCrop || 'Mixed Crops'}
                    </span>
                  </td>
                  <td style="padding: 12px; font-family: monospace; font-size: 0.85rem;">${f.faydaId || 'N/A'}</td>
                  <td style="padding: 12px;">
                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; background: ${f.status === 'Approved' ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)'}; color: ${f.status === 'Approved' ? '#047857' : '#b45309'};">
                      ${f.status === 'Approved' ? '✅ Approved' : '⏳ Under Review'}
                    </span>
                  </td>
                  <td style="padding: 12px; text-align: right;">
                    <button onclick="window.sendAgentFarmerSms('${f.phone}')" class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">
                      💬 SMS Alert
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private renderUssdTab(): string {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        
        <!-- USSD Feature Phone Simulator -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
          <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            📟 ${this.currentLang === 'am' ? 'የገጠር USSD / Feature Phone ማስመሰያ' : 'Rural USSD Feature Phone Simulator'}
          </h3>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${this.currentLang === 'am'
              ? 'ስማርት ፎን ለሌላቸው አርሶ አደሮች በ *990# እና በኤስኤምኤስ የሚሰራውን አገልግሎት ይሞክሩ።'
              : 'Test low-tech USSD menus for farmers on 2G feature phones without internet access.'}
          </p>

          <!-- Virtual Feature Phone Screen -->
          <div style="background: #2b2d42; border: 4px solid #1f2022; border-radius: 16px; padding: 16px; color: #a7c957; font-family: monospace; min-height: 180px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.6); margin-bottom: 16px;">
            <div style="font-size: 0.75rem; color: #8d99ae; border-bottom: 1px solid #3d405b; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>📶 EthioTelecom 2G</span>
              <span>🔋 92%</span>
            </div>
            <pre style="margin: 0; font-size: 0.9rem; white-space: pre-wrap; font-family: monospace; line-height: 1.4;" id="ussdDisplayScreen">${this.ussdScreenText}</pre>
          </div>

          <!-- Phone Keypad Input -->
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <input 
              type="text" 
              id="ussdCodeInput" 
              value="${this.ussdInput}" 
              placeholder="e.g. 1 or *990#" 
              style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; font-size: 1rem; background: var(--color-bg);"
            />
            <button onclick="window.sendUssdCommand()" class="btn btn-primary" style="background: #2d6a4f; padding: 0.75rem 1.25rem;">
              📞 Send
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
            <button onclick="window.setUssdInput('*990#')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">*990# (Main)</button>
            <button onclick="window.setUssdInput('1')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">1 (Register)</button>
            <button onclick="window.setUssdInput('2')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">2 (Fayda)</button>
            <button onclick="window.setUssdInput('3')" class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px;">3 (Escrow)</button>
          </div>
        </div>

        <!-- Twilio Inbound SMS Gateway Simulator -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
          <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">
            💬 ${this.currentLang === 'am' ? 'የTwilio ኤስኤምኤስ (SMS) ጌትዌይ ማስመሰያ' : 'Twilio SMS Command Gateway'}
          </h3>
          <p style="margin: 0 0 16px 0; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${this.currentLang === 'am'
              ? 'አርሶ አደሩ በኤስኤምኤስ ምርት ሲመዘግብ ወይም ትዕዛዝ ሲያረጋግጥ በራስ-ሰር የሚሰራውን ሲስተም ይመልከቱ።'
              : 'Smallholders can create listings and confirm deliveries via simple 1-line SMS texts to 8055.'}
          </p>

          <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 4px;">SAMPLE INBOUND SMS COMMANDS:</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f; margin-bottom: 4px;">• LIST Tomato 2000 45 Bishoftu</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f; margin-bottom: 4px;">• FAYDA FAN-8812-4091-2810</div>
            <div style="font-family: monospace; font-size: 0.8rem; color: #2d6a4f;">• CONFIRM ORDER-0001</div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Inbound SMS Message Body:</label>
            <input type="text" id="inboundSmsBody" value="FAYDA FAN-8812-4091-2810" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--color-border); font-family: monospace; background: var(--color-bg);" />
          </div>

          <button onclick="window.sendInboundSms()" class="btn btn-primary" style="width: 100%; background: #1b4332; font-weight: 700; padding: 0.75rem;">
            📨 Simulate Inbound Farmer SMS
          </button>
        </div>

      </div>
    `;
  }

  public switchTab(tab: 'register' | 'roster' | 'ussd_sim') {
    this.activeTab = tab;
  }

  public setUssdInput(code: string) {
    this.ussdInput = code;
    const inputEl = document.getElementById('ussdCodeInput') as HTMLInputElement;
    if (inputEl) inputEl.value = code;
  }

  public async executeUssd() {
    const inputEl = document.getElementById('ussdCodeInput') as HTMLInputElement;
    const code = inputEl?.value || this.ussdInput;
    const response = await api.sendInboundUssdSimulation(this.ussdPhone, code);
    this.ussdScreenText = response;
    const screenEl = document.getElementById('ussdDisplayScreen');
    if (screenEl) screenEl.innerText = response;
  }
}
