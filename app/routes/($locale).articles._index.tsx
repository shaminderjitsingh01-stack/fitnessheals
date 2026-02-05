import {type MetaFunction} from '@shopify/remix-oxygen';
import {Link, useSearchParams} from '@remix-run/react';
import {SPORTS} from '~/data/sports';

export const meta: MetaFunction = () => {
  return [{title: 'Articles | FitnessHeals'}];
};

// All sport articles with full content
const ALL_ARTICLES: Array<{
  id: string;
  title: string;
  sport: string;
  sportSlug: string;
  sportIcon: string;
  readTime: string;
  excerpt: string;
  sections: Array<{heading: string; content: string}>;
  tips: string[];
  cta: {text: string; description: string};
}> = [
  // Cricket Articles
  {
    id: 'cricket-training-guide',
    title: 'The Complete Cricket Training Guide',
    sport: 'Cricket',
    sportSlug: 'cricket',
    sportIcon: '🏏',
    readTime: '8 min read',
    excerpt: 'Master your batting technique, bowling fundamentals, and fielding excellence with proven drills used by professional cricketers.',
    sections: [
      {
        heading: 'Essential Batting Drills',
        content: 'Master your batting technique with these proven drills used by professional cricketers. Start with the forward defensive stance, keeping your head still and eyes level. Practice the drive by stepping into the ball with your front foot, keeping your elbow high and following through towards the target.',
      },
      {
        heading: 'Bowling Fundamentals',
        content: 'Develop a consistent bowling action by focusing on your run-up rhythm. Keep your non-bowling arm high for balance, and follow through completely after release. Practice seam position for swing bowling and wrist position for spin variations.',
      },
      {
        heading: 'Fielding Excellence',
        content: 'Great fielders win matches. Work on your ground fielding by staying low with soft hands. Practice catching at different heights and distances. Develop quick reflexes with reaction drills and improve your throwing accuracy with target practice.',
      },
    ],
    tips: ['Practice 30 minutes of batting drills daily', 'Video record your bowling action for analysis', 'Work on fitness - cricket demands endurance'],
    cta: {text: 'Shop Cricket Bats & Gear', description: 'Get professional-grade cricket equipment to elevate your game'},
  },
  {
    id: 'cricket-equipment-guide',
    title: 'Cricket Equipment Guide: Choosing the Right Gear',
    sport: 'Cricket',
    sportSlug: 'cricket',
    sportIcon: '🏏',
    readTime: '6 min read',
    excerpt: 'Everything you need to know about selecting cricket bats, protective equipment, and bowling gear for every skill level.',
    sections: [
      {
        heading: 'Selecting Your Cricket Bat',
        content: 'The right bat depends on your playing style. English willow bats offer superior performance for advanced players, while Kashmir willow suits beginners. Consider bat weight (2.7-3.0 lbs for adults), handle type (short, long, or oval), and sweet spot position based on your dominant shots.',
      },
      {
        heading: 'Protective Equipment Essentials',
        content: 'Safety first in cricket. A quality helmet with a steel grille is non-negotiable for facing pace bowling. Batting pads should cover your shins completely with adequate knee protection. Gloves need reinforced fingers and a comfortable grip. Abdominal guards, thigh pads, and arm guards complete your protection.',
      },
      {
        heading: 'Bowling and Fielding Gear',
        content: 'Cricket shoes with spikes provide essential grip on grass pitches. Bowlers should choose shoes with extra ankle support. Quality cricket whites made from breathable fabric keep you cool during long matches. A reliable cricket bag organizes and protects all your equipment.',
      },
    ],
    tips: ['Replace your bat grip every season for optimal control', 'Check helmet certification standards before buying', 'Break in new batting gloves before match play'],
    cta: {text: 'Browse Cricket Collection', description: 'Find premium cricket equipment for every skill level'},
  },
  // Running Articles
  {
    id: 'running-shoe-guide',
    title: 'Running Shoe Selection & Training Guide',
    sport: 'Running',
    sportSlug: 'running',
    sportIcon: '🏃',
    readTime: '6 min read',
    excerpt: 'Understand your gait, choose the right shoes, and follow structured training programs to become a better runner.',
    sections: [
      {
        heading: 'Understanding Your Gait',
        content: 'Your running gait determines the type of shoe you need. Neutral runners land on the outside of the heel and roll inward slightly. Overpronators roll inward excessively and need stability shoes. Supinators roll outward and need cushioned, flexible shoes.',
      },
      {
        heading: 'Training Programs',
        content: 'Build your running base with a structured program. Start with run-walk intervals if you are new. Progress to continuous running over 4-6 weeks. Include one long run per week, tempo runs for speed, and easy recovery days.',
      },
      {
        heading: 'Injury Prevention',
        content: 'Most running injuries come from doing too much too soon. Follow the 10% rule - never increase weekly mileage by more than 10%. Stretch after runs, strengthen your core and hips, and replace shoes every 400-500 miles.',
      },
    ],
    tips: ['Run at a conversational pace for most training', 'Hydrate before, during, and after runs', 'Cross-train with cycling or swimming to reduce impact'],
    cta: {text: 'Shop Running Shoes', description: 'Find your perfect running shoes for every terrain'},
  },
  {
    id: 'marathon-training',
    title: 'Marathon Training: From First Mile to 26.2',
    sport: 'Running',
    sportSlug: 'running',
    sportIcon: '🏃',
    readTime: '9 min read',
    excerpt: 'A comprehensive guide to preparing for your first marathon with training strategies, nutrition tips, and race day execution.',
    sections: [
      {
        heading: 'Building Your Base',
        content: 'Before marathon training, establish a solid running foundation. You should comfortably run 15-25 miles per week for at least 3 months. This base prevents injury during the intense 16-20 week training block ahead. Focus on easy-paced miles and consistency over speed.',
      },
      {
        heading: 'The Long Run Strategy',
        content: 'Your weekly long run is the cornerstone of marathon preparation. Start at 10-12 miles and build to 20-22 miles. Run these 1-2 minutes slower than your goal marathon pace. Practice your race nutrition during long runs - aim to consume 30-60g of carbs per hour after the first hour.',
      },
      {
        heading: 'Race Day Execution',
        content: 'Start conservatively - the first half should feel easy. Stick to your practiced nutrition plan. Break the race into segments mentally. Save your push for the final 10K when most runners slow down. Trust your training and enjoy crossing that finish line.',
      },
    ],
    tips: ['Taper your mileage 2-3 weeks before race day', 'Never try anything new on race day', 'Lay out all your gear the night before'],
    cta: {text: 'Get Marathon Essentials', description: 'Premium running gear for your marathon journey'},
  },
  // Muay Thai Articles
  {
    id: 'muay-thai-beginners',
    title: "Muay Thai Beginner's Complete Handbook",
    sport: 'Muay Thai',
    sportSlug: 'muay-thai',
    sportIcon: '🥊',
    readTime: '10 min read',
    excerpt: 'Learn the art of eight limbs with essential techniques, kicks, and conditioning tips for Muay Thai beginners.',
    sections: [
      {
        heading: 'The Art of Eight Limbs',
        content: 'Muay Thai uses fists, elbows, knees, and shins as weapons. Begin with a proper fighting stance: feet shoulder-width apart, hands protecting your face, chin tucked. Learn the basic punches (jab, cross, hook, uppercut) before progressing to kicks and knees.',
      },
      {
        heading: 'Essential Kicks',
        content: "The roundhouse kick is Muay Thai's signature technique. Pivot on your supporting foot, swing your hip through, and strike with your shin, not your foot. The teep (push kick) is your range-finder and defensive tool.",
      },
      {
        heading: 'Training and Conditioning',
        content: 'Muay Thai fighters are among the fittest athletes. Include skipping rope for footwork, heavy bag work for power, pad work for timing, and clinch practice for close-range dominance. Stretch thoroughly to prevent injuries.',
      },
    ],
    tips: ['Start with 2-3 classes per week', 'Invest in quality shin guards and gloves', 'Stay hydrated - training is intense'],
    cta: {text: 'Shop Muay Thai Gear', description: 'Professional Muay Thai equipment for serious fighters'},
  },
  {
    id: 'muay-thai-equipment',
    title: 'Muay Thai Equipment Guide: Gear Up Like a Champion',
    sport: 'Muay Thai',
    sportSlug: 'muay-thai',
    sportIcon: '🥊',
    readTime: '7 min read',
    excerpt: 'A complete guide to choosing boxing gloves, shin guards, and training equipment for Muay Thai practitioners.',
    sections: [
      {
        heading: 'Choosing Boxing Gloves',
        content: 'Muay Thai gloves differ from boxing gloves with a more flexible design for clinching. For training, use 14-16oz gloves for hand protection. Competition gloves are typically 8-10oz. Look for high-density foam padding, secure wrist support, and durable leather construction.',
      },
      {
        heading: 'Essential Protective Gear',
        content: 'Shin guards are crucial - choose ones with ankle protection and dense padding. A quality mouthguard prevents dental injuries. For sparring, add headgear, body protectors, and groin guards. Training wraps protect your hands and wrists during bag work.',
      },
      {
        heading: 'Training Equipment',
        content: 'A heavy bag (70-100lbs) is essential for home training. Thai pads allow partners to hold for combination work. Speed bags develop timing and coordination. Invest in a quality jump rope for the traditional warm-up that develops footwork and cardio.',
      },
    ],
    tips: ['Replace gloves every 1-2 years with regular training', 'Wash and air dry gear after every session', 'Properly wrap your hands before every session'],
    cta: {text: 'Browse Muay Thai Collection', description: 'Train like a Thai champion with premium gear'},
  },
  // Soccer Articles
  {
    id: 'soccer-skills',
    title: 'Soccer Skills Development Guide',
    sport: 'Soccer',
    sportSlug: 'soccer',
    sportIcon: '⚽',
    readTime: '7 min read',
    excerpt: 'Develop exceptional ball control, dribbling techniques, and shooting accuracy with this comprehensive skills guide.',
    sections: [
      {
        heading: 'Ball Control Mastery',
        content: 'Great soccer players have exceptional first touch. Practice receiving the ball with different surfaces - inside foot, outside foot, chest, thigh. Keep your body relaxed and cushion the ball to bring it under control quickly.',
      },
      {
        heading: 'Dribbling Techniques',
        content: 'Learn essential moves: the step-over, Cruyff turn, elastico, and drag-back. Practice at slow speed first, then increase pace. Keep the ball close to your feet and use body feints to deceive defenders.',
      },
      {
        heading: 'Shooting and Finishing',
        content: 'Strike the ball with your laces for power, inside foot for accuracy. Keep your head over the ball, plant foot pointing at target. Practice shooting from different angles and distances.',
      },
    ],
    tips: ['Touch the ball 1000 times a day', 'Watch professional matches to learn positioning', 'Work on both feet equally'],
    cta: {text: 'Shop Soccer Boots', description: 'Find the perfect boots to dominate the pitch'},
  },
  {
    id: 'soccer-boot-guide',
    title: 'Soccer Boot Guide: Finding Your Perfect Match',
    sport: 'Soccer',
    sportSlug: 'soccer',
    sportIcon: '⚽',
    readTime: '6 min read',
    excerpt: 'Everything you need to know about soccer boot types, fit, and position-specific considerations.',
    sections: [
      {
        heading: 'Understanding Boot Types',
        content: 'Firm ground (FG) boots are most versatile for natural grass. Soft ground (SG) studs provide grip on wet, muddy pitches. Artificial grass (AG) boots have numerous small studs for synthetic surfaces. Indoor/futsal shoes have flat rubber soles for courts.',
      },
      {
        heading: 'Fit and Comfort',
        content: "Soccer boots should fit snugly without pinching. Leave about a thumb's width at the toe. Leather boots mold to your feet over time, while synthetic materials offer consistent fit. Consider your foot width - some brands run narrow (Nike) while others accommodate wider feet (New Balance, Puma).",
      },
      {
        heading: 'Position-Specific Considerations',
        content: 'Strikers often prefer lightweight boots for speed. Midfielders need comfort for high mileage and ball control. Defenders may want more protection and stability. Goalkeepers need excellent grip and protection.',
      },
    ],
    tips: ['Break in new boots gradually before matches', 'Clean and dry boots after every use', 'Rotate between 2 pairs to extend boot life'],
    cta: {text: 'Browse Soccer Collection', description: 'Complete soccer gear from boots to balls'},
  },
  // Basketball Articles
  {
    id: 'basketball-fundamentals',
    title: 'Basketball Fundamentals Training',
    sport: 'Basketball',
    sportSlug: 'basketball',
    sportIcon: '🏀',
    readTime: '8 min read',
    excerpt: 'Master shooting form, ball handling, and defensive positioning with this essential basketball training guide.',
    sections: [
      {
        heading: 'Shooting Form Basics',
        content: 'Perfect shooting starts with proper form. Align your shooting hand under the ball, elbow tucked in. Use your legs for power, follow through with a relaxed wrist snap. The ball should rotate backwards off your fingers.',
      },
      {
        heading: 'Ball Handling Skills',
        content: 'Develop handles through daily dribbling drills. Practice crossovers, between-the-legs, and behind-the-back moves. Keep your head up and eyes forward. Use both hands equally to become unpredictable.',
      },
      {
        heading: 'Defensive Positioning',
        content: "Good defense wins championships. Stay in an athletic stance with knees bent. Keep your hands active. Move your feet, don't reach. Anticipate passes and cuts. Communicate with teammates.",
      },
    ],
    tips: ['Shoot 100 free throws daily', 'Work on conditioning - basketball requires endurance', 'Study film of your favorite players'],
    cta: {text: 'Shop Basketball Shoes', description: 'Get the ankle support and traction you need'},
  },
  {
    id: 'basketball-shoe-guide',
    title: 'Basketball Shoe Science: Choose Your Weapon',
    sport: 'Basketball',
    sportSlug: 'basketball',
    sportIcon: '🏀',
    readTime: '6 min read',
    excerpt: 'Understand shoe technology, match shoes to your playing style, and learn proper fit and care techniques.',
    sections: [
      {
        heading: 'Understanding Shoe Technology',
        content: 'Modern basketball shoes feature responsive cushioning systems like Nike Air, Adidas Boost, or Under Armour HOVR. High-tops provide maximum ankle support, while low-tops offer agility. Mid-tops balance both. Traction patterns determine how well you can cut and stop.',
      },
      {
        heading: 'Matching Shoes to Playing Style',
        content: 'Quick guards benefit from lightweight, low-profile shoes with excellent traction. Post players need maximum cushioning and support for jumping and landing. Versatile players should look for balanced shoes that excel in multiple areas.',
      },
      {
        heading: 'Proper Fit and Care',
        content: 'Basketball shoes should feel snug with no heel slippage. Try shoes on with your game socks. Break them in during practice, not games. Clean soles regularly for consistent grip. Replace shoes when traction wears down or cushioning compresses.',
      },
    ],
    tips: ['Consider your playing surface - indoor vs outdoor', 'Lace up tight through the ankle for support', 'Let shoes dry completely between sessions'],
    cta: {text: 'Browse Basketball Gear', description: 'Elevate your game with premium basketball equipment'},
  },
  // Swimming Articles
  {
    id: 'swimming-technique',
    title: 'Swimming Technique Guide',
    sport: 'Swimming',
    sportSlug: 'swimming',
    sportIcon: '🏊',
    readTime: '7 min read',
    excerpt: 'Improve your freestyle fundamentals, breathing technique, and build endurance with expert swimming tips.',
    sections: [
      {
        heading: 'Freestyle Fundamentals',
        content: 'Efficient freestyle requires body rotation. Roll from your hips, not just shoulders. Keep your head neutral, eyes looking down. Reach forward with each stroke and pull water past your hip. Kick from your hips with relaxed ankles.',
      },
      {
        heading: 'Breathing Technique',
        content: 'Breathe by rotating your head with your body, not lifting it. Exhale continuously underwater through nose and mouth. Time your breath with your stroke rhythm. Practice bilateral breathing for balance.',
      },
      {
        heading: 'Building Endurance',
        content: 'Start with interval training - swim a length, rest, repeat. Gradually increase distances and reduce rest. Include drills focusing on specific aspects like catch, pull, and kick. Mix up strokes to work different muscles.',
      },
    ],
    tips: ['Swim at least 3 times per week for improvement', 'Use a pull buoy to isolate your upper body', 'Video your stroke for technique analysis'],
    cta: {text: 'Shop Swimwear', description: 'Performance swimwear for faster times'},
  },
  {
    id: 'swimming-gear',
    title: 'Essential Swimming Gear: The Complete Guide',
    sport: 'Swimming',
    sportSlug: 'swimming',
    sportIcon: '🏊',
    readTime: '6 min read',
    excerpt: 'Choose the right swimsuit, goggles, and training aids to improve your swimming performance.',
    sections: [
      {
        heading: 'Choosing the Right Swimsuit',
        content: 'Racing suits (jammers for men, racing suits for women) reduce drag with compression fit and hydrophobic fabric. Training suits are more durable for daily use. Look for chlorine-resistant materials that maintain elasticity over time.',
      },
      {
        heading: 'Goggles Selection',
        content: 'Goggles should create a seal without being too tight. Racing goggles sit close to the face with a low profile. Training goggles offer more cushion and visibility. Consider mirrored lenses for outdoor swimming or clear lenses for indoor pools.',
      },
      {
        heading: 'Training Aids',
        content: 'Kickboards isolate your legs for focused kick training. Pull buoys float your legs to isolate your pull. Hand paddles build strength and improve catch technique. Fins develop ankle flexibility and leg power. Snorkels allow technique focus without breathing interruption.',
      },
    ],
    tips: ['Rinse gear in fresh water after every pool session', 'Rotate between swimsuits to extend their life', 'Anti-fog spray keeps goggles clear'],
    cta: {text: 'Browse Swimming Collection', description: 'Complete swimming gear for training and racing'},
  },
  // Tennis Articles
  {
    id: 'tennis-fundamentals',
    title: 'Tennis Fundamentals: Master the Basics',
    sport: 'Tennis',
    sportSlug: 'tennis',
    sportIcon: '🎾',
    readTime: '8 min read',
    excerpt: 'Learn proper grip techniques, groundstroke mechanics, and serve development for tennis success.',
    sections: [
      {
        heading: 'Grip Techniques',
        content: 'The continental grip is essential for serves and volleys - hold the racket like shaking hands. The semi-western grip provides topspin on forehands. Eastern grips offer a balance of power and control. Practice transitioning between grips smoothly.',
      },
      {
        heading: 'Groundstroke Mechanics',
        content: 'For the forehand, turn your shoulders early, drop the racket below the ball, and swing low to high for topspin. The one-handed backhand requires excellent footwork and shoulder rotation. Two-handed backhands offer more stability and power for beginners.',
      },
      {
        heading: 'Serve Development',
        content: 'A powerful serve starts with proper ball toss - consistent height and placement. Use your legs to push up, rotate your shoulders, and snap your wrist at contact. Practice the flat serve for power, slice serve for variation, and kick serve for consistency.',
      },
    ],
    tips: ['Practice footwork daily - tennis is about positioning', 'Hit against a wall for consistent practice', 'Focus on depth before trying winners'],
    cta: {text: 'Shop Tennis Rackets', description: 'Find the perfect racket for your playing style'},
  },
  {
    id: 'tennis-racket-guide',
    title: 'Tennis Racket Guide: Your Complete Selection Handbook',
    sport: 'Tennis',
    sportSlug: 'tennis',
    sportIcon: '🎾',
    readTime: '7 min read',
    excerpt: 'Understand racket specs, match equipment to your skill level, and choose the right strings.',
    sections: [
      {
        heading: 'Understanding Racket Specs',
        content: 'Head size affects power and forgiveness (larger = more power). Weight impacts stability and maneuverability (heavier = more stability). Balance point determines feel (head-heavy for power, head-light for control). String pattern affects spin potential (open = more spin).',
      },
      {
        heading: 'Matching Racket to Skill Level',
        content: 'Beginners benefit from lightweight rackets (250-280g) with larger heads (100-110 sq in). Intermediate players can move to medium weight with standard heads. Advanced players often prefer heavier, smaller-headed rackets for precision.',
      },
      {
        heading: 'String Selection',
        content: 'Polyester strings offer durability and spin but less comfort. Multifilament strings provide arm-friendly feel. Natural gut delivers the best feel but highest cost. Hybrid setups combine different strings for balanced performance.',
      },
    ],
    tips: ['Demo rackets before purchasing', 'Restring every 40-50 hours of play', 'Use overgrips for better moisture control'],
    cta: {text: 'Browse Tennis Collection', description: 'Complete tennis gear from rackets to shoes'},
  },
  // Triathlon Articles
  {
    id: 'triathlon-training',
    title: 'Triathlon Training: Conquer Three Disciplines',
    sport: 'Triathlon',
    sportSlug: 'triathlon',
    sportIcon: '🏊‍♂️🚴🏃',
    readTime: '10 min read',
    excerpt: 'Balance swim, bike, and run training with this comprehensive triathlon preparation guide.',
    sections: [
      {
        heading: 'Balancing Three Sports',
        content: 'Successful triathlon training requires structured periodization. Dedicate specific days to each discipline while including brick workouts (back-to-back sessions, typically bike-to-run) weekly. Focus on your weakest discipline while maintaining strengths.',
      },
      {
        heading: 'Open Water Swimming',
        content: "Pool swimming doesn't fully prepare you for race conditions. Practice sighting by lifting your head every 6-8 strokes. Learn to draft behind other swimmers. Acclimate to wetsuit swimming - it changes your body position and stroke.",
      },
      {
        heading: 'Transitions Matter',
        content: 'T1 (swim-to-bike) and T2 (bike-to-run) are often overlooked. Practice transitions until they become automatic. Layout your gear systematically. Use elastic laces for shoes, practice mounting and dismounting your bike quickly.',
      },
    ],
    tips: ['Brick workouts are essential for race-day feel', 'Practice nutrition during training, not just racing', 'Train in race conditions whenever possible'],
    cta: {text: 'Shop Triathlon Gear', description: 'Everything you need to swim, bike, and run'},
  },
  {
    id: 'triathlon-equipment',
    title: 'Triathlon Equipment Essentials: Gear Up for Race Day',
    sport: 'Triathlon',
    sportSlug: 'triathlon',
    sportIcon: '🏊‍♂️🚴🏃',
    readTime: '8 min read',
    excerpt: 'Choose the right wetsuit, bike, and tri-specific gear for your next triathlon event.',
    sections: [
      {
        heading: 'Wetsuit Selection',
        content: "Triathlon wetsuits differ from surfing wetsuits - they're designed for swimming with flexible shoulder panels and buoyancy in the legs. Full-sleeve suits offer maximum warmth and buoyancy. Sleeveless suits provide more shoulder freedom. Fit should be snug without restricting breathing.",
      },
      {
        heading: 'Bike and Components',
        content: 'Time trial/triathlon bikes with aerodynamic frames and aero bars optimize speed. A road bike with clip-on aero bars is a budget-friendly alternative. Aero helmets can save significant time. Clipless pedals improve power transfer.',
      },
      {
        heading: 'Tri-Specific Gear',
        content: 'Tri suits allow you to swim, bike, and run without changing. Race belts hold your number without pins. Sunglasses that transition from bike to run save time. Nutrition belts or bike-mounted systems ensure you stay fueled.',
      },
    ],
    tips: ['Never race with new, untested equipment', 'Pack a transition checklist for race day', 'Train in your race-day clothing'],
    cta: {text: 'Browse Triathlon Collection', description: 'Premium tri gear for your next race'},
  },
  // Golf Articles
  {
    id: 'golf-swing',
    title: 'Golf Swing Fundamentals: Build a Repeatable Swing',
    sport: 'Golf',
    sportSlug: 'golf',
    sportIcon: '⛳',
    readTime: '9 min read',
    excerpt: 'Master setup, backswing, and follow-through mechanics for a consistent golf swing.',
    sections: [
      {
        heading: 'The Setup Foundation',
        content: 'A consistent swing starts with proper setup. Feet shoulder-width apart, slight knee flex, arms hanging naturally. Ball position varies by club - forward for driver, center for irons. Grip pressure should be firm but not tight - about a 4 on a scale of 10.',
      },
      {
        heading: 'Backswing Mechanics',
        content: "Turn your shoulders while keeping your lower body stable. Keep your left arm straight (for right-handers) but not rigid. The club should reach parallel at the top. Maintain spine angle throughout - don't stand up or dip.",
      },
      {
        heading: 'Downswing and Follow-Through',
        content: 'Start the downswing with your lower body, not your arms. Let the club drop into the slot. Strike down on irons, up on driver. Extend through the ball with full rotation. Finish balanced on your front foot, belt buckle facing target.',
      },
    ],
    tips: ['Practice with alignment sticks for proper setup', 'Video your swing from face-on and down-the-line', 'Short game practice is more valuable than range time'],
    cta: {text: 'Shop Golf Clubs', description: 'Find clubs that match your swing'},
  },
  {
    id: 'golf-equipment',
    title: 'Golf Equipment Guide: Building Your Ideal Bag',
    sport: 'Golf',
    sportSlug: 'golf',
    sportIcon: '⛳',
    readTime: '7 min read',
    excerpt: 'Choose the right clubs, understand custom fitting, and select golf balls for your game.',
    sections: [
      {
        heading: 'Choosing the Right Clubs',
        content: 'Drivers with higher loft (10.5-12°) help beginners launch the ball. Game-improvement irons offer forgiveness with larger sweet spots. Hybrids replace hard-to-hit long irons. Putters come in blade (for straight strokes) and mallet (for arc strokes) styles.',
      },
      {
        heading: 'Custom Fitting Benefits',
        content: 'Club fitting optimizes shaft flex, lie angle, and club length for your swing. Even beginners benefit from basic fitting. Proper fitting improves consistency and reduces compensations. Most golf retailers offer free or low-cost fitting sessions.',
      },
      {
        heading: 'Golf Ball Selection',
        content: 'Two-piece balls offer distance and durability for high handicappers. Multi-layer balls provide more spin control around greens. Soft compression balls help slower swing speeds. Premium balls benefit skilled players who can work the ball.',
      },
    ],
    tips: ['Start with a partial set and add clubs as you improve', 'Replace grips annually for consistent feel', 'Carry no more than 14 clubs per rules'],
    cta: {text: 'Browse Golf Collection', description: 'Premium golf equipment for every handicap'},
  },
  // Cycling Articles
  {
    id: 'cycling-training',
    title: 'Cycling Training: Ride Stronger, Faster, Longer',
    sport: 'Cycling',
    sportSlug: 'cycling',
    sportIcon: '🚴',
    readTime: '8 min read',
    excerpt: 'Build your aerobic base, incorporate interval training, and master climbing and descending.',
    sections: [
      {
        heading: 'Building Your Aerobic Base',
        content: 'Endurance rides form your cycling foundation. Aim for 2-3 longer rides per week at conversational pace (Zone 2). These rides build mitochondrial density and fat-burning efficiency. Don\'t skip base training - it enables harder efforts later.',
      },
      {
        heading: 'Interval Training',
        content: 'Once you have a base, add structured intervals. VO2 max intervals (3-5 minutes hard with equal rest) build aerobic capacity. Threshold intervals (10-20 minutes at sustainable hard effort) increase lactate threshold. Sprint intervals develop power.',
      },
      {
        heading: 'Climbing and Descending',
        content: "Climb seated for efficiency, standing for power bursts. Shift to an easier gear early, don't wait until you're struggling. Descending requires confidence - look where you want to go, brake before corners, and lean the bike rather than your body.",
      },
    ],
    tips: ['Cadence of 80-100 RPM is generally efficient', 'Recovery rides should feel too easy', "Nutrition matters - eat before you're hungry, drink before you're thirsty"],
    cta: {text: 'Shop Cycling Gear', description: 'Performance cycling apparel and accessories'},
  },
  {
    id: 'cycling-gear',
    title: 'Cycling Gear Guide: Essential Equipment for Every Rider',
    sport: 'Cycling',
    sportSlug: 'cycling',
    sportIcon: '🚴',
    readTime: '7 min read',
    excerpt: 'Select the right bike, safety equipment, and cycling apparel for your riding style.',
    sections: [
      {
        heading: 'Bike Selection',
        content: 'Road bikes offer speed on pavement with drop handlebars. Gravel bikes handle mixed terrain with wider tire clearance. Mountain bikes feature suspension and knobby tires for trails. E-bikes assist with pedaling for commutes or challenging terrain.',
      },
      {
        heading: 'Safety Equipment',
        content: 'A properly fitted helmet is non-negotiable - replace after any impact. Lights are essential for visibility, even during daylight. Mirrors increase awareness. Gloves protect hands in crashes and reduce vibration fatigue.',
      },
      {
        heading: 'Cycling Apparel',
        content: 'Padded cycling shorts eliminate chafing and provide comfort. Jerseys wick moisture with rear pockets for nutrition. Cycling shoes with stiff soles transfer power efficiently. Layer for changing conditions with arm warmers and vests.',
      },
    ],
    tips: ['Get a professional bike fit to prevent injury', 'Always carry a spare tube, pump, and tire levers', 'Clean and lubricate your chain regularly'],
    cta: {text: 'Browse Cycling Collection', description: 'Everything you need to ride faster and further'},
  },
  // Yoga Articles
  {
    id: 'yoga-for-athletes',
    title: 'Yoga for Athletes: Enhance Performance and Recovery',
    sport: 'Yoga',
    sportSlug: 'yoga',
    sportIcon: '🧘',
    readTime: '8 min read',
    excerpt: 'Discover why athletes need yoga and learn essential poses for improved flexibility and recovery.',
    sections: [
      {
        heading: 'Why Athletes Need Yoga',
        content: 'Yoga improves flexibility, preventing the muscle imbalances that cause injury. It builds core strength that transfers to every sport. Deep breathing techniques enhance lung capacity and mental focus. Regular practice speeds recovery and reduces muscle soreness.',
      },
      {
        heading: 'Essential Poses for Athletes',
        content: 'Downward Dog stretches hamstrings, calves, and shoulders. Pigeon Pose releases tight hip flexors common in runners and cyclists. Warrior poses build leg strength and stability. Twisting poses decompress the spine and aid digestion.',
      },
      {
        heading: 'Building a Practice',
        content: "Start with 15-20 minutes, 2-3 times per week. Morning practice energizes, evening practice promotes sleep. Use props (blocks, straps) without shame - they help achieve proper alignment. Focus on breath - if you can't breathe smoothly, you're pushing too hard.",
      },
    ],
    tips: ['Practice on an empty stomach or 2 hours after eating', 'Consistency beats intensity - short daily practice trumps weekly long sessions', "Listen to your body - yoga shouldn't cause pain"],
    cta: {text: 'Shop Yoga Gear', description: 'Premium mats, blocks, and apparel'},
  },
  {
    id: 'yoga-equipment',
    title: 'Yoga Equipment Guide: Creating Your Practice Space',
    sport: 'Yoga',
    sportSlug: 'yoga',
    sportIcon: '🧘',
    readTime: '6 min read',
    excerpt: 'Choose the right mat, props, and apparel to enhance your yoga practice.',
    sections: [
      {
        heading: 'Choosing Your Mat',
        content: 'Mat thickness affects comfort and stability - 4-6mm balances cushion with grounding. Stickier mats prevent slipping in sweaty practices. Travel mats fold compactly. Alignment mats feature guides for hand and foot placement. Natural rubber offers excellent grip with eco-friendly materials.',
      },
      {
        heading: 'Essential Props',
        content: 'Blocks bring the floor closer for tight muscles. Cork blocks offer stability, foam blocks cushion joints. Straps extend your reach and deepen stretches. Bolsters support restorative poses. Blankets provide padding and warmth during Savasana.',
      },
      {
        heading: 'Yoga Apparel',
        content: 'Clothing should move with you without riding up or falling down. High-waisted leggings stay in place during inversions. Fitted tops prevent exposure during forward folds. Breathable, moisture-wicking fabrics keep you comfortable. Avoid loose jewelry that might catch or distract.',
      },
    ],
    tips: ['Clean your mat weekly with diluted vinegar', 'Start with a mat and add props as needed', 'Store props where you can see them as a practice reminder'],
    cta: {text: 'Browse Yoga Collection', description: 'Everything for your yoga practice'},
  },
];

