export default function Navigator({
  activeSection,
}: {
  activeSection: string;
}) {
  const items = ["home", "album", "message"];

  return (
    <div className="fixed z-50 top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center space-y-2 opacity-0 md:opacity-50 md:hover:opacity-100 transition-opacity duration-300">
      {items.map((item, index) => (
        <div key={item} className="flex flex-col items-center !mt-0">
          <a
            href={`#${item}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
              ${
                activeSection === item
                  ? "bg-black text-white border-black scale-105 shadow-md"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>

          {index < items.length - 1 && (
            <div className="w-1 h-6 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}
