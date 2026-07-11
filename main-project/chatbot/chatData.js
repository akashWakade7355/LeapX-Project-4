

        const chatbotResponses = [

{
    keywords: ["hello", "hi", "hey"],
    response: "👋 Hello! Welcome to Seed. How can I help you today?"
},

{
    keywords: ["tech", "technology", "coding", "developer"],
    response: `💻 Upcoming Tech Events

• The Apache Iceberg Edition(18 july 2026)
• EVM Capital Hackathon(20 july 2026)
• Unwind Bangluru(1 Augest 2026)
• Github Constellation(11 Augest 2026)

Visit the Events page to register.`
},

{
    keywords: ["music", "concert", "dj", "band"],
    response: `🎵 Music Events

• Niladri Kumaar EKKA Tour(25 July 2026)
• Papon Live in Concert(1 Augest 2026)
• Sufi Social Qawwali Night(12 July 2026)
• Lucky Ali – Live in Concert(30 July 2026)`
},

{
    keywords: ["sports", "game", "tournament"],
    response: `🏆 Sports Events

• 🏃 Bangalore Sports Carnival(throughtout july)
• 🚴 Bangalore Bicycle Championships(19 July)
• ⚽ Happy Streets – Whitefield(july 17)
• 🏃 Bangalore Ultra 2026(1 Augest)`
},

{
    keywords: ["workshop", "training", "session"],
    response: `🛠 Upcoming Workshops

🛠️ Upcoming Workshops in Bengaluru

• 🎨 Kintsugi Workshop (11 July onwards)
• 🏺 Sip & Clay Workshop (12 July)
• 🎨 Sip & Paint Workshop (Every Saturday & Sunday)
• 🍣 Sushi Making Workshop (18 July)
• 🧶 Crochet Workshop (20 July)
• 🤖 Mad Labs – Science & Innovation Workshop (11–15 July)
• 🧲 DIY Craft & Fridge Magnet Workshop (26 July)`
},

{
    keywords: ["weekend", "saturday", "sunday"],
    response: `📅 Weekend Events

• 🎭 Nrutya Rangoli 2026 – Classical Dance Festival (10–12 July)
• 🚴 Happy Streets – Whitefield (17 July)
• 🎨 Sip & Paint Workshop (Every Saturday & Sunday)
• 🎵 Candlelight Concert – Tribute to Arijit Singh (25 July)
• 🎤 Stand-up Comedy Night – Koramangala (Every Weekend)
• 🏺 Sip & Clay Pottery Workshop (Every Weekend)
• 🌿 Sunday Farmers & Flea Market (Every Sunday)`
},

{
    keywords: ["hackathon", "coding competition", "buildathon"],
    response: `💡 Upcoming Hackathons

• 🤖 Snapdragon Multiverse Hackathon (11–12 July)
• 🧠 Techathon Nationals & Rover Summit (18–19 July)
• 🏆 Industry Hackathon 2026 – BMS College of Engineering (24 July)
• 🌐 Zerve Hackathon 2026 (26 July)
• 🚀 HackerEarth Hiring Radar Hackathon (Throughout July)
• 💡 AI Build with Google – Vibe Coding Hackathon (Throughout July)`
},

{
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "genai"],
    response: `🤖 AI Events

• Google AI Builders Meetup (16 July)
• GenAI Developer Workshop (21 July)
• LLM Bootcamp Bengaluru (27 July)
• AI Innovation Summit (3 August)`
},

{
    keywords: ["startup", "founder", "entrepreneur", "business"],
    response: `🚀 Startup Events

• Startup Mixer Bengaluru (15 July)
• Founder Networking Night (22 July)
• Pitch Fest 2026 (29 July)
• Startup Demo Day (5 August)`
},

{
    keywords: ["register", "registration", "join", "book"],
    response: `📝 To register:

1. Open the Events page.
2. Select your event.
3. Click "Register Now".
4. Fill in your details.
5. Confirm your registration.`
},


{
    keywords: ["blockchain", "web3", "crypto"],
    response: `⛓️ Blockchain Events

• Web3 Bengaluru Meetup (13 July)
• Solidity Bootcamp (20 July)
• Ethereum Builders Meetup (27 July)
• Crypto Community Meetup (2 August)`
},

{
    keywords: ["cybersecurity", "security", "hacking"],
    response: `🔐 Cybersecurity Events

• Ethical Hacking Workshop (17 July)
• Capture The Flag Challenge (24 July)
• Cyber Security Summit (31 July)
• Bug Bounty Meetup (8 August)`
},

{
    keywords: ["design", "ui", "ux", "figma"],
    response: `🎨 Design Events

• Figma Community Meetup (12 July)
• UI/UX Design Workshop (19 July)
• Product Design Bootcamp (26 July)
• Design Thinking Session (2 August)`
},

{
    keywords: ["cloud", "aws", "azure", "gcp", "devops"],
    response: `☁️ Cloud & DevOps Events

• AWS User Group Meetup (18 July)
• Azure Developer Day (23 July)
• Google Cloud Study Jam (29 July)
• Kubernetes Workshop (6 August)`
},


{
    keywords: ["parking", "car", "bike"],
    response: `🅿️ Parking Information

Most venues provide:
• Car Parking
• Bike Parking
• Paid Parking (at selected venues)

Please check the venue details before arriving.`
},

{
    keywords: ["free", "price", "fees", "cost", "paid"],
    response: `💰 Event Pricing

• Many community events are FREE.
• Premium workshops may require registration fees.
• Check the event details for exact pricing.`
},

{
    keywords: ["location", "venue", "address", "where"],
    response: `📍 Event venues are displayed on every event page.

You can also open the location directly in Google Maps from the event details.`
},

{
    keywords: ["food", "snacks", "lunch", "refreshments"],
    response: `🍕 Food Information

Some events provide:
• Lunch
• Snacks
• Tea/Coffee

Please check the event description for details.`
},

{
    keywords: ["certificate", "certificates"],
    response: `🏅 Yes! Many workshops, hackathons, and bootcamps provide participation certificates after successful attendance.`
},

{
    keywords: ["networking", "meet", "community"],
    response: `🤝 Networking Events

Meet:
• Developers
• Founders
• Designers
• Students
• Recruiters

Great opportunity to build your professional network!`
},

{
    keywords: ["contact", "support", "help"],
    response: `📞 Need Help?

Email: support@seed.com
Phone: +91 98765 43210

Our support team will be happy to assist you.`
},

{
    keywords: ["bye", "goodbye", "see you"],
    response: "👋 Thank you for visiting Seed! Have a wonderful day. See you at our next event! 😊"

},

{
    keywords: ["sponsor", "partner"],
    response: `🤝 Our Event Partners

• Google Developers
• GitHub
• Microsoft
• AWS User Group
• NVIDIA Community
• Startup Karnataka`
},

{
    keywords: ["swag", "goodies", "tshirt", "stickers"],
    response: `🎁 Event Goodies

Many events offer:
• T-Shirts
• Stickers
• Notebooks
• Swag Kits
• Sponsor Gifts`
},

];