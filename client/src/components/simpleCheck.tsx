import React, { useState } from "react";
import Icons from "./icons";

const SimpleCheckBox = ({ title, span }: { title: string, span: string }) => {
    const [isAgree, setisAgree] = useState(true);

    return <div onClick={() => {
       // setisAgree(!isAgree)
    }} className="checkboxGreen">
        <Icons iconNumber={isAgree ? 2 : 76} />
        <h5>
            <span>{span}</span>
            {title}
        </h5>
    </div>
}

export default SimpleCheckBox;