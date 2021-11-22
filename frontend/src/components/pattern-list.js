import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function PatternList(props) {

    const [token] = useCookies(['craftingnexus'])
    const patternClicked = pattern => evt => { props.patternClicked(pattern) }
    const editPatternClicked = pattern => evt => { props.editPatternClicked(pattern) }
    const deletePatternClicked = pattern => evt => {
        API.deletePattern(pattern.id, token['craftingnexus'])
            .then(() => props.deletePatternClicked(pattern))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.patterns && props.patterns.map(pattern => {
                return (
                    <div key={pattern.id} className="pattern-list">
                        <h2 onClick={patternClicked(pattern)}>{pattern.name}</h2>
                        <FontAwesomeIcon icon={faEdit} onClick={editPatternClicked(pattern)} />
                        <FontAwesomeIcon icon={faTrash} onClick={deletePatternClicked(pattern)} />
                    </div>
                )
            })}
        </div>
    )
};

export default PatternList;