import { nanoid } from "nanoid";

export const customersList = [
  {
    id: nanoid(),
    name: "Burger King",
    status: "active",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Mama Pizza",
    status: "completed",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Domofond",
    status: "active",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019"
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019"
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019"
      }
    ]
  },
  {
    id: nanoid(),
    name: "Sberbank",
    status: "completed",
    campaigns: [
      {
        id: nanoid(),
        name: "Mother's day",
        date: "30 Sep 2019",
        status: "completed",
        attachments: [
          { name: "Specifications.js", id: nanoid() },
          { name: "Prototype.png", id: nanoid() }
        ],
        description: "Implement HTML and PNG banners",
        materials: [
          {
            id: nanoid(),
            name: "Yandex_1280x350",
            date: "01.10.2019 21:43",
            size: "135 KB",
            img: "https://via.placeholder.com/110",
            status: "pending"
          },
          {
            id: nanoid(),
            name: "Yandex_1280x350",
            date: "01.10.2019 21:43",
            size: "135 KB",
            img: "https://via.placeholder.com/110",
            status: "accepted"
          },
          {
            id: nanoid(),
            name: "Yandex_1280x350",
            date: "01.10.2019 21:43",
            size: "135 KB",
            img: "https://via.placeholder.com/110",
            status: "released"
          }
        ],
        messagesList: [
          {
            id: nanoid(),
            text:
              "banners for Mother’s day compaign. Implement 1 HTML and 2 images banners for Mother’s day compaign.",
            time: "12:28",
            type: "outcome"
          },

          {
            id: nanoid(),
            text:
              "Implement 1 HTML and 2 images banners for Mother’s day compaign. Implement 1 HTML and 2 images banners for Mother’s day compaign.",
            time: "12:28",
            type: "income"
          },
          {
            id: nanoid(),
            text:
              "Implement 1 HTML and 2 images banners for Mother’s day compaign. Implement 1 HTML and 2 images banners for Mother’s day compaign.",
            time: "12:29",
            type: "outcome"
          }
        ]
      },
      {
        id: nanoid(),
        name: "Campaign 10.19",
        date: "20 Nov 2019",
        status: "active",
        attachments: []
      },
      {
        id: nanoid(),
        name: "New Year campaign",
        date: "31 Dec 2019",
        status: "active",
        attachments: []
      }
    ]
  }
];
