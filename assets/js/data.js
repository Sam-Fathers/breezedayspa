/* ==========================================================================
   MEANDER & MYRTLE — CONTENT + CONFIG
   --------------------------------------------------------------------------
   ▸ EDIT EVERYTHING ABOUT YOUR BUSINESS IN THE `SITE` OBJECT BELOW.
     Nothing else in the codebase needs to change. Phone numbers, email,
     address, hours, booking links and the gift card payment link all
     flow from here into every button on the site.
   ========================================================================== */

const SITE = {
  /* --- IDENTITY (placeholder — replace) ------------------------------- */
  name: 'Meander & Myrtle',
  shortName: 'Meander & Myrtle',
  tagline: 'Day spa · Deloraine',
  therapist: {
    name: 'Brea',
    role: 'Owner & remedial therapist',
    quals: 'Dip. Remedial Massage · Cert IV Beauty Therapy',
  },

  /* --- CONTACT (placeholder — replace) -------------------------------- */
  phone: '0456 148 459',
  phoneDial: '+61456148459',
  email: 'hello@meanderandmyrtle.com.au',
  address: {
    line1: '00 Emu Bay Road',
    suburb: 'Deloraine',
    state: 'TAS',
    postcode: '7304',
  },
  mapUrl: 'https://maps.google.com/?q=Deloraine+Tasmania',

  /* --- HOURS ---------------------------------------------------------- */
  hours: [
    { day: 'Monday',    open: 'Closed' },
    { day: 'Tuesday',   open: '9:00am – 5:00pm' },
    { day: 'Wednesday', open: '9:00am – 7:00pm' },
    { day: 'Thursday',  open: '9:00am – 7:00pm' },
    { day: 'Friday',    open: '9:00am – 5:00pm' },
    { day: 'Saturday',  open: '9:00am – 2:00pm' },
    { day: 'Sunday',    open: 'By arrangement' },
  ],

  /* --- LINKS ---------------------------------------------------------- */
  giftCardUrl: 'https://example.com/gift-cards',   // ← your payment page
  bookingUrl: '',                                  // optional external booking system
  instagram: '',
  facebook: '',
};

/* ==========================================================================
   PHOTOGRAPHY SLOTS
   --------------------------------------------------------------------------
   Drop photos into assets/img/ and put the filename here. Leave a slot empty
   and the site draws a woven texture instead — it never shows a broken image
   or a stock-photo placeholder. Recommended: 1600px wide, JPG or WebP.
   ========================================================================== */

const IMAGES = {
  room:  '',   // the treatment room, or Brea at work        — portrait 4:5
  brea:  '',   // headshot                                    — square
  sauna: '',   // the cabin, door open, lights on             — landscape 3:2
  chair: '',   // the chair in its corner                     — portrait 4:5
  gift:  '',   // a printed gift card on timber               — landscape 3:2
};

/* ==========================================================================
   TREATMENT CATEGORIES
   ========================================================================== */

const CATEGORIES = [
  { id: 'body',  label: 'Body',          long: 'Body massage' },
  { id: 'face',  label: 'Face',          long: 'Facials' },
  { id: 'hands', label: 'Hands & Feet',  long: 'Hands & feet' },
];

/* ==========================================================================
   TREATMENTS
   Durations are minutes. Only real, offered lengths are listed — a
   15-minute facial isn't a treatment, so it isn't priced like one.
   ========================================================================== */

