import React, { useEffect, useState } from "react";

import { marked } from 'marked';
import parse from 'html-react-parser';

const Preview = ({input}) => {

	return (
		<div className="preview text-display">
            {parse(marked.parse(input))}
		</div>
	)
}

export default Preview