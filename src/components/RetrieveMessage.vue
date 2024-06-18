<template>
    <div class="container py-3 my-8 bg-white rounded-xl shadow-lg">
        <p class="text-2xl text-primary font-bold">Retrieve all messages </p>
        <div class="grid grid-cols-4 gap-4 mt-4">
            <button @click="retrieveAll" class="bg-secondary py-1 rounded-md text-white">Retrieve All</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

let token = localStorage.getItem('browserToken');
if (!token) {
    token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    localStorage.setItem('browserToken', token);
}

const toast = useToast();

const retrieveAll = async () => {
    const response = await fetch(`http://localhost:8080/api/finishedItems/${token}`);
    const data = await response.json();

    if (data && data.length > 0) {
        data.forEach(({ event, source, location, wasSuccessful }) => {
            const message = `Event: ${event}, Source: ${source}, Location: ${location}, Successful: ${wasSuccessful}`;
            if (wasSuccessful) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
    } else {
        toast.error('No data received');
    }
};
</script>