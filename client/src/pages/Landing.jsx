import '../style/landing.css'

export default function Landing() {
    return (
        <>
        <div className="left-right-container">
            <div className="left-half">
                <div className="vstack p-4 h-100 d-flex justify-content-center">
                    <h1>Start creating beautiful Markdown documents today</h1>
                    <p>Grizzly is a free browser-based Markdown editor for
                    note-taking, journaling, and much more
                    </p>
                </div>
            </div>
            <div className="right-half">
                <div className="d-flex justify-content-center">
                    <h1>Try it out!</h1>
                </div>

            </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
            <footer>
                <p>Made with ❤️ by <a href="https://github.com/brycepollack">Bryce Pollack</a> and <a href="https://github.com/kcyy127">Kelly Yen</a></p>
            </footer>
        </div>
        </>
    )
}