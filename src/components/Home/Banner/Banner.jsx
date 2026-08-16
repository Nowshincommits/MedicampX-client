import Success1 from "../../../assets/Success/Success stories-1.png"
import Success2 from "../../../assets/Success/Success stories-2.png"
import Success3 from "../../../assets/Success/Success stories-3.png"
import { Carousel } from 'antd';


const images = [Success1, Success2, Success3];

const Banner = () => {
    return (
   <Carousel className="m-7" autoplay={true} infiniteLoop={true}  showThumbs={false} showStatus={false}>
      {images.map((image, index) => (
        <div key={index}>
          <div style={{ height: "500px" }}>
            <img
              src={image}
              alt={`Success ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      ))}
    </Carousel>
    );
};

export default Banner;