import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function PatternDetails(props) {

    const pattern = props.pattern;
    const [token] = useCookies(['craftingnexus'])
    const [highlighted, setHighlighted] = useState(-1);
    const patternRate = high => evt => {
        setHighlighted(high)
    }
    const rateClicked = rate => evt => {
        API.updatePattern(pattern.id, { rating: rate + 1 }, token['craftingnexus'])
            .then(resp => props.updatePattern(resp))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {pattern ? (
                <div>
                    <h2>{pattern.name}</h2>
                    <h3 className='rate-container'>Rating -
                        {
                            [...Array(4)].map((element, index) => {
                                return (
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        key={index}
                                        className={
                                            highlighted > index - 1 ? 'purple' : (pattern.rating > index ? 'orange' : '')
                                        }
                                        onMouseEnter={patternRate(index)}
                                        onMouseLeave={patternRate(-1)}
                                        onClick={rateClicked(index)}
                                    />
                                )
                            })
                        }
                    </h3>
                    <p>{pattern.description}</p>
                    <h3>Publisher</h3>
                    {pattern.publisher.map(publisher => {
                        return (
                            <div key={publisher.id}>
                                <li>{publisher.name} @ {publisher.url}</li>
                            </div>
                        )
                    })}
                    <h3>Categories</h3>
                    {pattern.pattern_categories.map(category => {
                        return (
                            <div key={category.id}>
                                <li>{category.name}</li>
                            </div>
                        )
                    })}
                    <h3>Sizes</h3>
                    {pattern.pattern_sizes.map(size => {
                        return (
                            <div key={size.id}>
                                <li>{size.size_name}</li>
                            </div>
                        )
                    })}
                    <h3>Variations</h3>
                    <li>{pattern.pattern_variations}</li>
                    <h3>Tutorials</h3>
                    {pattern.tuturials.map(tuturials => {
                        return (
                            <div key={tuturials.id}>
                                <li>{tuturials.name} @ {tuturials.url}</li>
                            </div>
                        )
                    })}

                </div>
            ) : null}

        </React.Fragment>
    )
};

export default PatternDetails;