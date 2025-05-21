
export default function Message() {
  return (
    <div>
      <div className="title">Message</div>
      <div className="mb-10 italic text-center text-gray-500">
        Những lời chúc từ bạn bè
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 overflow-hidden">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-indigo-100 to-purple-200 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:cursor-pointer
            max-w-[1200px] mx-auto"
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Lời chúc từ bạn {index + 1}
            </h3>
            <p className="text-gray-700">
              Chúc mừng bạn đã tốt nghiệp! Mong rằng con đường phía trước sẽ
              luôn tràn đầy thành công và niềm vui 🎓✨
            </p>
            <div className="text-right mt-4 text-sm text-gray-500">
              — Người bạn thân
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
