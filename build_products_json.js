const fs = require('fs');

const products = [
  // Category 1: Home Appliances (8)
  {
    id: 'refrigerator',
    name: 'Refrigerator (Fridge)',
    category: 'Home Appliances',
    tag: 'Bestseller',
    image: '/assets/products/refrigerator.jpg',
    shortDescription: 'Multi-door inverter frost-free refrigerator with intelligent multi-airflow cooling and convertible storage zones.',
    description: 'Designed for modern kitchens, this frost-free inverter refrigerator delivers uniform cooling across all compartments. Featuring dual humidity-controlled crisper drawers, deodorizing filters, and ultra-quiet energy-saving compressor technology, it keeps fruits and produce crisp and fresh for days.',
    highlights: [
      'Digital Inverter Technology for quiet, efficient cooling',
      'Multi-Air Flow vents maintain uniform internal temperature',
      'Convertible cooling zones for flexible freezer & fresh storage',
      'Toughened glass shelves with anti-spill borders'
    ],
    specs: {
      'Appliance Type': 'Frost-Free Double Door Refrigerator',
      'Cooling System': 'Multi Airflow Digital Inverter',
      'Defrosting Type': 'Auto Frost-Free',
      'Shelves': 'Spill-proof Toughened Glass',
      'Door Finish': 'Fingerprint Resistant Stainless Steel',
      'Warranty / Support': '1 Year Comprehensive + 10 Year Compressor Warranty'
    }
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    category: 'Home Appliances',
    tag: 'Energy Efficient',
    image: '/assets/products/washing-machine.jpg',
    shortDescription: 'Front-load fully automatic washing machine with steam hygiene wash, inverter direct drive, and 14 fabric care cycles.',
    description: 'Experience whisper-quiet laundry care with this front-load washing machine. Engineered with an Inverter Direct Drive motor and steam hygiene cycle, it deep-cleans delicate fabrics while removing allergens and stubborn stains without damaging fibers.',
    highlights: [
      'Inverter Direct Drive motor reduces vibration and noise',
      'Allergy Care Steam Wash removes 99.9% of allergens',
      '14 customized wash cycles for delicate, cotton, wool, and heavy fabrics',
      'Smart diagnostic auto-balancing drum system'
    ],
    specs: {
      'Appliance Type': 'Fully Automatic Front Load Washer',
      'Motor System': 'Direct Drive Brushless Inverter',
      'Wash Programs': '14 Pre-programmed Fabric Cycles',
      'Max Spin Speed': '1400 RPM',
      'Drum Material': 'Seamless Stainless Steel Embossed Drum',
      'Warranty / Support': '2 Years Comprehensive + 10 Year Motor Warranty'
    }
  },
  {
    id: 'air-conditioner',
    name: 'Air Conditioner (AC)',
    category: 'Home Appliances',
    tag: 'High Performance',
    image: '/assets/products/air-conditioner.jpg',
    shortDescription: 'Dual-inverter split air conditioner with 4-way swing, PM2.5 anti-bacterial filtration, and rapid ambient cooling.',
    description: 'Engineered for extreme summer heat, this split inverter air conditioner cools rooms rapidly with dual rotary compressor mechanics. Equipped with a copper condenser coil, anti-corrosion ocean-black fin coating, and PM2.5 air filtration for healthy indoor airflow.',
    highlights: [
      'Dual-Inverter Rotary Compressor for ultra-fast cooling',
      '100% Grooved Copper tubes with protective anti-corrosion coating',
      'PM2.5 micro-dust & anti-bacterial air filtration',
      '4-Way auto swing for balanced whole-room circulation'
    ],
    specs: {
      'Appliance Type': 'Split Inverter Air Conditioner',
      'Compressor': 'Dual Rotary Inverter Compressor',
      'Condenser Coil': '100% Inner-Grooved Copper',
      'Refrigerant': 'Eco-Friendly R32 Low GWP',
      'Air Flow': '4-Way Auto Horizontal & Vertical Swing',
      'Warranty / Support': '1 Year Comprehensive + 5 Year PCB + 10 Year Compressor'
    }
  },
  {
    id: 'microwave-oven',
    name: 'Microwave Oven',
    category: 'Home Appliances',
    tag: 'Popular',
    image: '/assets/products/microwave-oven.jpg',
    shortDescription: 'Convection microwave oven with auto-cook menus, grill rack, ceramic enamel cavity, and defrost presets.',
    description: 'Bake, grill, reheat, and defrost with precision using this multi-function convection microwave oven. Its scratch-resistant ceramic enamel interior ensures effortless cleanup, while auto-cook sensors calculate ideal cooking times for crispy snacks and desserts.',
    highlights: [
      'Convection, Grill, and Microwave combination cooking modes',
      'Scratch-resistant antibacterial ceramic enamel interior cavity',
      'Over 100 Indian and international auto-cook preset menus',
      'Quick defrost sensor for uniform thaw without cold spots'
    ],
    specs: {
      'Appliance Type': 'Convection & Grill Microwave Oven',
      'Cavity Material': 'Ceramic Enamel Coating',
      'Control Type': 'Touch Key Pad + Tact Dial',
      'Cooking Modes': 'Micro, Grill, Convection, Combination',
      'Turntable': 'Tempered Heat-Resistant Glass',
      'Warranty / Support': '1 Year Comprehensive + 5 Year Magnetron Warranty'
    }
  },
  {
    id: 'air-cooler',
    name: 'Air Cooler',
    category: 'Home Appliances',
    tag: 'High Airflow',
    image: '/assets/products/air-cooler.jpg',
    shortDescription: 'Desert air cooler with thick honeycomb cooling pads, high-velocity aerofoil fan, and auto-swing louvers.',
    description: 'Beat dry heat naturally with this high-efficiency desert air cooler. Built with dense three-sided honeycomb cooling pads, an ice chamber for boosted chill, and an aerodynamic fan motor designed for long air throws across living rooms and halls.',
    highlights: [
      'Dense 3-sided honeycomb pads for maximum water absorption & evaporative cooling',
      'Aerofoil engineering blade for powerful 40-foot air throw',
      'Dedicated top ice compartment for instant temperature drops',
      'Inverter-compatible low-wattage motor with thermal overload safety'
    ],
    specs: {
      'Appliance Type': 'Desert Evaporative Air Cooler',
      'Cooling Media': 'Thick Anti-Bacterial Honeycomb Pads',
      'Fan Blades': 'Aerofoil Engineered 3-Leaf Propeller',
      'Louvers': 'Motorized Horizontal & Vertical Swing',
      'Mobility': '360-degree Multidirectional Castor Wheels',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'water-heater',
    name: 'Water Heater (Geyser)',
    category: 'Home Appliances',
    tag: 'Safety Certified',
    image: '/assets/products/water-heater.jpg',
    shortDescription: 'Storage water heater with titanium enamel glasslined tank, adjustable thermostat, and multi-tier pressure safety.',
    description: 'Enjoy instant hot showers through the winter with this high-pressure storage water heater. Reinforced with a glass-lined titanium enamel tank to prevent corrosion in hard water conditions, paired with multi-layer thermal cutoff protection for complete safety.',
    highlights: [
      'Titanium enamel coated inner tank resists hard water scaling',
      'High-pressure rating suitable for high-rise residential towers',
      'Heavy-duty copper heating element for accelerated temperature rise',
      'Multi-function safety valve protects against vacuum, overheat, and over-pressure'
    ],
    specs: {
      'Appliance Type': 'Storage Electric Water Heater (Geyser)',
      'Tank Technology': 'Glass-Lined Titanium Enamel Tank',
      'Pressure Rating': '8 Bar Rated for High-Rise Apartments',
      'Insulation': 'High-Density CFC-Free PUF Thermal Shield',
      'Heating Element': 'Incoloy Nickel-Plated Heating Element',
      'Warranty / Support': '2 Years on Product + 4 Years on Element + 7 Years on Tank'
    }
  },
  {
    id: 'water-purifier',
    name: 'Water Purifier',
    category: 'Home Appliances',
    tag: 'Health & Purity',
    image: '/assets/products/water-purifier.jpg',
    shortDescription: 'Multi-stage RO + UV + UF water purifier with mineral enrichment controller and active copper-zinc cartridge.',
    description: 'Protect your family with crystal-clear drinking water. This state-of-the-art water purifier combines reverse osmosis membrane purification, ultraviolet disinfection, and active mineralizer infusion to balance essential electrolytes and TDS levels in every glass.',
    highlights: [
      'Multi-stage RO + UV + UF filtration removes dissolved salts and heavy metals',
      'Mineral Controller retains natural calcium and magnesium balance',
      'Active Copper-Zinc cartridge enriches drinking water for wellness',
      'Food-grade transparent storage tank with auto-cutoff indicator'
    ],
    specs: {
      'Appliance Type': 'Electric RO + UV + UF Water Purifier',
      'Purification Stages': '7-Stage Mechanical & Membrane Filtration',
      'Filter Types': 'Sediment, Pre-Carbon, RO Membrane, UV Chamber, Post-Carbon',
      'Tank Material': 'Food-Grade BPA-Free Plastic',
      'TDS Handling': 'Effective up to 2000 ppm input water',
      'Warranty / Support': '1 Year Comprehensive Warranty (including electrical parts)'
    }
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    category: 'Home Appliances',
    tag: 'Modern Living',
    image: '/assets/products/dishwasher.jpg',
    shortDescription: '14-place setting freestanding dishwasher with intensive 70°C wash, triple spray arms, and turbo dry system.',
    description: 'Transform daily kitchen cleanup with this 14-place setting dishwasher. Featuring intensive wash cycles built for tough grease, curry stains, and stainless steel utensils, it sanitizes cookware at 70°C while using up to 80% less water than hand-washing.',
    highlights: [
      'Intensive Kadhai / Cookware cycle with high-temp 70°C hygiene rinse',
      'Triple rotary spray arms ensure complete 360-degree coverage',
      'Flexible foldable tines and height-adjustable cutlery basket',
      'Eco-wash cycle saves electricity and optimizes water consumption'
    ],
    specs: {
      'Appliance Type': 'Freestanding 14-Place Setting Dishwasher',
      'Spray System': 'Triple High-Pressure Stainless Arms',
      'Wash Programs': '6 Cycles (Intensive, Eco, Quick, Glassware, Auto, Rinse)',
      'Drying Technology': 'Active Condensation Turbo Drying',
      'Tub Material': 'Stainless Steel Interior Tub',
      'Warranty / Support': '2 Years Comprehensive + 10 Year Rust-Proof Warranty'
    }
  },

  // Category 2: TV & Entertainment (12)
  {
    id: 'led-tv',
    name: 'LED TV',
    category: 'TV & Entertainment',
    tag: 'Crisp Display',
    image: '/assets/products/led-tv.jpg',
    shortDescription: 'Full HD LED TV with slim bezel design, wide viewing angles, and dual stereo speakers with Dolby Audio.',
    description: 'Enjoy vibrant colors and razor-sharp clarity with this Full HD LED TV. Designed with an ultra-thin bezel for immersive viewing, high dynamic contrast ratio, and dual 20W stereo speakers tuned with surround sound processing for everyday cinema at home.',
    highlights: [
      'Vivid Picture Engine enhances contrast and color saturation',
      'Ultra-slim micro-edge bezel design maximizes display real estate',
      '20W Stereo speakers with Dolby Audio decoding',
      'Multiple HDMI and USB connectivity ports for consoles and media players'
    ],
    specs: {
      'Display Type': 'Direct-lit LED Panel',
      'Resolution': 'Full HD 1920 x 1080 Pixels',
      'Audio Output': '20W Stereo Speakers with Surround Processing',
      'Connectivity': '2x HDMI, 2x USB, AV In, 3.5mm Headphone Jack',
      'Refresh Rate': '60Hz Native Refresh Rate',
      'Warranty / Support': '1 Year Standard Comprehensive Warranty'
    }
  },
  {
    id: 'smart-tv',
    name: 'Smart TV',
    category: 'TV & Entertainment',
    tag: 'Connected Home',
    image: '/assets/products/smart-tv.jpg',
    shortDescription: '4K Ultra HD Smart TV powered by Google TV with built-in Chromecast, voice remote, and dual-band Wi-Fi.',
    description: 'Step into seamless streaming with this 4K Ultra HD Smart TV. Access Netflix, YouTube, Prime Video, and thousands of apps instantly with Google TV. Featuring hands-free Google Assistant voice control, HDR10+ support, and seamless screen mirroring from any phone or laptop.',
    highlights: [
      'Certified Google TV OS with personalized content recommendations',
      'HDR10+ and Dolby Vision support for lifelike cinematic contrast',
      'Built-in Google Chromecast and Bluetooth 5.0 wireless audio',
      'Voice-enabled smart remote with dedicated streaming hotkeys'
    ],
    specs: {
      'Display Type': '4K UHD IPS LED Smart Panel',
      'Resolution': '3840 x 2160 Pixels (4K Ultra HD)',
      'Operating System': 'Google TV with Google Assistant',
      'Wireless Connectivity': 'Dual-Band Wi-Fi (2.4/5GHz) + Bluetooth 5.0',
      'Audio Output': '30W Stereo with Dolby Atmos passthrough',
      'Warranty / Support': '1 Year Comprehensive + 1 Year Additional Panel Warranty'
    }
  },
  {
    id: 'oled-tv',
    name: 'OLED TV',
    category: 'TV & Entertainment',
    tag: 'Flagship Cinema',
    image: '/assets/products/oled-tv.jpg',
    shortDescription: 'Cinema-grade 4K OLED TV with self-lit pixels, infinite contrast, 120Hz refresh rate, and Dolby Vision IQ.',
    description: 'The pinnacle of home theater visual performance. Each pixel emits its own light independently to achieve true absolute black and infinite contrast ratio. Powered by an AI Picture Processor, 120Hz VRR gaming mode, and Dolby Vision IQ that calibrates contrast to your room lighting.',
    highlights: [
      'Self-illuminating OLED pixels provide true zero-black levels',
      '120Hz native refresh rate with VRR, ALLM, and HDMI 2.1 gaming support',
      'AI Neural Processor optimizes every frame in real-time',
      'Ultra-thin gallery design mounts flush against your living room wall'
    ],
    specs: {
      'Display Type': 'Self-Lit 4K OLED Panel',
      'Contrast Ratio': 'Infinite Contrast (True Absolute Black)',
      'Refresh Rate': '120Hz Native with Variable Refresh Rate (VRR)',
      'Video Processing': 'AI Deep Learning Picture Processor',
      'Audio': '40W 2.2 Channel Dolby Atmos Speaker Array',
      'Warranty / Support': '2 Years Comprehensive + 3 Year Panel Replacement Plan'
    }
  },
  {
    id: 'qled-tv',
    name: 'QLED TV',
    category: 'TV & Entertainment',
    tag: 'Quantum Dot Color',
    image: '/assets/products/qled-tv.jpg',
    shortDescription: 'Quantum Dot 4K QLED TV with 100% color volume, high peak brightness, and ambient artwork display mode.',
    description: 'Experience dazzling brilliance and 1 billion shades of color with Quantum Dot technology. This QLED TV excels in brightly lit living rooms with high peak nit brightness and anti-glare coatings, transforming into high-res art gallery decor when standby.',
    highlights: [
      'Quantum Dot technology produces 100% DCI-P3 color volume',
      'High peak brightness delivers spectacular HDR highlights',
      'Anti-reflective screen coating cuts glare from sunlit windows',
      'Ambient Mode displays artwork, family photos, and weather widgets'
    ],
    specs: {
      'Display Type': 'Quantum Dot LED (QLED) Panel',
      'Resolution': '3840 x 2160 Pixels (4K Ultra HD)',
      'HDR Support': 'Quantum HDR, HDR10+, HLG',
      'Smart Platform': 'Smart TV OS with Voice Assistant Integration',
      'Ports': '4x HDMI (eARC support), 2x USB, Optical Audio Out',
      'Warranty / Support': '1 Year Comprehensive + 1 Year Extended Panel Warranty'
    }
  },
  {
    id: 'home-theatre-system',
    name: 'Home Theatre System',
    category: 'TV & Entertainment',
    tag: 'Surround Sound',
    image: '/assets/products/home-theatre-system.jpg',
    shortDescription: '5.1 Channel surround home theatre system with dedicated subwoofer, rear satellite towers, and optical input.',
    description: 'Immerse yourself in 360-degree theater audio with this true 5.1 channel surround home theatre. Featuring a powerful bass-reflex subwoofer, center channel voice clarifier, and two rear surround speakers that envelop your room in authentic movie-house realism.',
    highlights: [
      'True 5.1 Channel setup with dedicated center and rear surround satellites',
      'Deep bass reflex subwoofer delivers visceral low-frequency rumbles',
      'HDMI ARC, Optical, Aux, USB, and Bluetooth wireless pairing',
      'Preset EQ modes for Movies, Music, Sports, and Night listening'
    ],
    specs: {
      'Channel Setup': '5.1 Channel Physical Surround Sound',
      'Total System Power': '500W Peak Audio Output',
      'Subwoofer': 'Down-Firing Bass Reflex Enclosure',
      'Inputs': 'HDMI (ARC), Digital Optical, 3.5mm Aux, Bluetooth',
      'Remote Control': 'Full-function IR Remote with Subwoofer Trim Control',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'soundbar',
    name: 'Soundbar',
    category: 'TV & Entertainment',
    tag: 'Compact Audio',
    image: '/assets/products/soundbar.jpg',
    shortDescription: 'Slim 2.1 channel soundbar with wireless active subwoofer, Dolby Digital decoding, and HDMI ARC support.',
    description: 'Elevate flat TV audio with crisp dialogue and cinematic bass without running cluttering speaker wires. This sleek soundbar slips neatly beneath your television while its companion wireless subwoofer can be placed anywhere in your room for thumping beats.',
    highlights: [
      'Dedicated dialogue enhancement center channel for crystal voice clarity',
      'Wireless subwoofer connects automatically without audio cords across the floor',
      'Single-cable HDMI ARC setup allows control using your standard TV remote',
      'Bluetooth streaming from smartphones and tablets for music parties'
    ],
    specs: {
      'Audio Configuration': '2.1 Channel Soundbar + Wireless Subwoofer',
      'Power Output': '160W RMS Total System Output',
      'Decoding': 'Dolby Digital & Stereo PCM Audio',
      'Connectivity': 'HDMI ARC, Optical In, USB, Bluetooth 5.0, 3.5mm Aux',
      'Dimensions': 'Slim profile designed to fit under standard TV stands',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'bluetooth-speaker',
    name: 'Bluetooth Speaker',
    category: 'TV & Entertainment',
    tag: 'Portable & Rugged',
    image: '/assets/products/bluetooth-speaker.jpg',
    shortDescription: 'IPX7 waterproof portable Bluetooth speaker with 360° sound, 18-hour battery playback, and party link.',
    description: 'Take thunderous audio everywhere you go. Engineered for outdoors, pool parties, and picnics, this rugged portable Bluetooth speaker delivers punchy bass radiators, IPX7 waterproof immersion resistance, and an all-day rechargeable battery.',
    highlights: [
      'IPX7 waterproof rating survives splashes, rain, and accidental water dips',
      'Passive dual bass radiators deliver rich sound without distortion',
      'Up to 18 hours of continuous music playback on a single USB-C charge',
      'True Wireless Stereo (TWS) link pairs two speakers for wider stereo separation'
    ],
    specs: {
      'Audio Drivers': 'Dual Full-Range Drivers + Dual Passive Radiators',
      'Water Resistance': 'IPX7 Certified Waterproof',
      'Battery Life': 'Up to 18 Hours (50% volume)',
      'Charging Port': 'Fast USB Type-C Charging',
      'Bluetooth Version': 'Bluetooth 5.3 with 15-meter range',
      'Warranty / Support': '1 Year Comprehensive Replacement Support'
    }
  },
  {
    id: 'multimedia-speakers',
    name: 'Multimedia Speakers',
    category: 'TV & Entertainment',
    tag: 'Desktop Audio',
    image: '/assets/products/multimedia-speakers.jpg',
    shortDescription: '2.1 desktop multimedia speaker system with wood cabinet subwoofer, FM radio, USB reader, and remote.',
    description: 'The classic desktop audio powerhouse for gaming rigs, laptops, and living room media consoles. Crafted with high-density wooden acoustic cabinets to minimize resonance, complete with digital LED track display and wireless remote convenience.',
    highlights: [
      'Acoustically tuned wooden subwoofer enclosure for warm, punchy bass',
      'Dual satellite desktop speakers deliver balanced midrange and crisp highs',
      'Built-in FM tuner, USB flash drive slot, and SD card reader',
      'Rotary bass and treble control knobs for custom acoustic tuning'
    ],
    specs: {
      'Speaker Configuration': '2.1 Stereo Satellites + Powered Subwoofer',
      'Cabinet Build': 'Acoustic Wood / Reinforced Polymer',
      'Input Modes': 'Bluetooth, USB, SD Card, Aux RCA, Built-in FM Radio',
      'Controls': 'Front Control Knobs + Wireless Infrared Remote',
      'Output Power': '60W Peak Audio Power',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'set-top-box',
    name: 'Set-Top Box',
    category: 'TV & Entertainment',
    tag: 'HD Broadcast',
    image: '/assets/products/set-top-box.jpg',
    shortDescription: 'High-definition digital DVB-T2/C set-top box with USB PVR recording, electronic program guide, and HDMI out.',
    description: 'Upgrade your broadcast experience with this high-definition digital set-top box. Enjoy free-to-air and digital cable channels in crystal-clear 1080p resolution, with instant USB recording to pause and save your favorite sports and serials.',
    highlights: [
      'Supports full 1080p HD broadcast signal decoding',
      'USB Personal Video Recorder (PVR) function to record live TV onto pendrives',
      'Interactive 7-day Electronic Program Guide (EPG) with schedule reminders',
      'Parental control lock and multi-language audio subtitles'
    ],
    specs: {
      'Tuner Standard': 'Digital DVB-T2 / DVB-C Tuner',
      'Resolution Support': '480i, 576i, 720p, 1080i, 1080p',
      'Recording Feature': 'USB PVR Timeshift and Scheduled Recording',
      'Outputs': 'HDMI 1.4, Composite AV RCA, Coaxial Digital Out',
      'Media Playback': 'MKV, MP4, MP3, JPEG via front USB',
      'Warranty / Support': '1 Year Replacement Warranty'
    }
  },
  {
    id: 'android-tv-box',
    name: 'Android TV Box',
    category: 'TV & Entertainment',
    tag: 'Smart Streaming',
    image: '/assets/products/android-tv-box.jpg',
    shortDescription: '4K Android TV streaming box with quad-core processor, Google Play Store, dual-band Wi-Fi, and voice remote.',
    description: 'Transform any standard LED TV or monitor into a high-speed smart television. Running certified Android TV OS, this streaming box gives you instant access to Netflix, Prime Video, Disney+, Hotstar, and thousands of apps with voice-enabled search.',
    highlights: [
      'Certified Android TV OS with access to official Google Play Store apps',
      '4K HDR decoding at 60fps with AV1, VP9, and HEVC codec support',
      'Quad-core Cortex processor paired with fast internal flash memory',
      'Voice remote with dedicated Google Assistant button for rapid searches'
    ],
    specs: {
      'Processor': 'Quad-Core 64-bit Cortex-A53 CPU',
      'Resolution Output': 'Up to 4K Ultra HD @ 60fps',
      'Operating System': 'Android TV OS with Google Certification',
      'Wireless': 'Dual-Band Wi-Fi (2.4G/5G) + Bluetooth 5.0',
      'Ports': 'HDMI 2.0b, USB 2.0, Ethernet RJ45, MicroSD Slot',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'projector',
    name: 'Projector',
    category: 'TV & Entertainment',
    tag: 'Big Screen',
    image: '/assets/products/projector.jpg',
    shortDescription: 'Full HD home cinema LED projector with 4500 lumens, 4-point keystone correction, and 200-inch screen projection.',
    description: 'Bring the giant-screen theater experience into your living room or backyard. This high-lumen LED projector casts sharp, cinematic pictures up to 200 inches diagonal with 4-point digital keystone correction that squares the image even from angled setups.',
    highlights: [
      'Massive 40-inch to 200-inch projection size with crisp native Full HD optics',
      '4500 Lumens bright LED lamp with long-lasting 30,000-hour operational life',
      'Digital 4-point keystone adjustment for corner-to-corner distortion correction',
      'Built-in dual Hi-Fi stereo speakers and Bluetooth audio transmitter'
    ],
    specs: {
      'Native Resolution': 'Native 1080p Full HD (4K signal compatible)',
      'Brightness': '4500 Lumens Bright LED Source',
      'Projection Size': '40 to 200 inches diagonal',
      'Lamp Life': 'Up to 30,000 hours in Eco Mode',
      'Connectivity': '2x HDMI, 2x USB, AV In, Audio Out, Dual-Band Wi-Fi',
      'Warranty / Support': '1 Year Comprehensive + 6 Months Lamp Warranty'
    }
  },
  {
    id: 'dvd-player',
    name: 'DVD Player',
    category: 'TV & Entertainment',
    tag: 'Classic Media',
    image: '/assets/products/dvd-player.jpg',
    shortDescription: 'All-region compact DVD player with 1080p HDMI upscaling, error correction, and USB media playback.',
    description: 'Rediscover your favorite DVD movie collections, concert discs, and music CDs. This compact multi-format player features 1080p HDMI upscaling for sharper video on modern TVs, intelligent error-correction to play scratched discs, and front USB media support.',
    highlights: [
      '1080p HDMI video upscaling enhances standard DVD clarity on HDTVs',
      'All-region playback plays discs from anywhere around the world',
      'Advanced laser error-correction mechanism plays slightly scratched discs',
      'Front USB port for direct playback of MP3 audio and AVI/MP4 video files'
    ],
    specs: {
      'Disc Compatibility': 'DVD, DVD±R/RW, CD, CD-R/RW, VCD',
      'Video Upscaling': '1080p Full HD via HDMI Output',
      'Audio Formats': 'Dolby Digital Stereo, MP3, WMA',
      'Video Outputs': 'HDMI Out, RCA Composite Video, Coaxial Audio',
      'Design': 'Compact slim-line chassis with LED display panel',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },

  // Category 3: Small Kitchen Appliances (16)
  {
    id: 'mixer-grinder',
    name: 'Mixer Grinder',
    category: 'Small Kitchen Appliances',
    tag: 'Kitchen Essential',
    image: '/assets/products/mixer-grinder.jpg',
    shortDescription: '750W heavy-duty mixer grinder with 3 stainless steel jars, overload protection, and flow breaker blades.',
    description: 'Tackle the toughest Indian spices, batters, and chutneys with ease. Powered by a heavy-duty 750-watt copper motor, this mixer grinder features food-grade stainless steel jars, ergonomic handles, and razor-sharp blades for ultra-fine grinding.',
    highlights: [
      '750W 100% Copper-wound motor engineered for tough grinding tasks',
      '3 Heavy-gauge stainless steel jars for wet, dry, and chutney grinding',
      'Air-ventilation cooling technology prevents motor overheating during long runs',
      'Overload protection reset switch guards against voltage surges'
    ],
    specs: {
      'Motor Power': '750 Watts Pure Copper Motor',
      'Jars Included': '1.5L Wet Jar, 1.0L Multipurpose Jar, 0.4L Chutney Jar',
      'Blade Material': 'High-Grade Rust-Resistant 304 Stainless Steel',
      'Speed Control': '3-Speed Rotary Knob + Inching / Pulse Function',
      'Body Material': 'Shock-Proof Shock-Resistant ABS Body',
      'Warranty / Support': '2 Years on Product + 5 Years on Motor Warranty'
    }
  },
  {
    id: 'juicer',
    name: 'Juicer',
    category: 'Small Kitchen Appliances',
    tag: 'Fresh Nutrition',
    image: '/assets/products/juicer.jpg',
    shortDescription: 'Centrifugal cold-spin juicer with extra-wide feed chute, micro-mesh filter, and separate pulp container.',
    description: 'Start your mornings with nutrient-rich fresh fruit and vegetable juices. The extra-wide feeding chute takes whole apples and citrus fruits without pre-cutting, while high-efficiency micro-mesh stainless filters separate seeds and pulp into a large detached bin.',
    highlights: [
      'Extra-wide 75mm feeding tube fits whole fruits with zero pre-chopping',
      'Stainless steel micro-mesh filter maximizes juice yield and preserves enzymes',
      'Two-speed selection for soft fruits (citrus/berries) and hard veggies (carrots/apples)',
      'Drip-stop spout prevents sticky kitchen counter spills'
    ],
    specs: {
      'Juicer Type': 'Centrifugal High-Speed Juicer',
      'Motor Power': '600 Watts Efficient Copper Motor',
      'Feed Chute Size': '75mm Extra-Wide Feeder Chute',
      'Containers': '1.5L Detachable Pulp Collector + 800ml Juice Jug with Froth Separator',
      'Safety Lock': 'Dual Interlock Safety Clamp Mechanism',
      'Warranty / Support': '2 Years Comprehensive Warranty'
    }
  },
  {
    id: 'electric-kettle',
    name: 'Electric Kettle',
    category: 'Small Kitchen Appliances',
    tag: 'Rapid Boil',
    image: '/assets/products/electric-kettle.jpg',
    shortDescription: '1.8L stainless steel fast-boiling electric kettle with 360-degree cordless base and auto-shutoff safety.',
    description: 'Boil water for green tea, French press coffee, noodles, or soups in under 3 minutes. Crafted from food-grade stainless steel with a concealed heating plate, dry-boil safety sensor, and cool-touch handle for safe, effortless pouring.',
    highlights: [
      'Fast-boiling concealed heating plate heats water in minutes',
      'Auto-shutoff sensor switches off power as soon as water boils',
      'Dry-boil protection prevents heating when reservoir is empty',
      '360-degree swivel cordless base with internal cord storage reel'
    ],
    specs: {
      'Capacity': '1.8 Litres Total Reservoir Volume',
      'Power Rating': '1500 Watts High-Speed Heating',
      'Body Material': 'Food-Grade SS304 Stainless Steel Interior',
      'Safety Features': 'Auto Cut-Off + Boil-Dry Protection Sensor',
      'Base': '360° Detachable Cordless Power Swivel Base',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'induction-cooktop',
    name: 'Induction Cooktop',
    category: 'Small Kitchen Appliances',
    tag: 'Flameless Cooking',
    image: '/assets/products/induction-cooktop.jpg',
    shortDescription: '2000W digital induction cooktop with crystal glass plate, preset cooking menus, and auto voltage regulator.',
    description: 'Modern flameless cooking that is faster, safer, and cleaner than gas. Featuring an electromagnetic glass cook surface that heats only the pan while staying cool around the perimeter, equipped with auto voltage stabilization and Indian cooking presets.',
    highlights: [
      'Direct electromagnetic induction transfers heat straight to cookware',
      'Pre-programmed Indian cooking modes: Roti, Dosa, Curry, Milk, and Pressure Cook',
      'Tough polished micro-crystal glass plate resists scratches and thermal shock',
      'Built-in surge and voltage fluctuation protection for long durability'
    ],
    specs: {
      'Power Consumption': '2000 Watts Maximum Heating Power',
      'Top Plate': 'Polished Ceramic Micro-Crystal Glass Plate',
      'Control Panel': 'Feather-Touch Push Buttons with Digital LED Display',
      'Timer': 'Up to 3-Hour Programmable Auto-Off Timer',
      'Cookware Compatibility': 'Magnetic Stainless Steel, Cast Iron & Induction-bottom pans',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'toaster',
    name: 'Toaster',
    category: 'Small Kitchen Appliances',
    tag: 'Crispy Breakfast',
    image: '/assets/products/toaster.jpg',
    shortDescription: '2-slice pop-up bread toaster with 6 browning levels, defrost, reheat, and removable crumb tray.',
    description: 'Get evenly toasted, golden-brown bread slices every morning. Built with extra-wide self-centering slots that accommodate thick artisanal loaves, bagels, or standard sandwich bread, alongside an easy-slide crumb collector for quick cleanup.',
    highlights: [
      '6 Browning level dial lets you toast from lightly warmed to crispy dark',
      'Self-centering bread slots ensure uniform heat across both surfaces',
      'Defrost, Reheat, and Mid-Cycle Cancel buttons with LED indicators',
      'Removable slide-out bottom crumb tray keeps countertops clean'
    ],
    specs: {
      'Capacity': '2-Slice Bread Toaster',
      'Power Rating': '800 Watts Fast-Heating Heating Element',
      'Slot Width': 'Wide Self-Centering Dual Bread Slots',
      'Functions': 'Defrost, Reheat, Cancel, 6 Browning Settings',
      'Exterior': 'Cool-Touch Heat-Resistant Thermoplastic Housing',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'sandwich-maker',
    name: 'Sandwich Maker',
    category: 'Small Kitchen Appliances',
    tag: 'Quick Snack',
    image: '/assets/products/sandwich-maker.jpg',
    shortDescription: 'Non-stick grill sandwich maker with cut-and-seal plates, power ready indicators, and heat-resistant handle.',
    description: 'Whip up mouth-watering crispy grilled cheese, panini, and vegetable sandwiches in minutes. High-grade non-stick coated plates seal bread edges tightly to lock in sauces and fillings without messy leaks or butter sticking.',
    highlights: [
      'PFOA-free non-stick grill coating requires minimal oil or butter',
      'Diagonal cut-and-seal plate design pockets ingredients inside toast',
      'Dual neon indicators show power status and cooking readiness',
      'Heat-resistant cool-touch handle with secure locking clip latch'
    ],
    specs: {
      'Plates': 'Non-Stick Die-Cast Aluminum Cut & Seal Plates',
      'Power Rating': '750 Watts Rapid Heating',
      'Indicators': 'Red (Power) & Green (Ready to Cook) Neon Lamps',
      'Storage': 'Upright Vertical Storage Design with Cord Wrap',
      'Cleaning': 'Wipe-Clean Non-Stick Food Contact Surface',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'rice-cooker',
    name: 'Rice Cooker',
    category: 'Small Kitchen Appliances',
    tag: 'Fluffy Rice',
    image: '/assets/products/rice-cooker.jpg',
    shortDescription: 'Automatic electric rice cooker with keep-warm function, anodized aluminum cooking pot, and steam basket.',
    description: 'Cook fluffy, fragrant basmati rice, pulao, porridge, and steamed vegetables with one-touch simplicity. Once rice is cooked to perfection, the cooker automatically transitions into Keep-Warm mode to keep food piping hot for hours.',
    highlights: [
      'One-touch automatic cooking operation with auto Keep-Warm switch',
      'Durable anodized aluminum cooking pot resists dents and promotes heat distribution',
      'Detachable food-grade steamer tray to steam momos and vegetables simultaneously',
      'Tempered glass lid with steam escape vent for visual monitoring'
    ],
    specs: {
      'Capacity': '1.8 Litres (Raw Rice capacity up to 1 kg)',
      'Power Rating': '700 Watts Heating Coil',
      'Cooking Modes': 'Cook & Automatic Keep Warm (up to 4 hours)',
      'Accessories Included': 'Steam Basket, Measuring Cup, Rice Paddle Spatula',
      'Lid Type': 'Stainless Steel Rimmed Tempered Glass Lid',
      'Warranty / Support': '2 Years on Product + 5 Years on Heating Element'
    }
  },
  {
    id: 'air-fryer',
    name: 'Air Fryer',
    category: 'Small Kitchen Appliances',
    tag: 'Healthy Cooking',
    image: '/assets/products/air-fryer.jpg',
    shortDescription: 'Digital air fryer with rapid 360° air circulation, 8 preset cooking modes, and non-stick dishwasher-safe basket.',
    description: 'Crisp french fries, samosas, chicken wings, and roasted vegetables using up to 85% less oil. Powered by rapid 360° hot air circulation, this digital air fryer delivers irresistible crunch on the outside while preserving tenderness on the inside.',
    highlights: [
      'Rapid air circulation cooks foods crisply with up to 85% less oil',
      'Digital touch display with 8 pre-programmed food presets',
      'Adjustable temperature control from 80°C to 200°C for custom recipes',
      'PFOA-free non-stick basket and crisper plate are dishwasher safe'
    ],
    specs: {
      'Basket Capacity': '4.5 Litres Family Size Basket',
      'Power Rating': '1400 Watts High-Efficiency Heating',
      'Temperature Range': '80°C to 200°C Digital Thermostat',
      'Timer': 'Up to 60-Minute Auto Shut-Off Timer with Bell',
      'Safety': 'Overheat Protection + Basket Pull-Out Auto Shutoff',
      'Warranty / Support': '2 Years Comprehensive Warranty'
    }
  },
  {
    id: 'electric-hand-blender',
    name: 'Electric Hand Blender',
    category: 'Small Kitchen Appliances',
    tag: 'Quick Puree',
    image: '/assets/products/electric-hand-blender.jpg',
    shortDescription: 'Ergonomic stainless steel immersion hand blender with dual-speed motor and splash-proof blade guard.',
    description: 'Puree hot soups right in the pot, whip up smoothies, or blend baby food in seconds. Built with a durable food-grade stainless steel shaft and an anti-splash bell guard that prevents liquids from splattering onto your kitchen walls.',
    highlights: [
      'Detachable stainless steel blending stem safe for boiling hot pots',
      'Dual-speed push button for low and turbo blending speeds',
      'Anti-splash blade housing prevents mess during high-speed immersion',
      'Ergonomic non-slip grip handle for comfortable single-handed use'
    ],
    specs: {
      'Motor Power': '300 Watts DC Motor',
      'Stem Material': 'Detachable Food-Grade 304 Stainless Steel Shaft',
      'Blades': 'Multi-Angle Stainless Steel Chopping Blades',
      'Speed Settings': '2-Speed Soft-Touch Push Buttons',
      'Included Accessories': 'Graduated Blending Measuring Beaker (600ml)',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'food-processor',
    name: 'Food Processor',
    category: 'Small Kitchen Appliances',
    tag: 'All-in-One Prep',
    image: '/assets/products/food-processor.jpg',
    shortDescription: 'Multi-functional food processor with kneading, slicing, shredding discs, citrus press, and blender jar.',
    description: 'Your ultimate kitchen sous-chef. Slice salads, shred cheese, knead whole wheat dough, whip cream, and extract fresh citrus juice in minutes. Cut meal preparation time by half with heavy-duty interchangeable blades and discs.',
    highlights: [
      'All-in-one prep: Slices, shreds, chops, kneads dough, whisks, and juices',
      'Large processing bowl with wide double-chute feeder pusher',
      'Reversible stainless steel discs for fine and coarse grating',
      'Safety interlock system prevents operation unless bowl and lid are securely clicked'
    ],
    specs: {
      'Motor Power': '1000 Watts Heavy-Duty High-Torque Motor',
      'Bowl Capacity': '2.1L Food Processing Bowl + 1.5L Blender Goblet',
      'Attachments': 'Dough Blade, Chopping Blade, Slicing Disc, Shredding Disc, Citrus Juicer',
      'Speeds': '3-Speed Pulse Rotary Switch',
      'Safety': 'Dual Safety Interlock Lid Mechanism',
      'Warranty / Support': '2 Years on Product + 5 Years on Motor'
    }
  },
  {
    id: 'otg-oven-toaster-griller',
    name: 'OTG (Oven Toaster Griller)',
    category: 'Small Kitchen Appliances',
    tag: 'Bake & Roast',
    image: '/assets/products/otg-oven-toaster-griller.jpg',
    shortDescription: 'Multi-mode OTG with motorized rotisserie, convection fan, 0-250°C thermostat, and baking tray accessories.',
    description: 'Master artisan baking, roasting, and grilling. Featuring top and bottom stainless heating elements with convection fan circulation and a motorized 360-degree rotisserie rod for succulent tandoori dishes, cakes, cookies, and sourdough loaves.',
    highlights: [
      'Convection heating circulates hot air for even browning and crusting',
      'Motorized rotisserie rod for even 360° roasting of meats and paneer tikka',
      'Independent top and bottom heating element selector knobs',
      'Heat-resistant double-layer tempered glass door with stay-cool handle'
    ],
    specs: {
      'Capacity': '28 Litres Large Baking Cavity',
      'Power Rating': '1600 Watts Dual Element Heating',
      'Temperature Range': '100°C to 250°C Adjustable Thermostat',
      'Timer': '60-Minute Mechanical Timer with Stay-On Mode',
      'Accessories': 'Baking Tray, Wire Grill Rack, Rotisserie Rod & Tongs, Crumb Tray',
      'Warranty / Support': '2 Years Comprehensive Warranty'
    }
  },
  {
    id: 'coffee-maker',
    name: 'Coffee Maker',
    category: 'Small Kitchen Appliances',
    tag: 'Barista Brew',
    image: '/assets/products/coffee-maker.jpg',
    shortDescription: '15-bar Italian pump espresso and cappuccino maker with high-pressure milk frothing steam wand.',
    description: 'Savor rich, aromatic cafe-style coffee at home. Engineered with a 15-bar high-pressure Italian pump for dense crema, a stainless steel cup warming plate, and a high-velocity steam wand to froth velvety micro-foam for lattes and cappuccinos.',
    highlights: [
      '15-Bar Italian high-pressure pump extracts deep coffee aroma and rich crema',
      'Stainless steel steam frother wand creates creamy micro-foam for cappuccinos',
      'Top heated tray keeps espresso ceramic cups pleasantly warm before pouring',
      'Detachable transparent water reservoir and drip tray for quick refills and cleaning'
    ],
    specs: {
      'Pump Pressure': '15-Bar High-Pressure Italian System',
      'Water Reservoir': '1.2 Litres Removable BPA-Free Tank',
      'Boiler System': 'Die-Cast Aluminum Alloy Boiler with Thermo-Block',
      'Filters Included': 'Single & Double Shot Stainless Steel Pressurized Filters',
      'Steam Wand': 'High-Pressure Micro-Foam Swivel Steam Wand',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'hand-mixer',
    name: 'Hand Mixer',
    category: 'Small Kitchen Appliances',
    tag: 'Baking Partner',
    image: '/assets/products/hand-mixer.jpg',
    shortDescription: '5-speed electric hand mixer with turbo boost, chrome beaters, dough hooks, and one-touch eject.',
    description: 'Bake lighter cakes, whip egg whites into stiff peaks, and mix cookie batters without tiring your wrists. This lightweight hand mixer packs 5 speed levels, stainless steel beaters, heavy-duty dough hooks, and an instant burst turbo button.',
    highlights: [
      '5 Speed settings plus Turbo boost handle delicate folding to thick batters',
      'Dual chrome beaters for whipping creams, frostings, and cake mixtures',
      'Dual spiral dough hooks for effortless kneading of pizza and bread dough',
      'One-touch thumb eject button releases accessories safely for dishwashing'
    ],
    specs: {
      'Motor Power': '300 Watts Lightweight Copper Motor',
      'Speeds': '5 Speed Variations + Instant Turbo Boost Button',
      'Attachments': 'Pair of Chrome Beaters + Pair of Spiral Dough Hooks',
      'Body Design': 'Ergonomic Comfort Grip with Flat Heel Rest',
      'Eject Feature': 'Quick One-Touch Accessory Release Lever',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'electric-chopper',
    name: 'Electric Chopper',
    category: 'Small Kitchen Appliances',
    tag: 'Tear-Free Prep',
    image: '/assets/products/electric-chopper.jpg',
    shortDescription: 'Compact electric mini food chopper with dual bi-level stainless blades and one-touch pulse press.',
    description: 'No more onion tears or tedious vegetable chopping. Simply drop in onions, garlic, chillies, tomatoes, or nuts, press the top push-button, and watch the bi-level stainless steel blades chop everything to uniform perfection in 10 seconds.',
    highlights: [
      'Twin bi-level stainless steel blades chop evenly across the entire bowl height',
      'One-touch push-down pulse lid switch for precise coarse or fine chopping',
      'Clear BPA-free transparent bowl lets you monitor food texture at a glance',
      'Anti-slip silicone rubber ring on the base prevents wobbling during operation'
    ],
    specs: {
      'Motor Power': '250 Watts Pure Copper Motor',
      'Bowl Capacity': '500ml BPA-Free Transparent Chopping Bowl',
      'Blade Assembly': 'Quad 4-Leaf Bi-Level 304 Stainless Steel Blades',
      'Operation': 'Push-to-Start Pulse Button Mechanism',
      'Base': 'Non-Slip Anti-Skid Rubber Base Ring',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'roti-maker',
    name: 'Roti Maker',
    category: 'Small Kitchen Appliances',
    tag: 'Soft Chapatis',
    image: '/assets/products/roti-maker.jpg',
    shortDescription: 'Automatic electric roti maker with non-stick granite coating, thermostatic heat control, and shock-proof handle.',
    description: 'Make round, soft, and puffed chapatis, rotis, and parathas without rolling pins or hot tawas. Features dual non-stick granite-coated heating plates, shock-proof Bakelite handles, and automatic thermostat cutoff for uniform, effortless rotis.',
    highlights: [
      'High-grade non-stick granite coating prevents dough from sticking or tearing',
      'Dual upper and lower heating plates cook rotis evenly from both sides',
      'Thermostatic temperature regulator maintains ideal heat for maximum puffing',
      'Ergonomic insulated handle allows easy pressing without heat transfer'
    ],
    specs: {
      'Plate Diameter': '8.5 Inches (approx. 21.5 cm) Cooking Surface',
      'Power Rating': '900 Watts Fast Dual Heating Elements',
      'Plates Coating': 'Multi-Layer Scratch-Resistant Non-Stick Granite Coating',
      'Body': 'Stainless Steel Outer Cover with Shock-Proof Insulated Handle',
      'Indicators': 'Dual Power & Ready Temperature Indicator Lamps',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  },
  {
    id: 'deep-fryer',
    name: 'Deep Fryer',
    category: 'Small Kitchen Appliances',
    tag: 'Golden Crisp',
    image: '/assets/products/deep-fryer.jpg',
    shortDescription: 'Electric deep fryer with adjustable thermostat, stainless steel wire fry basket, and viewing window lid.',
    description: 'Fry restaurant-quality crispy pakoras, samosas, fries, and tempura with temperature precision. The submerged heating element heats oil quickly while preventing burning, paired with an odor filter lid and a lift-up wire basket with a cool-touch handle.',
    highlights: [
      'Adjustable thermostat from 130°C to 190°C ensures optimal frying temperatures',
      'Submerged heating element technology prevents sediment from burning at the bottom',
      'Viewing window in the lid allows monitoring browning without opening hot oil',
      'Removable wire fry basket with drain clip hooks to shake off excess oil'
    ],
    specs: {
      'Oil Capacity': '2.5 Litres Stainless Oil Reservoir',
      'Power Rating': '1800 Watts Fast-Immersion Heating',
      'Temperature Range': '130°C to 190°C Thermostatic Dial',
      'Lid': 'Detachable Lid with Anti-Odor Charcoal Filter & View Window',
      'Safety': 'Overheat Thermal Cutoff & Cool-Touch Housing',
      'Warranty / Support': '1 Year Comprehensive Warranty'
    }
  }
];

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2), 'utf-8');
console.log('Successfully written ' + products.length + ' products to src/data/products.json');
