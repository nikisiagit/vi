export const state = () => ({
  events: [],
  loading: false,
  token: undefined,

  polls: [
        {
          venueId: 'ucas',
          pollId: 'ucas.poll.metal-1',
          name: 'Which country does best metal?',
          theme: {
            light: {
              background: 'yellow'
            },
            dark: {
              background: 'yellow'
            }
          },

          createdBy: 'Nikita Ovcinnikovs',
          type: 'public',
          time: 'Ends in 2 hours',
          votes: 488,
          likes: 25
        },

         {
            venueId: 'ucas',
            pollId: 'ucas.poll.economy-1',
            name: 'Which country have the strongest economy in the world?',
            theme: {
              light: {
                background: 'yellow'
              },
              dark: {
                background: 'yellow'
              }
            },

            createdBy: 'Mr White',
            type: 'public',
            time: 'Ends in 8 hours',
            votes: 120,
            likes: 10
          },

          {
            venueId: 'ucas',
            pollId: 'ucas.poll.economy-2',
            name: 'Which country have the worse inflation in the world?',
            theme: {
              light: {
                background: 'yellow'
              },
              dark: {
                background: 'yellow'
              }
            },

            createdBy: 'Mr Dobson',
            type: 'public',
            time: 'Ends in 6 hours',
            votes: 160,
            likes: 15
          },




  ],

  presentations: [
    {
      venueId: 'ucas',
      presentationId: 'ucas.presentations.soad',
      name: 'soad',
      theme: {
        light: {
          background: 'purple'
        },
        dark: {
          background: 'green'
        }
      },
      timeStart: '11:30',
      timeEnd: '11:45',
      presenters: [
        {
          presenterId: 'ucas.presenters.jdavis'
        },
        {
          presenterId: 'ucas.presenters.serj'
        },
        {
          presenterId: 'ucas.presenters.kim',
        },
        {
          presenterId: 'ucas.presenters.peppa',
        }
      ]
    },
    {
        venueId: 'ucas',
        presentationId: 'ucas.presentations.rammstein-live',
        name: 'rammstein-live',
    },
    {
        venueId: 'ucas',
        presentationId: 'ucas.presentations.soad-live-signing',
        name: 'soad-live-signing',
      },
    {
      venueId: 'ucas',
      presentationId: 'ucas.presentations.corny-photo-winner',
      name: 'corny-photo-winner',
    }
  ],

  presenters: [
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.daron',
      presenterId: 'ucas.presenters.daron',
      imageUrl: "https://i.pinimg.com/originals/70/f8/ce/70f8ce240587112504c78359d2d049d5.jpg",
      name: 'Daron Malakian',
      // jobTitle, role, company,
      highlights: [
         "Born July 18, 1975",
         "47th in Loudwire's list of Top 50 Hard Rock + Metal Guitarists of All Time",
         "Armenian-American",
         "Not married has no children",
      ],
      company: 'System of a Down',
      jobTitle: 'Guitarist, Vocalist',
      theme: {
        light: {
          background: 'purple'
        },
        dark: {
          background: 'green'
        }
      },
      bio: "Daron Vartan Malakian was born in Hollywood, California, the only child to Vartan and Zepur Malakian. His parents are ethnic Armenian immigrants.[4] Vartan Malakian is a painter, dancer, and choreographer and Zepur Malakian is a sculptor who instructed college-level sculpture earlier in her career.[4] At a very early age, Malakian got into heavy metal music; his distant cousin played him a Kiss record when he was four years old. Malakian started listening to Van Halen, Aerosmith, Def Leppard, Black Sabbath, Iron Maiden, Judas Priest, Motörhead and Ozzy Osbourne among others. He always wanted to play the drums, but his parents got him a guitar instead because 'You can't turn the drums off.' Daron first picked up a guitar at age 11,[5] saying in an interview, 'For the first year and a half, I learned how to play by ear, and did alright. After a few years I gained a reputation as being a guitar player in high school. And by 16 or 17 I actually realized it was a good songwriting instrument, and, over anything, that's what I feel like. I don't pretend to be Mr. Guitar Virtuoso.'[6] During his teens Malakian listened to thrash metal bands such as Slayer,[5] Venom, Metallica,[5] Pantera and Sepultura. Malakian then began listening to The Beatles and cites John Lennon as one of his biggest influences as a songwriter.[5] He also cites other British Invasion bands such as The Kinks[6] and The Who[5][6] as major influences as well as folk-rock such as trio Peter, Paul and Mary and punk pioneer Iggy Pop.[5] Daron went to Rose and Alex Pilibos Armenian School in the Los Feliz side of Hollywood, which his future bandmates Shavo Odadjian and Ontronik 'Andy' Khachaturian (System of a Down's original drummer) also attended.[5] System of a Down vocalist Serj Tankian attended the school as well, but he was many years above Malakian and the others.[5] Malakian attended Glendale High School as a teenager.[5]"
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.serj',
      presenterId: 'ucas.presenters.serj',
      imageUrl: 'http://www.hitkiller.com/666/wp-content/uploads/2021/02/Serj-Tankian.jpg',
      name: 'Serj Tankian',
      theme: {
        light: {
          background: 'pink',
        },
        dark: {
          background: 'blue',
        }
      },
      highlights: [
         "Record Producer",
         "Ranked No. 26 on the Hit Parader list of Top 100 Heavy Metal Vocalists",
         "Born in Beirut, Lebanon",
         "Married to Angela Madatyan",
      ],
      company: 'System of a Down',
      jobTitle: 'Lead Vocals, Keyboard',
      bio: "Serj Tankian was born in Hollywood, California, the only child to Vartan and Zepur Malakian. His parents are ethnic Armenian immigrants.[4] Vartan Malakian is a painter, dancer, and choreographer and Zepur Malakian is a sculptor who instructed college-level sculpture earlier in her career.[4] At a very early age, Malakian got into heavy metal music; his distant cousin played him a Kiss record when he was four years old. Malakian started listening to Van Halen, Aerosmith, Def Leppard, Black Sabbath, Iron Maiden, Judas Priest, Motörhead and Ozzy Osbourne among others. He always wanted to play the drums, but his parents got him a guitar instead because 'You can't turn the drums off.' Daron first picked up a guitar at age 11,[5] saying in an interview, 'For the first year and a half, I learned how to play by ear, and did alright. After a few years I gained a reputation as being a guitar player in high school. And by 16 or 17 I actually realized it was a good songwriting instrument, and, over anything, that's what I feel like. I don't pretend to be Mr. Guitar Virtuoso.'[6] During his teens Malakian listened to thrash metal bands such as Slayer,[5] Venom, Metallica,[5] Pantera and Sepultura. Malakian then began listening to The Beatles and cites John Lennon as one of his biggest influences as a songwriter.[5] He also cites other British Invasion bands such as The Kinks[6] and The Who[5][6] as major influences as well as folk-rock such as trio Peter, Paul and Mary and punk pioneer Iggy Pop.[5] Daron went to Rose and Alex Pilibos Armenian School in the Los Feliz side of Hollywood, which his future bandmates Shavo Odadjian and Ontronik 'Andy' Khachaturian (System of a Down's original drummer) also attended.[5] System of a Down vocalist Serj Tankian attended the school as well, but he was many years above Malakian and the others.[5] Malakian attended Glendale High School as a teenager.[5]"
    },

    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.jdavis',
      presenterId: 'ucas.presenters.jdavis',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Jonathan_Davis_2016.jpg/1200px-Jonathan_Davis_2016.jpg',
      name: 'Jonathan Davis',
      theme: {
        light: {
          background: 'grey'
        },
        dark: {
          background: 'teal'
        }
      },
      highlights: [
            "Co-founded KORN",
            "Has an alter ego called JDevil",
            "Won two Grammy Awards out of eight nominations throughout his career",
            "Sold over 40 million albums worldwide",
      ],
            company: 'KORN',
            jobTitle: 'Lead Vocals',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.bob-the-builder',
      presenterId: 'ucas.presenters.bob-the-builder',
      imageUrl: 'https://images.justwatch.com/backdrop/11193340/s1440/bob-the-builder-race-to-the-finish',
      name: 'Bob the Builder',
      theme: {
        light: {
          background: 'grey'
        },
        dark: {
          background: 'yellow'
        }
      },
      highlights: [
        "Likes to get things done",
        "Positive attitude",
        "My best friend is Dizzy the cement mixer",
      ],
      company: 'CBeebies',
      jobTitle: 'Main Character',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.jbieber',
      presenterId: 'ucas.presenters.jbieber',
      imageUrl: 'https://celebs-place.com/gallery/justin-bieber/0964_x_28329.jpg',
      name: 'Justin Bieber',
      theme: {
        light: {
          background: 'yellow'
        },
        dark: {
          background: 'purple'
        },
      },
        highlights: [
                "Born in Canada",
                "Discovered by Scooter Braun",
                "Married to Hailey Baldwin",
                "Associated acts with Skrillex, Poo Bear, and more",
      ],
      company: 'Sony Productions',
      jobTitle: 'Singer / Actor / Dick',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.amara',
      presenterId: 'ucas.presenters.amara',
      imageUrl: 'https://s31092.pcdn.co/wp-content/uploads/2019/08/Borderlands-3-1.jpg',
      name: 'Amara',
      theme: {
        light: {
          background: 'purple'
        },
        dark: {
          background: 'brown'
        },
      },
        highlights: [
               "Born in the abysmal slums of Partali",
               "Punch holes in a concrete truck",
               "My cooldown is 13 seconds",
               "I speak Bengali",
      ],
      company: 'Borderlands 3',
      jobTitle: 'Siren',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.chris',
      presenterId: 'ucas.presenters.chris',
      imageUrl: 'https://www.quirkybyte.com/wp-content/uploads/2016/09/chris.jpg',
      name: 'Christopher Reeve',
      theme: {
        light: {
          background: 'blue'
        },
        dark: {
          background: 'indigo'
        }
      },
        highlights: [
                   "Born in New York",
                   "Played superman in 1978  Activist for environmental causes",
                   "Died in 2004",
            ],
            company: 'DC Extended Universe',
            jobTitle: 'Actor',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.matt',
      presenterId: 'ucas.presenters.matt',
      imageUrl: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/06/14/10/hancock-0.jpg',
      name: 'Matt Hancock',
      theme: {
        light: {
          background: 'brown'
        },
        dark: {
          background: 'orange'
        }
      },
      highlights: [
               "British Politician · Born in 1978",
               "Member of Conservative Party",
               "Been naughty during lockdown",
               "Got fired from a UN role",
          ],
      company: 'Conservative',
      jobTitle: 'Unemployed',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.kim',
      presenterId: 'ucas.presenters.kim',
      imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2020/06/NINTCHDBPICT000587875860.jpg',
      name: 'Kim Jong-un',
      theme: {
        light: {
          background: 'red'
        },
        dark: {
          background: 'red'
        }
      },
      highlights: [
                 "Politician · People love me",
                 "I am NOT associated with fashion brand SUPREME",
                 "Friends with Donald Trump",
                 "All our nukes are none of your business",
          ],
      company: 'Communist Party',
      jobTitle: 'Supreme Leader of North Korea',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.pikachu',
      presenterId: 'ucas.presenters.pikachu',
      imageUrl: 'https://www.freepngimg.com/thumb/pokemon/37475-6-pikachu-transparent-image.png',
      name: 'Pikachu',
      theme:
      {
        light: {
          background: 'yellow darken-1'
        },
        dark: {
          background: 'yellow'
        }
      },
      highlights: [
              "My ability is static",
              "I am electric",
              "I am a bi",
              "My weakness is ground",
              "I am 40.6 cm tall",
       ],
       company: 'The Pókemon Company',
       jobTitle: 'Fictional Character',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.thanos',
      presenterId: 'ucas.presenters.thanos',
      imageUrl: 'https://wallpapercave.com/wp/wp7661904.jpg',
      name: 'Thanos',
      theme: {
        light: {
          background: 'cyan'
        },
        dark: {
          background: 'purple'
        }
      },
       highlights: [
              "Created by Jim Starlin",
              "Made first appeared in Iron Man #55",
              "One of the most powerful beings in the Marvel Universe",
         ],
     company: 'Marvel Universe',
     jobTitle: 'Supervillain',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.xzibit',
      presenterId: 'ucas.presenters.xzibit',
      imageUrl: 'https://cdn.quotesgram.com/img/5/1/1588803048-Xzibit_AG037.jpg',
      name: 'Xzibit',
      theme: {
        light: {
          background: 'teal'
        },
        dark: {
          background: 'teal darken-1'
        }
      },
      highlights: [
          "Part of a meme",
          "Born in Detroit, Michigan",
          "1.77 metres tall",
          "First debut album was ‘At the Speed of Life’",
          "Pimp My Ride presenter",
      ],
      company: 'Yo',
      jobTitle: 'Rapper, Actor, Songwriter',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.peppa',
      presenterId: 'ucas.presenters.peppa',
      imageUrl: 'https://i.pinimg.com/originals/9b/9b/7f/9b9b7fa2e2ae4773925232db134af446.png',
      name: 'Peppa',
      theme: {
        light: {
          background: 'pink darken-1'
        },
        dark: {
          background: 'yellow'
        }
      },
      highlights: [
                 "Female piglet",
                 "I have been broadcasted in over 180 countries",
                 "I was born in 2004",
                 "There is a Peppa Pig theme park",
                 "Got acquired by Hasbro for US$3.8 billion deal",
          ],
      company: 'Channel 5',
      jobTitle: 'Lead Actor',
    },
    {
      venueId: 'ucas',
      profileId: 'ucas.presenters.byford',
      presenterId: 'ucas.presenters.byford',
      imageUrl: 'https://www.rockconfidential.com/wp-content/uploads/2019/09/Biff-Byford-bypass-recovery.jpg',
      name: 'Biff Byford',
      theme: {
        light: {
          background: 'purple'
        },
        dark: {
          background: 'yellow'
        }
      },
      highlights: [
                 "Born in Honley, West Yorkshire",
                 "Launched a campaign to have Britons declare heavy metal as their religion",
                 "Released his first solo album ‘School of Hard Knocks’",
      ],
      company: 'Saxon',
      jobTitle: 'Lead Singer',
    },
  ]
})

