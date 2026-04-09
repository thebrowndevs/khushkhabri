function TimeBox({ value, label }) {
    return (
        <div className="flex flex-col items-center ">

            {/* Animated number */}
            <div className="relative h-[50px] overflow-hidden">
                <div
                    key={value}
                    className="text-4xl font-semibold transition-transform duration-500 ease-in-out"
                >
                    {String(value).padStart(2, "0")}
                </div>
            </div>

            <p className="text-2xl mt-1 italic">{label}</p>

        </div>
    );
}

export default TimeBox;