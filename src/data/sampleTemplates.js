export const sampleTemplates = [
  {
    id: 'side-projects',
    name: 'Side Project Prioritizer',
    description: 'Helps prioritize which side projects are most aligned with your goals. Adjust weights to focus on lucrative projects or skill building.',
    dimensions: [
      { name: 'Impact', weight: 5 },
      { name: 'Easiness', weight: 3 },
      { name: 'Financial Gain', weight: 2 },
      { name: 'Growth Potential', weight: 4 }
    ],
    tasks: [
      {
        name: 'Mobile App Development',
        values: { Impact: 4, Easiness: 2, 'Financial Gain': 4, 'Growth Potential': 5 }
      },
      {
        name: 'Blog Writing',
        values: { Impact: 3, Easiness: 4, 'Financial Gain': 2, 'Growth Potential': 3 }
      },
      {
        name: 'Open Source Contribution',
        values: { Impact: 5, Easiness: 3, 'Financial Gain': 1, 'Growth Potential': 4 }
      }
    ]
  },  
  {
    id: 'restaurant-choice',
    name: 'Restaurant Chooser',
    description: 'Helps you and your group decide where to eat by considering factors like price, taste, distance, and wait time.',
    dimensions: [
      { name: 'Price', weight: 3 },
      { name: 'Taste', weight: 5 },
      { name: 'Distance', weight: 3 },
      { name: 'Wait Time', weight: 2 }
    ],
    tasks: [
      {
        name: 'Local Diner',
        values: { Price: 4, Taste: 3, Distance: 5, 'Wait Time': 4 }
      },
      {
        name: 'Fine Dining Restaurant',
        values: { Price: 1, Taste: 5, Distance: 3, 'Wait Time': 2 }
      },
      {
        name: 'Fast Food Chain',
        values: { Price: 5, Taste: 2, Distance: 4, 'Wait Time': 5 }
      }
    ]
  },
  {
    id: 'college-selection',
    name: 'College Selector',
    description: 'Compare different colleges based on important factors to help make the best choice for your education and future.',
    dimensions: [
      { name: 'Cost', weight: 1 },      
      { name: 'Location', weight: 2 },
      { name: 'Reputation', weight: 5 },
      { name: 'Campus Life', weight: 3 },
    ],
    tasks: [
      {
        name: 'Community College',
        values: { Cost: 5, Location: 4, Reputation: 2, 'Campus Life': 2 }
      },
      {
        name: 'State University',
        values: { Cost: 3, Location: 3, Reputation: 4, 'Campus Life': 4 }
      },
      {
        name: 'Private University',
        values: { Cost: 1, Location: 3, Reputation: 5, 'Campus Life': 5 }
      }
    ]
  },
  {
    id: 'vacation-planning',
    name: 'Vacation Picker',
    description: 'Compare different vacation destinations to find the perfect spot for your next trip.',
    dimensions: [
      { name: 'Cost', weight: 4 },
      { name: 'Weather', weight: 3 },
      { name: 'Activities', weight: 4 },
      { name: 'Travel Time', weight: 2 }
    ],
    tasks: [
      {
        name: 'Local Beach Resort',
        values: { Cost: 3, Weather: 4, Activities: 3, 'Travel Time': 4 }
      },
      {
        name: 'European City Tour',
        values: { Cost: 1, Weather: 3, Activities: 5, 'Travel Time': 1 }
      },
      {
        name: 'National Park Camping',
        values: { Cost: 5, Weather: 3, Activities: 4, 'Travel Time': 3 }
      }
    ]
  },
  {
    id: 'car-purchase',
    name: 'Vehicle Purchase Helper',
    description: 'Compare different vehicles to find the best match for your needs and preferences.',
    dimensions: [
      { name: 'Price', weight: 3 },
      { name: 'Reliability', weight: 2 },
      { name: 'Resale Value', weight: 1 },
      { name: 'Fuel Efficiency', weight: 4 }
    ],
    tasks: [
      {
        name: 'Economy Sedan',
        values: { Price: 4, Reliability: 4, 'Resale Value': 3, 'Fuel Efficiency': 5 }
      },
      {
        name: 'Luxury SUV',
        values: { Price: 1, Reliability: 3, 'Resale Value': 4, 'Fuel Efficiency': 2 }
      },
      {
        name: 'Electric Vehicle',
        values: { Price: 2, Reliability: 3, 'Resale Value': 3, 'Fuel Efficiency': 5 }
      }
    ]
  },
  {
    id: 'job-offers',
    name: 'Job Offer Comparison',
    description: 'Evaluate multiple job offers by considering various aspects of each opportunity.',
    dimensions: [
      { name: 'Salary', weight: 5 },
      { name: 'Work-Life Balance', weight: 5 },
      { name: 'Growth Potential', weight: 3 },
      { name: 'Company Culture', weight: 2 },
    ],
    tasks: [
      {
        name: 'Startup Position',
        values: { Salary: 3, 'Work-Life Balance': 2, 'Growth Potential': 5, 'Company Culture': 4 }
      },
      {
        name: 'Corporate Role',
        values: { Salary: 4, 'Work-Life Balance': 3, 'Growth Potential': 3, 'Company Culture': 3 }
      },
      {
        name: 'Remote Position',
        values: { Salary: 3, 'Work-Life Balance': 5, 'Growth Potential': 3, 'Company Culture': 3 }
      }
    ]
  }  
]; 