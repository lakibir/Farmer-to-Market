import { TaxInvoice, TransportWaybill, LegalContract, DisputeMediationRecord } from '../types';
import { translations, Language } from '../i18n/translations';
import { api } from '../services/api';

export class DocumentModal {
  private currentLang: Language = 'en';

  public setLanguage(lang: Language) {
    this.currentLang = lang;
  }

  public renderInvoice(inv: TaxInvoice): string {
    const isAm = this.currentLang === 'am';
    const cfg = api.getPlatformConfig();
    const farmerPercent = cfg?.farmerSharePercent || 90;
    const driverPercent = cfg?.driverSharePercent || 5;
    const platformPercent = cfg?.platformFeePercent || 5;
    const vatPercent = cfg?.vatOnCommissionPercent || 15;
    const withholdingTaxPercent = cfg?.withholdingTaxPercent || 2;
    const subtotal = inv.grossAmountEtb || inv.goodsGrossTotalEtb || (inv.qtyKg * inv.unitPriceEtb);
    return `
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🇪🇹</span>
            <div class="emblem-text">
              <h4>FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA</h4>
              <h5>MINISTRY OF REVENUES / ETHIOPIAN AGRICULTURAL AUTHORITY</h5>
              <p class="amharic-sub">የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ የገቢዎች ሚኒስቴር</p>
            </div>
          </div>
          <div class="doc-type-badge tax-stamp">
            <span class="badge-title">ELECTRONIC AGRICULTURAL SALES INVOICE</span>
            <span class="badge-am">የኤሌክትሮኒክስ የግብርና ሽያጭ ደረሰኝ</span>
            <span class="invoice-num">${inv.invoiceNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>DATE OF ISSUE / የወጣበት ቀን</label>
            <p><strong>${inv.issueDate || inv.issuedDate || '2026-08-22'}</strong></p>
            <label>TELEBIRR ESCROW REF / የክፍያ ማረጋገጫ</label>
            <p><code class="ref-code">${inv.paymentRef || 'TB-ESCROW-2026-0912'}</code></p>
          </div>
          <div class="meta-box">
            <label>REGULATORY STATUS / የግብር ሁኔታ</label>
            <p><span class="badge-green">TAX-EXEMPT PRIMARY PRODUCE (Art. 979/2016)</span></p>
            <label>ORDER ID / የትዕዛዝ ቁጥር</label>
            <p><code>${inv.orderId ? inv.orderId.slice(0, 13) : 'AGR-ORD'}...</code></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>SUPPLIER / SELLER (አቅራቢ / አርሶ አደር)</h5>
            <p class="party-name"><strong>${inv.sellerName || inv.supplierName || 'Abebe Bekele'}</strong></p>
            <p><span class="label">Tax Identification No (TIN):</span> <strong>${inv.sellerTin || inv.supplierTin || 'TIN-FARM-882910'}</strong></p>
            <p><span class="label">Region / Farm Gate:</span> ${inv.sellerRegion || inv.supplierRegion || 'Oromia (Bishoftu)'}</p>
            <p><span class="label">Contact Phone:</span> ${inv.sellerPhone || inv.supplierPhone || '+251 911 223 344'}</p>
            <p class="party-type-tag">Smallholder Agricultural Producer</p>
          </div>

          <div class="party-card buyer-card">
            <h5>PURCHASER / BUYER (ገዢ / የንግድ ድርጅት)</h5>
            <p class="party-name"><strong>${inv.buyerName}</strong></p>
            <p><span class="label">Purchaser TIN:</span> <strong>${inv.buyerTin}</strong></p>
            <p><span class="label">Delivery Location:</span> ${inv.buyerRegion || inv.buyerAddress || 'Addis Ababa (Bole Depot)'}</p>
            <p><span class="label">Contact Phone:</span> ${inv.buyerPhone || '+251 955 667 788'}</p>
            <p class="party-type-tag">Commercial Wholesale Buyer</p>
          </div>
        </div>

        <table class="doc-line-items">
          <thead>
            <tr>
              <th>Item & Description (የምርት ዝርዝር)</th>
              <th>Grade (ደረጃ)</th>
              <th>Qty (ኪ.ግ)</th>
              <th>Unit Price (ብር)</th>
              <th style="text-align: right;">Total (ጠቅላላ ብር)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${inv.productName}</strong>
                ${inv.productNameAm ? `<div class="sub-am">${inv.productNameAm}</div>` : ''}
              </td>
              <td><span class="badge-grade">${inv.grade || 'Grade 1'}</span></td>
              <td><strong>${inv.qtyKg.toLocaleString()} kg</strong></td>
              <td>${inv.unitPriceEtb.toFixed(2)} ETB</td>
              <td style="text-align: right;"><strong>${subtotal.toLocaleString()} ETB</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="doc-settlement-breakdown">
          <div class="escrow-payout-box">
            <h6>ESCROW DISBURSEMENT APPORTIONMENT (${farmerPercent} / ${driverPercent} / ${platformPercent})</h6>
            <div class="breakdown-row">
              <span>Farmer Net Payout (${farmerPercent}%):</span>
              <strong>${(inv.farmerPayoutEtb || inv.netPayableToFarmerEtb || (subtotal * (farmerPercent / 100))).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Driver Transport Fee (${driverPercent}%):</span>
              <strong>${(inv.driverFreightEtb || inv.freightFeeEtb || (subtotal * (driverPercent / 100))).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row">
              <span>Platform Service Commission (${platformPercent}%):</span>
              <strong>${(inv.platformServiceFeeEtb || (subtotal * (platformPercent / 100))).toLocaleString()} ETB</strong>
            </div>
            <div class="breakdown-row vat-row">
              <span>${vatPercent}% VAT on Platform Service Fee:</span>
              <span>${(inv.platformVatEtb || (subtotal * (platformPercent / 100) * (vatPercent / 100))).toFixed(2)} ETB (Remitted to MOR)</span>
            </div>
            <div class="breakdown-row withholding-row">
              <span>Withholding Tax on Goods (${withholdingTaxPercent}% Declared):</span>
              <span>${(inv.withholdingTaxEtb || (subtotal * (withholdingTaxPercent / 100))).toFixed(2)} ETB</span>
            </div>
          </div>

          <div class="total-summary-box">
            <label>TOTAL PAID VIA TELEBIRR ESCROW</label>
            <h2 class="grand-total">${(inv.totalPaidViaTelebirr || inv.totalInvoiceAmountEtb || (inv.qtyKg * inv.unitPriceEtb)).toLocaleString()} <span class="currency">ETB</span></h2>
            <div class="qr-placeholder">
              <div class="qr-code-box">
                <span class="qr-mock">▣▣▣<br/>▣■▣<br/>▣▣▣</span>
              </div>
              <div class="qr-info">
                <p><strong>ETH-TAX-VERIFIED</strong></p>
                <small>${inv.qrVerificationCode || 'MOR-EABC-VERIFIED'}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            ${isAm 
              ? 'ይህ ሰነድ በኢትዮጵያ የግብር ህግ እና የኤሌክትሮኒክስ ፊርማ አዋጅ ቁጥር 1072/2018 መሰረት ህጋዊ ተቀባይነት ያለው ነው።' 
              : 'This electronic receipt is generated automatically upon Telebirr escrow confirmation under Ethiopian Tax Law & Proclamation No. 979/2016.'}
          </p>
        </div>
      </div>
    `;
  }