const SERVICES = [

  /* ---------------------------------------------------------------- BODY */
  {
    id: 'meander-unwind', cat: 'body',
    name: 'The Meander Unwind',
    eyebrow: 'Signature',
    teaser: 'Long, slow, full-body strokes that talk your nervous system down.',
    body: 'Our house relaxation massage, and the one most people book first. Unhurried flowing strokes travel the whole body in one continuous rhythm, with warm oil and no sudden changes in pressure. The point is not to fix anything. The point is to give your body an hour where nothing is being asked of it.',
    includes: ['Full body: back, legs, arms, neck, scalp', 'Warm cold-pressed oil, lightly scented or unscented', 'Heated table and heated neck bolster', 'Ten quiet minutes afterwards with tea, no rush to leave'],
    good: ['Stress', 'Poor sleep', 'First-timers'],
    prices: { 60: 105, 90: 155 },
  },
  {
    id: 'remedial', cat: 'body',
    name: 'Remedial Corrective',
    eyebrow: 'Therapeutic',
    teaser: 'Assessment first, then targeted work on what is actually causing the pain.',
    body: 'A treatment that starts with questions and movement testing rather than oil. We find which muscles are overworking, treat them with deep pressure, trigger point release and stretching, then retest to check it changed something. You leave with two or three things to do at home so the result holds.',
    includes: ['Postural and range-of-movement assessment', 'Trigger point, deep tissue and myofascial technique', 'Assisted stretching through the treated area', 'Written home care: stretches, heat, load advice', 'Private health rebate available on the spot'],
    good: ['Chronic pain', 'Injury', 'Health fund claim'],
    prices: { 30: 65, 45: 90, 60: 118, 90: 168 },
  },
  {
    id: 'deep-tissue', cat: 'body',
    name: 'Deep Tissue Release',
    teaser: 'Slow, firm, forearm-and-elbow pressure into the layers underneath.',
    body: 'Sustained pressure held long enough for tissue to soften rather than brace. We work slowly through the thick fascia of the back, hips and shoulders using forearms and elbows, breathing with you through the tender spots. Firm, but never a fight — you set the ceiling and we work just under it.',
    includes: ['Focus on up to three regions of your choice', 'Sustained compression and slow fascial work', 'Heat pack applied through the tightest areas', 'Post-treatment water and pressure-point self-release tips'],
    good: ['Tradies', 'Farm work', 'Desk-locked shoulders'],
    prices: { 30: 60, 45: 85, 60: 110, 90: 160 },
  },
  {
    id: 'back-neck-shoulders', cat: 'body',
    name: 'Back, Neck & Shoulders',
    teaser: 'The three places everyone holds it. Straight there, nothing else.',
    body: 'No full-body detour. We go directly to the upper back, the base of the neck, the tops of the shoulders and the space between the shoulder blades, and stay there for the whole appointment. The most requested treatment on the menu, and the easiest to fit into a lunch break.',
    includes: ['Upper back, shoulders, neck and scalp base', 'Optional dry needling-free trigger point work', 'Hot towel through the shoulders to finish', 'Stay clothed from the waist down'],
    good: ['Headaches', 'Driving', 'Screen work'],
    prices: { 15: 35, 30: 60, 45: 85 },
  },
  {
    id: 'warm-stone', cat: 'body',
    name: 'Warm Basalt Stone',
    eyebrow: 'Winter favourite',
    teaser: 'Heat that gets deeper than hands alone can reach.',
    body: 'Smooth basalt stones are heated and placed along the spine and in the palms while warmed stones are worked through the muscles as an extension of the hands. Heat opens the tissue before pressure arrives, so the work goes deeper without going harder. Between June and September we can barely keep up with demand for this one.',
    includes: ['Placement stones along the spine and hands', 'Full-body massage using heated stones and hands', 'Warmed table, blanket and neck wrap throughout', 'Cool stone finish across the face and temples'],
    good: ['Cold weather', 'Deep ache', 'Arthritic stiffness'],
    prices: { 60: 125, 90: 175 },
  },
  {
    id: 'aromatherapy', cat: 'body',
    name: 'Aromatherapy Ritual',
    teaser: 'You choose the blend by smell, before a word is spoken about it.',
    body: 'We start with three small bottles under your nose and you pick the one your body reacts to. That blend is warmed and worked through the full body with slow lymphatic-direction strokes, finishing with a long scalp and temple sequence. It is the most sensory treatment we do and the one people describe as the closest thing to falling asleep awake.',
    includes: ['Blind blend selection: calm, clear or restore', 'Full-body massage with warmed blended oil', 'Extended scalp, ear and temple sequence', 'Take-home roller of your chosen blend'],
    good: ['Overwhelm', 'Anxiety', 'A real switch-off'],
    prices: { 60: 118, 90: 168 },
  },
  {
    id: 'pregnancy', cat: 'body',
    name: 'Pregnancy Massage',
    teaser: 'Side-lying, fully bolstered, from the second trimester onward.',
    body: 'Supported on your side with cushions under the belly, between the knees and along the back, so nothing is compressed and you can stay comfortable for the whole appointment. Gentle work through the lower back, hips and legs where the load has shifted, plus the shoulders and upper back that carry the rest of it.',
    includes: ['Full side-lying bolster set-up', 'Lower back, hips, glutes and legs', 'Gentle lower leg and ankle work for swelling', 'Available from 12 weeks with GP clearance if needed'],
    good: ['Second & third trimester', 'Hip and back load'],
    prices: { 45: 90, 60: 115 },
  },
  {
    id: 'sports-recovery', cat: 'body',
    name: 'Sports & Recovery',
    teaser: 'Faster, more rhythmic work for bodies that have to perform again soon.',
    body: 'Built for the day before or the day after. Brisk compression, muscle flushing and active stretching through the working muscle groups, at a pace that leaves you loose rather than sleepy. Say which event you are training for and we will adjust depth and technique to suit where you are in the week.',
    includes: ['Compression flushing through major muscle groups', 'Active and passive stretching', 'Joint mobilisation through hips, ankles and shoulders', 'Pre-event or post-event protocol, your call'],
    good: ['Training load', 'Race week', 'DOMS'],
    prices: { 30: 60, 45: 85, 60: 110 },
  },
  {
    id: 'lymphatic', cat: 'body',
    name: 'Lymphatic Drainage',
    teaser: 'Featherlight, rhythmic and directional. Far gentler than it sounds.',
    body: 'Very light, repetitive strokes that follow the lymphatic pathways toward the nodes, encouraging fluid to move rather than sit. The pressure is barely more than a hand resting on skin. Often booked after surgery, during a flare, or in the weeks when everything feels puffy and heavy.',
    includes: ['Sequential drainage: neck, chest, abdomen, limbs', 'Extremely light, slow, repeated strokes', 'Elevated leg positioning where needed', 'Hydration and movement guidance to extend the effect'],
    good: ['Fluid retention', 'Post-surgical', 'Heavy legs'],
    prices: { 45: 90, 60: 115 },
  },
  {
    id: 'cupping', cat: 'body',
    name: 'Myofascial Cupping',
    teaser: 'Suction that lifts tissue instead of pressing it. Different, and it works.',
    body: 'Silicone cups create a gentle vacuum that lifts skin and fascia away from the muscle underneath, decompressing tissue that manual pressure can only push down on. We glide the cups through oiled areas and park them briefly over stubborn spots. Marks can appear and fade over a few days — we will show you what to expect first.',
    includes: ['Gliding and stationary cupping over the treated area', 'Combined with hands-on release either side', 'Aftercare advice on marking and hydration', 'Add to any body massage as a 15-minute extension'],
    good: ['Stubborn knots', 'Tight IT bands', 'Scar tissue'],
    prices: { 30: 65, 45: 90 },
  },
  {
    id: 'farmers-back', cat: 'body',
    name: "The Farmer's Back",
    eyebrow: 'Local',
    teaser: 'Built for bodies that lift, fence, shear and sit in a ute all afternoon.',
    body: 'Written for the way work actually loads a body around here. Deep work through the lower back, glutes and hip flexors that take the strain of lifting and long hours seated, hot towels through the lumbar spine, then forearms and grip. Boots off, everything else stays on if you would rather.',
    includes: ['Lower back, glutes, hip flexors and hamstrings', 'Forearm, wrist and grip release', 'Hot towel compress through the lumbar spine', 'Practical advice on lifting and seat position'],
    good: ['Farm work', 'Trades', 'Long hours seated'],
    prices: { 30: 60, 45: 85, 60: 110 },
  },
  {
    id: 'scalp-decolletage', cat: 'body',
    name: 'Scalp, Neck & Décolletage',
    teaser: 'Twenty minutes of scalp work undoes more than people expect.',
    body: 'Seated or reclined, fully clothed, with warm oil worked slowly through the scalp, the base of the skull, the jaw and down across the collarbones. The area where tension shows up as headaches and clenching, and almost nobody thinks to treat it.',
    includes: ['Slow scalp and occipital base release', 'Jaw, temple and ear point work', 'Neck and décolletage with warm oil', 'Choice of oil in hair, or dry technique'],
    good: ['Headaches', 'Jaw clenching', 'Between appointments'],
    prices: { 15: 35, 30: 60, 45: 85 },
  },

  /* -------------------------------------------------------------- FACIALS */
  {
    id: 'clarity-facial', cat: 'face',
    name: 'Clarity Facial',
    teaser: 'A proper deep cleanse, with extractions if your skin wants them.',
    body: 'Double cleanse, warm steam, gentle exfoliation and manual extractions where they are needed, followed by a clay or gel mask matched to what we find. The workhorse facial: no drama, visible difference, and the one to start with if you have never had a facial before.',
    includes: ['Double cleanse and skin analysis under lamp', 'Steam and enzymatic exfoliation', 'Manual extractions as needed', 'Targeted mask, serum, moisturiser and SPF', 'Neck, shoulder and hand massage while the mask sets'],
    good: ['Congestion', 'Breakouts', 'First facial'],
    prices: { 30: 70, 45: 95, 60: 125 },
  },
  {
    id: 'hydration-facial', cat: 'face',
    name: 'Deep Hydration Facial',
    eyebrow: 'Winter favourite',
    teaser: 'For skin that has spent a Tasmanian winter next to a wood heater.',
    body: 'Layered hydration rather than a single heavy cream. Hyaluronic serums are pressed into damp skin, sealed with a nourishing mask and a facial oil, and worked in with slow lymphatic massage. Built for the tight, flaky, wind-stung skin that comes with cold mornings and dry indoor heat.',
    includes: ['Cream cleanse and gentle lactic exfoliation', 'Layered hyaluronic and ceramide serums', 'Cream or bio-cellulose hydrating mask', 'Extended facial and décolletage massage', 'Barrier balm and SPF finish'],
    good: ['Dryness', 'Tightness', 'Wind and heater burn'],
    prices: { 45: 95, 60: 125 },
  },
  {
    id: 'gua-sha', cat: 'face',
    name: 'Gua Sha Lift & Sculpt',
    teaser: 'Stone tools along the jaw and cheekbones. You can see it afterwards.',
    body: 'Warm oil and a contoured stone worked in firm, upward, directional strokes along the jaw, cheekbones, brow and neck to move fluid and release the muscles that pull the face downward. Puffiness drops, the jawline sharpens, and the effect lasts a few days. Popular before weddings, birthdays and the Craft Fair.',
    includes: ['Facial cleanse and oil application', 'Full gua sha sequence: jaw, cheek, brow, neck', 'Intra-oral jaw release on request', 'Cooling globes to finish', 'Home gua sha technique demonstration'],
    good: ['Puffiness', 'Jaw tension', 'An event tomorrow'],
    prices: { 30: 70, 45: 95 },
  },
  {
    id: 'enzyme-resurface', cat: 'face',
    name: 'Enzyme Resurfacing',
    eyebrow: 'Results',
    teaser: 'Fruit enzymes that eat dull skin without the sandpaper.',
    body: 'A pumpkin and papaya enzyme treatment that digests dead surface cells chemically rather than scrubbing them off, so it suits skin too reactive for a physical scrub. Texture smooths, tone evens, and makeup sits better for a fortnight afterwards. We build strength gradually across a course rather than going hard once.',
    includes: ['Skin analysis and strength selection', 'Pumpkin or papaya enzyme application under steam', 'Neutralise, then vitamin B and C serum', 'Calming mask and barrier repair cream', 'SPF and a plan for the next four weeks'],
    good: ['Dullness', 'Uneven texture', 'Pigment'],
    prices: { 45: 100, 60: 130 },
  },
  {
    id: 'calm-facial', cat: 'face',
    name: 'Calm Sensitive Skin Facial',
    teaser: 'No acids, no steam, no heat. For skin that reacts to everything.',
    body: 'Built for rosacea, reactivity and skin that has been overtreated. Everything is applied cool, cleansing is done with milk and cotton rather than friction, and the actives are limited to niacinamide, panthenol and centella. The goal is a calmer barrier, not a faster result.',
    includes: ['Cool milk cleanse, no friction, no steam', 'Niacinamide and centella barrier serum', 'Cryo globes through flushed areas', 'Cooling gel mask and mineral SPF', 'Honest advice on what to stop using at home'],
    good: ['Rosacea', 'Reactivity', 'Overexfoliated skin'],
    prices: { 45: 95, 60: 122 },
  },
  {
    id: 'infrared-skin', cat: 'face',
    name: 'Infrared Skin Renewal',
    eyebrow: 'Pairs with sauna',
    teaser: 'Warm infrared light plus facial massage, straight after a sauna session.',
    body: 'Skin is cleansed, treated with a peptide serum, then exposed to warm infrared and red light while a slow facial massage works the serum in. Booked directly after a sauna session so circulation is already up, which is when the skin takes everything in best. The most-requested pairing on the menu.',
    includes: ['Cleanse and peptide serum application', 'Red and near-infrared light exposure', 'Slow facial, jaw and décolletage massage', 'Ceramide seal and SPF', 'Discounted when booked with a sauna session'],
    good: ['Fine lines', 'Dull skin', 'Post-sauna'],
    prices: { 30: 75, 45: 100 },
  },
  {
    id: 'express-glow', cat: 'face',
    name: 'Express Glow',
    teaser: 'Cleanse, exfoliate, mask, moisturise. In and out in a school lunch break.',
    body: 'The short version, with nothing important cut. A quick analysis, an exfoliation matched to your skin, a fast-acting sheet or gel mask and a proper moisturise and SPF. Ideal as an add-on to a body massage, or when you are in town for an hour and want to use it well.',
    includes: ['Rapid cleanse and analysis', 'Exfoliation matched to your skin type', 'Fast-acting sheet or gel mask', 'Moisturiser, eye cream and SPF'],
    good: ['Time poor', 'Add-on', 'Before an event'],
    prices: { 15: 45, 30: 70 },
  },

  /* ------------------------------------------------------- HANDS AND FEET */
  {
    id: 'reflexology', cat: 'hands',
    name: 'Reflexology',
    eyebrow: 'Signature',
    teaser: 'Mapped pressure through the feet. Fully clothed, deeply strange, deeply good.',
    body: 'Firm thumb pressure applied to specific points across the soles, arches and toes that correspond to systems elsewhere in the body. You stay dressed and reclined under a blanket. Most people arrive sceptical and leave booking the next one, which is the most honest thing we can say about it.',
    includes: ['Warm herbal foot soak to begin', 'Full reflexology sequence, both feet', 'Lower leg and ankle massage', 'Balm and warm socks to finish', 'A quiet room and no conversation required'],
    good: ['Sceptics', 'Digestion', 'Whole-body reset'],
    prices: { 30: 60, 45: 85, 60: 108 },
  },
  {
    id: 'hot-foot-soak', cat: 'hands',
    name: 'Hot Foot Soak & Massage',
    teaser: 'A deep bowl of hot water and salts, then twenty minutes on the feet.',
    body: 'Feet soak in hot water with Tasmanian sea salt and essential oil while your shoulders get worked on, then come out for scrub, massage and balm. The single best treatment for the first genuinely cold week of the year, and the one grandparents keep getting given as gifts.',
    includes: ['Hot salt and oil soak', 'Sea salt scrub through feet and lower legs', 'Foot and calf massage with warm balm', 'Neck and shoulder massage while you soak', 'Warm socks to walk out in'],
    good: ['Cold feet', 'Winter', 'Gift'],
    prices: { 30: 58, 45: 82 },
  },
  {
    id: 'walkers-recovery', cat: 'hands',
    name: "Walker's Recovery",
    eyebrow: 'Local',
    teaser: 'For feet and calves that have just come down off the Tiers.',
    body: 'Written for anyone who has walked Meander Falls, Quamby Bluff or the Alum Cliffs and can feel it. Deep work through the arches, calves, Achilles and shins, with cold therapy through anything hot and swollen, and taping advice if a blister or a rolled ankle is involved.',
    includes: ['Deep arch, heel and plantar fascia release', 'Calf, shin and Achilles work', 'Cold therapy through inflamed areas', 'Ankle mobilisation and taping advice', 'Same-day appointments held for walkers where possible'],
    good: ['Bushwalkers', 'Plantar pain', 'Standing all day'],
    prices: { 30: 62, 45: 88 },
  },
  {
    id: 'hand-rescue', cat: 'hands',
    name: 'Hand & Forearm Rescue',
    teaser: 'For hands that garden, knit, quilt, type and grip all day.',
    body: 'Focused work through the small muscles of the hand, the thumb base, the wrist and the forearm flexors that seize up from repetitive gripping. Includes joint mobilisation through each finger and a warm paraffin-style wax dip if arthritis is part of the picture.',
    includes: ['Forearm, wrist and thenar release', 'Individual finger joint mobilisation', 'Warm wax treatment on request', 'Grip and tool-handling advice', 'Rich hand balm and cotton gloves to finish'],
    good: ['Arthritis', 'Craft & quilting', 'Repetitive gripping'],
    prices: { 15: 32, 30: 58 },
  },
  {
    id: 'warm-wax-hands', cat: 'hands',
    name: 'Warm Wax Hands',
    teaser: 'Hands dipped in warm wax, wrapped, and left to go quiet.',
    body: 'Layers of warm therapeutic wax are built up over the hands, then wrapped in mittens to hold the heat in while it draws deep into stiff joints. Heat is one of the few things that reliably eases arthritic hands, and this is the most thorough way to deliver it.',
    includes: ['Cleanse and rich balm application', 'Multiple warm wax layers, both hands', 'Insulated mittens and rest period', 'Gentle joint mobilisation after removal', 'Add to any treatment for a flat fee'],
    good: ['Arthritis', 'Cold hands', 'Dry skin'],
    prices: { 15: 30, 30: 52 },
  },
  {
    id: 'spa-pedicure', cat: 'hands',
    name: 'Spa Pedicure',
    teaser: 'Soak, shape, scrub, massage, polish. Nothing rushed.',
    body: 'A full pedicure that treats the feet rather than just the nails. Soak, cuticle care, nail shaping, heel and callus work, salt scrub through the lower leg, a real massage and your choice of polish, gel or a buffed natural finish.',
    includes: ['Herbal soak and cuticle care', 'Nail shaping and heel smoothing', 'Sea salt scrub, lower leg and foot', 'Ten-minute foot and calf massage', 'Polish, gel or buffed natural finish'],
    good: ['Sandal season', 'Heel cracks', 'Full treat'],
    prices: { 45: 88, 60: 112 },
  },
  {
    id: 'spa-manicure', cat: 'hands',
    name: 'Spa Manicure',
    teaser: 'Shaped, tidied, massaged and finished the way you want it.',
    body: 'Soak, shape, cuticle work, a hand and forearm massage that goes past the wrist, and your choice of finish. Practical enough for hands that work, elegant enough for a wedding.',
    includes: ['Soak, shape and cuticle work', 'Hand and forearm massage with warm balm', 'Polish, gel or buffed natural finish', 'Nail strengthening treatment on request'],
    good: ['Events', 'Working hands', 'Gift'],
    prices: { 30: 62, 45: 85 },
  },
];

