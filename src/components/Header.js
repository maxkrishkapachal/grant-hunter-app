import headerImage from '../res/img/GradPosingEdit1.png';
import { useState } from 'react';
import { websites } from "./Websites.js";


const Header = ({checkBoxesChecked, huntBtnPressed}) => {   
    const [checkedState, setCheckedState] = useState(
        new Array(websites.length).fill(true)
    );

    const [huntBtn, setHuntBtn] = useState(1);
    
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map(
            (item, index) => index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
        checkBoxesChecked(updatedCheckedState);
        console.log("Here is the updated checked state: ", updatedCheckedState);
    };

    const handleHuntBtnPressed = () => {
        setHuntBtn(1);
        huntBtnPressed(1);
    }

    return(
        <div class="wrapper">
            <div class="grant-hunter-header" id="headerComponent">
                <div class='grant-hunter-title'>
                    <p class="title">GRANT HUNTER</p>
                    <p class="slogan">Find your next opportunity.</p>
                    <ul class="grant-choices">
                        {websites.map((name, index) => {
                            return (
                                <li class="grant-choice" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                </li>
                            );
                        })}
                    </ul>
                    <button class="hunt-btn" onClick={handleHuntBtnPressed}>Hunt</button>
                </div>
                <div class="grant-hunter-feature background-tint">
                    <img src={headerImage} class="grant-hunter-header-image" alt="photo of graduates"></img>
                </div>
            </div>
            {/* <img src={patternImage} class="graphic-pattern"></img> */}
        </div>
    );
};

export default Header;