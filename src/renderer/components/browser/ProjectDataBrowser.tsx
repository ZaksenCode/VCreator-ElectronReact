import './Browser.scss';
import './ProjectDataBrowser.scss';

interface ProjectDataProps {
    version: string,
    author: string,
    description: string,
    tags: string,
}

function Browser(props: ProjectDataProps) {
    return (
        <div className="browser project-data-browser">
            <div className="project-value project-version">
                Версия: {props.version}
            </div>
            <div className="project-value project-author">
                Автор: {props.author}
            </div>
            <div className="project-value project-description">
                Описание: {props.description}
            </div>
            <div className="project-value project-tags">
                Теги: {props.tags}
            </div>
        </div>
    )
}

export default Browser;