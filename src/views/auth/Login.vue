<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';

const contact = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    try {
        const response = await api.login({ contact: contact.value, password: password.value });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            // Handle successful login
            console.log('Login successful', response);
        } else {
            errorMessage.value = 'Invalid email or password';
        }
    } catch {
        errorMessage.value = 'An error occurred. Please try again.';
    }
};
</script>

<template>
<div class="login-container">
    <form @submit.prevent="handleLogin">
        <div>
            <label for="email">Email:</label>
            <input type="text"
                id="email"
                v-model="contact" />
        </div>
        <div>
            <label
                for="password">Password:</label>
            <input type="password"
                id="password"
                v-model="password" />
        </div>
        <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
</div>
</template>
