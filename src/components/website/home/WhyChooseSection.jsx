// app/components/WhyChooseSection.jsx
import Image from "next/image";

const reasons = [
    {
        image: "/i1.png",
        title: "Wood-Pressed Extraction",
        desc: "Traditional cold-press (lakdi-ka-ghan) method that preserves nutrients and flavor.",
    },
    {
        image: "/i2.png",
        title: "100% Natural & Pure",
        desc: "No chemicals, no preservatives — just the goodness of raw seeds and nature.",
    },
    {
        image: "/i3.png",
        title: "Lab Tested for Safety",
        desc: "Every batch is tested for purity, safety, and nutritional value.",
    },
    {
        image: "/i4.png",
        title: "Nutrient-Rich Oils",
        desc: "Packed with antioxidants, vitamins, and healthy fats for daily wellness.",
    },
    {
        image: "/i5.png",
        title: "Freshly Packed in Small Batches",
        desc: "We produce in limited batches to maintain freshness and quality.",
    },
    {
        image: "/i6.png",
        title: "Made with Love in India",
        desc: "Locally sourced seeds and proudly made using traditional Indian methods.",
    },
];

export default function WhyChooseSection() {
    return (
        <section className="bg-[#FFFDF7] px-4 md:px-16 py-12">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-green-700">
                    Why Choose Wood–Pressed Oils?
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {reasons.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white border border-green-200 rounded-xl p-5 text-left hover:shadow-md transition"
                    >
                        <div className="w-12 h-12 mb-4">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-md font-bold text-gray-800 mb-2">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
