import { Layout, Zap, Code2, Headset, Puzzle, Palette, Search, Gauge, Bot, ShieldCheck, Sparkles, Globe, Activity } from "lucide-react";
import { Experience, Tool, Project, Service, Testimonial, FAQItem, BlogPost } from "@/types/portfolio";

export const vibes = [
    { name: "Professional", color: "#108a00", secondaryColor: "#56AB2F", icon: ShieldCheck, label: "Trust & Growth" },
    { name: "Creative", color: "#000000", secondaryColor: "#334155", icon: Palette, label: "Innovation & Design" },
    { name: "Premium", color: "#f06431", secondaryColor: "#fbbf24", icon: Sparkles, label: "Excellence & Quality" },
    { name: "Visionary", color: "#2563eb", secondaryColor: "#7dd3fc", icon: Globe, label: "Global Reach" },
    { name: "Modern", color: "#854836", secondaryColor: "#d97706", icon: Activity, label: "Dynamic & Bold" }
];

export const experiences: Experience[] = [
    { year: "2018-2022", company: "24task", role: "Virtual Assistant", logo: "/images/24Task.png" },
    { year: "2022-2024", company: "MTC", role: "Data Analyst", logo: "/images/MTC.jpg" },
    { year: "2019-2021", company: "Techloq Filter", role: "Administrative VA", logo: "/images/Techloq.png" },
    { year: "2019-2022", company: "RedLineCoin", role: "Web & Mobile QA Tester", logo: "/images/Redline.jpg" },
    { year: "2023-Present", company: "Freelancer", role: "WordPress Developer", logo: "/images/Elementor-Logo-Symbol-Red.svg" },
    { year: "2026", company: "Vibe Coding", role: "Noob Vibe Coder", logo: "/images/GAG.webp" },
];

