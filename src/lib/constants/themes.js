export const THEMES = [
    {
        id: 1,
        title: "Laavan",
        themeName: "sikh1",
        category: "Sikh Wedding",
        description: "A graceful and spiritual design inspired by Anand Karaj traditions, featuring elegant tones and sacred aesthetics perfect for a Sikh wedding.",
        image: "/templates/sikh/preview.png",
        demoUrl: "s/gurpreet-weds-simran-dc8",
    },
    {
        id: 2,
        title: "Royal Palace",
        themeName: "hindu1",
        category: "Hindu Wedding",
        description: "A luxurious palace-inspired theme with royal architecture, grand aesthetics and rich colors for a majestic wedding celebration.",
        image: "/templates/sikh/invite2.png",
        demoUrl: "/r/hindu1",
    },
    {
        id: 3,
        title: "Temple Divine",
        themeName: "hindu2",
        category: "Hindu Wedding",
        description: "A sacred temple-inspired design with traditional elements and divine vibes, perfect for a spiritually rich wedding experience.",
        image: "/templates/sikh/invite3.png",
        demoUrl: "/t/hindu2",
    },
    {
        id: 4,
        title: "Floral Elegance",
        themeName: "hindu3",
        category: "Hindu Wedding",
        description: "A soft and beautiful floral theme inspired by nature, bringing freshness and elegance to your wedding invitation.",
        image: "/templates/sikh/invite5.png",
        demoUrl: "/f/hindu3",
    },
    {
        id: 5,
        title: "Guruji Satsang",
        themeName: "guruji1",
        category: "Guruji Satsang",
        description: "A calm and devotional design crafted for Guruji Satsang invitations, reflecting peace, spirituality and simplicity.",
        image: "/templates/sikh/invite4.png",
        demoUrl: "/g/guruji1",
    },
];

export const getThemeByThemeName = (themeName) => THEMES.find(t => t.themeName === themeName);