/* ==========================================================================
   INFRARED SAUNA
   ========================================================================== */

const SAUNA = {
  eyebrow: 'Full spectrum infrared',
  title: 'The warmest room in Deloraine',
  lede: 'Infrared does not heat the air around you. It heats you — light at wavelengths your body absorbs directly, warming tissue from the inside at a temperature you can actually sit in and breathe. A traditional sauna runs at 85–95°C. Ours runs at 45–60°C, and goes deeper.',

  sessions: [
    { label: 'Single session',   dur: '30 min', price: 35, note: 'Solo or with one other' },
    { label: 'Long session',     dur: '45 min', price: 45, note: 'Recommended once you are used to the heat' },
    { label: 'Added to a treatment', dur: '30 min', price: 25, note: 'Before your massage or facial' },
    { label: 'Ten-session pass', dur: '30 min ×10', price: 280, note: 'Best value through winter' },
  ],

  spectrum: [
    { band: 'Near', nm: '700–1,400 nm', depth: 'Skin surface', what: 'Absorbed by the mitochondria in your cells, where it supports energy production, collagen and repair. This is the same wavelength range used in red light therapy.' },
    { band: 'Mid',  nm: '1,400–3,000 nm', depth: 'Soft tissue', what: 'Reaches past the skin into muscle, widening blood vessels and increasing circulation through joints and soft tissue. This is where most of the pain relief happens.' },
    { band: 'Far',  nm: '3,000–25,000 nm', depth: 'Deep muscle & core', what: 'The therapeutic workhorse. Penetrates up to 4 cm, raises core temperature, triggers a deep sweat and drives the cardiovascular effects the research is built on.' },
  ],

  benefits: [
    { icon: 'joint', title: 'Stiff, aching joints', text: 'Deep radiant heat reaches the tissue around arthritic joints in a way a hot shower cannot. Repeated infrared sessions have been shown to reduce chronic pain scores substantially over a course of weeks, and most people notice easier mornings well before that.' },
    { icon: 'heart', title: 'Circulation & heart health', text: 'Heat dilates blood vessels and raises heart rate the way light exercise does. Far-infrared sauna use has an established evidence base for improving arterial function and lowering blood pressure — genuinely useful if your knees or lungs limit how much you can exercise.' },
    { icon: 'muscle', title: 'Recovery after hard work', text: 'Increased blood flow flushes tired muscle and shortens the ache after a day of fencing, splitting wood, a long walk or a heavy shift. Sit in the sauna first and your massage goes deeper with less pressure.' },
    { icon: 'sleep', title: 'Sleep that actually holds', text: 'The sharp drop in body temperature after you leave the heat is one of the strongest natural sleep signals there is. An afternoon or early evening session tends to show up as an easier night.' },
    { icon: 'cold', title: 'Getting properly warm', text: 'Not warm on the outside. Warm through. Between May and September there is very little in the Meander Valley that gets you there, and thirty minutes in here will do it in a way that stays with you for hours.' },
    { icon: 'skin', title: 'Skin', text: 'Circulation, a deep flushing sweat and near-infrared exposure together improve tone and clarity. Book a facial immediately afterwards and the difference is obvious — which is exactly why we sequence them that way.' },
    { icon: 'mind', title: 'A room with nothing in it', text: 'No phone signal problem, no jobs list, no one asking anything. Thirty minutes of warmth and dim light does something for stress that is hard to argue with and hard to get anywhere else in town.' },
    { icon: 'immune', title: 'Through cold season', text: 'Raising core temperature briefly mimics a low fever and appears to support immune function, particularly with regular use. Most of our members come twice a week from April onward for exactly this reason.' },
  ],

  protocol: [
    { step: 'Arrive', text: 'Come in loose clothing. Bring a water bottle or use one of ours. There are robes, towels and a private change space.' },
    { step: 'Warm up', text: 'The cabin is preheated before you arrive. Sit for the first ten minutes without expecting a sweat — it builds slowly, then all at once.' },
    { step: 'Sweat', text: 'Between fifteen and twenty-five minutes in, the sweat becomes serious. Stay if you are comfortable. Step out if you are not. There is no prize for enduring it.' },
    { step: 'Cool & rehydrate', text: 'Rinse in the shower, sit in the quiet room, drink the electrolyte water we put out. Give yourself ten minutes before driving.' },
  ],

  compare: [
    { k: 'Infrared, here',   temp: '45–60°C', bar: 55,  sit: 'Sit for 30–45 minutes', tone: 'good' },
    { k: 'Traditional sauna', temp: '85–95°C', bar: 100, sit: 'Most people last 8–12 minutes', tone: 'plain' },
  ],

  pairings: [
    { first: 'Sauna, 30 min', then: 'Deep Tissue Release, 45 min', why: 'Tissue is already warm and open, so the work goes deeper with far less pressure.', total: 120 },
    { first: 'Sauna, 30 min', then: 'Infrared Skin Renewal, 30 min', why: 'Circulation is up and pores are clear, which is when skin absorbs everything best.', total: 100 },
    { first: 'Sauna, 30 min', then: 'Reflexology, 45 min', why: 'The quietest ninety minutes we can give anyone. Nothing asked of you at all.', total: 118 },
  ],

  faqs: [
    { q: 'How often should I come?', a: 'The clinical research generally uses three to five sessions a week. For general wellbeing, two to three is a sensible target and is what most of our regulars land on. Daily is safe if you hydrate properly.' },
    { q: 'Is it safe for me?', a: 'For most people, yes. Talk to your GP first if you are pregnant, have a cardiovascular condition, low blood pressure, take medication that affects sweating or temperature regulation, or have an implanted device. We will always ask before your first session.' },
    { q: 'What do I wear?', a: 'Whatever you are comfortable in. Swimwear, gym gear or a towel. The cabin is private and the door is yours to lock.' },
    { q: 'Can two of us go in?', a: 'Yes. The cabin comfortably seats two. Book the single session and let us know there will be two of you.' },
    { q: 'Is it hot like a normal sauna?', a: 'No, and that is the point. It runs at 45–60°C rather than 85–95°C, so the air stays breathable and you can sit in it far longer. The heat you feel is going into you, not sitting on your skin.' },
  ],
};

