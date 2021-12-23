
import './Slider.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const delay = 2500;
function Slider({ products, ind, caty, setcaty }) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() =>
      setIndex((prevIndex) => prevIndex === ind - 1 ? 0 : prevIndex + 1),
      delay
    )
    return () => resetTimeout();
  }, [index, ind]);


  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {
          products.map((product, index) => (
            <Link
              to={caty ? "#" : "/product/" + product._id}
              key={index}>
              <div
                className="slide"
                key={index}
                onClick={() => caty ? setcaty(product.category) : ""}
                style={caty
                  ? { backgroundImage: `url(${product.image})`, backgroundSize: "98% 100%", backgroundRepeat: "no-repeat" }
                  : { backgroundImage: `url(${product.imageUrl[0]})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Slider