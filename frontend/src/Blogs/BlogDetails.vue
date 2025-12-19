<template>
    <div class=" py-10 px-5">

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20 text-gray-500 text-lg">
            Loading blog details...
        </div>

        <!-- Blog Details -->
        <div v-else-if="blog" class="max-w-6xl mx-auto mb-12">

            <!-- Header Image -->
            <img v-if="blog.header_image" :src="blog.header_image" alt="Blog Image"
                class="w-full h-96 object-cover rounded-lg mb-6" loading="lazy" />

            <!-- Description Headings & Content -->
            <div v-for="(heading, index) in descriptionHeadings" :key="index">
                <h2 v-if="heading" class="text-2xl font-bold text-gray-800 mb-3">
                    {{ heading }}
                </h2>
                <p v-if="descriptions[index]" class="text-gray-700 text-lg leading-relaxed"
                    v-html="descriptions[index]"></p>
            </div>

            <!-- Custom HTML -->
            <div v-if="blog.custom_html" v-html="blog.custom_html"></div>

        </div>

        <!-- Fallback if no blog found -->
        <div v-else class="text-center text-gray-500 py-20">
            Blog not found.
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
    name: "BlogDetails",
    data() {
        return {
            blog: null,
            isLoading: true,
            descriptionHeadings: [],
            descriptions: []
        }
    },
    setup() {
        const route = useRoute()
        return { route }
    },
    mounted() {
        this.fetchBlogDetails()
    },
    methods: {
        async fetchBlogDetails() {
            const blogName = this.route.query.name
            if (!blogName) {
                this.isLoading = false
                return
            }

            try {
                const res = await axios.get('/api/method/bloodtestnearme.api.blogs.get_blog', {
                    params: { blog_name: blogName }
                })
                this.blog = res.data.message || null

                if (this.blog) {
                    // dynamically collect headings and descriptions
                    this.descriptionHeadings = []
                    this.descriptions = []

                    for (let i = 1; i <= 4; i++) {
                        const heading = this.blog[`description_heading_${i}`]
                        const desc = this.blog[`description_${i}`]
                        if (heading || desc) {
                            this.descriptionHeadings.push(heading || '')
                            this.descriptions.push(desc || '')
                        }
                    }
                }
            } catch (err) {
                console.error('Error fetching blog details:', err)
                this.blog = null
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