export const mutations = {
  /**
   * Set the Events state.
   *
   * @param state
   * @param events
   */
  events(state, events) {
    state.events = events
  },

  /**
   * Set the loading state.
   *
   * @param state
   * @param loading {boolean}
   */
  loading(state, loading) {
    state.loading = loading
  },

  /**
   * Set the token state.
   *
   * @param state
   * @param token {string | undefined}
   */
  token(state, token) {
    state.token = token
  },

  /**
   * Add the Event to the event state.
   *
   * @param state
   * @param event {object}
   */
  addEvent(state, event) {
    state.events.push(event)
  },

  /**
   * Remove the Event from the events state.
   *
   * @param state
   * @param event
   */
  removeEvent(state, event) {
    const index = state.events.findIndex((item) => {
      return item.eventId === event.eventId
    })

    if (index > -1) {
      state.events.splice(index, 1)
    }
  },

  addArea (state, area) {
    const eventId = area.eventId;
    const areaId = area.areaId;
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);

    if (areaIndex < 0) {
      state.events[index].areas.push(area);
    } else {
      state.events[index].areas.splice(
        areaIndex,
        1,
        Object.assign({}, state.events[index].areas[areaIndex], area)
      );
    }
  },

  addTicket (state, ticket) {
    const eventId = ticket.eventId;
    const ticketId = ticket.ticketId;
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index < 0) {
      return;
    }

    const ticketIndex = state.events[index].tickets.findIndex(item => item.ticketId === ticketId);

    if (ticketIndex < 0) {
      state.events[index].tickets.push(ticket);
    } else {
      state.events[index].tickets.splice(
        ticketIndex,
        1,
        Object.assign({}, state.events[index].tickets[ticketIndex], ticket)
      );
    }
  },

  ticketsLoading (state, {eventId, ticketsLoading}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {ticketsLoading})
      )
    }
  },

  ticketsLoaded (state, {eventId, ticketsLoaded}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {ticketsLoaded})
      )
    }
  },

  tickets (state, {eventId, tickets}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {tickets})
      )
    }
  },

  ticketsToken (state, {eventId, ticketsToken}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {ticketsToken})
      )
    }
  },

  permissions (state, {eventId, areaId, permissions}) {
    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {permissions})
    );
  },

  permissionsToken (state, {eventId, areaId, permissionsToken}) {
    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {permissionsToken})
    );
  },

  permissionsLoaded (state, {eventId, areaId, permissionsLoaded}) {
    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {permissionsLoaded})
    );
  },

  permissionsLoading (state, {eventId, areaId, permissionsLoading}) {
    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {permissionsLoading})
    );
  },

  areasLoading (state, {eventId, areasLoading}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {areasLoading})
      )
    }
  },

  areasLoaded (state, {eventId, areasLoaded}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {areasLoaded})
      )
    }
  },

  areas (state, {eventId, areas}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {areas})
      )
    }
  },

  areasToken (state, {eventId, areasToken}) {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index > -1) {
      state.events.splice(
        index,
        1,
        Object.assign({}, state.events[index], {areasToken})
      )
    }
  },


  componentsLoading (state, {areaId, componentsLoading = false}) {
    const eventId = areaId.split('.', 2).join('.');

    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {componentsLoading})
    );
  },


  componentsLoaded (state, {areaId, componentsLoaded = false}) {
    const eventId = areaId.split('.', 2).join('.');

    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {componentsLoaded})
    );
  },

  components (state, {areaId, components}) {
    const eventId = areaId.split('.', 2).join('.');

    const index = state.events.findIndex(item => item.eventId === eventId);
    if (index < 0) {
      return;
    }

    const areaIndex = state.events[index].areas.findIndex(item => item.areaId === areaId);
    if (areaIndex < 0) {
      return;
    }

    state.events[index].areas.splice(
      areaIndex,
      1,
      Object.assign({}, state.events[index].areas[areaIndex], {components})
    );
  },
}

