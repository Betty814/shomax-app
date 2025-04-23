import video1 from "../assets/videos/v1.mp4";
import video2 from "../assets/videos/v2.mp4";
import video3 from "../assets/videos/v1.mp4";
import video4 from "../assets/videos/v2.mp4";
import Image from "../assets/images/images3.jpg";
const videos = [
  {
    id: 1,
    title: "Video 1",
    url: video1,
    rating: 4.5,
    category: "movies",
    comments: [
      { id: 1, text: "Great video!" },
      { id: 2, text: "Very informative." },
    ],
  },
  {
    id: 2,
    title: "Video 2",
    url: video2,
    rating: 4.0,
    category: "movies",
    comments: [
      { id: 1, text: "Nice content!" },
      { id: 2, text: "Loved it." },
    ],
  },
  {
    id: 3,
    title: "Video 3",
    url: video3,
    rating: 4.8,
    category: "videos",
    comments: [
      { id: 1, text: "Amazing video!" },
      { id: 2, text: "Very helpful." },
    ],
  },
  {
    id: 4,
    title: "Video 4",
    url: video4,
    rating: 4.8,
    category: "movies",
    comments: [
      { id: 1, text: "Amazing video!" },
      { id: 2, text: "Very helpful." },
    ],
  },
  {
    id: 5,
    title: "Video 5",
    url: Image,
    rating: 4.2,
    category: "images",
    comments: [
      { id: 1, text: "Great action scenes!" },
      { id: 2, text: "Very thrilling." },
    ],
  },
  {
    id: 6,
    title: "Video 6",
    url: Image,
    rating: 4.6,
    category: "images",
    comments: [
      { id: 1, text: "Hilarious!" },
      { id: 2, text: "Loved the humor." },
    ],
  },
  {
    id: 7,
    title: "Video 7",
    url: Image,
    rating: 4.3,
    category: "images",
    comments: [
      { id: 1, text: "Very emotional." },
      { id: 2, text: "Great storyline." },
    ],
  },
  {
    id: 8,
    title: "Video 8",
    url: video4,
    rating: 4.7,
    category: "movies",
    comments: [
      { id: 1, text: "Intense action!" },
      { id: 2, text: "Very exciting." },
    ],
  },
  {
    id: 9,
    title: "Video 9",
    url: video1,
    rating: 4.4,
    category: "movies",
    comments: [
      { id: 1, text: "Very funny!" },
      { id: 2, text: "Great laughs." },
    ],
  },
  {
    id: 10,
    title: "Video 10",
    url: video2,
    rating: 4.9,
    category: "videos",
    comments: [
      { id: 1, text: "Outstanding performance!" },
      { id: 2, text: "Very touching." },
    ],
  },
];

export default videos;
