<script setup>
import { ref } from 'vue'

const paymentMethod = ref('card')

const cardName = ref('')
const cardCode = ref('')
const cardExpiry = ref('')
const cardCVV = ref('')
const addressLine = ref('')
const city = ref('')
const country = ref('')
const state = ref('')
const zip = ref('')

function buy() {
  // for backend
}
</script>

<template>
  <main class="payment-main">

    <!-- Credit card view -->
    <template v-if="paymentMethod === 'card'">
      <div class="payment-card">

        <div class="card-header">
          <h1>Payment</h1>
          <p class="card-subtitle">Pay with credit card (MasterCard or Visa)</p>
        </div>

        <!-- Payment method icons -->
        <div class="payment-icons">
          <button class="icon-btn" type="button" @click="paymentMethod = 'crypto'" title="Pay with Crypto">
            <img src="/src/assets/bitcoin.png" alt="Crypto" />
            <span>Crypto</span>
          </button>
          <div class="icon-btn">
            <img src="/src/assets/Paypal.png" alt="PayPal" />
            <span>PayPal</span>
          </div>
          <div class="icon-btn">
            <img src="/src/assets/pay-logos.jpg" alt="Google/Samsung/Apple Pay" />
            <span>More</span>
          </div>
        </div>

        <input class="field-full" type="text" v-model="cardName" placeholder="Name on your card" />

        <div class="field-row">
          <input type="text" v-model="cardCode" placeholder="Card number" />
          <input type="text" v-model="cardExpiry" placeholder="Expiry date 00/00/00" />
          <input type="text" v-model="cardCVV" placeholder="CVV Code" />
        </div>

        <div class="field-row">
          <input type="text" v-model="addressLine" placeholder="Address line 1" class="field-wide" />
          <input type="text" v-model="city" placeholder="City" class="field-wide" />
        </div>

        <div class="field-row">
          <input type="text" v-model="country" placeholder="Country" />
          <input type="text" v-model="state" placeholder="State / Province" />
          <input type="text" v-model="zip" placeholder="Postal code" />
        </div>

        <div class="buy-row">
          <button type="button" class="buy-btn" @click="buy">BUY</button>
        </div>
      </div>
    </template>

    <!-- Crypto view -->
    <template v-else-if="paymentMethod === 'crypto'">
      <div class="payment-card">

        <div class="crypto-header">
          <img src="/src/assets/Ethereum_Logo.png" alt="Ethereum" class="crypto-icon" />
          <h1>Crypto Payment</h1>
          <button type="button" class="icon-btn-plain" @click="paymentMethod = 'card'">
            <img src="/src/assets/bitcoin.png" alt="Bitcoin" class="crypto-icon" />
          </button>
        </div>

        <p class="crypto-subtitle">Please connect your crypto wallet to complete the payment.</p>

        <button type="button" class="connect-btn">
          🪙 Connect Wallet
        </button>

        <div class="wallet-list">
          <div class="wallet-item">
            <img src="/src/assets/coinbase-logo-icon.png" alt="Coinbase" />
            <p>Coinbase</p>
          </div>
          <div class="wallet-item">
            <img src="/src/assets/walletconnection.png" alt="Wallet Connection" />
            <p>Wallet Connection</p>
          </div>
          <div class="wallet-item">
            <img src="/src/assets/metamask-icon.png" alt="Metamask" />
            <p>Metamask</p>
          </div>
        </div>

        <div class="buy-row">
          <button type="button" class="buy-btn" @click="buy">BUY</button>
        </div>
      </div>
    </template>

  </main>
</template>

<style scoped>
.payment-main {
  min-height: calc(100vh - 80px - 200px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2.5rem 1rem;
}

.payment-card {
  background-color: #1a1f2e;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* ── Card header ── */
.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card-header h1 {
  font-size: 1.6rem;
  font-weight: 700;
}

.card-subtitle {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

/* ── Payment icons ── */
.payment-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.icon-btn img {
  height: 40px;
  width: 40px;
  object-fit: contain;
  border-radius: 50%;
}

.icon-btn span {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* ── Inputs ── */
input {
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: #2a2f3e;
  color: var(--color-text);
  font-size: 0.9rem;
  width: 100%;
}

input::placeholder {
  color: #888;
}

.field-full {
  width: 100%;
}

.field-row {
  display: flex;
  gap: 0.7rem;
}

.field-row input {
  flex: 1;
}

.field-wide {
  flex: 2 !important;
}

/* ── Buy button ── */
.buy-row {
  display: flex;
  justify-content: center;
}

.buy-btn {
  background-color: var(--color-green);
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.65rem 2.5rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.buy-btn:hover {
  background-color: var(--color-green-hover);
}

/* ── Crypto view ── */
.crypto-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.crypto-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  flex: 1;
}

.crypto-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 50%;
}

.icon-btn-plain {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.crypto-subtitle {
  text-align: center;
  color: var(--color-green);
  font-size: 0.95rem;
  text-decoration: underline;
}

.connect-btn {
  background-color: #3b7bdb;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: center;
  width: 260px;
}

.wallet-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.wallet-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.wallet-item img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 12px;
}

.wallet-item p {
  font-size: 0.9rem;
  color: var(--color-text);
  text-align: center;
}
</style>