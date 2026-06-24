import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'https://www.trigunahealthcare.com';
const API_BASE_URL = process.env.SITEMAP_API_BASE_URL || SITE_URL;
const ROUTER_FILE = path.resolve(new URL('../src/router.js', import.meta.url).pathname);
const OUTPUT_FILE = path.resolve(new URL('../public/sitemap.xml', import.meta.url).pathname);
const EXCLUDE_PATHS = ['/not-found'];

const CITIES = [
    'Agra', 'Ahmedabad', 'Aligarh', 'Bareilly', 'Bengaluru', 'Bhopal',
    'Bhubaneswar', 'Bilaspur', 'Chennai', 'Chhattisgarh', 'Coimbatore',
    'Dadar', 'Delhi', 'Dhanbad', 'Ernakulam', 'Faridabad', 'Ghaziabad',
    'Goa', 'Gonda', 'Greater Noida', 'Gurgaon', 'Gwalior', 'Hyderabad',
    'Indore', 'Jabalpur', 'Jaipur', 'Jamshedpur', 'Jhansi', 'Jodhpur',
    'Kalyan', 'Kerala', 'Kochi', 'Kolkata', 'Kota', 'Lucknow', 'Ludhiana',
    'Mangalore', 'Mulund', 'Mumbai', 'Navi Mumbai', 'Nizamabad', 'Noida',
    'Panaji', 'Patiala', 'Patna', 'Pune', 'Rajkot', 'Ranchi', 'Ratnagiri',
    'South Delhi', 'Surat', 'Tirupati', 'Udaipur', 'Varanasi',
    'Venkateswara Nagar', 'Vijayawada', 'Visakhapatnam', 'West Bengal', 'West Delhi',
];

function priorityForRoute(route) {
    if (route === '/') return '1.00';
    if (route === '/blog') return '0.80';
    if (route.includes('/book/') || route.includes('health-checkups') || route.includes('full-body-health-checkups')) return '0.90';
    if (route.includes('Careers') || route.includes('ApplyJob')) return '0.70';
    if (route.includes('terms') || route.includes('privacy')) return '0.50';
    if (route === '/CartPage') return '0.50';
    if (route === '/thank-you') return '0.40';
    return '0.70';
}

function changefreqForRoute(route) {
    if (route === '/') return 'daily';
    if (route === '/blog') return 'weekly';
    if (route.includes('/book/') || route.includes('health-checkups') || route.includes('full-body-health-checkups')) return 'weekly';
    if (route.includes('Careers') || route.includes('ApplyJob') || route.includes('contact-us') || route.includes('about-us') || route.includes('FAQs')) return 'monthly';
    if (route.includes('terms') || route.includes('privacy')) return 'yearly';
    return 'monthly';
}

function normalizeRoute(route) {
    return route.replace(/\/+/g, '/');
}

function normalizeSlug(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function fetchJson(url) {
    try {
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
            console.warn(`Warning: failed to fetch ${url}: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn(`Warning: unable to fetch ${url}:`, error.message || error);
        return null;
    }
}

async function fetchCategorySlugs() {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/method/bloodtestnearme.api.package_category.get_active_package_categories`;
    const data = await fetchJson(url);
    const categories = data?.message?.data || data?.data || [];

    return Array.isArray(categories)
        ? categories.map((category) => {
            const urlSlug = category.url && category.url !== 'null' ? String(category.url) : null;
            return normalizeSlug(urlSlug || category.name);
        }).filter(Boolean)
        : [];
}

async function fetchBlogSlugs() {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/method/bloodtestnearme.api.blogs.get_blogs`;
    const data = await fetchJson(url);
    const blogs = data?.message || [];

    return Array.isArray(blogs)
        ? blogs.map((blog) => normalizeSlug(blog.url || blog.name)).filter(Boolean)
        : [];
}

async function fetchPackageSlugs() {
    const endpoints = [
        '/api/method/bloodtestnearme.api.packages.get_package_based_tests',
        '/api/method/bloodtestnearme.api.packages.get_individual_packages',
    ];

    const slugs = new Set();
    for (const endpoint of endpoints) {
        const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`;
        const data = await fetchJson(url);
        const packages = data?.message?.data || data?.message || data?.data || [];
        if (!Array.isArray(packages)) continue;

        for (const pkg of packages) {
            const candidate = pkg.url || pkg.name1 || pkg.name || pkg.package_name;
            const slug = normalizeSlug(candidate);
            if (slug) slugs.add(slug);
        }
    }

    return Array.from(slugs);
}

async function fetchAddressSlugs() {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/method/bloodtestnearme.api.testcenter_address.get_test_center`;
    const data = await fetchJson(url);
    const locations = data?.message?.data || [];

    return Array.isArray(locations)
        ? locations.map((item) => normalizeSlug(item.url)).filter(Boolean)
        : [];
}

async function main() {
    const routerSource = await fs.readFile(ROUTER_FILE, 'utf8');
    const routeRegex = /path\s*:\s*['"]([^'"]+)['"]/g;
    const routes = [];
    let match;

    while ((match = routeRegex.exec(routerSource)) !== null) {
        const routePath = normalizeRoute(match[1]);
        if (!routePath || routePath.includes(':') || routePath.includes('*') || EXCLUDE_PATHS.includes(routePath)) {
            continue;
        }
        routes.push(routePath);
    }

    const uniqueRoutes = new Set(routes);
    uniqueRoutes.add('/');

    const cityRoutes = CITIES.map((city) => `/city/${normalizeSlug(city)}`);
    cityRoutes.forEach((route) => uniqueRoutes.add(route));

    const [categorySlugs, blogSlugs, packageSlugs, addressSlugs] = await Promise.all([
        fetchCategorySlugs(),
        fetchBlogSlugs(),
        fetchPackageSlugs(),
        fetchAddressSlugs(),
    ]);

    categorySlugs.forEach((slug) => uniqueRoutes.add(`/full-body-health-checkups/${slug}`));
    blogSlugs.forEach((slug) => uniqueRoutes.add(`/blogdetails/${slug}`));
    packageSlugs.forEach((slug) => {
        uniqueRoutes.add(`/${slug}`);
        uniqueRoutes.add(`/book/${slug}`);
    });
    addressSlugs.forEach((slug) => uniqueRoutes.add(`/address/${slug}`));

    const sortedRoutes = Array.from(uniqueRoutes).sort((a, b) => {
        if (a === '/') return -1;
        if (b === '/') return 1;
        return a.localeCompare(b);
    });

    const urlEntries = sortedRoutes.map((route) => {
        const loc = `${SITE_URL}${route}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreqForRoute(route)}</changefreq>\n    <priority>${priorityForRoute(route)}</priority>\n  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`;
    await fs.writeFile(OUTPUT_FILE, sitemap, 'utf8');
    console.log(`Generated sitemap at ${OUTPUT_FILE}`);
}

main().catch((error) => {
    console.error('Failed to generate sitemap:', error);
    process.exit(1);
});
