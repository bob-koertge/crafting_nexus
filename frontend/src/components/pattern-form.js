import React, { useState, useEffect } from "react";
import { API } from '../api-service';

function PatternForm(props) {

    const pattern = props.pattern;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(pattern.name)
        setDescription(pattern.description)
    }, [pattern])

    const updatePattern = () => {
        API.updatePattern(pattern.id, { name, description })
            .then(resp => props.updatedPattern(resp))
            .catch(error => console.log(error))
    }

    const createPattern = () => {
        API.createPattern({ name, description })
            .then(resp => props.createPattern(resp))
            .catch(error => console.log(error))
    }
    return (
        <React.Fragment>
            {pattern ? (
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input
                        id="name"
                        type="text"
                        placeholder="title"
                        value={name}
                        onChange={evt => setName(evt.target.value)} /><br />
                    <label htmlFor="description">Description</label><br />
                    <textarea
                        id="description"
                        type="text"
                        placeholder="description"
                        value={description}
                        onChange={evt => setDescription(evt.target.value)} /><br />
                    {
                        pattern.id ?
                            <button onClick={updatePattern}>Update</button> :
                            <button onClick={createPattern}>Create</button>
                    }

                </div>
            ) : null}
        </React.Fragment>
    )
}

export default PatternForm;