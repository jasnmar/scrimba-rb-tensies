import "./Die.css"

function Die(props) {
    const dieClasses = props.held ? "die--die-body held" : "die--die-body"
    return (
        <div className={dieClasses}>{props.value}</div>
    )

}

export default Die