import { marked } from 'marked';
import parse from 'html-react-parser';

export default function Preview({ text }) {

  return (
    <div className="preview text-display">
        {myParse(text)}
	</div>
  );
}

function myParse(text) {
  let html = marked.parse(text);
  // console.log(html);
  return parse(html);
}