/* ==========================================================================
   MASSAGE CHAIR — Masseuse Remedial Deluxe+®
   Feature data drawn from the manufacturer's published specifications.
   ========================================================================== */

const CHAIR = {
  eyebrow: 'Masseuse Remedial Deluxe+®',
  title: 'A twelve-thousand-dollar chair, by the quarter hour',
  lede: 'A commercial-grade 4D therapeutic massage chair in black leather, in its own corner of the studio. Not a shopping-centre vibrating recliner. Fifteen minutes in this is a real treatment, and the most affordable thing on our menu.',
  caption: 'Tap a feature. The diagram shows you where it works.',

  sessions: [
    { label: 'Quick session',      dur: '15 min', price: 20, note: 'One full automatic program' },
    { label: 'Full session',       dur: '30 min', price: 32, note: 'Two programs, or one custom' },
    { label: 'While you wait',     dur: '15 min', price: 0,  note: 'Free if you arrive early for a treatment' },
    { label: 'Sauna + chair',      dur: '45 min', price: 50, note: 'Sauna first, chair second' },
  ],

  features: [
    { part: 'spine', size: 'lg', key: 'Advanced Dual-Pro® 4D', text: 'Two independent sets of massage hands work your upper and lower body at the same time, adjusting angle, depth and speed in four dimensions. It is the closest a machine has come to reading a body the way a therapist does.' },
    { part: 'shoulders', size: 'md', key: 'Hot stone shawl', text: 'A heated shawl radiates up to 50°C across the back and torso, loosening muscle fibre before the rollers reach it.' },
    { part: 'spine', size: 'md', key: '135 cm Flexi-Track®', text: 'An S- and L-shaped rail that flexes to the curve of your spine and continues down into the glutes — the area almost every chair misses.' },
    { part: 'whole', size: 'sm', key: 'Zero gravity', text: 'Legs elevated above the heart. Weight comes off the spine entirely.' },
    { part: 'whole', size: 'sm', key: 'Lie-flat 166°', text: 'Reclines further back than any previous model.' },
    { part: 'arms', size: 'md', key: 'Full-body AirSpa®', text: '40 air cushions inflate and release in a wave toward the heart, compressing shoulders, arms, hands, hips, calves and feet.' },
    { part: 'feet', size: 'sm', key: 'Reflexology rollers', text: 'Rollers under the soles target the major reflex points.' },
    { part: 'head', size: 'md', key: 'Intelligent body scan', text: 'The chair measures your shoulder height and spine shape before it starts, then maps the massage to your body rather than an average one.' },
    { part: 'arms', size: 'sm', key: 'AI health detection', text: 'Heart rate and blood oxygen readings, with a fatigue index.' },
    { part: 'whole', size: 'sm', key: '20 automatic programs', text: 'From gentle relaxation through to deep remedial.' },
    { part: 'head', size: 'sm', key: 'Voice control', text: 'Change anything without opening your eyes.' },
    { part: 'legs', size: 'sm', key: 'Calf extension', text: 'Extends 17.5 cm to fit any height.' },
    { part: 'head', size: 'sm', key: 'Bluetooth audio', text: 'Your own music, or ours.' },
    { part: 'arms', size: 'sm', key: '7" touchscreen', text: 'Every setting, adjustable mid-session.' },
  ],

  who: [
    'You want relief but not a stranger’s hands',
    'You are waiting for your appointment',
    'You cannot get comfortable enough to be treated on a table',
    'Fifteen minutes and twenty dollars is what today allows',
    'You are considering buying one and want a long, honest trial',
  ],
};