export const tools: Tool[] = [
    { name: "Figma", logo: "/images/Figma-logo.svg" },
    { name: "Wordpress", logo: "/images/WPLOGO.svg" },
    { name: "GHL", logo: "/images/GHL Logo.svg" },
    { name: "Elementor", logo: "/images/Elementor-Logo-Symbol-Red.svg" },
    { name: "Antigravity", logo: "/images/G-AG.svg" },
    { name: "GA4", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
];

export const projects: Project[] = [
    {
        title: "Jets Fan Cruise",
        category: "Web Development",
        image: "/images/Jets-Fan-Cruise.png",

    },
    {
        title: "Consult with Che",
        category: "Web Development",
        image: "/images/consultwithche-com-Homelessness.webp",

    },
    {
        title: "Ichiban Go",
        category: "Web Development",
        image: "/images/IchibanGO.png",
    },
    {
        title: "Health Optimization GT3",
        category: "Web Development",
        image: "/images/GT3Health.png",

    },
    {
        title: "Evident Elements",
        category: "Web Development",
        image: "/images/EvidentElements.png",
    },
    {
        title: "ForeverLawn Central Florida",
        category: "Web Development",
        image: "/images/Foreverlawn.png",
    },
    {
        title: "K9 Grass Synthetic Turf",
        category: "Landing Page",
        image: "/images/K9Grass FLCL.png",
    },
    {
        title: "Winning Tax Strategies",
        category: "Mockup Development",
        image: "/images/WinningTaxStrategies.png",

    },
    {
        title: "Landscape Synthetic Turf",
        category: "Landing Page",
        image: "/images/Landspace Synthetic Turf.png",

    },
    {
        title: "Dr. Precious Diaz",
        category: "Web Development",
        image: "/images/Precious Diaz.png",

    },
    {
        title: "Techloq",
        category: "Virtual Assistant",
        image: "/images/Techloq-Filter.png",

    },
    {
        title: "24Task",
        category: "Virtual Assistant",
        image: "/images/24task-Va.png",

    },
];

export const services: Service[] = [
    { title: "WordPress &\nElementor", icon: Layout },
    { title: "GHL\nSpecialist", icon: Zap },
    { title: "Web\nDevelopment", icon: Code2 },
    { title: "Virtual\nAssistant", icon: Headset },
    { title: "Marketing\nIntegrations", icon: Puzzle },
];

export const stats = [
    { label: "Years of Experience", value: "4+" },
    { label: "Project Completed", value: "50+" },
    { label: "Happy Clients", value: "20+" },
];

export const brands = [

    { name: "Elementor", logo: "/images/Elementor-Logo-Symbol-Red.svg" },
    { name: "Figma", logo: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
    { name: "Wordpress", logo: "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg" },
    { name: "Antigravity", logo: "/images/G-AG.svg" },
    { name: "Slack", logo: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg" },
    { name: "HubSpot", logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg" },
    { name: "GHL", logo: "/images/GHL Logo.svg" },
    { name: "Google Analytics", logo: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" },
    { name: "Google Tag Manager", logo: "/images/GTM.svg" },
    { name: "Microsoft Clarity", logo: "/images/MS CLARITY.svg" },
    { name: "Cloudways", logo: "/images/Cloudways_Logo.svg" },
    { name: "ClickUp", logo: "/images/ClickUp.svg" },



];

export const testimonials: Testimonial[] = [
    {
        rating: 5,
        quote: "I am genuinely grateful for having been recommended to WebCornerstone by a trusted colleague. I required a professional website to be developed very quickly,",
        name: "Mark P. Smith",
        role: "Owner, MPS & Associates, LLC",


    },
    {
        rating: 5,
        quote: "I've worked with dozens of developers over 15 years, but Paul truly stands out. He delivers top-notch WordPress solutions on time, on budget, and with impressive results.",
        name: "David Chen",
        role: "Founder & CEO",

    },
    {
        rating: 5,
        quote: "Paul is a great developer. He is very skilled with Elementor. He understood the design quickly and executed it perfectly.",
        name: "Michael Johnson",
        role: "CEO",

    },
    {
        rating: 5,
        quote: "Great communication and fast turnaround. My website is now optimized and running smoothly.",
        name: "James Wilson",
        role: "CEO",

    },
    {
        rating: 5,
        quote: "Helped us fix several WordPress issues and improved our site speed. Reliable and efficient.",
        name: "Robert Brown",
        role: "Operations Manager",

    },
    {
        rating: 5,
        quote: "Set up our pages in Elementor beautifully. Everything is responsive and looks great on mobile.",
        name: "Jessica Lee",
        role: "Marketing Manager",

    },
    {
        rating: 5,
        quote: "Professional, detail-oriented, and easy to work with. Also helped with admin tasks beyond the website.",
        name: "Daniel Brooks",
        role: "Startup Founder",

    },
    {
        rating: 5,
        quote: "Handled our website updates and integrations without any problems. Smooth experience from start to finish.",
        name: "Olivia Martinez",
        role: "Startup Founder",

    },
    {
        rating: 5,
        quote: "Very dependable virtual assistant with strong technical skills in WordPress and website management.",
        name: "Kevin Rodriguez",
        role: "Small Business Owner",

    }
];

export const marqueeItems = [
    "Fast, Reliable Websites⚡",
    "Crafting Digital Experiences🎨",
    "Available For Hire🚀",
    "Smart Integrations🌟",
    "Modern Web Design✨",
];

export const faqs: FAQItem[] = [
    {
        question: "What services do you offer?",
        answer: "I build and optimize WordPress websites using Elementor, set up GoHighLevel (GHL) workflows, and handle marketing and CRM integrations to help businesses generate and manage leads."
    },
    {
        question: "What is your typical project timeline?",
        answer: "Timelines depend on the scope. A standard WordPress or Elementor site usually takes 2–4 weeks, while GoHighLevel setup and marketing integrations typically take 1–3 weeks."
    },
    {
        question: "How much do your services cost?",
        answer: "Pricing depends on project requirements, features, and integrations. After a short discussion, I provide a clear, fixed-price quote or hourly estimate—no hidden costs."
    },
    {
        question: "Do you work with existing WordPress websites?",
        answer: "Yes. I can redesign, optimize, fix issues, or add new features to existing WordPress and Elementor websites."
    },
    {
        question: "What GoHighLevel services do you provide?",
        answer: "I handle CRM pipelines, email and SMS workflows, calendar booking, lead capture forms, and automation for follow-ups."
    },
    {
        question: "Can you integrate marketing tools and third-party services?",
        answer: "Yes. I integrate email platforms, CRMs, forms, analytics tools, calendars, and other marketing tools to ensure smooth data flow and automation."
    },
    {
        question: "Will my website be mobile-friendly?",
        answer: "Absolutely. All WordPress and Elementor websites I build or update are fully responsive and optimized for mobile, tablet, and desktop devices."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes. I provide 30 days of post-launch support to fix issues and ensure everything runs smoothly. Ongoing maintenance is also available."
    },
    {
        question: "How do we get started?",
        answer: "You can <a href='https://calendly.com/paulpuzon0007/30min' target='_blank' rel='noopener noreferrer'>book a call</a> or <a href='/contact' rel='noopener noreferrer'>send a message</a> with your project details. I’ll review your requirements and provide a clear plan and timeline within 24–48 hours."
    }

];

export const fullServices: Service[] = [
    { title: "WordPress &\nElementor", icon: Layout },
    { title: "GHL\nSpecialist", icon: Zap },
    { title: "Web\nDevelopment", icon: Code2 },
    { title: "Virtual\nAssistant", icon: Headset },
    { title: "Marketing\nIntegrations", icon: Puzzle },
    { title: "SEO\nOptimization", icon: Search },
    { title: "Speed\nOptimization", icon: Gauge },
    { title: "CRM\nAutomation", icon: Bot },
];

export const blogPosts: BlogPost[] = [
    {
        title: "Seamless Power: How to Integrate GoHighLevel with WordPress & Elementor",
        excerpt: "Stop manual lead entry! Learn the exact steps to sync your Elementor forms with GHL CRM for automated follow-ups that convert.",
        date: "Feb 15, 2026",
        category: "GHL",
        image: "/images/blog/GHL.webp",
        slug: "ghl-wordpress-elementor-integration",
        content: `
            <div class="space-y-6">
                <p>Scaling a business requires efficiency, and nothing kills efficiency faster than manual data entry. If you're using WordPress and Elementor to capture leads but still manually copying them into your CRM, you're losing time and potentially losing sales. In today's hyper-competitive digital landscape, the speed of lead response is often the difference between a closed deal and a missed opportunity.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Why Integrate GHL with WordPress?</h2>
                <p>GoHighLevel (GHL) is an all-in-one marketing platform that excels at lead management and automation. By connecting it directly to your Elementor forms, you ensure every lead is captured instantly and entered into a nurture sequence without you lifting a finger. This integration isn't just a technical upgrade; it's a strategic shift that allows your sales team to focus on high-value conversations rather than administrative chores.</p>

                <p>Imagine a scenario where a potential client fills out a contact form at 2 AM. Without automation, that lead sits in your inbox until morning. With a GHL-Elementor integration, that lead receives an immediate text message acknowledging their inquiry and offering a link to book a consultation. By the time you wake up, the meeting is already on your calendar.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">The Technical Anatomy of the Integration</h2>
                <p>The beauty of the WordPress ecosystem, specifically when using Elementor Pro, is its flexibility. You don't need expensive third-party connectors like Zapier to bridge the gap between your site and your CRM. We can use native webhooks to move data securely and instantaneously.</p>

                <h3 class="text-xl font-bold text-foreground mt-6">1. Setting Up the Webhook in Elementor</h3>
                <p>In your Elementor Form settings, navigate to the 'Actions After Submit' section. Remove the default 'Email' action and add 'Webhook'. This generates a new field where you'll paste the target URL provided by GHL. This direct connection minimizes latency and reduces the potential for data loss that can occur with multi-step middleware.</p>
                
                <h3 class="text-xl font-bold text-foreground mt-6">2. Creating the GHL Triggered Workflow</h3>
                <p>Inside GoHighLevel, you'll create a new Automation Workflow. The trigger for this workflow will be the 'Inbound Webhook'. Once GHL receives a sample submission from your Elementor form, you can map the custom fields (Name, Email, Phone, Project Details) to the corresponding contact fields in GHL. This ensures that every piece of information provided by the user is preserved and indexed correctly.</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">Pro Tip: Custom Field Mapping</h4>
                    <p class="text-sm">Don't just collect names and emails. Use Elementor's hidden fields to pass through UTM parameters (Source, Medium, Campaign). This allows you to track exactly which marketing efforts are driving your highest-quality leads within GHL.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">Real-World Results: Automation in Action</h2>
                <p>One of my clients, a large SaaS provider, was struggling with a 12-hour average response time. After implementing this direct integration combined with a 'Missed Call Text-Back' workflow, their response time dropped to under 2 minutes. The result? A 35% increase in lead-to-consultation conversion rates within the first 30 days.</p>
                
                <p>By eliminating the friction between your website and your CRM, you create a seamless experience for the user and a high-performance environment for your business. It's time to stop working for your tools and start making your tools work for you.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: The Path Forward</h2>
                <p>The integration of GoHighLevel and WordPress represents the pinnacle of modern business automation. It combines the world-class design capabilities of Elementor with the robust backend logic of a enterprise-grade CRM. Whether you're a solopreneur or a growing agency, this setup provides the professional foundation needed to compete at the highest level.</p>
            </div>
        `
    },
    {
        title: "The 2026 WordPress SEO Checklist: Outranking Competitors with Ease",
        excerpt: "Technical SEO is evolving. From Core Web Vitals to AI-friendly schema, here's everything you need to keep your WordPress site at the top.",
        date: "Feb 12, 2026",
        category: "SEO",
        image: "/images/blog/seo-search-engine-optimization.webp",
        slug: "wordpress-seo-checklist-2026",
        content: `
            <div class="space-y-6">
                <p>SEO in 2026 isn't just about keywords anymore. It's about User Experience (UX), Page Speed, and Search Generative Experience (SGE) optimization. If your WordPress site isn't technically sound, you're invisible to both search engines and potential customers. As AI-powered search engines become the primary way users find information, the bar for technical excellence has moved significantly higher.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">1. Mastering Core Web Vitals (The INP Era)</h2>
                <p>Google's performance metrics are stricter than ever. While LCP (Largest Contentful Paint) remains important, the focus has shifted heavily toward <strong>INP (Interaction to Next Paint)</strong>. This metric measures your site's responsiveness to user actions. A site that looks fast but feels laggy when a user clicks a button will be penalized in the rankings.</p>
                
                <p>To optimize for INP, we must minimize main-thread work. This means auditing your "Vibe" toggles and animations to ensure they are offloaded to the GPU whenever possible. Using lightweight themes like Hello Elementor or Astra, combined with a robust caching strategy (WP Rocket or NitroPack), is no longer optional—it's the baseline for survival.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">2. AI-Ready Schema Markup (JSON-LD)</h2>
                <p>To appear in the coveted AI-driven search results (SGE), your schema markup must be flawless. JSON-LD is the language of search robots. We use it to clearly define your services, your location, and most importantly, your expertise (E-E-A-T).</p>

                <p>In 2026, Google uses schema to verify the 'Who, What, and Why' of your content. By implementing detailed Organization and Person schema, we link your content to verified profiles across the web, proving to search engines that the information you're providing is trustworthy and authored by a human expert.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">3. Semantic Content Strategy: Pillar and Cluster Models</h2>
                <p>Stop writing for robots. Write for clusters. Semantic SEO is about context. Instead of targeting a single keyword like "WordPress developer," we build a foundation around the pillar of "Professional WordPress Development" and support it with clusters like "Elementor Performance," "GHL Integration," and "Technical SEO for WordPress."</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">The Hidden Ranking Factor: Accessibility</h4>
                    <p class="text-sm">In 2026, web accessibility (WCAG 2.1) has become an indirect ranking signal. Search engines favor sites that are navigable by all users. Ensure your contrast ratios are high, your SVGs have titles, and your DOM structure is semantic. Good UX is good SEO.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">4. Mobile-First is Now Mobile-Only</h2>
                <p>If your site doesn't perform perfectly on a mid-range mobile device over a 4G connection, you've already lost. We optimize for the smallest screen first, using responsive image loading (srcset) and prioritizing the critical rendering path. Every kilobyte of JavaScript must earn its place on the page.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: Staying Ahead of the Curve</h2>
                <p>SEO is a moving target. What worked six months ago might be outdated today. By focusing on technical fundamentals, AI-readiness, and superior user experience, you don't just climb the rankings—you stay there. Your website is your most valuable digital asset; treat its SEO with the precision it deserves.</p>
            </div>
        `
    },
    {
        title: "Data-Driven Growth: Mastering GA4 and GTM for Your Business",
        excerpt: "If you can't measure it, you can't improve it. Discover how to set up advanced event tracking to understand exactly how users interact with your site.",
        date: "Feb 10, 2026",
        category: "Marketing",
        image: "/images/blog/gtm-vs-ga-2.webp",
        slug: "mastering-ga4-gtm-for-business",
        content: `
            <div class="space-y-6">
                <p>Most business owners have Google Analytics installed, but few actually use it to make decisions. Google Analytics 4 (GA4) paired with Google Tag Manager (GTM) is the gold standard for tracking user behavior. In an era where privacy laws like GDPR and CCPA are standard, having a first-party data strategy is the only way to ensure your marketing attribution remains accurate.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">The Shift to the Event-Based Model</h2>
                <p>Unlike old Universal Analytics, GA4 is built entirely on events. Every click, scroll, and form submission is an individual event. This shift allows for a much more granular view of the customer journey, but it also requires a mindset change. You're no longer tracking "Page Views"—you're tracking "User Engagement."</p>

                <p>By defining specific events that matter to your business (e.g., 'Viewed Pricing', 'Started Contact Form', 'Downloaded Portfolio'), you can create highly specialized Audiences in GA4. These audiences can then be exported to Google Ads for precision retargeting, ensuring your ad spend is only targeting people who have shown genuine interest in your services.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Why Google Tag Manager is Essential</h2>
                <p>GTM allows you to deploy tracking codes (pixels) without ever touching your website's source code. It acts as a bridge between your site and your marketing tools. This is crucial for two reasons: <strong>Speed</strong> and <strong>Maintenance</strong>.</p>
                
                <p>Injecting multiple scripts directly into your header slows down your site and hurts your SEO. GTM loads asynchronously, meaning it won't block the rendering of your page. Furthermore, having all your tags in one container (Facebook Pixel, LinkedIn Insight Tag, GA4, etc.) makes it incredibly easy to debug and update your tracking as your marketing stack grows.</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">Key Setup: Conversions vs. Events</h4>
                    <p class="text-sm">Not all events are created equal. In GA4, you should mark your most important events (like 'Form Submit') as 'Conversions'. This allows GA4 to prioritize this data in its machine-learning models, helping you identify exactly which traffic sources are delivering the highest ROI.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">Advanced Tracking: Enhanced Measurement</h2>
                <p>GA4 comes with 'Enhanced Measurement' out of the box, which catches basic actions like scrolls and outbound clicks. However, to truly master your data, we implement 'Custom Dimensions'. This allows us to track things like "User Role" or "Project Budget Category," providing a deeper layer of insight that goes beyond basic demographics.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: Data is Your Competitive Advantage</h2>
                <p>Marketing without data is just guessing. By mastering GA4 and GTM, you move from "I think this is working" to "I know exactly why this is working." This level of clarity allows you to scale your business with confidence, knowing that every dollar you spend on marketing is backed by hard evidence.</p>
            </div>
        `
    },
    {
        title: "Why Elementor is the Ultimate Secret Weapon for High-Converting Landing Pages",
        excerpt: "Speed meets design. See why Elementor remains the #1 choice for building professional, custom websites that load fast and look premium.",
        date: "Feb 08, 2026",
        category: "WordPress",
        image: "/images/blog/Landing Pages.webp",
        slug: "elementor-high-converting-landing-pages",
        content: `
            <div class="space-y-6">
                <p>In the world of WordPress, Elementor has changed the game. It allows for pixel-perfect design without the need for complex custom coding, which means faster development times and lower costs for business owners who need to move quickly. In 2026, the speed of deployment is just as important as the quality of the design, and Elementor strikes the perfect balance between the two.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Design Freedom Without Technical Debt</h2>
                <p>Traditional WordPress themes often lock you into a fixed layout, making it impossible to truly align your website with your brand identity without extensive (and expensive) CSS overrides. Elementor allows us to build every section of your site from scratch—Header, Footer, Single Posts, and custom Archives—using its powerful Theme Builder.</p>

                <p>This "blank canvas" approach means we can implement high-converting design patterns, such as the 'F-Pattern' or 'Z-Pattern' layouts, that are proven to guide a user's eyes toward your primary Call-to-Action (CTA). By controlling the visual weight of every element, we create a psychological path that leads the visitor from curiosity to conversion.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Optimizing for Speed: Debunking the Myths</h2>
                <p>A common myth in the developer community is that Elementor is inherently slow. While a poorly managed Elementor site can be bloated, a professionally developed one can achieve 90+ PageSpeed scores with ease. The secret lies in architectural discipline.</p>

                <p>We use 'Hello Elementor'—the lightest base theme available—and combine it with advanced optimization tools like Asset CleanUp to dequeue unnecessary scripts on a page-by-page basis. By only loading the JavaScript needed for that specific landing page, we ensure a lightweight footprint that keeps both Google and your users happy.</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">The Power of Dynamic Content</h4>
                    <p class="text-sm">Elementor Pro's real 'secret weapon' is its integration with Advanced Custom Fields (ACF). This allows us to create dynamic landing page templates that pull data from your backend. If you're running multiple variations of an ad campaign, we can use dynamic tags to swap out headlines and images based on the user's search query, significantly increasing relevance and lowering your CPA.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">Psychological Triggers and UI Design</h2>
                <p>A landing page isn't just a collection of blocks; it's a sales argument. Using Elementor's motion effects, we can implement subtle micro-animations that draw attention to key stats or social proof. These "delight" factors create a premium feel that builds trust and authority—essential components for high-ticket service providers.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: Invest in Conversions</h2>
                <p>Building a website is an expense; building a high-converting landing page is an investment. By leveraging the power of Elementor, we combine high-end aesthetics with technical performance to create a digital asset that doesn't just look pretty—it works. It's time to stop settling for 'good enough' and start demanding excellence from your web presence.</p>
            </div>
        `
    },
    {
        title: "Automate Your Sales: 5 GHL Workflows Every Service Business Needs",
        excerpt: "From missed call text-back to nurture sequences, discover the automations that turn cold traffic into loyal clients while you sleep.",
        date: "Feb 05, 2026",
        category: "GHL",
        image: "/images/blog/gohighlevel-workflow.webp",
        slug: "ghl-workflows-for-service-business",
        content: `
            <div class="space-y-6">
                <p>Automation isn't about replacing human connection; it's about ensuring no lead is ever neglected. In a world where the consumer expects instant gratification, GoHighLevel (GHL) workflows allow you to provide instant responses even when you're busy, asleep, or focused on delivering work for current clients. If you're a service provider, your speed of response is your strongest competitive advantage.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">1. The "Missed Call Text-Back" (The Revenue Saver)</h2>
                <p>Every missed call is a lost opportunity. Research shows that 80% of callers will not leave a voicemail; they simply call the next person on the list. GHL can automatically detect when you've missed a call and immediately send a text: <i>"Hey, it's Paul! Sorry I missed your call. I'm tied up with a client right now. How can I help?"</i> This simple text initiates a two-way conversation and stops the lead from calling your competitor.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">2. Multi-Step Appointment Reminders</h2>
                <p>No-shows are expensive. An automated sequence of reminders leading up to a consultation call can reduce your no-show rate by up to 50%. We implement a 24-hour, 1-hour, and 5-minute reminder sequence across both Email and SMS. Each message includes a link to reschedule, ensuring your time is only spent on leads who are ready to talk.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">3. The 7-Day Nurture Sequence</h2>
                <p>Not every lead is ready to buy today. Don't let them go cold. An automated nurture sequence provides value, establishes authority, and keeps your brand top-of-mind. Through a series of educational emails, you can address common objections, share case studies, and guide the prospect toward booking a call when the time is right for them.</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">Advanced Automation: Pipeline Stages</h4>
                    <p class="text-sm">GHL workflows can automatically move contacts through your sales pipeline based on their actions. For example, if a user clicks a link in your email to view your portfolio, GHL can 'Tag' them as a 'Hot Lead' and notify you to reach out personally. This level of intentionality ensures you're always focusing your energy on the highest-probability deals.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">4. Post-Purchase / Onboarding Automation</h2>
                <p>The customer experience shouldn't end at the sale. Once a lead becomes a client, automation can trigger your onboarding sequence—sending the initial contract, requesting necessary assets, and scheduling the kickoff call. This creates a professional, "white-glove" experience that sets the tone for the entire project.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: Scalability Through Systems</h2>
                <p>If your business relies on you manually following up with every lead, it's not a scalable business—it's a job. By implementing these 5 core GHL workflows, you build a system that manages the "boring" parts of sales, allowing you to focus on what you do best: providing world-class service to your clients. It's time to graduate from manual follow-ups to automated excellence.</p>
            </div>
        `
    },
    {
        title: "Beyond Clicks: Using Microsoft Clarity (MSC) to Fix User Friction",
        excerpt: "Watch your users in action. Learn how heatmaps and session recordings can reveal exactly where people get stuck on your website.",
        date: "Feb 02, 2026",
        category: "Marketing",
        image: "/images/blog/MS CLARITY.webp",
        slug: "using-microsoft-clarity-to-fix-ux",
        content: `
            <div class="space-y-6">
                <p>Quantitative data (like GA4) tells you <i>what</i> is happening on your site, but qualitative data (like Microsoft Clarity) tells you <i>why</i>. Microsoft Clarity (MSC) is a powerful, free tool that provides heatmaps and session recordings that are absolute game-changers for conversion rate optimization. If you've ever wondered why visitors are leaving your site without taking action, Clarity has the answers.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Heatmaps: Visualizing the User Journey</h2>
                <p>Heatmaps allow you to see exactly where users are clicking, moving their cursor, and how far they are scrolling. If you notice a high concentration of clicks on an element that isn't a link, you've identified a significant design flaw that is confusing your users. Similarly, scroll maps reveal if your most important information is buried too far down the page where only 10% of users ever see it.</p>
                
                <h2 class="text-2xl font-bold text-foreground mt-8">Dead Clicks, Rage Clicks, and Quick Backs</h2>
                <p>Clarity's true power lies in its ability to automatically flag behavioral patterns that indicate frustration. <strong>"Rage Clicks"</strong> occur when a user clicks repeatedly in the same area in a short period—usually because a button isn't working or the page feels frozen. <strong>"Dead Clicks"</strong> are clicks that have no effect on the page. By watching the session recordings associated with these flags, you can find and fix bugs in your UI in minutes rather than days.</p>

                <div class="my-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 class="text-lg font-bold text-primary mb-2">CRO Tip: The "Quick Back" Metric</h4>
                    <p class="text-sm">A "Quick Back" happens when a user navigates to a page and then immediately returns to the previous one. This usually indicates a mismatch between the user's expectation (based on the link they clicked) and the reality of the landing page. Clarity allows you to filter recordings by this metric, helping you fix your messaging and improve your conversion rates.</p>
                </div>

                <h2 class="text-2xl font-bold text-foreground mt-8">Session Recordings: Being the "Fly on the Wall"</h2>
                <p>Watching playback of real user sessions is the closest thing to conducting an in-person usability test. You can see where users hesitate, where they get confused by navigation, and exactly what happens right before they drop off. This insights-driven approach eliminates the guesswork from web design. You're no longer making changes based on "I like this color"—you're making changes based on "I saw users ignore this section."</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Privacy-First Insights</h2>
                <p>One of the best things about Microsoft Clarity is that it's designed with privacy in mind. It automatically masks sensitive data, making it compliant with global privacy standards while still providing you with the deep insights you need to improve your website's performance.</p>

                <h2 class="text-2xl font-bold text-foreground mt-8">Conclusion: From Guesswork to Execution</h2>
                <p>In the competitive world of digital marketing, the businesses that win are the ones that understand their users best. Microsoft Clarity provides the "eyes" you need to see your website from your customer's perspective. By identifying and removing points of friction, you create a smoother path to conversion and a more profitable digital presence.</p>
            </div>
        `
    }
];
