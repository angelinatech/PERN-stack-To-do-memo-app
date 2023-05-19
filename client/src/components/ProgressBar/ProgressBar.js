import './ProgressBar.css'

const ProgressBar = ({progress}) => {

/* ~*~*~*~*~*~ array of random colours to use  ~*~*~*~*~*~ */

  const colours = [
    'rgb(255, 214, 161)',
    'rgb(255, 175, 163)',
    'rgb(108, 115, 148)',
    'rgb(141, 181, 145)'
  ]

/* ~*~*~*~*~*~ select random colour from array to use as colour for inner bar ~*~*~*~*~*~ */


  const randomColour = colours[Math.floor(Math.random() * colours.length)]

    return (
      <div className="outer-bar">
        <div className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomColour}}>

        </div>
      </div>
    );
  }
  
  export default ProgressBar