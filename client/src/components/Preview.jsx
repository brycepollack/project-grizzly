import { marked } from 'marked';
import parse from 'html-react-parser';
import '../style/preview.css'

export default function Preview({ text, show, className }) {

  if (className == null) className = "text-display";

  return (
    <div 
    // className={( show ? "preview text-display" : "preview text-display inactive")}
    className={( show ? `preview ${className}` : `preview ${className} inactive`)}
    // className="preview text-display" 
    // style={{ display: ( show ? "block" : "none" ) }}
    >
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