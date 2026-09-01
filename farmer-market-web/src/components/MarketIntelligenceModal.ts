import { api } from '../services/api';
import { CommodityPriceIndex, FairPriceRecommendationResult } from '../types';

export class MarketIntelligenceModal {
  private container: HTMLElement;
  private isOpen: boolean = false;
  private indices: CommodityPriceIndex[] = [];
  private selectedCategory: string = 'All';
  private selectedIndex: CommodityPriceIndex | null = null;

  // Advisor form state
  private advisorCommodity: string = 'Teff (White Magna)';
  private advisorRegion: string = 'Oromia (Bishoftu)';
  private advisorGrade: string = 'Grade 1';
  private advisorQtyKg: number = 500;
  private advisorColdChain: boolean = false;
  private advisorResult: FairPriceRecommendationResult | null = null;
  private isCalculating: boolean = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'market-intelligence-container';
    this.container.className = 'market-intel-backdrop hidden';
    document.body.appendChild(this.container);
  }

  public async open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
    await this.loadIndices();
    this.render();
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  private async loadIndices() {
    this.indices = await api.getMarketPriceIndices(this.selectedCategory);
    if (this.indices.length > 0 && !this.selectedIndex) {
      this.selectedIndex = this.indices[0];
    }
  }

  private async calculateFairPrice() {
    this.isCalculating = true;
    this.renderAdvisorResult();
    try {
      this.advisorResult = await api.getFairPriceRecommendation({
        commodityName: this.advisorCommodity,
        category: 'Vegetable',
        region: this.advisorRegion,
        grade: this.advisorGrade,
        qtyKg: this.advisorQtyKg,
        requiresColdChain: this.advisorColdChain
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.isCalculating = false;
      this.render();
    }
  }

  private renderAdvisorResult() {
    const resEl = this.container.querySelector('#advisor-result-area');
    if (!resEl) return;
    if (this.isCalculating) {
      resEl.innerHTML = `<div class="advisor-loading"><div class="spinner"></div> Calculating real-time AI valuation...</div>`;
      return;
    }
    if (!this.advisorResult) return;

    const r = this.advisorResult;
    resEl.innerHTML = `
      <div class="advisor-result-card animate-fade-in">
        <div class="result-header">
          <span class="badge badge-success">✨ AI Recommendation</span>
          <span class="volatility-tag ${r.volatility.toLowerCase()}">Market Volatility: ${r.volatility}</span>
        </div>
        <div class="fair-price-display">
          <div class="fair-price-box">
            <span class="price-lbl">Recommended Fair Rate</span>
            <span class="price-val">ETB ${r.recommendedFairPriceEtb.toFixed(2)}<small>/kg</small></span>
          </div>
          <div class="price-range-box">
            <div class="range-row"><span>Min Acceptable:</span> <strong>ETB ${r.recommendedMinEtb.toFixed(2)}/kg</strong></div>
            <div class="range-row"><span>Export Ceiling:</span> <strong>ETB ${r.recommendedMaxEtb.toFixed(2)}/kg</strong></div>
            <div class="range-row"><span>ECX Baseline:</span> <strong>ETB ${r.ecxBenchmarkEtb.toFixed(2)}/kg</strong></div>
          </div>
        </div>
        <div class="guidance-box">
          <p class="en-guide">💡 ${r.guidanceMessageEn}</p>
          <p class="am-guide">🇪🇹 ${r.guidanceMessageAm}</p>
        </div>
        ${r.coldChainPremiumPercent > 0 ? `<div class="addon-chip">❄️ +${r.coldChainPremiumPercent}% Cold-Chain Preservation Premium Included</div>` : ''}
      </div>
    `;
  }

  private render() {
    this.container.innerHTML = `
      <div class="market-intel-wrapper animate-scale-up">
        <div class="market-intel-header">
          <div class="market-intel-title">
            <span class="market-intel-icon">📈</span>
            <div>
              <h3>Ethiopian Commodity Exchange (ECX) & Market Intelligence</h3>
              <p>Real-time wholesale terminal rates, 7-day price volatility, and AI fair-pricing guidance</p>
            </div>
          </div>
          <button class="modal-close-btn" id="market-close-btn">&times;</button>
        </div>

        <div class="market-intel-grid">
          <!-- Left Column: Commodity Price List -->
          <div class="market-left-panel">
            <div class="category-tabs">
              ${['All', 'Grain', 'Coffee', 'Vegetable', 'Fruit', 'Tubers'].map(cat => `
                <button class="cat-pill ${this.selectedCategory === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>
              `).join('')}
            </div>

            <div class="commodity-cards-list">
              ${this.indices.map(item => `
                <div class="commodity-card ${this.selectedIndex?.commodityId === item.commodityId ? 'selected' : ''}" data-id="${item.commodityId}">
                  <div class="comm-top">
                    <div>
                      <h4 class="comm-name">${item.name}</h4>
                      <span class="comm-am">${item.nameAm}</span>
                    </div>
                    <div class="comm-trend ${item.trendDirection.toLowerCase()}">
                      ${item.trendDirection === 'Up' ? '▲ +' : item.trendDirection === 'Down' ? '▼ ' : '● '}
                      ${item.weeklyChangePercent}%
                    </div>
                  </div>
                  <div class="comm-bottom">
                    <span class="comm-price">ETB ${item.nationalAvgPriceEtb.toFixed(2)} / ${item.unit}</span>
                    <span class="comm-benchmark">ECX: ETB ${item.eczBenchmarkEtb.toFixed(2)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Column: Selected Commodity Details + AI Price Advisor -->
          <div class="market-right-panel">
            ${this.selectedIndex ? `
              <div class="commodity-detail-view">
                <div class="detail-top-banner">
                  <div>
                    <h2>${this.selectedIndex.name}</h2>
                    <p class="am-subtitle">${this.selectedIndex.nameAm} · ${this.selectedIndex.category} Index</p>
                  </div>
                  <div class="national-rate-box">
                    <span class="rate-lbl">National Avg</span>
                    <span class="rate-val">ETB ${this.selectedIndex.nationalAvgPriceEtb.toFixed(2)} / ${this.selectedIndex.unit}</span>
                  </div>
                </div>

                <!-- 7-Day Trend Chart -->
                <div class="trend-history-box">
                  <span class="sec-title">📊 7-Day Price Movement</span>
                  <div class="sparkline-bar-chart">
                    ${this.selectedIndex.historical7Days.map(p => `
                      <div class="sparkline-bar-wrapper">
                        <div class="sparkline-bar" style="height: ${Math.min(100, Math.max(30, (p.priceEtb / (this.selectedIndex?.nationalAvgPriceEtb || 100)) * 80))}%;">
                          <span class="sparkline-val">${p.priceEtb}</span>
                        </div>
                        <span class="sparkline-lbl">${p.date}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Regional Wholesale Hubs -->
                <div class="regional-hubs-box">
                  <span class="sec-title">🏛️ Regional Wholesale Market Benchmarks</span>
                  <div class="regional-table-wrapper">
                    <table class="regional-table">
                      <thead>
                        <tr>
                          <th>Region</th>
                          <th>Wholesale Terminal</th>
                          <th>Min (ETB)</th>
                          <th>Avg Rate</th>
                          <th>Max (ETB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.selectedIndex.regionalPrices.map(rp => `
                          <tr>
                            <td><strong>${rp.regionName}</strong></td>
                            <td>${rp.marketName}</td>
                            <td class="text-muted">${rp.minPriceEtb}</td>
                            <td class="text-highlight">ETB ${rp.avgPriceEtb.toFixed(2)}</td>
                            <td class="text-muted">${rp.maxPriceEtb}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- AI Fair Price Advisor Tool -->
            <div class="ai-advisor-section">
              <div class="advisor-title">
                <span>🤖 AI Fair Price Valuation Engine</span>
                <span class="advisor-sub">Enter your harvest parameters to get fair market valuation</span>
              </div>

              <div class="advisor-controls-grid">
                <div class="input-group">
                  <label>Harvest Crop</label>
                  <input type="text" id="adv-crop" class="form-control" value="${this.advisorCommodity}" />
                </div>
                <div class="input-group">
                  <label>Production Region</label>
                  <select id="adv-region" class="form-control">
                    <option ${this.advisorRegion.includes('Oromia') ? 'selected' : ''}>Oromia (Bishoftu / Adama)</option>
                    <option ${this.advisorRegion.includes('Addis') ? 'selected' : ''}>Addis Ababa</option>
                    <option ${this.advisorRegion.includes('Amhara') ? 'selected' : ''}>Amhara (Bahir Dar / Gojjam)</option>
                    <option ${this.advisorRegion.includes('Sidama') ? 'selected' : ''}>Sidama (Hawassa)</option>
                    <option ${this.advisorRegion.includes('SNNPR') ? 'selected' : ''}>SNNPR (Arba Minch)</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Quality Grade</label>
                  <select id="adv-grade" class="form-control">
                    <option value="Grade 1" ${this.advisorGrade === 'Grade 1' ? 'selected' : ''}>Grade 1 (Premium Commercial)</option>
                    <option value="Export Grade" ${this.advisorGrade === 'Export Grade' ? 'selected' : ''}>Export Grade (Grade A+)</option>
                    <option value="Grade 2" ${this.advisorGrade === 'Grade 2' ? 'selected' : ''}>Grade 2 (Standard Table)</option>
                    <option value="Grade 3" ${this.advisorGrade === 'Grade 3' ? 'selected' : ''}>Grade 3 (Processing / Bulk)</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Quantity (Kg)</label>
                  <input type="number" id="adv-qty" class="form-control" value="${this.advisorQtyKg}" />
                </div>
              </div>

              <div class="advisor-toggles-row">
                <label class="checkbox-label">
                  <input type="checkbox" id="adv-cold" ${this.advisorColdChain ? 'checked' : ''} />
                  <span>❄️ Requires Cold-Chain Refrigerated Transport (+12% preservation value)</span>
                </label>
                <button class="btn btn-primary" id="btn-run-advisor">⚡ Calculate Fair Price</button>
              </div>

              <div id="advisor-result-area">
                <!-- Rendered by renderAdvisorResult -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderAdvisorResult();

    // Event listeners
    this.container.querySelector('#market-close-btn')?.addEventListener('click', () => this.close());

    this.container.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', async () => {
        this.selectedCategory = btn.getAttribute('data-category') || 'All';
        await this.loadIndices();
        this.render();
      });
    });

    this.container.querySelectorAll('.commodity-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.selectedIndex = this.indices.find(x => x.commodityId === id) || null;
        if (this.selectedIndex) {
          this.advisorCommodity = this.selectedIndex.name;
        }
        this.render();
      });
    });

    this.container.querySelector('#btn-run-advisor')?.addEventListener('click', () => {
      this.advisorCommodity = (this.container.querySelector('#adv-crop') as HTMLInputElement)?.value || 'Produce';
      this.advisorRegion = (this.container.querySelector('#adv-region') as HTMLSelectElement)?.value || 'Oromia';
      this.advisorGrade = (this.container.querySelector('#adv-grade') as HTMLSelectElement)?.value || 'Grade 1';
      this.advisorQtyKg = parseFloat((this.container.querySelector('#adv-qty') as HTMLInputElement)?.value) || 500;
      this.advisorColdChain = (this.container.querySelector('#adv-cold') as HTMLInputElement)?.checked || false;
      this.calculateFairPrice();
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) this.close();
    });
  }
}

export const marketIntelligenceModal = new MarketIntelligenceModal();
