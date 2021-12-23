import './Slider2.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Slider2({ products, ind, caty, setcaty, width }) {
  const [index, setIndex] = React.useState(0);
  const handlLeft = () => { if (index < 0) setIndex(index + 105) }

  const handlRight = () => {
    var number_of_photo = 0;

    if (width < 650) number_of_photo = 3
    else if (width < 777) number_of_photo = 4
    else if (width < 935) number_of_photo = 5
    else if (width < 1090) number_of_photo = 6
    else if (width < 2245) number_of_photo = 7
    else number_of_photo = 8
    
    if (index > -(ind - number_of_photo) * 105) setIndex(index - 105)
  }

  return (
    <div className="befor-slid-gap2 container">

      <div
        className="row-left"
        onClick={handlLeft}>
        <i className="fas fa-angle-double-left"></i>
      </div>

      <div className="test3">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${index}px, 0, 0)`, }} >
          <div className="test2">
            {
              products.map((product, index) => {
                return <div
                  className="test"
                  key={index}
                  style={{ backgroundImage: `url(${product.imageUrl[0]})` }}>
                  <Link to={caty
                    ? "#"
                    : "/product/" + product._id} >
                    <div className="cov"></div>
                  </Link>
                </div>
              })
            }
          </div>
        </div>
      </div>

      <div
        className="row-reight"
        onClick={handlRight}>
        <i className="fas fa-angle-double-right"></i>
      </div>
    </div>
  );
}

export default Slider2