  public renderWaybill(wb: TransportWaybill): string {
    return `
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🚛</span>
            <div class="emblem-text">
              <h4>FEDERAL TRANSPORT AUTHORITY (FTA) · ETHIOPIA</h4>
              <h5>OFFICIAL AGRICULTURAL FREIGHT WAYBILL & CHAIN OF CUSTODY</h5>
              <p class="amharic-sub">የኢትዮጵያ ትራንስፖርት ባለስልጣን የግብርና ምርት ማጓጓዣ ሰነድ</p>
            </div>
          </div>
          <div class="doc-type-badge waybill-stamp">
            <span class="badge-title">OFFICIAL WAYBILL</span>
            <span class="badge-am">የጭነት ማጓጓዣ ሰነድ</span>
            <span class="invoice-num">${wb.waybillNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>DISPATCH DATE / የተላከበት ቀን</label>
            <p><strong>${wb.dispatchDate || wb.issueDate || '2026-08-22'}</strong></p>
            <label>INSURANCE POLICY REF / የኢንሹራንስ ፖሊሲ</label>
            <p><code class="ref-code">${wb.insurancePolicyNumber || wb.transitInsurancePolicyNumber || 'NIC-AGRI-TR-99214'}</code></p>
          </div>
          <div class="meta-box">
            <label>TRANSIT STATUS / የጉዞ ሁኔታ</label>
            <p><span class="badge-green">${(wb.transitStatus || wb.chainOfCustodyStatus || 'In Transit').toUpperCase()}</span></p>
            <label>ORDER REF / የትዕዛዝ ቁጥር</label>
            <p><code>${wb.orderId.slice(0, 13)}...</code></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>CONSIGNOR / ORIGIN FARM (ላኪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${wb.consignorName}</strong></p>
            <p><span class="label">Loading Farm Gate:</span> ${wb.consignorFarmLocation || wb.pickupLocation || 'Bishoftu Farm Gate'}</p>
            <p><span class="label">Farmer Contact:</span> ${wb.consignorPhone || '+251 911 223 344'}</p>
            <p><span class="label">Farm Handoff Time:</span> ${wb.farmerHandoffTimestamp || 'Today 07:30 AM'}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>CONSIGNEE / DESTINATION (ተቀባይ የጅምላ ገዢ)</h5>
            <p class="party-name"><strong>${wb.consigneeName}</strong></p>
            <p><span class="label">Unloading Hub:</span> ${wb.consigneeDepotAddress || wb.deliveryLocation || 'Addis Ababa Central Depot'}</p>
            <p><span class="label">Buyer Contact:</span> ${wb.consigneePhone || '+251 955 667 788'}</p>
            <p><span class="label">Received Timestamp:</span> ${wb.buyerReceivedTimestamp || 'In Transit (Pending GPS Dropoff)'}</p>
          </div>
        </div>

        <div class="carrier-spec-box">
          <h5>CARRIER & VEHICLE SPECIFICATIONS (የአጓጓዥ እና ተሽከርካሪ ዝርዝር)</h5>
          <div class="carrier-grid">
            <div>
              <span class="label">Licensed Driver:</span>
              <strong>${wb.carrierDriverName || wb.transporterName || 'Dawit Kebede'}</strong>
            </div>
            <div>
              <span class="label">Commercial CDL License:</span>
              <strong>${wb.driverLicenseNumber || 'ET-CDL-5T-98214'}</strong>
            </div>
            <div>
              <span class="label">Vehicle Plate Number:</span>
              <strong class="plate-highlight">${wb.vehiclePlateNumber}</strong>
            </div>
            <div>
              <span class="label">Vehicle Type / Specs:</span>
              <span>${wb.vehicleModel || wb.vehicleType || 'Isuzu NPR 5-Ton'}</span>
            </div>
            <div>
              <span class="label">Refrigeration Mode:</span>
              <span class="badge-blue">${wb.refrigerationStatus || 'Ventilated Agro-Crate Box'}</span>
            </div>
            <div>
              <span class="label">Cargo Temp Log:</span>
              <span>${wb.temperatureLogCelsius || 18}°C (Verified Fresh)</span>
            </div>
          </div>
        </div>

        <table class="doc-line-items">
          <thead>
            <tr>
              <th>Cargo Description (የጭነቱ አይነት)</th>
              <th>Packages / Crates</th>
              <th>Net Cargo (ኪ.ግ)</th>
              <th>Tare Weight (ኪ.ግ)</th>
              <th style="text-align: right;">Gross Weight (ኪ.ግ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${wb.cargoDescription || wb.productName || 'Fresh Agricultural Cargo'}</strong></td>
              <td>${wb.packageCount || 100} Commercial Crates</td>
              <td>${(wb.netWeightKg || wb.cargoWeightNetKg || 2500).toLocaleString()} kg</td>
              <td>${wb.tareWeightKg || wb.cargoWeightTareKg || 300} kg</td>
              <td style="text-align: right;"><strong>${(wb.grossWeightKg || wb.cargoWeightGrossKg || 2800).toLocaleString()} kg</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="signature-chain-box">
          <div class="sig-block">
            <p class="sig-title">1. CONSIGNOR (FARM GATE DISPATCH)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ SIGNED & HANDED OVER</span>
              <small>${wb.consignorName} (${wb.farmerHandoffTimestamp || 'Today 07:30 AM'})</small>
            </div>
          </div>
          <div class="sig-block">
            <p class="sig-title">2. CARRIER (DRIVER CUSTODY ACK)</p>
            <div class="sig-line-area">
              <span class="sig-check">✓ IN-TRANSIT SECURITY SEALED</span>
              <small>${wb.carrierDriverName || wb.transporterName || 'Dawit Kebede'} (${wb.vehiclePlateNumber})</small>
            </div>
          </div>
          <div class="sig-block">
            <p class="sig-title">3. CONSIGNEE (DESTINATION DEPOT)</p>
            <div class="sig-line-area">
              ${wb.buyerReceivedTimestamp ? `
                <span class="sig-check">✓ RECEIVED & INSPECTED</span>
                <small>${wb.buyerReceivedTimestamp}</small>
              ` : `
                <span class="sig-pending">⏳ PENDING DELIVERY DROP-OFF</span>
                <small>GPS Timestamp Enforced Upon Receipt</small>
              `}
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Official Waybill generated pursuant to Ethiopian Commercial Road Transport Regulations. Carries full third-party transit insurance.
          </p>
        </div>
      </div>
    `;
  }