export const getters = {
  /**
   * Return the Events.
   *
   * @param state
   * @return {[]}
   */
  events: (state) => {
    return state.events
  },

  /**
   * Return the Events that are happening `now`.
   *
   * @return {*[]}
   */
  happeningNowEvents: (state) => {
    return state.events.filter((event) => {
      return true;
    });
  },

  /**
   * Return the Events that are happening `soon`.
   *
   * @return {*[]}
   */
  upcomingEvents: (state)  => {
    return state.events.filter((event) => {
      return true;
    });
  },

  /**
   * Return the Events that have already happened.
   *
   * @return {*[]}
   */
  pastEvents: (state) => {
    return state.events.filter((event) => {
      return true;
    });
  },

  /**
   * Return the loading state.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading
  },

  /**
   * Return the number of Events.
   *
   * @param state
   * @return {number|number}
   */
  numberOfEvents: (state) => {
    return state.events.length || 0
  },

  /**
   * Return the Events identified by the supplied eventId.
   *
   * @param state
   * @param eventId {string}
   */
  eventWithEventId: (state) => (eventId) => {
    const index = state.events.findIndex(item => item.eventId === eventId);
    if ( index > -1) {
      return state.events[index];
    }
  },

  areaWithAreaId: (state) => (eventId, areaId) => {
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index < 0) {
      return null;
    }

    return state.events[index].areas.find(item => item.areaId === areaId);
  },

  /**
   * Return the Presenters in the state.
   */
  presenters: (state) => {
    return state.presenters || [];
  },

  /**
   * Return the Presenters identified by the supplied presenterId - `presenters.ucas.0a46da3e-4637-41e7-aee3-13b4b3dc48ce`
   */
  presenterWithPresenterId: (state) => {
      console.log(state.presenters);
    return (presenterId) => {
      console.log(presenterId);
       return state.presenters.find(presenter => presenter.presenterId === presenterId);
    }
  },

  presentations: (state) => {
    return state.presentations || [];
  },

  /**
   *
   */
  presentationWithPresentationId: (state) => (presentationId) => {
   return state.presentations.find(presentation => presentation.presentationId === presentationId);
  },


  presentationsWithPresenterId: (state) => (presenterId) => {
   return state.presentations.filter(presentation => {
      if (! presentation.presenters) {
        return null;
      }

      return presentation.presenters.find(presenter => presenter.presenterId === presenterId)
   });
  },

   /**
     * Return the Polls in the state.
   */
    polls: (state) => {
      return state.polls || [];
    },

    /**
     * Return the Polls identified by the supplied pollId
     */
    pollWithPollId: (state) => {
      return (pollId) => {
         return state.polls.find(poll => poll.pollId === pollId);
      }
    },
};

