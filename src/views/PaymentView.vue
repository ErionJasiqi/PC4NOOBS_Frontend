<script setup>
import { ref } from 'vue'

// card or Crypto
const paymentMethod = ref('card')

// Creditcard fields
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
    // for backend <-------------------------------------
}
</script>

<template>
    <main>
        <div>
            <!-- Credit card view -->
             <template v-if="paymentMethod === 'card'">
                <h1>Payment</h1>
                <p>Pay with credit card (MasterCard or Visa)</p>

                <!-- Switch to Crypto -->
                 <div>
                    <button type="button" @click="paymentMethod = 'crypto'">
                        <img src="/src/assets/bitcoin.png" alt="Crypto" />
                    </button>
                    <img src="/src/assets/Paypal.png" alt="PayPal" />
                    <img src="/src/assets/pay-logos.jpg" alt="Google Pay / Samsung Pay / Apple Pay" />
                 </div>

                 <input type="text" v-model="cardName" placeholder="Name on card" />

                 <div>
                    <input type="text" v-model="cardCode" placeholder="Card number" />
                    <input type="text" v-model="cardExpiry" placeholder="Expiry date 00/00/00" />
                    <input type="text" v-model="cardCVV" placeholder="CVV Code" />
                 </div>

                 <div>
                    <input type="text" v-model="addressLine" placeholder="Address line 1" />
                    <input type="text" v-model="city" placeholder="City" />
                </div>
        
                <div>
                    <input type="text" v-model="country" placeholder="Country" />
                    <input type="text" v-model="state" placeholder="State / Province" />
                    <input type="text" v-model="zip" placeholder="Postal code" />
                </div>

                <button type="button" @click="buy">BUY</button>
             </template>

             <!-- Crypto view -->
              <template v-else-if="paymentMethod === 'crypto'">
                <div>
                    <img src="/src/assets/Ethereum_Logo.png" alt="Ethereum" />
                    <h1>Crypto Payment</h1>
                    <button type="button" @click="paymentMethod = 'card'">
                        <img src="/src/assets/bitcoin.png" alt="Bitcoin" />
                    </button>
                </div>

                <p>Please connect your crypto wallet to complete the payment.</p>
                
                <button type="button">Connect Wallet</button>

                <div>
                    <div>
                        <img src="/src/assets/coinbase-logo-icon.png" alt="Coinbase" />
                        <p>Coinbase</p>
                    </div>
                    <div>
                        <img src="/src/assets/metamask-icon.png" alt="Metamask" />
                        <p>Metamask</p>
                    </div>
                    <div>
                        <img src="/src/assets/walletconnection.png" alt="Wallet Connection" />
                        <p>Wallet Connection</p>
                    </div>
                </div>

                <button type="button" @click="buy">BUY</button>
            </template>
        </div>
    </main>
</template>