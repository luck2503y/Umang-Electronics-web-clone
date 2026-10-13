import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Wrench, Sparkles, HelpCircle } from 'lucide-react';
import CTASection from '../components/CTASection';

const docModules = [
  {
    id: 'module-1',
    number: 'Module 1',
    title: 'Smart Buying Guides',
    lessons: [
      {
        id: 'ac-tonnage-sizing',
        title: 'AC Tonnage Sizing & Room Calculator',
        content: `Selecting the right air conditioner tonnage is crucial for cooling efficiency, power consumption, and compressor lifespan.

1. Room Area Guidelines:
• Up to 120 sq. ft.: 1.0 Ton Split Inverter AC
• 120 sq. ft. to 180 sq. ft.: 1.5 Ton Split Inverter AC
• 180 sq. ft. to 260 sq. ft.: 2.0 Ton Split Inverter AC

2. Crucial Correction Factors:
• Top Floor / Direct Sun Exposure: Add 0.5 Ton to compensate for roof heat radiation.
• Glass Windows: Large west-facing windows increase thermal load by 15-20%.
• Occupancy: If the room consistently holds more than 4 individuals, increase cooling capacity.

3. Inverter vs Fixed Speed:
Inverter air conditioners adjust compressor speed dynamically once target temperature is reached, saving up to 30-40% on annual electricity costs compared to conventional fixed-speed units.`
      },
      {
        id: 'refrigerator-selection',
        title: 'Refrigerator Types & Capacity Guide',
        content: `Choosing between single door, frost-free double door, and multi-door refrigerators depends on your household size and food storage habits.

1. Capacity by Family Size:
• 1-2 Members: 190L to 230L (Direct Cool or Single Door)
• 3-4 Members: 240L to 350L (Double Door Frost-Free)
• 5+ Members: 400L+ (Side-by-Side or Multi-Door Inverter)

2. Frost-Free vs Direct-Cool:
• Direct-Cool models utilize natural convection cooling; they require manual defrosting periodically and consume less baseline power.
• Frost-Free models use electric fans and multi-airflow vents to circulate cold air uniformly. Defrosting is 100% automated, preventing icy buildup on freezer shelves.

3. Convertible Zones:
Many modern inverter refrigerators feature 5-in-1 convertible modes that allow converting freezer space into extra fresh-food storage during family gatherings or seasonal changes.`
      },
      {
        id: 'oled-vs-qled',
        title: 'Display Tech: OLED vs QLED vs Smart LED',
        content: `Understanding display panel technology ensures you invest in the right TV for your viewing environment.

1. OLED (Organic Light Emitting Diode):
• Pixel Technology: Every single pixel produces its own light and can turn completely off.
• Contrast: Infinite contrast ratio with true, absolute black levels.
• Best For: Dark room cinema viewing, high-end console gaming (120Hz VRR), and ultra-wide viewing angles without color wash.

2. QLED (Quantum Dot LED):
• Pixel Technology: Uses an LED backlight enhanced with microscopic semiconductor quantum dots.
• Brightness: Reaches ultra-high peak nit brightness (1000-2000 nits) with 100% color volume.
• Best For: Bright, sunlit living rooms and daytime sports watching where glare resistance is paramount.

3. Standard LED / 4K UHD:
• High reliability and exceptional value for everyday streaming, news broadcasts, and standard entertainment setups.`
      },
      {
        id: 'kitchen-appliance-checklist',
        title: 'Small Kitchen Appliance Sizing & Wattage',
        content: `Small appliances must balance kitchen counter footprint with adequate motor horsepower.

1. Mixer Grinders:
• 500W Motors: Suitable for daily light blending, chutneys, and fruit shakes.
• 750W to 1000W Motors: Essential for tough dry spice grinding, turmeric, batter preparation, and continuous load. Look for 100% copper-wound motors with overload reset switches.

2. Air Fryers:
• 3.5L to 4.5L: Perfect for individuals and nuclear families (2-3 servings).
• 5.5L to 8.0L: Best for whole roasts, large batch snacks, and families of 4 or more. Rapid 360° air circulation replaces deep oil immersion with hot air crisping.

3. Induction Cooktops:
• Select 2000W models for rapid boiling comparable to LPG flames. Ensure your cookware has a flat magnetic bottom marked induction-compatible.`
      }
    ]
  },
  {
    id: 'module-2',
    number: 'Module 2',
    title: 'Installation & Setup Guides',
    lessons: [
      {
        id: 'split-ac-installation',
        title: 'Split AC Wall Mounting & Piping Guidelines',
        content: `Proper installation accounts for over 80% of an air conditioner's lifetime reliability and cooling efficiency.

1. Indoor Unit Placement:
• Maintain at least 15 cm (6 inches) of open clearance above the indoor unit for unrestricted intake airflow.
• Mount at a minimum height of 7-8 feet from the floor for balanced thermal circulation.
• Avoid mounting directly above electronic TVs or sensitive audio equipment.

2. Outdoor Condenser Unit:
• Position in an open, well-ventilated exterior area with at least 60 cm rear and side clearance.
• Use heavy-duty anti-vibration rubber dampers beneath mounting brackets to prevent wall resonance.
• Keep the copper refrigerant piping length between 3 and 15 meters for optimal pressure balance.

3. Nitrogen Leak & Vacuum Test:
• Technicians must pull a vacuum (using a dual-stage vacuum pump) below 500 microns before opening service valves to eliminate internal moisture and non-condensable air.`
      },
      {
        id: 'washer-dishwasher-plumbing',
        title: 'Washer & Dishwasher Plumbing & Drainage',
        content: `Water inlet pressure and drain routing must adhere to strict manufacturer parameters.

1. Water Inlet Pressure:
• Front-load washing machines and dishwashers require 0.5 to 10 Bar (approx. 7.3 to 145 psi) water pressure.
• If water flow from your tap is sluggish (takes > 15 seconds to fill a 1-litre bottle), install an inline pressure booster pump.

2. Drain Hose Elevation:
• For front-load washers, the drain hose must be hooked into a standpipe or wall drain between 65 cm and 100 cm above floor level to prevent continuous water siphoning.
• Avoid submerging the drain hose end directly into deep standing water.

3. Transit Bolt Removal:
• WARNING: Never operate a new front-load washer before removing all 4 rear shipping/transit bolts. Operating with transit bolts in place causes severe drum vibration and structural chassis damage.`
      },
      {
        id: 'surround-audio-placement',
        title: '5.1 Home Theatre & Soundbar Calibration',
        content: `Acoustic placement transforms standard audio into authentic cinematic immersion.

1. Soundbar Positioning:
• Place centered directly below the television screen, aligned with viewer eye/ear level.
• Do not enclose soundbars inside tight wooden cubbies or shelves, as upward and side-firing spatial drivers require clear wall reflections.

2. 5.1 Surround Speaker Layout:
• Center Channel: Placed directly above or below the TV screen for dedicated dialogue anchoring.
• Front Left & Right: Positioned at 22° to 30° angles from the primary listening sofa.
• Rear Surround Speakers: Positioned slightly behind and 1-2 feet above ear level, angled inward toward the seating area.
• Subwoofer: Place along the front wall or room corner for optimal acoustic boundary coupling.

3. HDMI eARC Configuration:
• Always connect your soundbar or AVR to the TV's dedicated HDMI port labeled eARC (Enhanced Audio Return Channel). Enable Dolby Atmos / Bitstream passthrough in TV audio settings.`
      },
      {
        id: 'electrical-safety',
        title: 'Electrical Grounding & Surge Protection',
        content: `High-wattage appliances require dedicated circuits and verified earthing to protect electronic control boards.

1. Dedicated Circuit Ratings:
• Air Conditioners: 16A / 20A MCB with heavy-duty 3-pin power socket.
• Water Heaters (Geysers): Dedicated 16A socket with high-sensitivity ELCB/RCCB earth leakage breaker.
• Microwave & Dishwasher: Dedicated 16A socket; never share via multi-plug adapters.

2. Voltage Fluctuation Safeguards:
• While many modern appliances feature wide-range inverter PCBs (130V to 280V), areas experiencing frequent voltage surges should be paired with digital voltage stabilizers.

3. Earthing Verification:
• Voltage measured between Neutral and Earth pins must remain below 3.0 Volts AC. Excessive neutral-earth leakage degrades PCB microcontrollers over time.`
      }
    ]
  },
  {
    id: 'module-3',
    number: 'Module 3',
    title: 'Appliance Maintenance & Care',
    lessons: [
      {
        id: 'ac-filter-cleaning',
        title: 'AC Dust Filter & Coil Cleaning Routine',
        content: `Regular filter cleaning preserves cooling efficiency and cuts monthly power consumption by up to 15%.

1. Every 2 Weeks: Indoor Mesh Filters
• Switch off main AC power. Gently lift the front panel and slide out the mesh dust filters.
• Rinse under lukewarm running tap water (avoid harsh soaps or hot water).
• Allow filters to air-dry completely in the shade before sliding back into the housing.

2. Every 6 Months: Deep Indoor Coil Wash
• Inspect cooling fins for dust blanket buildup.
• Use a soft nylon bristle brush or specialized non-corrosive foaming coil cleaner.
• Never bend the aluminum heat exchanger fins.

3. Seasonal Outdoor Inspection:
• Clear dry leaves, cobwebs, and debris from the outdoor condenser unit. Ensure unobstructed air discharge from the fan grill.`
      },
      {
        id: 'ro-membrane-servicing',
        title: 'Water Purifier Filter Replacement Schedule',
        content: `Protecting your drinking water requires adherence to membrane replacement cycles.

1. Pre-Filter / Spun Sediment Candle (Every 3 to 4 Months):
• Traps visible mud, sand, and rust from municipal or borewell lines. Replace promptly when filter turns dark brown.

2. Activated Carbon Block (Every 6 to 9 Months):
• Adsorbs chlorine, pesticides, foul odor, and volatile organic compounds that would otherwise degrade the sensitive RO membrane.

3. RO Membrane (Every 12 to 24 Months):
• The microscopic core of the purifier. Test your output water TDS (Total Dissolved Solids) monthly with a digital TDS meter.
• If purified water TDS exceeds 20% of raw input water TDS, or flow rate slows to a trickle, replace the RO membrane immediately.

4. UV Lamp & Chamber (Every 12 Months):
• Ultraviolet lamps lose germicidal irradiance over time. Replace the UV bulb annually regardless of whether the filament is still lit.`
      },
      {
        id: 'washer-descaling',
        title: 'Washing Machine Drum Descaling & Lint Filter Care',
        content: `Hard water minerals and detergent residues accumulate inside washer outer tubs, causing odors and motor strain.

1. Monthly Tub Clean / Descaling:
• Add 100g of food-grade citric acid or specialized appliance descaling powder directly into the empty wash drum.
• Run the dedicated 'Tub Clean' cycle (or normal cycle at 60°C hot water setting).
• Descaling dissolves mineral scale from heating elements, restoring thermal efficiency.

2. Drain Pump Filter Cleaning (Every 4 Weeks):
• Open the lower front access flap. Place a shallow tray to catch residual water.
• Unscrew the coin/lint trap filter counterclockwise. Clear lint, coins, hairpins, and threads. Rinse clean and reseal tightly.

3. Door Gasket Drying:
• After every wash cycle, wipe the front rubber door bellows dry with a microfiber cloth and leave the door slightly ajar for 30 minutes to prevent mildew odor.`
      },
      {
        id: 'kitchen-appliance-care',
        title: 'Kitchen Appliance Care: Air Fryers, OTGs & Mixers',
        content: `Extend the working life of your culinary equipment with safe cleaning practices.

1. Air Fryer Baskets:
• Never use metal scrubbing pads or abrasive scouring powders on non-stick crisper plates.
• Soak the basket in warm soapy water for 10 minutes to loosen caramelized grease, then wipe with a soft cellulose sponge.

2. Mixer Grinder Motor Base & Couplers:
• Never immerse the motorized mixer base in water. Wipe clean with a damp cloth.
• Inspect the rubber jar coupler teeth periodically; replace if worn to avoid stripping motor drive gears.
• If the motor suddenly stops under heavy load, wait 2 minutes and press the red Overload Protector (OLP) reset button on the base.

3. Convection Microwave / OTG Interiors:
• Wipe interior ceramic enamel walls immediately after cooking splatters. Place a bowl of water with lemon slices and microwave on high for 3 minutes to steam-clean dried stains.`
      }
    ]
  },
  {
    id: 'module-4',
    number: 'Module 4',
    title: 'Warranty & Support Procedures',
    lessons: [
      {
        id: 'warranty-registration',
        title: 'Official Manufacturer Warranty Registration',
        content: `Every electronic product supplied by Umang Electronics carries authentic manufacturer warranty backed by authorized brand service networks.

1. Required Documentation:
• Original Umang Electronics Tax Invoice / Purchase Receipt.
• Warranty card provided in product packaging containing the serial number.
• Model number barcode label affixed to appliance chassis.

2. Standard Warranty Durations:
• Comprehensive Appliance Warranty: Typically 1 to 2 Years covering electrical circuits, controls, and moving parts.
• Digital Inverter Compressors (Refrigerators & ACs): 5 to 10 Years limited warranty.
• Direct Drive / Inverter Washer Motors: 10 Years limited motor warranty.
• Storage Water Heater Tanks: Up to 5 to 7 Years tank anti-leak warranty.

3. What Is Excluded:
• Physical damage from external impacts, lightning strikes without surge protection, pest infestation inside control boards, and unauthorized third-party tampering.`
      },
      {
        id: 'troubleshooting-checklist',
        title: 'Pre-Service Diagnostic Quick Checklist',
        content: `Before raising a technical service call, perform these basic preliminary verification checks:

1. Power Supply Check:
• Verify whether the dedicated wall socket has power by testing with another small device.
• Check if the circuit breaker (MCB) or Earth Leakage Breaker (ELCB) has tripped in the main distribution board.

2. Water Supply Valves:
• For washers, dishwashers, and water purifiers, ensure the angle cock inlet valve is turned fully open and inlet mesh filters are free from silt.

3. Remote Controls & Sensors:
• Check battery condition in AC or TV remote controls. Ensure the infrared receiver window on the appliance is unobstructed.

4. Appliance Error Codes:
• Check if the digital display flashes an alphanumeric error code (e.g., E1, OE, dE, F0). Note the exact code down; our support team can immediately identify the underlying sensor state.`
      },
      {
        id: 'request-service-visit',
        title: 'Scheduling Doorstep Support & Helpdesk',
        content: `Umang Electronics coordinates authorized doorstep technician visits for all catalogued appliances.

1. Initiating a Service Request:
• Click 'Enquire Now' or 'Ask a Specialist' anywhere on our website, or contact our customer support desk.
• Provide your Invoice Number, Appliance Model, Serial Number, and a brief description of the observed issue.

2. Authorized Technician Visit:
• A certified technician from the brand's authorized service network will be assigned with a tracking ticket number.
• Technicians utilize original OEM replacement components to preserve your manufacturer warranty validity.

3. Post-Service Validation:
• Always ensure the technician demonstrates normal appliance operation before signing the job completion sheet.`
      }
    ]
  }
];