  public renderContract(c: LegalContract): string {
    return `
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">⚖️</span>
            <div class="emblem-text">
              <h4>STANDARD AGRICULTURAL COMMODITY SALE & PURCHASE CONTRACT</h4>
              <h5>GOVERNED UNDER ETHIOPIAN COMMERCIAL CODE & EABC ARBITRATION RULES</h5>
              <p class="amharic-sub">የግብርና ምርት ግዢ እና ሽያጭ ሕጋዊ ውል</p>
            </div>
          </div>
          <div class="doc-type-badge contract-stamp">
            <span class="badge-title">DIGITAL SALE CONTRACT</span>
            <span class="badge-am">ሕጋዊ የግብይት ውል</span>
            <span class="invoice-num">${c.contractNumber}</span>
          </div>
        </div>

        <div class="contract-preamble">
          <p>
            This Standard Agricultural Produce Agreement (the <strong>"Contract"</strong>) is entered into on <strong>${c.agreementDate || c.executionDate || '2026-08-22'}</strong> between the Seller and Buyer identified below through the Farmer-to-Market direct exchange.
          </p>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card seller-card">
            <h5>THE SELLER (አቅራቢ / ሻጭ)</h5>
            <p class="party-name"><strong>${c.sellerName}</strong></p>
            <p><span class="label">National Fayda ID:</span> ${c.sellerIdNumber || 'FAN-8812-4091-2810'}</p>
            <p><span class="label">Location:</span> ${c.sellerLocation || 'Oromia (Bishoftu)'}</p>
          </div>

          <div class="party-card buyer-card">
            <h5>THE BUYER (ገዢ ድርጅት)</h5>
            <p class="party-name"><strong>${c.buyerName}</strong></p>
            <p><span class="label">Buyer TIN:</span> ${c.buyerTinNumber || c.buyerTin || 'TIN-ET-9912001'}</p>
            <p><span class="label">Depot Destination:</span> ${c.buyerLocation || 'Addis Ababa (Bole Depot)'}</p>
          </div>
        </div>

        <div class="contract-clauses-container">
          <div class="clause-item">
            <h6>ARTICLE 1: SUBJECT MATTER & PRICE SPECIFICATIONS (የምርት እና የዋጋ ዝርዝር)</h6>
            <p>
              The Seller agrees to supply and the Buyer agrees to purchase <strong>${(c.contractedQuantityKg || c.quantityKg || 2500).toLocaleString()} kg</strong> of <strong>${c.cropType || c.productDescription || 'Fresh Sholla Tomatoes'}</strong> at the agreed unit rate of <strong>${(c.agreedPricePerKg || c.unitPriceEtb || 45).toFixed(2)} ETB per kg</strong>, constituting a total consideration of <strong>${c.totalContractValueEtb.toLocaleString()} ETB</strong>.
            </p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 2: QUALITY STANDARDS & TOLERANCE (የጥራት ደረጃ)</h6>
            <p>${c.qualityStandardClause || c.qualityStandardSpecification || 'Produce shall meet Grade 1 Ethiopian Agricultural Quality Standards with maximum 5% visual variance tolerance.'}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 3: TELEBIRR ESCROW & PAYMENT SETTLEMENT (የዋስትና ክፍያ እና ስምምነት)</h6>
            <p>${c.escrowClauseText || c.paymentEscrowClause || 'Full purchase consideration is locked in Telebirr escrow prior to harvest dispatch and released upon buyer digital inspection confirmation.'}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 4: DELIVERY & CHAIN OF CUSTODY (የማድረስ ሁኔታ)</h6>
            <p>${c.deliveryTimeline || 'Delivery within 24 hours of harvest confirmation via certified temperature-controlled commercial freight carrier.'}</p>
          </div>

          <div class="clause-item">
            <h6>ARTICLE 5: FORCE MAJEURE & ARBITRATION (አቅም በላይ የሆነ ሁኔታ እና የህግ ሽምግልና)</h6>
            <p>${c.forceMajeureClauseText || c.forceMajeureClause || 'Neither party shall be liable for agricultural loss resulting from severe climate events verified by Ministry of Agriculture.'}</p>
            <p><em>Dispute Resolution Jurisdiction: ${c.disputeJurisdiction || c.arbitrationVenue || 'Ethiopian Arbitration and Conciliation Center (EABC), Addis Ababa'}</em></p>
          </div>
        </div>

        <div class="contract-signatures-grid">
          <div class="contract-sig-box">
            <p class="sig-header">SELLER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA OTP</span>
              <strong>${c.sellerName}</strong>
              <small>${c.eSignatures?.sellerSignDate || '2026-08-22 08:30:14'}</small>
            </div>
          </div>

          <div class="contract-sig-box">
            <p class="sig-header">BUYER DIGITAL ATTESTATION</p>
            <div class="sig-badge verified-sig">
              <span>✓ DIGITALLY SIGNED VIA TELEBIRR LOCK</span>
              <strong>${c.buyerName}</strong>
              <small>${c.eSignatures?.buyerSignDate || '2026-08-22 08:31:02'}</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            Digital signatures are legally recognized under the Ethiopian Electronic Signature Proclamation No. 1072/2018. Immutable Platform Cryptographic Witness Hash: <code>${c.eSignatures?.platformWitnessHash || '0x8f2a991bce98124a9e4d'}</code>
          </p>
        </div>
      </div>
    `;
  }

