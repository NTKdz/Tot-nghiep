import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Carousels() {

  return (
    <div>
      <div className="title">Album</div>
      <div className="mb-10 italic text-center text-gray-500">
        Những bức ảnh được sưu tầm từ nhiều nguồn khác nhau :)) (Vinh)
      </div>
      <Carousel
        responsive={responsive}
        className=""
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className=" w-full h-full bg-gray-200">
            <img
              src={`anh/${item}.jpg`}
              alt={`Random ${item}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