export default function Docs({ onOpenContact }) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    document.title = "Appliance Guides & Support Center — Umang Electronics";
    window.scrollTo(0, 0);
  }, []);

  const currentModule = docModules[activeModuleIndex];
  const currentLesson = currentModule.lessons[activeLessonIndex];

  return (
    <main style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', paddingTop: '130px' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 40px 120px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          columnGap: '60px',
          rowGap: '40px'
        }}
        className="docs-layout-grid"
      >
        {/* Left Sidebar: Modules & Lessons */}
        <aside
          style={{
            position: 'sticky',
            top: '120px',
            maxHeight: 'calc(100vh - 140px)',
            overflowY: 'auto',
            paddingRight: '16px'
          }}
          className="docs-sidebar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <BookOpen size={18} style={{ color: '#ffffff' }} />
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#ffffff' }}>Appliance Guides Hub</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {docModules.map((mod, modIdx) => (
              <div key={mod.id}>
                <div
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(255, 255, 255, 0.45)',
                    marginBottom: '8px'
                  }}
                >
                  {mod.number} · {mod.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {mod.lessons.map((les, lesIdx) => {
                    const isSelected = activeModuleIndex === modIdx && activeLessonIndex === lesIdx;
                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModuleIndex(modIdx);
                          setActiveLessonIndex(lesIdx);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: isSelected ? '500' : '400',
                          color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease',
                          gap: '8px'
                        }}
                      >
                        <span style={{ lineHeight: '1.4' }}>{les.title}</span>
                        {isSelected && <ChevronRight size={14} style={{ flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Content Area: Lesson Viewer */}
        <article
          style={{
            backgroundColor: '#111827',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '48px',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            {/* Breadcrumb Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: '16px'
              }}
            >
              <span>{currentModule.number}</span>
              <span>·</span>
              <span>{currentModule.title}</span>
            </div>

            <h1
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                color: '#ffffff',
                margin: '0 0 32px 0'
              }}
            >
              {currentLesson.title}
            </h1>

            {/* Formatted Content */}
            <div
              style={{
                fontFamily: '"TWK Lausanne 300", sans-serif',
                fontSize: '15px',
                lineHeight: '26px',
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '-0.08px',
                whiteSpace: 'pre-line'
              }}
            >
              {currentLesson.content}
            </div>
          </div>

          {/* Bottom Lesson Navigation Bar */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>Official Electronics Guide · Umang Electronics</span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Next Lesson Button */}
              {activeLessonIndex < currentModule.lessons.length - 1 ? (
                <button
                  onClick={() => setActiveLessonIndex(activeLessonIndex + 1)}
                  className="glass-pill-btn"
                  style={{
                    padding: '10px 20px',
                    fontSize: '13px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Next Guide</span>
                  <ArrowRight size={14} />
                </button>
              ) : activeModuleIndex < docModules.length - 1 ? (
                <button
                  onClick={() => {
                    setActiveModuleIndex(activeModuleIndex + 1);
                    setActiveLessonIndex(0);
                  }}
                  className="glass-pill-btn"
                  style={{
                    padding: '10px 20px',
                    fontSize: '13px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Next Module</span>
                  <ArrowRight size={14} />
                </button>
              ) : null}

              <button
                onClick={onOpenContact}
                className="glass-pill-btn"
                style={{
                  padding: '10px 20px',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ffffff',
                  color: '#000000',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Talk to Support
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Bottom CTA Section */}
      <CTASection onOpenContact={onOpenContact} />

      <style>{`
        @media (max-width: 810px) {
          .docs-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .docs-sidebar {
            position: static !important;
            max-height: none !important;
          }
        }
      `}</style>
    </main>
  );
}
