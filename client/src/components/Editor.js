import { useState, useEffect } from 'react'

import Preview from "./Preview";

const Editor = () => {

    const [input, setInput] = useState("Hello world!");

	return (
		<div className="editor">
            

			<div className="editor-child border rounded">
                <textarea
                    className="text-display"
                    style={{resize: "none"}}
                    id="input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
			</div>

            <div className="editor-child border rounded"
            style={{
                overflow: "auto"}}>
				<Preview input={input}/>
			</div>
		</div>
	)
}

export default Editor