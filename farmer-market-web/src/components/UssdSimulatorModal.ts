import { api } from '../services/api';
import { UssdRequest } from '../types';

export class UssdSimulatorModal {
  private container: HTMLElement;
  private isOpen: boolean = false;
  private currentSessionId: string = 'ussd-' + Math.random().toString(36).substring(2, 9);
  private currentLanguage: string = 'am';
  private screenLines: string[] = ['Dial *804# to start'];
  private currentInput: string = '*804#';
  private isSessionActive: boolean = false;
  private isSending: boolean = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'ussd-modal-container';
    this.container.className = 'ussd-modal-backdrop hidden';
    document.body.appendChild(this.container);
    this.render();
  }

  public open(presetCode: string = '*804#') {
    this.isOpen = true;
    this.container.classList.remove('hidden');
    this.currentInput = presetCode;
    this.currentSessionId = 'ussd-' + Math.random().toString(36).substring(2, 9);
    this.isSessionActive = false;
    this.screenLines = ['Dial *804# to begin rural farmer service'];
    this.render();
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  private async dial() {
    if (this.isSending) return;
    this.isSending = true;
    const req: UssdRequest = {
      sessionId: this.currentSessionId,
      phoneNumber: api.getCurrentUser()?.phone || '+251911223344',
      text: this.currentInput,
      serviceCode: '*804#',
      language: this.currentLanguage
    };

    this.screenLines = ['Connecting to Ethio Telecom network...', 'Sending USSD code...'];
    this.renderScreen();

    try {
      const resp = await api.simulateUssd(req);
      this.screenLines = resp.message.split('\n');
      this.isSessionActive = resp.action === 'CON';
      this.currentInput = '';
    } catch (e) {
      this.screenLines = ['Connection failed.', 'Please check mobile network.'];
      this.isSessionActive = false;
    } finally {
      this.isSending = false;
      this.render();
    }
  }

  private appendDigit(digit: string) {
    this.currentInput += digit;
    this.renderScreen();
  }

  private clearInput() {
    if (this.currentInput.length > 0) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '';
    }
    this.renderScreen();
  }

  private resetSession() {
    this.currentSessionId = 'ussd-' + Math.random().toString(36).substring(2, 9);
    this.isSessionActive = false;
    this.currentInput = '*804#';
    this.screenLines = ['Session reset.', 'Dial *804# to start.'];
    this.render();
  }

  private renderScreen() {
    const screen = this.container.querySelector('.ussd-lcd-content');
    if (screen) {
      screen.innerHTML = `
        <div class="ussd-lcd-header">
          <span>📶 2G ETH-NET</span>
          <span>${this.currentLanguage.toUpperCase()}</span>
          <span>🔋 92%</span>
        </div>
        <div class="ussd-lcd-body">
          ${this.screenLines.map(line => `<div class="ussd-line">${line || '&nbsp;'}</div>`).join('')}
        </div>
        <div class="ussd-input-bar">
          <span class="ussd-prompt">&gt;</span>
          <span class="ussd-typed-text">${this.currentInput}</span>
          <span class="ussd-cursor">_</span>
        </div>
      `;
    }
  }

  private render() {
    this.container.innerHTML = `
      <div class="ussd-modal-wrapper animate-scale-up">
        <div class="ussd-modal-header">
          <div class="ussd-title">
            <span class="ussd-icon">📞</span>
            <div>
              <h3>USSD Offline Farmer Simulator (*804#)</h3>
              <p>Test feature-phone menus (Amharic & English) for rural farmers without internet</p>
            </div>
          </div>
          <button class="ussd-close-btn" id="ussd-close-btn">&times;</button>
        </div>

        <div class="ussd-phone-chassis">
          <div class="ussd-phone-speaker"></div>

          <!-- LCD Green Backlight Screen -->
          <div class="ussd-lcd-screen">
            <div class="ussd-lcd-content">
              <!-- Rendered by renderScreen() -->
            </div>
          </div>

          <!-- Keypad Controls -->
          <div class="ussd-quick-actions">
            <button class="ussd-btn-lang" id="ussd-lang-toggle">🌐 ${this.currentLanguage === 'am' ? 'አማርኛ / English' : 'English / አማርኛ'}</button>
            <button class="ussd-btn-reset" id="ussd-reset-btn">🔄 Reset (*804#)</button>
          </div>

          <!-- Keypad Grid -->
          <div class="ussd-keypad-grid">
            <button class="ussd-key btn-digit" data-key="1"><span class="k-num">1</span><span class="k-sub">.</span></button>
            <button class="ussd-key btn-digit" data-key="2"><span class="k-num">2</span><span class="k-sub">ABC</span></button>
            <button class="ussd-key btn-digit" data-key="3"><span class="k-num">3</span><span class="k-sub">DEF</span></button>

            <button class="ussd-key btn-digit" data-key="4"><span class="k-num">4</span><span class="k-sub">GHI</span></button>
            <button class="ussd-key btn-digit" data-key="5"><span class="k-num">5</span><span class="k-sub">JKL</span></button>
            <button class="ussd-key btn-digit" data-key="6"><span class="k-num">6</span><span class="k-sub">MNO</span></button>

            <button class="ussd-key btn-digit" data-key="7"><span class="k-num">7</span><span class="k-sub">PQRS</span></button>
            <button class="ussd-key btn-digit" data-key="8"><span class="k-num">8</span><span class="k-sub">TUV</span></button>
            <button class="ussd-key btn-digit" data-key="9"><span class="k-num">9</span><span class="k-sub">WXYZ</span></button>

            <button class="ussd-key btn-digit" data-key="*"><span class="k-num">*</span><span class="k-sub">+</span></button>
            <button class="ussd-key btn-digit" data-key="0"><span class="k-num">0</span><span class="k-sub">␣</span></button>
            <button class="ussd-key btn-digit" data-key="#"><span class="k-num">#</span><span class="k-sub">⇧</span></button>
          </div>

          <!-- Action Buttons (Call / Send / Clear) -->
          <div class="ussd-action-row">
            <button class="ussd-key btn-call" id="ussd-call-btn">
              <span>📞</span> ${this.isSessionActive ? 'SEND' : 'DIAL'}
            </button>
            <button class="ussd-key btn-clear" id="ussd-clear-btn">
              <span>⌫</span> CLEAR
            </button>
          </div>
        </div>

        <div class="ussd-demo-hints">
          <div class="hint-chip">💡 <strong>Press 1:</strong> ECX Market Prices</div>
          <div class="hint-chip">💡 <strong>Press 2:</strong> Telebirr Balance & Escrow</div>
          <div class="hint-chip">💡 <strong>Press 4:</strong> SMS/USSD Crop Listing Wizard</div>
        </div>
      </div>
    `;

    this.renderScreen();

    // Event listeners
    this.container.querySelector('#ussd-close-btn')?.addEventListener('click', () => this.close());
    this.container.querySelector('#ussd-call-btn')?.addEventListener('click', () => this.dial());
    this.container.querySelector('#ussd-clear-btn')?.addEventListener('click', () => this.clearInput());
    this.container.querySelector('#ussd-reset-btn')?.addEventListener('click', () => this.resetSession());

    this.container.querySelector('#ussd-lang-toggle')?.addEventListener('click', () => {
      this.currentLanguage = this.currentLanguage === 'am' ? 'en' : 'am';
      this.render();
    });

    this.container.querySelectorAll('.btn-digit').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        if (key) this.appendDigit(key);
      });
    });

    // Close when clicking backdrop outside wrapper
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) this.close();
    });
  }
}

export const ussdSimulator = new UssdSimulatorModal();