/* ==========================================================================
   GIFT CARDS
   ========================================================================== */

const GIFT = {
  eyebrow: 'Gift cards',
  title: 'Give someone an hour',
  lede: 'Not a product. An hour of a room where nothing is asked of them. Gift cards are valid for three years, can be spent on anything on the menu including sauna and chair sessions, and arrive as a printed card or an instant email.',
  amounts: [50, 80, 105, 150, 200],
  points: [
    'Valid three years from purchase',
    'Redeemable on any treatment, sauna or chair session',
    'Delivered by email instantly, or posted as a printed card',
    'Choose an amount, or a specific treatment by name',
  ],
};

/* ==========================================================================
   THE ROOM / ABOUT
   ========================================================================== */

const ROOM = {
  eyebrow: 'One room. One therapist.',
  title: 'You are the only appointment',
  paras: [
    'There is a single treatment room here, and a single therapist in it. That is a deliberate limit, not a shortcoming. It means no one is being turned over on a schedule, no one is being handed between staff, and the hour you booked is genuinely yours.',
    'It also means the treatment gets built around you on the day. If you arrive for a relaxation massage with a shoulder that has seized up, we treat the shoulder. If the facial you booked is not what your skin needs this week, we say so and change it. Nothing on the menu is a fixed script.',
    'And it means bookings are limited. Weekends and the fortnight before Christmas fill first. If a time matters to you, ring rather than wait.',
  ],
};