export const actions = {
  /**
   * Load the Events from the api.
   *
   * @param context
   */
  async loadEvents(context) {
    context.commit('loading', true)
    const {events, token} = await this.$repository.event.listEvents();

    context.commit('events', events.map(event => {
      return Object.assign({}, event, {
        areas: [],
        areasToken: undefined,
        areasLoading: false,
        areasLoaded: false,

        tickets: [],
        ticketsToken: undefined,
        ticketLoading: false,
        ticketsLoaded: false,

      });
    }));

    context.commit('token', token);
    context.commit('loading', false)
  },

  /**
   * Create a Event.
   *
   * @param context
   * @param event
   * @return {Promise<unknown>}
   */
  async createEvent(context, event) {
    const venueId = 'ucas'; // @todo - this needs to be extracted out in a plugin or something?
    event.venueId = venueId;
    event.eventId = `${venueId}.${event.name}`;

    console.log('## EVENT');
    console.log(event);

    await this.$repository.event.postEvent(event);
    context.commit('addEvent', event)
    return true;
  },

  /**
   * Unload all data from the events state.
   *
   * @param context
   */
  unloadEvents(context) {
    context.commit('loading', false)
    context.commit('events', [])
    context.commit('token', undefined)
  },

  /**
   * Reload the Events store state.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reloadEvents({ dispatch }) {
    await dispatch('unloadEvents')
    await dispatch('loadEvents')
  },

  /**
   * Delete the Event.
   *
   * @param context
   * @param event
   */
  async deleteEvent(context, event) {
    try {
      await this.$repository.event.deleteEvent(event)
      context.commit('removeEvent', event)
      return true
    } catch (e) {
      console.log('err', e)
    }
  },

  /**
   * Load the Areas for the specified Event.
   *
   * @param context
   * @param eventId
   * @return {Promise<void>}
   */
  async loadEventAreas (context, eventId) {
    context.commit('areasLoading', {eventId, areasLoading: true});
    const {areas, token} = await this.$repository.event.listEventAreas(eventId);

    context.commit('areas', {eventId, areas: areas.map(area => {
        return Object.assign({}, area, {
          components: [],
          componentsLoaded: false,
          componentsLoading: false,
          permissions: [],
          permissionsLoaded: false,
          permissionsLoading: false,
        })
      })});

    context.commit('areasToken', {eventId, areasToken: token});
    context.commit('areasLoaded', {eventId, areasLoaded: true});
    context.commit('areasLoading', {eventId, areasLoading: false});
  },

  async loadAreaPermissions (context, {eventId, areaId}) {
    context.commit('permissionsLoading', {eventId, areaId, permissionsLoading: true});

    const {permissions, token} = await this.$repository.event.listAreaPermissions(eventId, areaId);

    context.commit('permissions', {eventId, areaId, permissions: permissions.map(permission => {
        return Object.assign({}, permission, {
          //
        })
      })});

    context.commit('permissionsToken', {eventId, areaId, permissionsToken: token});
    context.commit('permissionsLoaded', {eventId, areaId, permissionsLoaded: true});
    context.commit('permissionsLoading', {eventId, areaId, permissionsLoading: false});
  },

  /**
   * Load the Components for the specified areaId
   * @param context
   * @param areaId {string} `ucas
   * @return {Promise<void>}
   */
  async loadAreaComponents (context, areaId) {
    context.commit('componentsLoading', {areaId, componentsLoading: true});

    const {components, token} = await this.$repository.event.listAreaComponents(areaId);

    context.commit('components', {areaId, components: components.map(component => {
        return Object.assign({}, component, {
          //
        })
      })});

    context.commit('componentsToken', {areaId, componentsToken: token});
    context.commit('componentsLoaded', {areaId, componentsLoaded: true});
    context.commit('componentsLoading', {areaId, componentsLoading: false});
  },

  async reloadEventAreas (context, eventId) {
    await context.dispatch('loadEventAreas', eventId);
  },

  async reloadEventTickets (context, eventId) {
    await context.dispatch('loadEventTickets', eventId);
  },

  // async createEventTicket (context, ticket) {
  //   console.log('## CREATE EVENT TICKET');
  //   ticket.ticketId = `${ticket.eventId}.${ticket.name}`;
  //
  //   console.log(ticket);
  //
  //   await this.$repository.event.postTicket(ticket);
  //   context.commit('addTicket', ticket);
  //   return true;
  // },

  // async createEventArea (context, area) {
  //   console.log('## CREATE EVENT AREA');
  //   area.areaId = `${area.eventId}.${area.name}`;
  //   console.log(area);
  //
  //   await this.$repository.event.postArea(area);
  //   context.commit('addArea', area);
  //   return true
  // },

  // async createComponent (context, component) {
  //   console.log('createComponent');
  //   console.log(component);
  //
  //   await this.$repository.event.postComponent(component);
  //   context.commit('addComponent', component);
  //   return true;
  // },

  async loadEventTickets (context, eventId) {
    context.commit('ticketsLoading', {eventId, ticketsLoading: true});
    const {tickets, token} = await this.$repository.event.listEventTickets(eventId);

    context.commit('tickets', {eventId, tickets: tickets.map(ticket => {
        return Object.assign({}, ticket, {
          permissions: [],
          permissionsLoaded: false,
          permissionsLoading: false,
          price: 0,
        })
      })});

    context.commit('ticketsToken', {eventId, ticketsToken: token});
    context.commit('ticketsLoaded', {eventId, ticketsLoaded: true});
    context.commit('ticketsLoading', {eventId, ticketsLoading: false});
  },

  /**
   * @param context
   * @param buyTickets
   * @return {Promise<void>}
   */
  async buyTicket (context, buyTicket) {
    console.log('buyTicket');
    console.log(buyTicket); // email | profileId , ticketId

    const response = await this.$repository.event.buyTicket(buyTicket);
    console.log(response);
  }
}
