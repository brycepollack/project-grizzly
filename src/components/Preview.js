import React, { useEffect, useState } from "react";

import { marked } from 'marked';
import parse from 'html-react-parser';

const Preview = ({input}) => {

	return (
		<div >
            {parse(marked.parse(input))}
		</div>
	)
}

export default Preview