  public renderArbitration(a: DisputeMediationRecord): string {
    return `
      <div class="legal-doc-container print-area">
        <div class="doc-header">
          <div class="doc-emblem">
            <span class="emblem-flag">🏛️</span>
            <div class="emblem-text">
              <h4>ETHIOPIAN AGRICULTURAL COMMODITY ARBITRATION TRIBUNAL</h4>
              <h5>BINDING ESCROW DISPUTE RULING & SETTLEMENT DECREE</h5>
              <p class="amharic-sub">የግብርና ምርት ግብይት ቅሬታ አስገዳጅ የሽምግልና ውሳኔ ሰነድ</p>
            </div>
          </div>
          <div class="doc-type-badge dispute-stamp">
            <span class="badge-title">ARBITRATION DECREE</span>
            <span class="badge-am">የሽምግልና ውሳኔ</span>
            <span class="invoice-num">${a.caseNumber}</span>
          </div>
        </div>

        <div class="doc-meta-grid">
          <div class="meta-box">
            <label>FILING DATE / የቀረበበት ቀን</label>
            <p><strong>${a.filingDate}</strong></p>
            <label>DISPUTED ESCROW AMOUNT</label>
            <p><strong class="highlight-warn">${(a.totalDisputedAmountEtb || 112500).toLocaleString()} ETB</strong></p>
          </div>
          <div class="meta-box">
            <label>CASE STATUS / የክርክር ሁኔታ</label>
            <p><span class="badge-green">${(a.status || 'Resolved').toUpperCase()}</span></p>
            <label>LEAD ARBITRATOR</label>
            <p><strong>${a.leadArbitratorName || a.arbitratorName || 'Sara Mengistu'}</strong></p>
          </div>
        </div>

        <div class="doc-parties-grid">
          <div class="party-card buyer-card">
            <h5>CLAIMANT (ቅሬታ አቅራቢ ገዢ)</h5>
            <p class="party-name"><strong>${a.claimantBuyer || a.complainantName || 'Bethlehem Tilahun'}</strong></p>
            <p><span class="label">Claimed Defect:</span> ${a.claimedDefectPercentage || 50}% Value Impairment</p>
            <p><span class="label">Dispute Reason:</span> ${a.disputeReason || a.disputeSubject || 'Quality degradation in transit'}</p>
          </div>

          <div class="party-card seller-card">
            <h5>RESPONDENT (ተጠሪ አርሶ አደር)</h5>
            <p class="party-name"><strong>${a.respondentFarmer || a.respondentName || 'Chala Gemechu'}</strong></p>
            <p><span class="label">Freight Carrier:</span> ${a.freightCarrier || 'Dawit Kebede (Isuzu 5-Ton)'}</p>
            <p><span class="label">Original Farm Payout:</span> ${api.getPlatformConfig().farmerSharePercent}% Contract Standard</p>
          </div>
        </div>

        <div class="arbitration-findings-box">
          <h5>1. INDEPENDENT PHYSICAL INSPECTION & PATHOLOGY FINDINGS</h5>
          <p>${a.inspectionReport || a.inspectionFindingNotes || 'Depot inspector confirmed 20% surface bruising due to transit ventilation failure.'}</p>
        </div>

        <div class="arbitration-findings-box ruling-highlight-box">
          <h5>2. ARBITRATOR LEGAL DETERMINATION & REMEDY</h5>
          <p><strong>${a.legalFindingSummary || a.arbitrationDetermination || 'Escrow funds split 50/50 between farmer and buyer with immediate Telebirr wallet settlement.'}</strong></p>
          
          <div class="verdict-award-grid">
            <div class="award-box">
              <span class="award-label">FARMER ESCROW RELEASE (50%)</span>
              <h3 class="award-amount">${(a.farmerSettlementEtb || 56250).toLocaleString()} ETB</h3>
              <small>Released to Farmer Telebirr Wallet</small>
            </div>
            <div class="award-box">
              <span class="award-label">BUYER ESCROW REFUND (50%)</span>
              <h3 class="award-amount">${(a.buyerRefundEtb || 56250).toLocaleString()} ETB</h3>
              <small>Refunded to Buyer Telebirr Account</small>
            </div>
          </div>
        </div>

        <div class="doc-footer">
          <p class="legal-notice">
            This decree constitutes a final, binding arbitral award rendered under the Ethiopian Commercial Code and Platform Escrow Bylaws.
          </p>
          <div class="seal-container">
            <div class="official-seal">
              <span>★ EABC ARBITRATION BOARD ★</span>
              <strong>ENFORCEABLE DECREE</strong>
              <small>${a.platformDecreeHash || a.bindingEnforcementSeal || 'EABC-DECREE-SEAL-8821'}</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export const documentModal = new DocumentModal();
