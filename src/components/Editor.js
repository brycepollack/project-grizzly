import React, { useEffect, useState } from "react";

import Preview from "./Preview";

const Editor = () => {

    const [input, setInput] = useState("Hello world!");

	return (
		<div className="parent-container">

			<div className="container">
                <textarea
                    id="input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
			</div>

            <div className="container">
				<Preview input={input}/>
			</div>
		</div>
	)
}

export default Editor