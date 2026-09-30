import { NextResponse } from 'next/server';

export async function GET() {
  const games = [
    { 
      id: 'lol', 
      name: 'League of Legends',
      ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
      roles: ['Top', 'Jungle', 'Mid', 'ADC', 'Support']
    },
    { 
      id: 'valo', 
      name: 'Valorant',
      ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
      roles: ['Duelist', 'Initiator', 'Controller', 'Sentinel']
    },
    { 
      id: 'cs2', 
      name: 'Counter-Strike 2',
      ranks: ['Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master', 'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master', 'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian', 'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'The Global Elite'],
      roles: ['Entry Fragger', 'Support', 'In-Game Leader (IGL)', 'AWPer', 'Lurker']
    }
  ];

  return NextResponse.json(games);
}
