import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {SPORTS} from '~/data/sports';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Link} from '~/components/Link';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const sport = data?.sport;
  return [{title: sport ? `${sport.name} | FitnessHeals` : 'Sport | FitnessHeals'}];
};

// Sport-specific articles data with CTAs
const SPORT_ARTICLES: Record<string, Array<{
  title: string;
  sections: Array<{heading: string; content: string}>;
  tips: string[];
  readTime: string;
  cta: {text: string; description: string};
}>> = {
  cricket: [
    {
      title: 'The Complete Cricket Training Guide',
      readTime: '8 min read',
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
      title: 'Cricket Equipment Guide: Choosing the Right Gear',
      readTime: '6 min read',
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
  ],
  running: [
    {
      title: 'Running Shoe Selection & Training Guide',
      readTime: '6 min read',
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
      title: 'Marathon Training: From First Mile to 26.2',
      readTime: '9 min read',
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
  ],
  'muay-thai': [
    {
      title: 'Muay Thai Beginner\'s Complete Handbook',
      readTime: '10 min read',
      sections: [
        {
          heading: 'The Art of Eight Limbs',
          content: 'Muay Thai uses fists, elbows, knees, and shins as weapons. Begin with a proper fighting stance: feet shoulder-width apart, hands protecting your face, chin tucked. Learn the basic punches (jab, cross, hook, uppercut) before progressing to kicks and knees.',
        },
        {
          heading: 'Essential Kicks',
          content: 'The roundhouse kick is Muay Thai\'s signature technique. Pivot on your supporting foot, swing your hip through, and strike with your shin, not your foot. The teep (push kick) is your range-finder and defensive tool.',
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
      title: 'Muay Thai Equipment Guide: Gear Up Like a Champion',
      readTime: '7 min read',
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
  ],
  soccer: [
    {
      title: 'Soccer Skills Development Guide',
      readTime: '7 min read',
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
      title: 'Soccer Boot Guide: Finding Your Perfect Match',
      readTime: '6 min read',
      sections: [
        {
          heading: 'Understanding Boot Types',
          content: 'Firm ground (FG) boots are most versatile for natural grass. Soft ground (SG) studs provide grip on wet, muddy pitches. Artificial grass (AG) boots have numerous small studs for synthetic surfaces. Indoor/futsal shoes have flat rubber soles for courts.',
        },
        {
          heading: 'Fit and Comfort',
          content: 'Soccer boots should fit snugly without pinching. Leave about a thumb\'s width at the toe. Leather boots mold to your feet over time, while synthetic materials offer consistent fit. Consider your foot width - some brands run narrow (Nike) while others accommodate wider feet (New Balance, Puma).',
        },
        {
          heading: 'Position-Specific Considerations',
          content: 'Strikers often prefer lightweight boots for speed. Midfielders need comfort for high mileage and ball control. Defenders may want more protection and stability. Goalkeepers need excellent grip and protection.',
        },
      ],
      tips: ['Break in new boots gradually before matches', 'Clean and dry boots after every use', 'Rotate between 2 pairs to extend boot life'],
      cta: {text: 'Browse Soccer Collection', description: 'Complete soccer gear from boots to balls'},
    },
  ],
  basketball: [
    {
      title: 'Basketball Fundamentals Training',
      readTime: '8 min read',
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
          content: 'Good defense wins championships. Stay in an athletic stance with knees bent. Keep your hands active. Move your feet, don\'t reach. Anticipate passes and cuts. Communicate with teammates.',
        },
      ],
      tips: ['Shoot 100 free throws daily', 'Work on conditioning - basketball requires endurance', 'Study film of your favorite players'],
      cta: {text: 'Shop Basketball Shoes', description: 'Get the ankle support and traction you need'},
    },
    {
      title: 'Basketball Shoe Science: Choose Your Weapon',
      readTime: '6 min read',
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
  ],
  swimming: [
    {
      title: 'Swimming Technique Guide',
      readTime: '7 min read',
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
      title: 'Essential Swimming Gear: The Complete Guide',
      readTime: '6 min read',
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
  ],
  tennis: [
    {
      title: 'Tennis Fundamentals: Master the Basics',
      readTime: '8 min read',
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
      title: 'Tennis Racket Guide: Your Complete Selection Handbook',
      readTime: '7 min read',
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
  ],
  triathlon: [
    {
      title: 'Triathlon Training: Conquer Three Disciplines',
      readTime: '10 min read',
      sections: [
        {
          heading: 'Balancing Three Sports',
          content: 'Successful triathlon training requires structured periodization. Dedicate specific days to each discipline while including brick workouts (back-to-back sessions, typically bike-to-run) weekly. Focus on your weakest discipline while maintaining strengths.',
        },
        {
          heading: 'Open Water Swimming',
          content: 'Pool swimming doesn\'t fully prepare you for race conditions. Practice sighting by lifting your head every 6-8 strokes. Learn to draft behind other swimmers. Acclimate to wetsuit swimming - it changes your body position and stroke.',
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
      title: 'Triathlon Equipment Essentials: Gear Up for Race Day',
      readTime: '8 min read',
      sections: [
        {
          heading: 'Wetsuit Selection',
          content: 'Triathlon wetsuits differ from surfing wetsuits - they\'re designed for swimming with flexible shoulder panels and buoyancy in the legs. Full-sleeve suits offer maximum warmth and buoyancy. Sleeveless suits provide more shoulder freedom. Fit should be snug without restricting breathing.',
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
  ],
  golf: [
    {
      title: 'Golf Swing Fundamentals: Build a Repeatable Swing',
      readTime: '9 min read',
      sections: [
        {
          heading: 'The Setup Foundation',
          content: 'A consistent swing starts with proper setup. Feet shoulder-width apart, slight knee flex, arms hanging naturally. Ball position varies by club - forward for driver, center for irons. Grip pressure should be firm but not tight - about a 4 on a scale of 10.',
        },
        {
          heading: 'Backswing Mechanics',
          content: 'Turn your shoulders while keeping your lower body stable. Keep your left arm straight (for right-handers) but not rigid. The club should reach parallel at the top. Maintain spine angle throughout - don\'t stand up or dip.',
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
      title: 'Golf Equipment Guide: Building Your Ideal Bag',
      readTime: '7 min read',
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
  ],
  cycling: [
    {
      title: 'Cycling Training: Ride Stronger, Faster, Longer',
      readTime: '8 min read',
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
          content: 'Climb seated for efficiency, standing for power bursts. Shift to an easier gear early, don\'t wait until you\'re struggling. Descending requires confidence - look where you want to go, brake before corners, and lean the bike rather than your body.',
        },
      ],
      tips: ['Cadence of 80-100 RPM is generally efficient', 'Recovery rides should feel too easy', 'Nutrition matters - eat before you\'re hungry, drink before you\'re thirsty'],
      cta: {text: 'Shop Cycling Gear', description: 'Performance cycling apparel and accessories'},
    },
    {
      title: 'Cycling Gear Guide: Essential Equipment for Every Rider',
      readTime: '7 min read',
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
  ],
  yoga: [
    {
      title: 'Yoga for Athletes: Enhance Performance and Recovery',
      readTime: '8 min read',
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
          content: 'Start with 15-20 minutes, 2-3 times per week. Morning practice energizes, evening practice promotes sleep. Use props (blocks, straps) without shame - they help achieve proper alignment. Focus on breath - if you can\'t breathe smoothly, you\'re pushing too hard.',
        },
      ],
      tips: ['Practice on an empty stomach or 2 hours after eating', 'Consistency beats intensity - short daily practice trumps weekly long sessions', 'Listen to your body - yoga shouldn\'t cause pain'],
      cta: {text: 'Shop Yoga Gear', description: 'Premium mats, blocks, and apparel'},
    },
    {
      title: 'Yoga Equipment Guide: Creating Your Practice Space',
      readTime: '6 min read',
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
  ],
};

// Sport-specific videos data
const SPORT_VIDEOS: Record<string, Array<{
  title: string;
  youtubeId: string;
  description: string;
}>> = {
  cricket: [
    {title: 'Cricket Batting Masterclass', youtubeId: 'qjJqQFe9QhA', description: 'Learn professional batting techniques including stance, grip, and shot selection.'},
    {title: 'Fast Bowling Tutorial', youtubeId: 'PVd-TFXY_dI', description: 'Develop your pace bowling with proper run-up, action, and release.'},
  ],
  running: [
    {title: 'Proper Running Form', youtubeId: 'wRkeBVMQSgg', description: 'Improve your running efficiency with correct posture and foot strike.'},
    {title: 'Speed Training Drills', youtubeId: 'aYGvR1TBKp4', description: 'Increase your pace with sprint intervals and plyometric exercises.'},
  ],
  'muay-thai': [
    {title: 'Muay Thai Basics for Beginners', youtubeId: 'IShvz9S2PU0', description: 'Essential techniques including stance, punches, kicks, and defense.'},
    {title: 'Heavy Bag Workout', youtubeId: 'LMPxoXrHF_M', description: 'Follow along heavy bag routine for power and conditioning.'},
  ],
  soccer: [
    {title: 'Soccer Dribbling Skills Tutorial', youtubeId: 'naEccnjzLxM', description: 'Learn essential dribbling techniques including the step-over and Cruyff turn.'},
    {title: 'Shooting Technique Guide', youtubeId: '5dSu9rlAQPA', description: 'Master different shooting techniques for various situations.'},
  ],
  basketball: [
    {title: 'Basketball Shooting Fundamentals', youtubeId: 'UcnB9e5O5NY', description: 'Perfect your shooting form with proper hand placement and follow-through.'},
    {title: 'Ball Handling Drills', youtubeId: 'zQMVvyVfzs4', description: 'Improve your handles with daily dribbling exercises.'},
  ],
  swimming: [
    {title: 'Freestyle Swimming Technique', youtubeId: 'AQy_c30lNjI', description: 'Improve your freestyle stroke efficiency with proper body rotation.'},
    {title: 'Breathing Technique Tips', youtubeId: '2DnxE5b3bYQ', description: 'Master bilateral breathing for better endurance and balance.'},
  ],
  triathlon: [
    {title: 'Triathlon Training Overview', youtubeId: 'vdreP5AlUfY', description: 'Complete triathlon preparation covering swim, bike, and run disciplines.'},
    {title: 'Transition Tips', youtubeId: 'xWMmRh7JKQg', description: 'Save time with efficient T1 and T2 transition strategies.'},
  ],
  tennis: [
    {title: 'Tennis Forehand Technique', youtubeId: 'yVPaGZxn4dY', description: 'Perfect your forehand with proper grip, stance, and swing mechanics.'},
    {title: 'Serve Masterclass', youtubeId: 'cdFRKHMvlMA', description: 'Develop a powerful and consistent serve with proper technique.'},
  ],
  golf: [
    {title: 'Golf Swing Basics', youtubeId: 'aESmklxljqE', description: 'Master the fundamentals of the golf swing for consistent ball striking.'},
    {title: 'Short Game Tips', youtubeId: 'MkW5ns4tXCM', description: 'Improve your chipping and putting to lower your scores.'},
  ],
  cycling: [
    {title: 'Cycling Cadence and Efficiency', youtubeId: 'iOsJhIDHKpM', description: 'Optimize your pedaling technique for more power with less effort.'},
    {title: 'Hill Climbing Techniques', youtubeId: 'Dw8HNzD9FwY', description: 'Conquer climbs with proper pacing, positioning, and mental strategies.'},
  ],
  yoga: [
    {title: 'Yoga for Beginners', youtubeId: 'v7AYKMP6rOE', description: 'Start your yoga journey with fundamental poses and breathing techniques.'},
    {title: 'Yoga for Athletes', youtubeId: '1Zsdi2P_ZEY', description: 'Improve flexibility and recovery with sport-specific yoga sequences.'},
  ],
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const sport = SPORTS.find((s) => s.slug === handle);

  if (!sport) {
    throw new Response('Sport not found', {status: 404});
  }

  const {language, country} = context.storefront.i18n;

  // Try to fetch products from a collection with the sport name
  const products = context.storefront
    .query(SPORT_PRODUCTS_QUERY, {
      variables: {
        handle: sport.slug,
        country,
        language,
      },
    })
    .catch(() => null);

  return defer({sport, products});
}

// Blog Article Component - Full display format
function BlogArticle({article, sportSlug, sportName}: {article: {title: string; sections: Array<{heading: string; content: string}>; tips: string[]; readTime: string; cta: {text: string; description: string}}, sportSlug: string, sportName: string}) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full font-semibold">
            {sportName}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{article.title}</h2>
      </div>

      {/* Article Content */}
      <div className="px-8 py-8">
        <div className="prose prose-lg max-w-none">
          {article.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-brand-red to-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                {section.heading}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base pl-11">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Tips Section */}
        <div className="mt-10 bg-gradient-to-r from-brand-red/5 to-brand-orange/5 rounded-xl p-6 border border-brand-red/10">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
            <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="space-y-3">
            {article.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <svg className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center">
          <h4 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h4>
          <p className="text-gray-300 mb-6">{article.cta.description}</p>
          <Link
            to={`/collections/${sportSlug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-orange transition-colors shadow-lg hover:shadow-xl"
          >
            {article.cta.text}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function SportPage() {
  const {sport, products} = useLoaderData<typeof loader>();

  const articles = SPORT_ARTICLES[sport.slug] || [];
  const videos = SPORT_VIDEOS[sport.slug] || [];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-20 px-6 md:px-12"
        style={{
          background: `linear-gradient(135deg, ${sport.color}20 0%, ${sport.color}05 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-8xl mb-6 block">{sport.icon}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{sport.name}</h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg mb-8">
            Discover premium {sport.name.toLowerCase()} gear, training guides, and expert videos.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to={`/collections/${sport.slug}`}
              className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
            >
              Shop {sport.name}
            </Link>
            <a
              href="#articles"
              className="inline-block px-6 py-3 bg-primary/10 font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Read Guides
            </a>
            <a
              href="#videos"
              className="inline-block px-6 py-3 bg-primary/10 font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Watch Videos
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <Suspense fallback={<div className="py-12 text-center">Loading products...</div>}>
          <Await resolve={products}>
            {(response) => {
              if (!response?.collection?.products?.nodes?.length) {
                return (
                  <div className="py-12 px-6 text-center">
                    <p className="text-primary/60 mb-4">
                      No products yet for {sport.name}. Check back soon!
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-orange transition-colors"
                    >
                      Browse All Products
                    </Link>
                  </div>
                );
              }
              return (
                <ProductSwimlane
                  products={response.collection.products}
                  title={`${sport.name} Products`}
                  count={12}
                />
              );
            }}
          </Await>
        </Suspense>
      </section>

      {/* Blog Articles Section */}
      {articles.length > 0 && (
        <section id="articles" className="py-16 px-6 md:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Expert Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                {sport.name} Training Articles
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                In-depth guides and expert insights to help you master every aspect of {sport.name.toLowerCase()}
              </p>
            </div>
            <div className="space-y-12">
              {articles.map((article, idx) => (
                <BlogArticle key={idx} article={article} sportSlug={sport.slug} sportName={sport.name} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Training Videos Section */}
      {videos.length > 0 && (
        <section id="videos" className="py-16 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">Watch & Learn</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                {sport.name} Training Videos
              </h2>
              <p className="text-gray-600 mt-4">
                Watch expert tutorials and improve your technique
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Elevate Your {sport.name} Game?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the best {sport.name.toLowerCase()} gear at FitnessHeals. Premium quality, competitive prices, and fast shipping.
          </p>
          <Link
            to={`/collections/${sport.slug}`}
            className="inline-block px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-brand-orange transition-colors shadow-lg"
          >
            Shop {sport.name} Now
          </Link>
        </div>
      </section>
    </div>
  );
}

const SPORT_PRODUCTS_QUERY = `#graphql
  query sportProducts($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      products(first: 12) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
