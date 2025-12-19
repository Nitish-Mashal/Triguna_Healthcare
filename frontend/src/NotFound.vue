<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">

        <!-- Content Section -->
        <div class="container text-center mt-[-80px] sm:mt-[-120px]">

            <!-- Error Code -->
            <div class="text-[120px] sm:text-[160px] font-extrabold bold-test-color leading-none">
                404
            </div>

            <!-- Title -->
            <div class="text-3xl sm:text-4xl font-semibold bold-test-color mt-2">
                Page Not Found
            </div>

            <!-- Description -->
            <p class="text-lg text-gray-600 mt-3 px-4 sm:px-0">
                The page you are looking for doesn't exist or has been moved.
            </p>

            <!-- Back to Home Button -->
            <router-link to="/"
                class="inline-block mt-6 bg-darkblue test-bold-color px-6 py-3 rounded-lg font-medium no-underline hover:bg-darkblue">
                Go Back to Home
            </router-link>
        </div>
    </div>
</template>
