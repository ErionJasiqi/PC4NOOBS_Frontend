<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// login, register and account
const view = ref('login')

const email = ref('')
const password = ref('')
const username = ref('')

function login() {
    view.value = 'account'
}

function register() {
    view.value = 'account'
}
</script>

<template>
    <main>

        <!-- login form-->
         <template v-if="view === 'login'">
            <h1>login</h1>

            <div>
                <label for="email">E-Mail</label>
                <input id="email" type="email" v-model="email" />
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" />

                <button type="button" @click="login">LOGIN</button>

                <p>Continue with</p>
                <div>
                    <img src="/src/assets/google.png" alt="Google" />
                    <img src="/src/assets/apple.png" alt="Apple" />
                    <img src="/src/assets/microsoft.png" alt="Microsoft" />
                    <img src="/src/assets/facebook.png" alt="Facebook" />
                </div>

                <p>Forgot your password? <a href="#">Click here</a></p>
                <p>Don't have an account? <a href="#" @click="view = 'register'">Register here</a></p>
            </div>
         </template>

         <!-- Register form -->
         <template v-else-if="view === 'register'">
            <h1>Register</h1>

            <div>
                <label for="username">Username</label>
                <input id="username" type="text" v-model="username" />
                <label for="reg-email">E-Mail</label>
                <input id="reg-email" type="email" v-model="email" />
                <label for="reg-password">Password</label>
                <input id="reg-password" type="password" v-model="password" />

                <button type="button" @click="register">REGISTER</button>

                <p>Continue with</p>
                <div>
                    <img src="/src/assets/google.png" alt="Google" />
                    <img src="/src/assets/apple.png" alt="Apple" />
                    <img src="/src/assets/microsoft.png" alt="Microsoft" />
                    <img src="/src/assets/facebook.png" alt="Facebook" />
                </div>

                <p>Already have an account? <a href="#" @click="view = 'login'">Login here</a></p>

            </div>
         </template>

         <!-- Account page -->
        <template v-else-if="view === 'account'">
            <section>
                <h1>Account Details</h1>
        
                <div>
                    <figure>
                        <img src="/src/assets/avatar.png" alt="Profile picture" />
                    </figure>
        
                    <section>
                        <header>
                            <h2>Personal Information</h2>
                            <button type="button">Edit</button>
                        </header>
            
                        <ul>
                            <li><strong>Name:</strong> John Doe</li>
                            <li><strong>Email:</strong> john.doe@example.com</li>
                            <li><strong>Phone:</strong> +41 79 345 67 89</li>
                            <li><strong>Date of birth:</strong> 31.12.2000</li>
                        </ul>
            
                        <h2>Delivery Address</h2>
                        <ul>
                            <li><strong>Street:</strong> Blächikonstrasse 3</li>
                            <li><strong>City / ZIP:</strong> Bounarge 9659</li>
                        </ul>
            
                        <h2>Selected Language</h2>
                        <p>German</p>
            
                        <h2>Customer ID</h2>
                        <p>123456789</p>
                    </section>
                </div>
            </section>
        </template>
    </main>
</template>