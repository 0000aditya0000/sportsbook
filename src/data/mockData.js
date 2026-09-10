export const INITIAL_DATA = {
  cricket: [
    {
      id: "crick-1",
      sport: "cricket",
      league: "Asia Cup T20 Super 4",
      team1: "England",
      team2: "Pakistan",
      time: "Today 3:30 PM",
      isLive: true,
      hasLiveTracker: true,
      badges: ["MO", "BM", "F", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.02, backVol: "2.95M", lay: 1.03, layVol: "2.84M" },
        draw: { back: 460.00, backVol: "91K", lay: 500.00, layVol: "9K" },
        team2: { back: 38.00, backVol: "34K", lay: 40.00, layVol: "58K" }
      }
    },
    {
      id: "crick-2",
      sport: "cricket",
      league: "Women's T20 Championship",
      team1: "India W",
      team2: "Bangladesh W",
      time: "Today 8:00 PM",
      isLive: true,
      hasLiveTracker: true,
      badges: ["MO", "BM", "F", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.05, backVol: "4.37M", lay: 1.06, layVol: "1.51M" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 18.00, backVol: "10K", lay: 19.00, layVol: "1.2K" }
      }
    },
    {
      id: "crick-3",
      sport: "cricket",
      league: "English County T20",
      team1: "Essex W",
      team2: "Yorkshire W",
      time: "Wednesday 3:00 PM",
      isLive: true,
      hasLiveTracker: false,
      badges: ["BM", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.64, backVol: "18.3K", lay: null, layVol: null },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 2.14, backVol: "12.5K", lay: null, layVol: null }
      }
    },
    {
      id: "crick-4",
      sport: "cricket",
      league: "European Cricket League",
      team1: "Rotterdam Dockers",
      team2: "Glasgow Cosmic",
      time: "Today 3:00 PM",
      isLive: true,
      hasLiveTracker: false,
      badges: ["MO", "BM", "F", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.76, backVol: "18.3M", lay: 1.78, layVol: "544K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 2.28, backVol: "425K", lay: 2.30, layVol: "3K" }
      }
    },
    {
      id: "crick-5",
      sport: "cricket",
      league: "Caribbean Premier League W",
      team1: "Jamaica Empress W",
      team2: "Trinbago Knight Riders W",
      time: "Today 7:30 PM",
      isLive: true,
      hasLiveTracker: false,
      badges: ["MO", "BM", "F", "P"],
      hasStream: true,
      odds: {
        team1: { back: 2.38, backVol: "28K", lay: 2.42, layVol: "12K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.71, backVol: "17K", lay: 1.72, layVol: "2K" }
      }
    },
    {
      id: "crick-6",
      sport: "cricket",
      league: "European Premier Trophy",
      team1: "Belfast Wolves",
      team2: "Amsterdam Flames",
      time: "Today 6:45 PM",
      isLive: true,
      hasLiveTracker: false,
      badges: ["MO", "BM", "F", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.93, backVol: "2.1K", lay: 2.28, layVol: "8K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.79, backVol: "10K", lay: 2.08, layVol: "2K" }
      }
    }
  ],

  upcomingCricket: [
    {
      id: "crick-up-1",
      sport: "cricket",
      league: "ICC CWC Challenge League",
      team1: "Botswana",
      team2: "Uganda",
      time: "Today 1:00 PM",
      isLive: false,
      badges: ["P"],
      odds: {
        team1: { back: 6.80, backVol: "0.00K", lay: null, layVol: null },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.07, backVol: "0.00K", lay: null, layVol: null }
      }
    },
    {
      id: "crick-up-2",
      sport: "cricket",
      league: "Punjab Premier League",
      team1: "Jalandhar Warriors",
      team2: "Amritsar Soormas",
      time: "Today 1:00 PM",
      isLive: false,
      badges: ["P"],
      odds: {
        team1: { back: 1.90, backVol: "0.00K", lay: null, layVol: null },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.81, backVol: "0.00K", lay: null, layVol: null }
      }
    },
    {
      id: "crick-up-3",
      sport: "cricket",
      league: "CSA Provincial 4-Day",
      team1: "Knights",
      team2: "North West Dragons",
      time: "Today 1:30 PM",
      isLive: false,
      badges: ["P"],
      odds: {
        team1: { back: 1.89, backVol: "0.00K", lay: null, layVol: null },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.76, backVol: "0.00K", lay: null, layVol: null }
      }
    }
  ],

  football: [
    {
      id: "foot-1",
      sport: "football",
      league: "Guatemala Liga Nacional",
      team1: "Suchitepequez",
      team2: "Guastatoya",
      time: "Today 7:40 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: true,
      odds: {
        team1: { back: 2.72, backVol: "22K", lay: 4.60, layVol: "4K" },
        draw: { back: 1.47, backVol: "201K", lay: 1.93, layVol: "24K" },
        team2: { back: 5.20, backVol: "4K", lay: 13.50, layVol: "25K" }
      }
    },
    {
      id: "foot-2",
      sport: "football",
      league: "USA MLS Major League Soccer",
      team1: "San Diego FC",
      team2: "San Jose Earthquakes",
      time: "Today 8:00 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: true,
      odds: {
        team1: { back: 13.50, backVol: "1K", lay: 14.00, layVol: "65K" },
        draw: { back: 7.20, backVol: "181K", lay: 7.60, layVol: "100K" },
        team2: { back: 1.26, backVol: "4.9M", lay: 1.27, layVol: "624K" }
      }
    },
    {
      id: "foot-3",
      sport: "football",
      league: "USA MLS Major League Soccer",
      team1: "Vancouver Whitecaps",
      team2: "LA Galaxy",
      time: "Today 8:00 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: false,
      odds: {
        team1: { back: 1.17, backVol: "8.5M", lay: 1.19, layVol: "2.7M" },
        draw: { back: 8.20, backVol: "45K", lay: 8.40, layVol: "38K" },
        team2: { back: 29.00, backVol: "5K", lay: 32.00, layVol: "8K" }
      }
    },
    {
      id: "foot-4",
      sport: "football",
      league: "USA MLS Major League Soccer",
      team1: "Portland Timbers",
      team2: "St Louis City SC",
      time: "Today 8:00 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: false,
      odds: {
        team1: { back: 2.70, backVol: "9K", lay: 2.72, layVol: "21K" },
        draw: { back: 2.96, backVol: "2K", lay: 3.05, layVol: "392K" },
        team2: { back: 3.35, backVol: "23K", lay: 3.45, layVol: "2K" }
      }
    },
    {
      id: "foot-5",
      sport: "football",
      league: "USA MLS Major League Soccer",
      team1: "Los Angeles FC",
      team2: "New York Red Bulls",
      time: "Today 8:00 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.26, backVol: "2.1M", lay: 1.27, layVol: "683K" },
        draw: { back: 6.40, backVol: "63K", lay: 6.60, layVol: "63K" },
        team2: { back: 18.00, backVol: "2K", lay: 18.50, layVol: "8K" }
      }
    }
  ],

  tennis: [
    {
      id: "ten-1",
      sport: "tennis",
      league: "WTA Monastir Open",
      team1: "Podoroska",
      team2: "Blinkova",
      time: "Today 7:40 AM",
      isLive: true,
      badges: ["MO", "P"],
      hasStream: true,
      odds: {
        team1: { back: 55.00, backVol: "5K", lay: 110.00, layVol: "1K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.01, backVol: "150K", lay: 1.02, layVol: "1.7M" }
      }
    },
    {
      id: "ten-2",
      sport: "tennis",
      league: "ITF Men doubles",
      team1: "O Connell / Ziegann",
      team2: "Lomakin / Tamm",
      time: "Today 11:55 AM",
      isLive: true,
      badges: ["P"],
      hasStream: false,
      odds: {
        team1: { back: 1.28, backVol: "0.00K", lay: null, layVol: null },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 3.36, backVol: "0.00K", lay: null, layVol: null }
      }
    },
    {
      id: "ten-3",
      sport: "tennis",
      league: "ATP Challenger Seville",
      team1: "Hemery",
      team2: "Lajovic",
      time: "Today 11:45 PM",
      isLive: false,
      badges: ["MO", "P"],
      hasStream: true,
      odds: {
        team1: { back: 3.60, backVol: "5K", lay: 5.60, layVol: "304K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.36, backVol: "1K", lay: 1.38, layVol: "12K" }
      }
    },
    {
      id: "ten-4",
      sport: "tennis",
      league: "US Open Women Final",
      team1: "A Sabalenka",
      team2: "J Pegula",
      time: "Friday 4:30 AM",
      isLive: false,
      badges: ["MO", "BM", "P"],
      hasStream: true,
      odds: {
        team1: { back: 1.56, backVol: "990K", lay: 1.57, layVol: "37K" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 2.88, backVol: "24K", lay: 6.00, layVol: "18K" }
      }
    },
    {
      id: "ten-5",
      sport: "tennis",
      league: "US Open Men Semi",
      team1: "F Tiafoe",
      team2: "B Shelton",
      time: "Saturday 4:30 AM",
      isLive: false,
      badges: ["MO"],
      hasStream: true,
      odds: {
        team1: { back: 3.75, backVol: "242K", lay: 3.80, layVol: "1.76M" },
        draw: { back: null, backVol: null, lay: null, layVol: null },
        team2: { back: 1.47, backVol: "5K", lay: 1.98, layVol: "231K" }
      }
    }
  ]
};

