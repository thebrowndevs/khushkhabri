import { getTestimonialsData } from "@/lib/main/getStaticData";
import Testimonials from "./Testimonials";

const testimonialsLocal = [
  {
    name: "Riya Verma",
    place: "Kurukshetra, Haryana",
    image: "/avatar.jpg",
    thumbnail: "/images/invite1.png",
    heading: "Beautiful Wedding Invite",
    message:
      "We wanted something unique for our wedding invitation and the website turned out absolutely beautiful. Everything felt so personal and easy to share with our guests. Everyone loved it.",
    videoUrl: "https://youtube.com/shorts/VOWydBvucqM",
  },
  {
    name: "Avinash Arora",
    place: "Mumbai, Maharashtra",
    image: "/avatar.jpg",
    thumbnail: "/images/invite2.png",
    heading: "Smooth Experience",
    message:
      "The entire process was very smooth. From selecting the design to final delivery everything was handled perfectly. Our digital wedding invite looked elegant and modern.",
    videoUrl: "https://youtube.com/shorts/VOWydBvucqM",
  },
  {
    name: "Pooja Singh",
    place: "Lucknow, UP",
    image: "/avatar.jpg",
    thumbnail: "/images/invite3.png",
    heading: "Loved by Everyone",
    message:
      "Our guests were really impressed with the invitation website. It was easy to access and looked so graceful. We received so many compliments from family and friends.",
    videoUrl: "https://youtube.com/shorts/VOWydBvucqM",
  },
  {
    name: "Ramesh Kumar",
    place: "Delhi",
    image: "/avatar.jpg",
    thumbnail: "/images/invite1.png",
    heading: "Perfect for Satsang",
    message:
      "We created a satsang invitation through this platform and it came out very peaceful and well designed. Sharing details with everyone became so simple and organized.",
    videoUrl: "https://youtube.com/shorts/VOWydBvucqM",
  },
  {
    name: "Sunita Reddy",
    place: "Hyderabad, Telangana",
    image: "/avatar.jpg",
    thumbnail: "/images/invite2.png",
    heading: "Elegant and Easy",
    message:
      "The design was elegant and everything was very easy to manage. We could share the invitation instantly with all our relatives without any hassle.",
    videoUrl: "https://youtube.com/shorts/VOWydBvucqM",
  },
];

export default async function TestimonialSlider() {

    const res = await getTestimonialsData({
        isVisible: true,
        limit: 15,
        page: 1,
    })

    // const testimonials = res.testimonials || testimonialsLocal
    const testimonials = testimonialsLocal

    // console.log(testimonials)

    return (
        <div><Testimonials testimonials={testimonials} /></div>
    );
}
