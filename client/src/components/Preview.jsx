import { marked } from 'marked';
import parse from 'html-react-parser';

export default function Preview({ text }) {

  return (
    <div className="preview text-display">
        {parse(marked.parse(text))}
	</div>
  );
}