export default function ArticlesIndex() {
  const [searchParams] = useSearchParams();
  const sportFilter = searchParams.get('sport');

  // Filter articles by sport if filter is set
  const filteredArticles = sportFilter
    ? ALL_ARTICLES.filter(article => article.sportSlug === sportFilter)
    : ALL_ARTICLES;

  const currentSport = sportFilter
    ? SPORTS.find(s => s.slug === sportFilter)
    : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Expert Knowledge</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            {currentSport ? `${currentSport.name} Articles` : 'Sports Training Articles'}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            In-depth guides, training tips, and gear recommendations to help you excel in your sport.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} available
          </div>
        </div>
      </section>

      {/* Sport Filter */}
      <section className="py-6 px-6 md:px-12 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/articles"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !sportFilter
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sports ({ALL_ARTICLES.length})
            </Link>
            {SPORTS.map((sport) => {
              const count = ALL_ARTICLES.filter(a => a.sportSlug === sport.slug).length;
              if (count === 0) return null;
              return (
                <Link
                  key={sport.slug}
                  to={`/articles?sport=${sport.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    sportFilter === sport.slug
                      ? 'bg-brand-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sport.icon} {sport.name} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-brand-red to-brand-orange">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Gear Up?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Put your knowledge into action with premium sports equipment from FitnessHeals.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Shop All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Full Article Card Component
function ArticleCard({article}: {article: typeof ALL_ARTICLES[0]}) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 md:px-8 py-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3 flex-wrap">
          <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full font-semibold">
            {article.sportIcon} {article.sport}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">{article.title}</h2>
        <p className="text-gray-400 mt-2">{article.excerpt}</p>
      </div>

      {/* Article Content */}
      <div className="px-6 md:px-8 py-6">
        <div className="space-y-6">
          {article.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="w-7 h-7 bg-gradient-to-r from-brand-red to-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                {section.heading}
              </h3>
              <p className="text-gray-600 leading-relaxed pl-10">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-gradient-to-r from-brand-red/5 to-brand-orange/5 rounded-xl p-5 border border-brand-red/10">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="space-y-2">
            {article.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                <svg className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between p-5 bg-gray-50 rounded-xl">
          <div>
            <p className="font-semibold text-gray-900">{article.cta.description}</p>
          </div>
          <Link
            to={`/collections/${article.sportSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors whitespace-nowrap"
          >
            {article.cta.text}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
