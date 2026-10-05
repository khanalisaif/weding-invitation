// Wedding Invitation Data matching the video and user assets
export const wedding = {
  couple: {
    a: 'Gabriella',
    b: 'Zachary',
    monogram: 'N & A',
    sealImg: '/images/seal.png',
  },
  dateLabel: '10 . 10 . 26',
  dateFormatted: 'Saturday, October 10, 2026',
  dateISO: '2026-10-10T17:00:00',
  intro: 'to celebrate with them as their families come together for their Traditional Introduction Ceremony',
  schedule: [
    { time: '5 PM', title: 'Guest Arrival', desc: 'Welcome drinks & meet and greet' },
    { time: '6 PM', title: 'Nikkah Ceremony', desc: 'Solemnization of marriage vows' },
    { time: '7 PM', title: 'Mocktail Hour', desc: 'Canapés & refreshing royal blends' },
    { time: '8 PM', title: 'Dinner', desc: 'Lavish traditional feast & delights' },
    { time: '9 PM', title: 'Dance', desc: 'Celebrations, music & merrymaking' },
  ],
  venue: {
    name: 'Samuday Bhawan',
    subtitle: 'Royal Banquet & Courtyard',
    when: 'Friday, November 20, 2026 At 5:00 PM',
    address: 'Samuday Bhawan, Civil Lines, Jaipur, Rajasthan 302006',
    mapQuery: 'Samuday Bhawan Jaipur',
    mapsLink: 'https://maps.google.com/?q=Samuday+Bhawan+Jaipur',
    photo: '/images/venue.jpg',
  },
  dressCode: {
    title: 'Dress Code',
    text: 'We kindly ask guests to adorn Rose Gold, Burgundy, Sage, Ivory and Brown tones for the celebration.',
    photo: '/images/gents.jpg',
    ladiesPhoto: '/images/ladies.jpg',
    palette: [
      { name: 'Rose Gold', hex: '#b76e5a', textColor: '#fff' },
      { name: 'Burgundy', hex: '#631422', textColor: '#fff' },
      { name: 'Sage Mint', hex: '#8fb9a8', textColor: '#1a3328' },
      { name: 'Ivory Cream', hex: '#f4ebd9', textColor: '#5a4628' },
      { name: 'Mocha Taupe', hex: '#8c7b6d', textColor: '#fff' },
      { name: 'Noir Black', hex: '#1c1a1c', textColor: '#fff' },
    ],
  },
  rsvp: {
    sealImg: '/images/rsvp-seal.png',
  },
}
