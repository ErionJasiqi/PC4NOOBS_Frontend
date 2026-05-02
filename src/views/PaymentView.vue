<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntent } from '@/api/requests.js'

const route = useRoute()
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

const total = Number(route.query.total) || 0
const googlePayAvailable = ref(false)
const googlePayLoading = ref(true)
const paymentStatus = ref(null) // null | 'processing' | 'success' | 'error'
const paymentError = ref('')

const prButtonContainer = ref(null)

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const GPAY_ENV = STRIPE_KEY?.startsWith('pk_live') ? 'PRODUCTION' : 'TEST'

const BASE_PAYMENT_METHOD = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['MASTERCARD', 'VISA'],
  },
}

const TOKENIZED_PAYMENT_METHOD = {
  ...BASE_PAYMENT_METHOD,
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'stripe',
      'stripe:version': '2022-11-15',
      'stripe:publishableKey': STRIPE_KEY,
    },
  },
}

function loadGooglePayScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.payments?.api) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

let stripeInstance = null
let paymentsClient = null

onMounted(async () => {
  if (!STRIPE_KEY) { googlePayLoading.value = false; return }

  try {
    await loadGooglePayScript()
    stripeInstance = await loadStripe(STRIPE_KEY)

    paymentsClient = new window.google.payments.api.PaymentsClient({ environment: GPAY_ENV })

    const { result } = await paymentsClient.isReadyToPay({
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [BASE_PAYMENT_METHOD],
    })

    if (result) {
      googlePayAvailable.value = true
      const button = paymentsClient.createButton({
        onClick: startGooglePay,
        buttonType: 'buy',
        buttonColor: 'black',
        buttonSizeMode: 'fill',
      })
      prButtonContainer.value.appendChild(button)
    }
  } catch (e) {
    console.error('Google Pay init failed:', e)
  } finally {
    googlePayLoading.value = false
  }
})

function startGooglePay() {
  if (!total) {
    paymentError.value = 'No order total. Please go back and build your PC first.'
    paymentStatus.value = 'error'
    return
  }

  const paymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [TOKENIZED_PAYMENT_METHOD],
    transactionInfo: {
      countryCode: 'CH',
      currencyCode: 'CHF',
      totalPriceStatus: 'FINAL',
      totalPrice: total.toFixed(2),
      totalPriceLabel: 'PC4NOOBS Build',
    },
    merchantInfo: { merchantName: 'PC4NOOBS' },
  }

  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(processGooglePayData)
    .catch(err => {
      if (err.statusCode === 'CANCELED') return
      paymentError.value = err.message || 'Google Pay failed.'
      paymentStatus.value = 'error'
    })
}

async function processGooglePayData(paymentData) {
  paymentStatus.value = 'processing'
  try {
    const tokenString = paymentData.paymentMethodData.tokenizationData.token
    const { id: paymentMethodId } = JSON.parse(tokenString)

    const { clientSecret } = await createPaymentIntent(total)

    const { error, paymentIntent } = await stripeInstance.confirmCardPayment(
      clientSecret,
      { payment_method: paymentMethodId },
      { handleActions: false },
    )
    if (error) throw error

    if (paymentIntent.status === 'requires_action') {
      const { error: actionError } = await stripeInstance.confirmCardPayment(clientSecret)
      if (actionError) throw actionError
    }

    paymentStatus.value = 'success'
  } catch (err) {
    paymentError.value = err.message || 'Payment failed. Please try again.'
    paymentStatus.value = 'error'
  }
}

function buy() {
  // card payment — to be implemented
}
</script>

<template>
  <main class="payment-main">

    <!-- Success state -->
    <div v-if="paymentStatus === 'success'" class="status-overlay">
      <div class="status-card status-card--success">
        <div class="status-icon">✓</div>
        <h2>Payment successful!</h2>
        <p>Your PC build order has been confirmed.</p>
        <p v-if="total" class="status-amount">CHF {{ total }}</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="paymentStatus === 'error'" class="status-overlay">
      <div class="status-card status-card--error">
        <div class="status-icon">✕</div>
        <h2>Payment failed</h2>
        <p>{{ paymentError || 'Something went wrong. Please try again.' }}</p>
        <button class="buy-btn" @click="paymentStatus = null">Try again</button>
      </div>
    </div>

    <template v-else>

      <!-- Credit card view -->
      <template v-if="paymentMethod === 'card'">
        <div class="payment-card">

          <div class="card-header">
            <h1>Payment</h1>
            <p class="card-subtitle">Pay with credit card (MasterCard or Visa)</p>
          </div>

          <!-- Order total -->
          <div v-if="total" class="order-total">
            <span class="order-total-label">Order total</span>
            <span class="order-total-amount">CHF {{ total }}</span>
          </div>

          <!-- Google Pay: shown while checking, hidden if not supported -->
          <div v-if="googlePayLoading || googlePayAvailable" class="google-pay-section">
            <div v-if="googlePayLoading" class="gpay-loading">Checking Google Pay…</div>
            <div ref="prButtonContainer" v-show="googlePayAvailable" class="gpay-container"></div>
            <div v-if="googlePayAvailable" class="pay-divider"><span>or pay by card</span></div>
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
            <button
              type="button"
              class="buy-btn"
              :disabled="paymentStatus === 'processing'"
              @click="buy"
            >
              {{ paymentStatus === 'processing' ? 'Processing…' : 'BUY' }}
            </button>
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

/* ── Order total ── */
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #252d42;
  border-radius: 8px;
  font-size: 0.95rem;
}

.order-total-label {
  color: var(--color-text-muted, #8a99b8);
}

.order-total-amount {
  font-weight: 700;
  font-size: 1.1rem;
  color: #39d353;
}

/* ── Google Pay section ── */
.google-pay-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gpay-loading {
  text-align: center;
  color: var(--color-text-muted, #8a99b8);
  font-size: 0.9rem;
  padding: 0.75rem;
}

.gpay-container {
  width: 100%;
  min-height: 48px;
}

.pay-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #556;
  font-size: 0.82rem;
}

.pay-divider::before,
.pay-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #2a3148;
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

.buy-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Status overlays ── */
.status-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.status-card {
  background-color: #1a1f2e;
  border-radius: 12px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.status-icon {
  font-size: 2rem;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.status-card--success .status-icon {
  background: #1a3a1a;
  color: #39d353;
}

.status-card--error .status-icon {
  background: #3a1a1a;
  color: #e05555;
}

.status-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.status-amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #39d353;
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