export const CASINO_PROVIDERS = [
  { id: "mac88", name: "MAC88", sub: "VIRTUAL", icon: "fa-spade", colorClass: "text-accent" },
  { id: "evolution", name: "Evolution", sub: "GAMING", icon: "fa-infinity", colorClass: "text-gold" },
  { id: "smartsoft", name: "SmartSoft", sub: "GAMING", icon: "fa-shapes", colorClass: "text-danger" },
  { id: "jili", name: "JILI", sub: "PRO", icon: "fa-coins", colorClass: "text-warning" },
  { id: "betsoft", name: "BETSOFT", sub: "3D SLOTS", icon: "fa-play", colorClass: "text-gold" },
  { id: "betgames", name: "betgames.tv", sub: "LIVE", icon: "fa-tv", colorClass: "text-accent" },
  { id: "royal", name: "ROYAL", sub: "GAMING", icon: "fa-crown", colorClass: "text-gold" },
  { id: "fungames", name: "FUN GAMES", sub: "ARCADE", icon: "fa-gamepad", colorClass: "text-success" },
  { id: "spribe", name: "SPRIBE", sub: "AVIATOR", icon: "fa-rocket", colorClass: "text-danger" },
  { id: "turbogames", name: "TURBO GAMES", sub: "FAST", icon: "fa-bolt", colorClass: "text-warning" },
  { id: "aesexy", name: "AE SEXY", sub: "LIVE HOST", icon: "fa-heart", colorClass: "text-pink" },
  { id: "ezugi", name: "Ezugi", sub: "SMART MOVE", icon: "fa-dice-six", colorClass: "text-danger" }
];
