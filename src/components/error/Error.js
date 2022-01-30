export default function Error({ error }) {
    return (<div className="text-left red">{error && <span>{error}</span>}</div>)
}