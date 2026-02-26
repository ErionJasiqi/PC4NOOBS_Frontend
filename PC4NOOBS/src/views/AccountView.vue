<template>
    <main>
        <section>
            <h1>Account Details</h1>

            <div>
                <!--Profile picture-->
                <figure>
                    <img src="/src/assets/avatar.png" alt="Profile picture">
                </figure>

                <!--Account information-->
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

                    <h2>Costumer ID</h2>
                    <p>123456789</p>
                </section>
            </div>
        </section>
    </main>
</template>