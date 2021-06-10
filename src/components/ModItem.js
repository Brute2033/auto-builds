import {useState} from 'react'

const ModItem = (props) => {
    const {mod, deleteMod, saveEdit} = props
    const [descriptionTwo, setDescriptionTwo] = useState('')

    return(
        <div>
            <p> {mod.description} </p>
            <button onClick={() => deleteMod(mod.mod_id)}>X</button>
            <input placeholder='What has changed' value={descriptionTwo} onChange={(e) => setDescriptionTwo(e.target.value)} />
            <button onClick={() => saveEdit(mod.mod_id, descriptionTwo)}> Update </button>
        </div>
    )
}


export default ModItem