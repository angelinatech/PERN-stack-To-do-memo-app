import React from 'react';
import { useEffect, useState } from 'react';
import './ImageColor.css'


const ImageColour = ({ backgroundImage, listIndex, stateColor }) => {
  const [imageUrl, setImageUrl] = useState(null)

/* ~*~*~*~*~*~ take the spaces out of the category title passed in and use to set bg image ~*~*~*~*~*~ */

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const backgroundImagePic = backgroundImage.replace(/\s/g, '');
        const image = await import(`../../images/${backgroundImagePic}.png`);
        console.log(backgroundImage)
        setImageUrl(image.default);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [backgroundImage]);

/* ~*~*~*~*~*~ if there's an image url available set it if not blank ~*~*~*~*~*~ */

   const containerStyle = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
  };

/* ~*~*~*~*~*~ random colours thing again, array of colours, pick random ~*~*~*~*~*~ */

  const colours = [
    '#36797a',
    '#6aa1cc',
    '#d6474d',
    '#d3904c',
    '#baafd2'
  ]
  const categoryColor = colours[Math.floor(Math.random() * colours.length)]

/* ~*~*~*~*~*~ make overlay of colour over pic for background ~*~*~*~*~*~ */

  const overlayStyle = {
    backgroundColor: categoryColor,
    opacity: 0.8,
  };
  
/* ~*~*~*~*~*~ use the colour passed for text (not used)~*~*~*~*~*~ */

  const textStateStyle = {
    color: stateColor,
  };

/* ~*~*~*~*~*~ task id not used either, was going to order colours but looks better random? Maybe change not sure ~*~*~*~*~*~ */
/* ~*~*~*~*~*~ render the component properties for ListItem backgrounds ~*~*~*~*~*~ */

  return (
    <div className="custom-component" style={containerStyle}>
      <div className="overlayColour" style={overlayStyle} />
      <div className="content">
        <p className="text-state" style={textStateStyle}>
          {/* State: {listIndex} */}
        </p>
        {/* other content? */}
      </div>
    </div>
  );
};


export default ImageColour;

