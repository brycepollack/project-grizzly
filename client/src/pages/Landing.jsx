import "../style/landing.css";
import Preview from "../components/Preview";
import { useState } from "react";
import { MdDocumentScanner, MdEditDocument } from "react-icons/md";
import file from "../img/feature-file.png";
import login from "../img/feature-login.png"
import sidebar from "../img/feature-sidebar.png"

export default function Landing() {
  const [preview, setPreview] = useState(false);
  const [editor, setEditor] = useState(true);
  const [text, setText] = useState(
    "Try typing in our editor and toggle the buttons above to view in **Markdown**!"
  );

  const displayMode = (mode) => {
    if (mode === "edit") {
      if (!editor) {
        setEditor(true);
      } else {
        setPreview(true);
        setEditor(false);
      }
    } else if (mode === "preview") {
      if (!preview) {
        setPreview(true);
      } else {
        setEditor(true);
        setPreview(false);
      }
    }
  };

  return (
    <>
      <div className="landing-container">
        <div className="title-half">
          <h1>Start creating beautiful Markdown documents today</h1>
          <p>
            Grizzly is a free browser-based Markdown editor for note-taking,
            journaling, and much more.
          </p>
        </div>

        <div className="editor-half">
          {/* <h2 style={{ textAlign: "center"}}>Try out our text editor!</h2> */}
          <div className="landing-preview-toggle">
            <MdEditDocument
              className={
                editor ? "preview-icon active" : "preview-icon inactive"
              }
              onClick={() => displayMode("edit")}
            />
            {/* <div className="separator"></div> */}
            <MdDocumentScanner
              className={
                preview ? "preview-icon active" : "preview-icon inactive"
              }
              onClick={() => displayMode("preview")}
            />
          </div>
          <div
            className="landing-editor-child"
            // style={{ gap: editor && preview ? "10px" : "0px" }}
          >
            <textarea
              type="text"
              value={text}
              //   style={{ height: "100%" }}
              className={
                editor
                  ? "landing-text-display"
                  : "landing-text-display inactive"
              }
              placeholder="Start typing here..."
              onChange={(e) => setText(e.target.value)}
            />
            <Preview
              text={text}
              show={preview}
              className={"landing-text-display"}
            />
          </div>
        </div>

        <h2 style={{ marginTop: "120px" }}>Features!</h2>
        <div className="feature-half">

          <div className="feature">
            <div className="feature-text">
              <h3>Account creation</h3>
              <p>Sign up with Google, Github, or create an account with us!</p>
            </div>
            <div style={{ flex: "6"}}>
              <img src={login} alt="" style={{ width: "100%" }} />
            </div>
          </div>

          <div className="feature">
            <div style={{ flex:"6"}}>
              <img src={file} alt="" style={{ width: "100%" }} />
            </div>
            <div className="feature-text">
              <h3>File system</h3>
              <p>Organize notes with directories and subdirectories!</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-text">
              <h3>Sidebar</h3>
              <p>Jump to files, folders, or make new ones from the sidebar while editing!</p>
            </div>
            <div style={{ flex: "6"}}>
              <img src={sidebar} style={{ width: "100%" }} />
            </div>
          </div>

        </div>
      </div>
      <div id="footer">
        <footer>
          <p>
            Made with ❤️ by{" "}
            <a href="https://github.com/brycepollack">Bryce Pollack</a> and{" "}
            <a href="https://github.com/kcyy127">Kelly Yen</a>
          </p>
        </footer>
      </div>
    </>
  );
}
