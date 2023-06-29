import { marked } from 'marked';
import parse from 'html-react-parser';
import '../style/preview.css'

export default function Preview({ text }) {

  return (
    <div className="preview text-display">
        {myParse(text)}
	</div>
  );
}

marked.use({
  pedantic: false,
  gfm: true,
  breaks: true,
  xhtml: false
});

function myParse(text) {
  let html = marked.parse(text);
  // var ret = html.replace(/disabled="" /g, '');
  // console.log(ret);
  return parse(html);
}