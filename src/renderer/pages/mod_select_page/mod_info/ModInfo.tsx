import './ModInfo.scss';

interface ModInfoProps {
    version: string,
    author: string,
    description: string,
    tags: string,
}

export default function ModInfo(props: ModInfoProps) {
    return (
        <div className="mod-info">
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
